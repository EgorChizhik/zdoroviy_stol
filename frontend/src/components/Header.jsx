import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("access_token");
  const nickname = localStorage.getItem("user_nickname") || "Профиль";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <Link to="/" style={styles.logoLink}>
          Здоровый стол
        </Link>
      </div>

      <nav style={styles.nav}>
        <Link to="/" style={styles.navLink}>
          Главная
        </Link>
        <Link to="/news" style={styles.navLink}>
          Новости
        </Link>
        <Link to="/about-us" style={styles.navLink}>
          О нас
        </Link>
      </nav>

      <div style={styles.authButtons}>
        {isLoggedIn ? (
          <>
            <Link to="/profile" style={styles.profileButton}>
              {nickname}
            </Link>
            <button onClick={handleLogout} style={styles.logoutButton}>
              Выйти
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.loginButton}>
              Войти
            </Link>
            <Link to="/registration" style={styles.registerButton}>
              Регистрация
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 50px",
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #ddd",
  },
  logo: { fontSize: "24px", fontWeight: "bold" },
  logoLink: { textDecoration: "none", color: "#2e7d32" },
  nav: { display: "flex", gap: "30px" },
  navLink: { textDecoration: "none", color: "#333", fontSize: "16px" },
  authButtons: { display: "flex", gap: "15px", alignItems: "center" },
  loginButton: {
    padding: "10px 20px",
    border: "1px solid #2e7d32",
    borderRadius: "5px",
    textDecoration: "none",
    color: "#2e7d32",
  },
  registerButton: {
    padding: "10px 20px",
    backgroundColor: "#2e7d32",
    color: "white",
    borderRadius: "5px",
    textDecoration: "none",
  },
  profileButton: {
    padding: "10px 20px",
    backgroundColor: "#e8f5e9",
    color: "#2e7d32",
    borderRadius: "5px",
    textDecoration: "none",
    fontWeight: "bold",
  },
  logoutButton: {
    padding: "10px 20px",
    backgroundColor: "#c62828",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Header;
