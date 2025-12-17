import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import Header from '../components/Header';
import Footer from '../components/footer';

function NewsPage() {
  
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [recentArticles, setRecentArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [ordering, setOrdering] = useState('-created_at');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    api.get('categories/')
      .then(res => setCategories(res.data))
      .catch(err => console.error('Ошибка категорий:', err));

    api.get('articles/', {
      params: {
        page_size: 5,
        ordering: '-created_at'
      }
    })
      .then(res => {
        console.log('Недавние статьи загружены:', res.data.results);
        setRecentArticles(res.data.results || []);
      })
      .catch(err => {
        console.error('Ошибка загрузки недавних статей:', err);
        setRecentArticles([]);
      });

    fetchArticles();
  }, [search, selectedCategory, ordering, page]);

  const fetchArticles = async () => {
    setLoading(true);
    let params = new URLSearchParams();
    params.append('page', page);
    params.append('page_size', 9);

    if (search) params.append('search', search);
    if (selectedCategory) params.append('category', selectedCategory);
    if (ordering) params.append('ordering', ordering);

    try {
      const res = await api.get(`articles/?${params.toString()}`);
      console.log('Загружено статей:', res.data);
      setArticles(res.data.results || []);
      setTotalPages(Math.ceil(res.data.count / 9));
    } catch (err) {
      console.error('Ошибка загрузки статей:', err);
      setArticles([]);
    }
    setLoading(false);
  };

  const formatDate = (dateStr) => {
    return format(new Date(dateStr), 'dd MMMM yyyy', { locale: ru });
  };

  const formatShortDate = (dateStr) => {
    return format(new Date(dateStr), 'dd.MM.yyyy', { locale: ru });
  };

  return (
    <>
      {/* шапка */}
    <Header />
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>
        Новости и статьи о здоровом питании
      </h1>

      {/* Поиск и сортировка */}
      <div style={styles.searchBar}>
        <input
          type="text"
          placeholder="Искать блюда, рецепты, ингредиенты..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          style={styles.searchInput}
        />

        <select value={ordering} onChange={(e) => { setOrdering(e.target.value); setPage(1); }}
          style={styles.sortSelect}>
          <option value="-created_at">По умолчанию</option>
          <option value="-created_at">Новое</option>
          <option value="-likes">Популярное</option>
          <option value="-views">По просмотрам</option>
        </select>
      </div>

      {/* Категории */}
      <div style={styles.categoriesWrapper}>
        <button
          onClick={() => { setSelectedCategory(''); setPage(1); }}
          style={selectedCategory === '' ? styles.categoryButtonActive : styles.categoryButton}
        >
          Все
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => { setSelectedCategory(cat.slug); setPage(1); }}
            style={selectedCategory === cat.slug ? styles.categoryButtonActive : styles.categoryButton}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div style={styles.mainGrid}>
        {/* Недавние статьи */}
        <aside>
          <h2 style={styles.recentTitle}>Недавние статьи</h2>
          <div style={styles.recentList}>
            {recentArticles.length > 0 ? (
              recentArticles.map(article => (
                <Link key={article.id} to={`/news/${article.slug}`} style={styles.recentLink}>
                  <div
                    style={styles.recentCard}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'}
                  >
                    <h3 style={styles.recentCardTitle}>
                      {article.title}
                    </h3>

                    <div style={styles.recentCardMeta}>
                      <span>{formatShortDate(article.created_at)}</span>
                      <span style={styles.recentLikes}>
                        💖 {article.likes}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p style={styles.recentLoading}>
                Загрузка недавних статей...
              </p>
            )}
          </div>
        </aside>

        {/* сетка статей */}
        <main>
          {loading ? <p style={styles.loadingText}>Загрузка...</p> : (
            <div style={styles.articlesGrid}>
              {articles.map(article => (
                <Link key={article.id} to={`/news/${article.slug}`} style={styles.articleLink}>
                  <div
                    style={styles.articleCard}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-8px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    {article.main_image ? (
                      <img
                        src={article.main_image}
                        alt={article.title}
                        style={styles.articleImage}
                      />
                    ) : (
                      <div style={styles.placeholderImage}>
                        Ничего нет
                      </div>
                    )}

                    <div style={styles.articleContent}>
                      <div style={styles.articleMeta}>
                        {article.category && <span>{article.category.name}</span>}
                        {article.tags_list.length > 0 && (
                          <span style={styles.articleTags}>
                            {article.tags_list.map(tag => `#${tag}`).join(' ')}
                          </span>
                        )}
                      </div>

                      <h3 style={styles.articleTitle}>{article.title}</h3>
                      <p style={styles.articleDescription}>
                        {article.short_description.substring(0, 150)}...
                      </p>

                      <div style={styles.articleFooter}>
                        <span><strong>{formatDate(article.created_at)}</strong></span>
                        <span> Просмотрели 👁 {article.views} |  Оценили 💖 {article.likes}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Пагинация */}
          {totalPages > 1 && (
            <div style={styles.pagination}>
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                style={page === 1 ? styles.paginationButtonDisabled : styles.paginationButton}
              >
                ← Предыдущая
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  style={page === i + 1 ? styles.paginationPageActive : styles.paginationPage}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                style={page === totalPages ? styles.paginationButtonDisabled : styles.paginationButton}
              >
                Следующая →
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
    {/* футер */}
      <Footer />
    </>
  );

}

const styles = {
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  pageTitle: {
    fontSize: '42px',
    textAlign: 'center',
    color: '#1b5e20',
    marginBottom: '40px',
  },
  searchBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap',
    gap: '15px',
  },
  searchInput: {
    flex: 1,
    minWidth: '300px',
    padding: '14px',
    borderRadius: '12px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  sortSelect: {
    padding: '14px',
    borderRadius: '12px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  categoriesWrapper: {
    display: 'flex',
    gap: '10px',
    overflowX: 'auto',
    paddingBottom: '10px',
    marginBottom: '40px',
    scrollbarWidth: 'thin',
  },
  categoryButton: {
    padding: '10px 20px',
    borderRadius: '30px',
    border: 'none',
    background: '#e8f5e9',
    color: '#1b5e20',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    fontWeight: 'bold',
  },
  categoryButtonActive: {
    padding: '10px 20px',
    borderRadius: '30px',
    border: 'none',
    background: '#2e7d32',
    color: 'white',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    fontWeight: 'bold',
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 3fr',
    gap: '40px',
  },
  recentTitle: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#1b5e20',
  },
  recentList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  recentLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  recentCard: {
    padding: '16px',
    background: '#f8fff8',
    borderRadius: '12px',
    border: '1px solid #e0e0e0',
    transition: 'all 0.3s',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    cursor: 'pointer',
  },
  recentCardTitle: {
    margin: '0 0 10px 0',
    fontSize: '16px',
    lineHeight: '1.4',
    color: '#1b5e20',
  },
  recentCardMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '14px',
    color: '#666',
  },
  recentLikes: {
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  recentLoading: {
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: '20px',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#666',
  },
  articlesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '30px',
  },
  articleLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  articleCard: {
    border: '1px solid #e0e0e0',
    borderRadius: '16px',
    overflow: 'hidden',
    background: 'white',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
    transition: 'transform 0.3s',
  },
  articleImage: {
    width: '100%',
    height: '240px',
    objectFit: 'cover',
  },
  placeholderImage: {
    width: '100%',
    height: '240px',
    background: 'linear-gradient(135deg, #a5d6a7, #66bb6a)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '60px',
  },
  articleContent: {
    padding: '20px',
  },
  articleMeta: {
    marginBottom: '10px',
    fontSize: '14px',
    color: '#2e7d32',
  },
  articleTags: {
    marginLeft: '10px',
    color: '#666',
  },
  articleTitle: {
    fontSize: '20px',
    margin: '0 0 12px 0',
    color: '#1b5e20',
  },
  articleDescription: {
    color: '#666',
    lineHeight: '1.5',
    marginBottom: '15px',
  },
  articleFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    color: '#555',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '50px',
  },
  paginationButton: {
    padding: '10px 20px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    background: 'white',
  },
  paginationButtonDisabled: {
    padding: '10px 20px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    background: '#f0f0f0',
  },
  paginationPage: {
    padding: '10px 15px',
    borderRadius: '8px',
    border: 'none',
    background: '#e8f5e9',
    color: '#1b5e20',
    fontWeight: 'bold',
  },
  paginationPageActive: {
    padding: '10px 15px',
    borderRadius: '8px',
    border: 'none',
    background: '#2e7d32',
    color: 'white',
    fontWeight: 'bold',
  },
};

export default NewsPage;