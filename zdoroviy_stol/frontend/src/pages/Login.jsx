
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import api from '../api';

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

  return (
    <div style={{ maxWidth: '450px', margin: '80px auto', padding: '40px', background: '#fff', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
      <h1 style={{ textAlign: 'center', color: '#2e7d32', marginBottom: '30px' }}>Вход</h1>

      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Логин" value={formData.username} onChange={handleChange}
          style={{ width: '100%', padding: '15px', borderRadius: '12px', border: error ? '2px solid #e74c3c' : '1px solid #ccc', marginBottom: '15px', fontSize: '16px' }} />

        <input name="password" type="password" placeholder="Пароль" value={formData.password} onChange={handleChange}
          style={{ width: '100%', padding: '15px', borderRadius: '12px', border: error ? '2px solid #e74c3c' : '1px solid #ccc', marginBottom: '10px', fontSize: '16px' }} />

        {error && <p style={{ color: '#e74c3c', fontSize: '14px', margin: '0 0 20px', textAlign: 'center' }}>Ошибка: {error}</p>}

        <button type="submit" style={{ width: '50%', padding: '16px', background: '#2e7d32', color: 'white', border: 'none', borderRadius: '12px', 
          fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', display: 'block',margin: '0 auto' }}>
          Войти
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '25px', color: '#666' }}>
        Нет аккаунта? <Link to="/registration" style={{ color: '#2e7d32', fontWeight: 'bold' }}>Зарегистрироваться</Link>
      </p>
    </div>
  );
}

export default Login;