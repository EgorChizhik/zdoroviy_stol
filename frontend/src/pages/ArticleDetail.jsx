import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import Header from '../components/Header';
import Footer from "../components/Footer";
import styles from './ArticleDetail.module.css';

function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`articles/${slug}/`).then(res => {
      setArticle(res.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [slug]);

  const formatDate = (dateStr) => {
    return format(new Date(dateStr), 'dd MMMM yyyy', { locale: ru });
  };

  if (loading) return <div className={styles.loading}>Загрузка статьи...</div>;
  if (!article) return <div className={styles.loading}>Статья не найдена</div>;

  return (
    <>
        {/* шапка */}
        <Header />
    <div className={styles.container}>
      {/* главное фото */}
      <div className={styles.heroImageWrapper}>
        <img src={article.main_image} alt={article.title} className={styles.heroImage} />
      </div>

      {/* просмоторы лайки теги */}
      <div className={styles.metaCard}>
        <div className={styles.metaTop}>
          <span>
            <strong>{formatDate(article.created_at)} | </strong> 👁 {article.views} просмотров | 💖 {article.likes} Оценили
          </span>
        </div>

        <div className={styles.tagsContainer}>
          {article.category && (
            <span className={styles.categoryChip}>
              {article.category.name}
            </span>
          )}
          <div className={styles.hashtagsWrapper}>
            {article.tags_list.map(tag => (
              <span key={tag} className={styles.hashtag}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* заголовок */}
      <h1 className={styles.title}>
        {article.title}
      </h1>

      {/* короткое описание */}
      <p className={styles.shortDescription}>
        {article.short_description}
      </p>

      {/* контент */}
      <div className={styles.content}>
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>

      <div className={styles.backLinkWrapper}>
        <Link to="/news" className={styles.backLink}>
          ← Вернуться к новостям
        </Link>
      </div>
    </div>
    {/* футер */}
      <Footer />
    </>
  );
}

export default ArticleDetail;