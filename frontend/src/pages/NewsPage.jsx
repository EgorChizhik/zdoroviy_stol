import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import Header from '../components/Header';
import Footer from "../components/Footer";
import styles from './NewsPage.module.css';

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
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>
          Новости и статьи о здоровом питании
        </h1>

        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Искать блюда, рецепты, ингредиенты..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className={styles.searchInput}
          />

          <select
            value={ordering}
            onChange={(e) => { setOrdering(e.target.value); setPage(1); }}
            className={styles.sortSelect}
          >
            <option value="-created_at">По умолчанию</option>
            <option value="-created_at">Новое</option>
            <option value="-likes">Популярное</option>
            <option value="-views">По просмотрам</option>
          </select>
        </div>

        <div className={styles.categoriesWrapper}>
          <button
            onClick={() => { setSelectedCategory(''); setPage(1); }}
            className={selectedCategory === '' ? styles.categoryButtonActive : styles.categoryButton}
          >
            Все
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.slug); setPage(1); }}
              className={selectedCategory === cat.slug ? styles.categoryButtonActive : styles.categoryButton}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className={styles.mainGrid}>
          <aside>
            <h2 className={styles.recentTitle}>Недавние статьи</h2>
            <div className={styles.recentList}>
              {recentArticles.length > 0 ? (
                recentArticles.map(article => (
                  <Link key={article.id} to={`/news/${article.slug}`} className={styles.recentLink}>
                    <div className={styles.recentCard}>
                      <h3 className={styles.recentCardTitle}>
                        {article.title}
                      </h3>

                      <div className={styles.recentCardMeta}>
                        <span>{formatShortDate(article.created_at)}</span>
                        <span className={styles.recentLikes}>
                          💖 {article.likes}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className={styles.recentLoading}>
                  Загрузка недавних статей...
                </p>
              )}
            </div>
          </aside>

          <main>
            {loading ? <p className={styles.loadingText}>Загрузка...</p> : (
              <div className={styles.articlesGrid}>
                {articles.map(article => (
                  <Link key={article.id} to={`/news/${article.slug}`} className={styles.articleLink}>
                    <div className={styles.articleCard}>
                      {article.main_image ? (
                        <img
                          src={article.main_image}
                          alt={article.title}
                          className={styles.articleImage}
                        />
                      ) : (
                        <div className={styles.placeholderImage}>
                          Ничего нет
                        </div>
                      )}

                      <div className={styles.articleContent}>
                        <div className={styles.articleMeta}>
                          {article.category && <span>{article.category.name}</span>}
                          {article.tags_list.length > 0 && (
                            <span className={styles.articleTags}>
                              {article.tags_list.map(tag => `#${tag}`).join(' ')}
                            </span>
                          )}
                        </div>

                        <h3 className={styles.articleTitle}>{article.title}</h3>
                        <p className={styles.articleDescription}>
                          {article.short_description.substring(0, 150)}...
                        </p>

                        <div className={styles.articleFooter}>
                          <span><strong>{formatDate(article.created_at)}</strong></span>
                          <span> Просмотрели 👁 {article.views} |  Оценили 💖 {article.likes}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className={page === 1 ? styles.paginationButtonDisabled : styles.paginationButton}
                >
                  ← Предыдущая
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPage(i + 1)}
                    className={page === i + 1 ? styles.paginationPageActive : styles.paginationPage}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className={page === totalPages ? styles.paginationButtonDisabled : styles.paginationButton}
                >
                  Следующая →
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default NewsPage;