import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.logoSection}>
          <h2 className={styles.logo}>Здоровый стол</h2>
          <p className={styles.description}>
            Новостной портал о здоровом питании и образе жизни
          </p>
        </div>

        <div className={styles.linksSection}>
          <h3 className={styles.linksTitle}>Разделы</h3>
          <Link to="/" className={styles.footerLink}>
            Главная
          </Link>
          <Link to="/news" className={styles.footerLink}>
            Новости
          </Link>
          <Link to="/about-us" className={styles.footerLink}>
            О нас
          </Link>
        </div>

        <div className={styles.contactSection}>
          <h3 className={styles.linksTitle}>Контакты</h3>
          <p className={styles.contactInfo}>Email: email@healthytable.ru</p>
          <p className={styles.contactInfo}>Телефон: +7 (999) 55-55-55</p>
        </div>
      </div>

      <div className={styles.copyright}>
        © {new Date().getFullYear()} Здоровый стол. Все права защищены.
      </div>
    </footer>
  );
}

export default Footer;