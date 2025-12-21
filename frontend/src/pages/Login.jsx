import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import api from '../api';
import styles from './Login.module.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('login/', formData);
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      localStorage.setItem('user_nickname', res.data.user.nickname || res.data.user.username);
      enqueueSnackbar(`Добро пожаловать, ${res.data.user.nickname || 'друг'}!`, { variant: 'success' });
      navigate('/profile');
    } catch (err) {
      setError('Неверный логин или пароль');
    }
  };

  const inputClass = error ? `${styles.input} ${styles.inputError}` : styles.input;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Вход</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          name="username"
          placeholder="Логин"
          value={formData.username}
          onChange={handleChange}
          className={inputClass}
        />

        <input
          name="password"
          type="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
          className={inputClass}
        />

        {error && <p className={styles.errorMessage}>Ошибка: {error}</p>}

        <button type="submit" className={styles.submitButton}>
          Войти
        </button>
      </form>

      <p className={styles.registerLink}>
        Нет аккаунта? <Link to="/registration" className={styles.registerLinkBold}>Зарегистрироваться</Link>
      </p>
    </div>
  );
}

export default Login;