import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import Header from '../components/Header';
import Footer from "../components/Footer";

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

  if (loading) return <div style={styles.loading}>Загрузка статьи...</div>;
  if (!article) return <div style={styles.loading}>Статья не найдена</div>;

  return (
    <>
        {/* шапка */}
        <Header />
    <div style={styles.container}>
      {/* главное фото */}
      <div style={styles.heroImageWrapper}>
        <img src={article.main_image} alt={article.title} style={styles.heroImage} />
      </div>

      {/* просмоторы лайки теги */}
      <div style={styles.metaCard}>
        <div style={styles.metaTop}>
          <span>
            <strong>{formatDate(article.created_at)} | </strong> 👁 {article.views} просмотров | 💖 {article.likes} Оценили
          </span>
        </div>

        <div style={styles.tagsContainer}>
          {article.category && (
            <span style={styles.categoryChip}>
              {article.category.name}
            </span>
          )}
          <div style={styles.hashtagsWrapper}>
            {article.tags_list.map(tag => (
              <span key={tag} style={styles.hashtag}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* заголовок */}
      <h1 style={styles.title}>
        {article.title}
      </h1>

      {/* короткое описание */}
      <p style={styles.shortDescription}>
        {article.short_description}
      </p>

      {/* контент */}
      <div style={styles.content}>
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>

      <div style={styles.backLinkWrapper}>
        <Link to="/news" style={styles.backLink}>
          ← Вернуться к новостям
        </Link>
      </div>
    </div>
    {/* футер */}
      <Footer />
    </>
  );
}

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  heroImageWrapper: {
    borderRadius: '20px',
    overflow: 'hidden',
    marginBottom: '30px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
  },
  heroImage: {
    width: '100%',
    height: '500px',
    objectFit: 'cover',
    display: 'block',
  },
  metaCard: {
    background: 'rgb(248, 249, 250)',
    padding: '24px',
    borderRadius: '16px',
    margin: '-80px 40px 50px',
    position: 'relative',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
  metaTop: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '20px',
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '12px',
  },
  categoryChip: {
    padding: '8px 18px',
    background: 'rgb(209, 234, 210)',
    color: 'rgb(46, 125, 50)',
    borderRadius: '30px',
    fontWeight: '600',
    fontSize: '15px',
    whiteSpace: 'nowrap',
  },
  hashtagsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  hashtag: {
    color: '#666',
    fontSize: '15px',
  },
  title: {
    fontSize: '42px',
    textAlign: 'center',
    color: 'rgb(46, 125, 50)',
    margin: '40px 0 30px',
    lineHeight: '1.2',
  },
  shortDescription: {
    fontSize: '20px',
    color: 'rgb(248, 249, 250)',
    textAlign: 'center',
    lineHeight: '1.6',
    maxWidth: '800px',
    margin: '0 auto 60px',
  },
  content: {
    fontSize: '18px',
    lineHeight: '1.8',
    color: 'rgb(248, 249, 250)',
    marginBottom: '80px',
  },
  backLinkWrapper: {
    textAlign: 'center',
  },
  backLink: {
    color: 'rgb(46, 125, 50)',
    fontSize: '18px',
    textDecoration: 'underline',
  },
  loading: {
    textAlign: 'center',
    padding: '100px',
    fontSize: '20px',
    color: '#666',
  },
};

export default ArticleDetail;