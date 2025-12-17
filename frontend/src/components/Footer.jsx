function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        <div style={styles.logoSection}>
          <h2 style={styles.logo}> Здоровый стол</h2>
          <p style={styles.description}>
            Новостной портал о здоровом питании и образе жизни
          </p>
        </div>

        <div style={styles.linksSection}>
          <h3 style={styles.linksTitle}>Разделы</h3>
          <a href="/" style={styles.footerLink}>
            Главная
          </a>
          <a href="/news" style={styles.footerLink}>
            Новости
          </a>
          <a href="/about-us" style={styles.footerLink}>
            О нас
          </a>
        </div>

        <div style={styles.contactSection}>
          <h3 style={styles.linksTitle}>Контакты</h3>
          <p style={styles.contactInfo}>Email: info@healthytable.ru</p>
          <p style={styles.contactInfo}>Телефон: +7 (999) 123-45-67</p>
        </div>
      </div>

      <div style={styles.copyright}>
        © {new Date().getFullYear()} Здоровый стол. Все права защищены.
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#2e7d32",
    color: "white",
    padding: "40px 50px 20px",
    marginTop: "50px",
  },
  footerContent: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "40px",
  },
  logoSection: {
    flex: 1,
    minWidth: "250px",
  },
  logo: {
    margin: "0 0 10px 0",
  },
  description: {
    opacity: 0.8,
  },
  linksSection: {
    flex: 1,
    minWidth: "150px",
  },
  linksTitle: {
    marginBottom: "15px",
  },
  footerLink: {
    display: "block",
    color: "white",
    textDecoration: "none",
    marginBottom: "10px",
    opacity: 0.8,
  },
  contactSection: {
    flex: 1,
    minWidth: "200px",
  },
  contactInfo: {
    margin: "5px 0",
    opacity: 0.8,
  },
  copyright: {
    textAlign: "center",
    marginTop: "40px",
    paddingTop: "20px",
    borderTop: "1px solid rgba(255,255,255,0.2)",
    opacity: 0.7,
  },
};

export default Footer;
