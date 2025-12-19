import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./About.module.css";

function About() {
  return (
    <>
      <Header />

      <div className={styles.pageWrapper}>
        {/* Баннер */}
        <section className={styles.bannerSection}>
          <div className={styles.bannerOverlay}></div>

          <div className={styles.bannerContent}>
            <h1 className={styles.bannerTitle}>О нас — Здоровый стол</h1>
            <h2 className={styles.bannerSubtitle}>
              Ваш надежный гид в мир полезного и вкусного питания
            </h2>
            <p className={styles.bannerDescription}>
              Здоровый стол — это новостной портал, посвященный здоровому и
              полезному питанию. Мы ежедневно публикуем актуальные статьи,
              новости, рецепты и советы от экспертов, чтобы помочь вам сделать
              рацион вкусным, сбалансированным и полезным для всей семьи.
            </p>
            <Link to="/news" className={styles.bannerCtaButton}>
              Читать последние статьи
            </Link>
          </div>
        </section>

        {/* Миссия */}
        <section className={styles.purposeSection}>
          <p className={styles.purposeText}>
            Мы верим, что здоровое питание — это не диета, а стиль жизни,
            который приносит радость и энергию. Наша цель — предоставлять
            достоверную, научно обоснованную информацию о питании, помогая людям
            всех возрастов улучшать здоровье, поддерживать вес и предотвращать
            заболевания через правильный рацион.
          </p>
        </section>

        {/* 3 карточки с иконками */}
        <section className={styles.featuresHighlight}>
          <div className={styles.featuresGrid}>
            <div className={styles.featurePlate}>
              <img
                src="/media/icons/Family_35791.png"
                className={styles.featureIcon}
                alt="Для всей семьи"
              />
              <p className={styles.featureDescription}>
                Для всех, кто заботится о своем здоровье — от молодых родителей
                и активных взрослых до тех, кто хочет питаться осознанно в любом
                возрасте.
              </p>
            </div>
            <div className={styles.featurePlate}>
              <img
                src="/media/icons/news_128x128-32_22252.png"
                className={styles.featureIcon}
                alt="Новости и рецепты"
              />
              <p className={styles.featureDescription}>
                Новости о новинках в нутрициологии, проверенные рецепты, обзоры
                продуктов, советы диетологов и истории успеха.
              </p>
            </div>
            <div className={styles.featurePlate}>
              <img
                src="/media/icons/certificate.png"
                className={styles.featureIcon}
                alt="Эксперты"
              />
              <p className={styles.featureDescription}>
                Все материалы готовят или проверяют квалифицированные эксперты —
                диетологи, нутрициологи и врачи с опытом.
              </p>
            </div>
          </div>
        </section>

        {/* Преимущества */}
        <section className={styles.advantagesSection}>
          <h2 className={styles.advantagesHeading}>
            Почему выбирают "Здоровый стол"
          </h2>
          <div className={styles.advantagesGrid}>
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
              <div key={i} className={styles.advantageTile}>
                <div className={styles.advantageIcon}>{item.icon}</div>
                <h3 className={styles.advantageTitle}>{item.title}</h3>
                <p className={styles.advantageText}>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Статистика */}
        <section className={styles.nutritionStats}>
          <div className={styles.statsGrid}>
            <div>
              <div className={styles.statFigure}>1500+</div>
              <p className={styles.statCaption}>статей</p>
            </div>
            <div>
              <div className={styles.statFigure}>50 000</div>
              <p className={styles.statCaption}>читателей ежемесячно</p>
            </div>
            <div>
              <div className={styles.statFigure}>25+</div>
              <p className={styles.statCaption}>экспертов</p>
            </div>
            <div>
              <div className={styles.statFigure}>с 2018</div>
              <p className={styles.statCaption}>помогаем питаться правильно</p>
            </div>
          </div>
        </section>

        {/* Подписка */}
        <section className={styles.newsletterBlock}>
          <div className={styles.newsletterOverlay}></div>
          <div className={styles.newsletterContent}>
            <h2 className={styles.newsletterHeading}>
              Получайте новые рецепты и новости первыми
            </h2>
            <p className={styles.newsletterDescription}>
              Подпишитесь на рассылку — и каждую неделю будем присылать самое
              полезное и вкусное
            </p>
            <div className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Ваш email"
                className={styles.newsletterInput}
              />
              <button className={styles.newsletterSubmit}>Подписаться</button>
            </div>
            <div className={styles.newsletterLinks}>
              <Link to="/news" className={styles.newsletterLink}>
                Перейти к статьям
              </Link>
              <a
                href="mailto:email@zdoroviy-stol.ru"
                className={styles.newsletterLink}
              >
                Связаться с нами
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default About;