import Header from '../components/Header';
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import api from '../api';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import styles from './main_page.module.css'

export default function Main() {
  const [latestArticles, setLatestArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    <div className={styles.pageWrapper}>
      <Header />

      <main className={styles.main}>
        {/* Баннер */}
        <section className={styles.banner}>
          <div className={styles.bannerContent}>
            <h1 className={styles.bannerTitle}>
              Healthy, Organic, Food
            </h1>
            <p className={styles.bannerText}>
              Добро пожаловать на крупнейший портал о здоровом питании!<br />
              Узнайте последние новости, исследования и рецепты.
            </p>
            <Link to="/news" className={styles.bannerButton}>
              Читать статьи
            </Link>
          </div>

          
          <div className={styles.bannerImagePlaceholder}>
            Главное фото
          </div>
        </section>

        {/* Новые статьи */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Новые статьи
          </h2>

          {loading ? (
            <p style={{ textAlign: 'center', color: '#666' }}>Загрузка статей...</p>
          ) : (
            <div className={styles.articlesGrid}>
              {latestArticles.length > 0 ? (
                latestArticles.map(article => (
                  <Link
                    key={article.id}
                    to={`/news/${article.slug}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div className={styles.articleCard}>
                      {article.main_image ? (
                        <img
                          src={article.main_image}
                          alt={article.title}
                          className={styles.articleImage}
                        />
                      ) : (
                        <div className={styles.articleImage}>
                          Фото статьи
                        </div>
                      )}

                      {article.category && (
                        <span className={styles.categoryTag}>
                          {article.category.name}
                        </span>
                      )}

                      <h3 className={styles.articleCardTitle}>
                        {article.title}
                      </h3>

                      <div className={styles.articleMetaBottom}>
                        <span className={styles.articleDate}>
                          {formatDate(article.created_at)}
                        </span>
                        <span className={styles.articleViews}>
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
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Популярные авторы
          </h2>

          <div className={styles.authorsGrid}>
            <div className={styles.authorCard}>
              <div className={styles.authorAvatar}>Автор</div>
              <h3 className={styles.authorName}>Анна Иванова</h3>
              <p className={styles.authorRole}>Диетолог</p>
              <p className={styles.authorArticles}>Статей: 24</p>
            </div>

            <div className={styles.authorCard}>
              <div className={styles.authorAvatar}>Автор</div>
              <h3 className={styles.authorName}>Дмитрий Петров</h3>
              <p className={styles.authorRole}>Нутрициолог</p>
              <p className={styles.authorArticles}>Статей: 18</p>
            </div>

            <div className={styles.authorCard}>
              <div className={styles.authorAvatar}>Автор</div>
              <h3 className={styles.authorName}>Мария Сидорова</h3>
              <p className={styles.authorRole}>Шеф-повар</p>
              <p className={styles.authorArticles}>Статей: 32</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}