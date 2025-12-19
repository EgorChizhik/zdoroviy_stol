import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";  

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
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/" className={styles.logoLink}>
          Здоровый стол
        </Link>
      </div>

      <nav className={styles.nav}>
        <Link to="/" className={styles.navLink}>
          Главная
        </Link>
        <Link to="/news" className={styles.navLink}>
          Новости
        </Link>
        <Link to="/about-us" className={styles.navLink}>
          О нас
        </Link>
      </nav>

      <div className={styles.authButtons}>
        {isLoggedIn ? (
          <>
            <Link to="/profile" className={styles.profileButton}>
              {nickname}
            </Link>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Выйти
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.loginButton}>
              Войти
            </Link>
            <Link to="/registration" className={styles.registerButton}>
              Регистрация
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;