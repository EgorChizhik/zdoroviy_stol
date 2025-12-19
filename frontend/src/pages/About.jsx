import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/footer";

function About() {
  return (
    <>
      {/* шапка */}
      <Header />

      <div style={styles.pageWrapper}>
        {/* Секция */}
        <section style={styles.bannerSection}>
          <div style={styles.bannerOverlay}></div>

          <div style={styles.bannerContent}>
            <h1 style={styles.bannerTitle}>О нас — Здоровый стол</h1>
            <h2 style={styles.bannerSubtitle}>
              Ваш надежный гид в мир полезного и вкусного питания
            </h2>
            <p style={styles.bannerDescription}>
              Здоровый стол — это новостной портал, посвященный здоровому и
              полезному питанию. Мы ежедневно публикуем актуальные статьи,
              новости, рецепты и советы от экспертов, чтобы помочь вам сделать
              рацион вкусным, сбалансированным и полезным для всей семьи.
            </p>
            <Link to="/news" style={styles.bannerCtaButton}>
              Читать последние статьи
            </Link>
          </div>
        </section>

        {/* Миссия */}
        <section style={styles.purposeSection}>
          <p style={styles.purposeText}>
            Мы верим, что здоровое питание — это не диета, а стиль жизни,
            который приносит радость и энергию. Наша цель — предоставлять
            достоверную, научно обоснованную информацию о питании, помогая людям
            всех возрастов улучшать здоровье, поддерживать вес и предотвращать
            заболевания через правильный рацион.
          </p>
        </section>

        {/* 3 карточки с иконками */}
        <section style={styles.featuresHighlight}>
          <div style={styles.featuresGrid}>
            <div style={styles.featurePlate}>
              <img src='/media/icons/Family_35791.png' style={styles.featureIcon}></img>
              <p style={styles.featureDescription}>
                Для всех, кто заботится о своем здоровье — от молодых родителей
                и активных взрослых до тех, кто хочет питаться осознанно в любом
                возрасте.
              </p>
            </div>
            <div style={styles.featurePlate}>
              <img src='/media/icons/news_128x128-32_22252.png' style={styles.featureIcon}></img>
              <p style={styles.featureDescription}>
                Новости о новинках в нутрициологии, проверенные рецепты, обзоры
                продуктов, советы диетологов и истории успеха.
              </p>
            </div>
            <div style={styles.featurePlate}>
              <img src='/media/icons/certificate.png' style={styles.featureIcon}></img>
              <p style={styles.featureDescription}>
                Все материалы готовят или проверяют квалифицированные эксперты —
                диетологи, нутрициологи и врачи с опытом.
              </p>
            </div>
          </div>
        </section>

        {/* Преимущества */}
        <section style={styles.advantagesSection}>
          <h2 style={styles.advantagesHeading}>Почему выбирают "Здоровый стол"</h2>
          <div style={styles.advantagesGrid}>
            {[
              {
                icon: "✅",
                title: "Надежность и экспертиза",
                text: "Статьи пишут и рецензируют только специалисты с медицинским или нутрициологическим образованием — никаких непроверенных советов.",
              },
              {
                icon: "📱",
                title: "Удобство",
                text: "Простая навигация, мобильная версия, поиск по темам — всё под рукой, без перегруженных рекламой страниц.",
              },
              {
                icon: "🆕",
                title: "Актуальность",
                text: "Ежедневные обновления с свежими новостями из мира науки о питании, сезонными рецептами и трендами.",
              },
              {
                icon: "✨",
                title: "Вдохновение",
                text: "Красивые фото, видео-рецепты и истории реальных людей, которые изменили жизнь благодаря здоровому столу.",
              },
              {
                icon: "🎁",
                title: "Бесплатно и без навязчивости",
                text: "Полный доступ ко всем материалам без обязательной подписки.",
              },
            ].map((item, i) => (
              <div key={i} style={styles.advantageTile}>
                <div style={styles.advantageIcon}>{item.icon}</div>
                <h3 style={styles.advantageTitle}>{item.title}</h3>
                <p style={styles.advantageText}>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Статистика */}
        <section style={styles.nutritionStats}>
          <div style={styles.statsGrid}>
            <div>
              <div style={styles.statFigure}>1500+</div>
              <p style={styles.statCaption}>статей</p>
            </div>
            <div>
              <div style={styles.statFigure}>50 000</div>
              <p style={styles.statCaption}>читателей ежемесячно</p>
            </div>
            <div>
              <div style={styles.statFigure}>25+</div>
              <p style={styles.statCaption}>экспертов</p>
            </div>
            <div>
              <div style={styles.statFigure}>с 2018</div>
              <p style={styles.statCaption}>помогаем питаться правильно</p>
            </div>
          </div>
        </section>

        {/* Блок подписки */}
        <section style={styles.newsletterBlock}>
          <div style={styles.newsletterOverlay}></div>
          <div style={styles.newsletterContent}>
            <h2 style={styles.newsletterHeading}>
              Получайте новые рецепты и новости первыми
            </h2>
            <p style={styles.newsletterDescription}>
              Подпишитесь на рассылку — и каждую неделю будем присылать самое
              полезное и вкусное
            </p>
            <div style={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Ваш email"
                style={styles.newsletterInput}
              />
              <button style={styles.newsletterSubmit}>Подписаться</button>
            </div>
            <div style={styles.newsletterLinks}>
              <Link to="/news" style={styles.newsletterLink}>
                Перейти к статьям
              </Link>
              <a
                href="mailto:email@zdoroviy-stol.ru"
                style={styles.newsletterLink}
              >
                Связаться с нами
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* футер */}
      <Footer />
    </>
  );
}

const styles = {
  pageWrapper: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  },

  // Баннер
  bannerSection: {
    position: "relative",
    height: "80vh",
    minHeight: "600px",
    // backgroundImage: "url()",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "0 0 30px 30px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "white",
  },
  bannerOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0, 0, 0, 0.4)",
  },
  bannerContent: {
    position: "relative",
    zIndex: 1,
    maxWidth: "800px",
    padding: "20px",
  },
  bannerTitle: {
    fontSize: "56px",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  bannerSubtitle: {
    fontSize: "32px",
    marginBottom: "30px",
    fontWeight: "normal",
  },
  bannerDescription: {
    fontSize: "20px",
    lineHeight: "1.6",
    marginBottom: "40px",
  },
  bannerCtaButton: {
    display: "inline-block",
    padding: "16px 40px",
    background: "#2e7d32",
    color: "white",
    borderRadius: "50px",
    fontSize: "18px",
    fontWeight: "bold",
    textDecoration: "none",
    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
  },

  // Миссия
  purposeSection: {
    padding: "80px 20px",
    textAlign: "center",
  },
  purposeText: {
    fontSize: "24px",
    lineHeight: "1.8",
    maxWidth: "900px",
    margin: "0 auto",
    color: "#444",
  },

  // Три карточки
  featuresHighlight: {
    padding: "60px 20px",
    background: "#f8fff8",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "40px",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  featurePlate: {
    textAlign: "center",
    padding: "30px",
    background: "white",
    borderRadius: "20px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  },
  featureIcon: {
    width: "40px",
    height: "40px",
    marginBottom: "20px",
  },
  featureDescription: {
    fontSize: "18px",
    lineHeight: "1.6",
    color: "#444",
  },

  // Преимущества
  advantagesSection: {
    padding: "80px 20px",
  },
  advantagesHeading: {
    textAlign: "center",
    fontSize: "36px",
    marginBottom: "60px",
    color: "#1b5e20",
  },
  advantagesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  advantageTile: {
    padding: "30px",
    background: "white",
    borderRadius: "20px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
  advantageIcon: {
    fontSize: "50px",
    marginBottom: "20px",
  },
  advantageTitle: {
    fontSize: "22px",
    marginBottom: "15px",
    color: "#1b5e20",
  },
  advantageText: {
    fontSize: "17px",
    lineHeight: "1.6",
    color: "#555",
  },

  // Статистика
  nutritionStats: {
    padding: "80px 20px",
    background: "#2e7d32",
    color: "white",
    textAlign: "center",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "40px",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  statFigure: {
    fontSize: "60px",
    fontWeight: "bold",
  },
  statCaption: {
    fontSize: "20px",
  },

  // Подписка
  newsletterBlock: {
    position: "relative",
    padding: "100px 20px",
    backgroundImage:
      "url(/media/page_adout/banner_stol_eda.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    textAlign: "center",
    color: "white",
  },
  newsletterOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0, 0, 0, 0.5)",
  },
  newsletterContent: {
    position: "relative",
    zIndex: 1,
  },
  newsletterHeading: {
    fontSize: "40px",
    marginBottom: "30px",
  },
  newsletterDescription: {
    fontSize: "20px",
    marginBottom: "40px",
    maxWidth: "700px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  newsletterForm: {
    maxWidth: "500px",
    margin: "0 auto",
    display: "flex",
  },
  newsletterInput: {
    flex: 1,
    padding: "16px",
    borderRadius: "50px 0 0 50px",
    border: "none",
    fontSize: "18px",
    outline: "none",
  },
  newsletterSubmit: {
    padding: "16px 30px",
    background: "#ff6b35",
    color: "white",
    border: "none",
    borderRadius: "0 50px 50px 0",
    fontSize: "18px",
    cursor: "pointer",
    marginLeft: "-5px",
  },
  newsletterLinks: {
    marginTop: "50px",
  },
  newsletterLink: {
    margin: "0 20px",
    color: "white",
    fontSize: "18px",
    textDecoration: "underline",
  },
};

export default About;
