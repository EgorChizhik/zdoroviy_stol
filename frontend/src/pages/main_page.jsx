import Header from '../components/Header';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';
import api from '../api';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export default function Main() {
  const [latestArticles, setLatestArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 4 новые статьи
    api.get('articles/', {
      params: {
        ordering: '-created_at',
        page_size: 4
      }
    })
      .then(res => {
        setLatestArticles(res.data.results || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Ошибка загрузки новых статей на главную:', err);
        setLatestArticles([]);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateStr) => {
    return format(new Date(dateStr), 'dd MMMM yyyy', { locale: ru });
  };

  return (
    <div style={styles.pageWrapper}>
      <Header />

      <main style={styles.main}>
        {/* Баннер */}
        <section style={styles.banner}>
          <div style={styles.bannerContent}>
            <h1 style={styles.bannerTitle}>
              Healthy, Organic, Food
            </h1>
            <p style={styles.bannerText}>
              Добро пожаловать на крупнейший портал о здоровом питании!<br />
              Узнайте последние новости, исследования и рецепты.
            </p>
            <Link to="/news" style={styles.bannerButton}>
              Читать статьи
            </Link>
          </div>
          <div style={styles.bannerImagePlaceholder}>
            Главное фото
          </div>
        </section>

        {/* Новые статьи */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            Новые статьи
          </h2>

          {loading ? (
            <p style={{ textAlign: 'center', color: '#666' }}>Загрузка статей...</p>
          ) : (
            <div style={styles.articlesGrid}>
              {latestArticles.length > 0 ? (
                latestArticles.map(article => (
                  <Link
                    key={article.id}
                    to={`/news/${article.slug}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div style={styles.articleCard}>
                      {article.main_image ? (
                        <img
                          src={article.main_image}
                          alt={article.title}
                          style={styles.articleImage}
                        />
                      ) : (
                        <div style={styles.articleImage}>
                          Фото статьи
                        </div>
                      )}

                      {article.category && (
                        <span style={styles.categoryTag}>
                          {article.category.name}
                        </span>
                      )}

                      <h3 style={styles.articleCardTitle}>
                        {article.title}
                      </h3>

                      <div style={styles.articleMetaBottom}>
                        <span style={styles.articleDate}>
                          {formatDate(article.created_at)}
                        </span>
                        <span style={styles.articleViews}>
                          👁 {article.views} просмотров
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#999' }}>
                  Пока нет опубликованных статей
                </p>
              )}
            </div>
          )}
        </section>

        {/* Авторы */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            Популярные авторы
          </h2>

          <div style={styles.authorsGrid}>
            {/* Автор 1 */}
            <div style={styles.authorCard}>
              <div style={styles.authorAvatar}>Автор</div>
              <h3 style={styles.authorName}>Анна Иванова</h3>
              <p style={styles.authorRole}>Диетолог</p>
              <p style={styles.authorArticles}>Статей: 24</p>
            </div>

            {/* Автор 2 */}
            <div style={styles.authorCard}>
              <div style={styles.authorAvatar}>Автор</div>
              <h3 style={styles.authorName}>Дмитрий Петров</h3>
              <p style={styles.authorRole}>Нутрициолог</p>
              <p style={styles.authorArticles}>Статей: 18</p>
            </div>

            {/* Автор 3 */}
            <div style={styles.authorCard}>
              <div style={styles.authorAvatar}>Автор</div>
              <h3 style={styles.authorName}>Мария Сидорова</h3>
              <p style={styles.authorRole}>Шеф-повар</p>
              <p style={styles.authorArticles}>Статей: 32</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}


const styles = {
  pageWrapper: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    padding: '0 50px',
  },
  banner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#e8f5e9',
    borderRadius: '20px',
    padding: '60px',
    margin: '40px 0',
    gap: '40px',
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: '48px',
    color: '#1b5e20',
    marginBottom: '20px',
  },
  bannerText: {
    fontSize: '18px',
    color: '#333',
    marginBottom: '30px',
    lineHeight: 1.6,
  },
  bannerButton: {
    display: 'inline-block',
    padding: '15px 30px',
    backgroundColor: '#2e7d32',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
  },
  bannerImagePlaceholder: {
    flex: 1,
    height: '300px',
    backgroundColor: '#c8e6c9',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#1b5e20',
    fontSize: '24px',
    opacity: 0.7,
  },
  section: {
    margin: '60px 0',
  },
  sectionTitle: {
    fontSize: '32px',
    color: '#1b5e20',
    marginBottom: '30px',
    borderBottom: '2px solid #e0e0e0',
    paddingBottom: '10px',
  },
articlesGrid: {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 320px))',
  gap: '30px',
  justifyContent: 'center',
  maxWidth: '1400px',
  margin: '0 auto',
},
  articleCard: {
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#fff',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  articleImage: {
    height: '180px',
    width: '100%',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '15px',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#666',
    fontSize: '16px',
  },
  categoryTag: {
    display: 'inline-block',
    padding: '6px 12px',
    backgroundColor: '#e8f5e9',
    color: '#1b5e20',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '500',
    marginBottom: '12px',
    maxWdth:'fit-content',
  },
  articleCardTitle: {
    fontSize: '19px',
    fontWeight: '600',
    marginBottom: '12px',
    lineHeight: '1.4',
    flexGrow: 1,
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    minHeight: 'auto',
    color:'#000',
  },
  articleMetaBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#666',
    fontSize: '14px',
    marginTop: '15px',
  },
  articleDate: {
    fontWeight: '500',
  },
  articleViews: {
    fontWeight: '500',

  },
  articleLikes: {
    color: '#666',
    fontSize: '14px',
  },
  authorsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '25px',
  },
  authorCard: {
    textAlign: 'center',
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    padding: '25px',
  },
  authorAvatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#e0e0e0',
    margin: '0 auto 15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '40px',
  },
  authorName: {
    fontSize: '18px',
    marginBottom: '5px',
  },
  authorRole: {
    color: '#666',
    fontStyle: 'italic',
    marginBottom: '10px',
  },
  authorArticles: {
    color: '#2e7d32',
    fontWeight: 'bold',
  },
};