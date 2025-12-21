import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import api from '../api';
import styles from './Profile.module.css';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ nickname: '', bio: '' });

  const avatarInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      enqueueSnackbar('Сначала войдите в аккаунт', { variant: 'warning' });
      navigate('/login');
      return;
    }

    api.get('profile/').then(res => {
      setUser(res.data);
      setFormData({ nickname: res.data.nickname || '', bio: res.data.bio || '' });
    }).catch(() => {
      localStorage.clear();
      navigate('/login');
    });
  }, [navigate]);

  const handleFileUpload = (field) => {
    const file = field === 'avatar' ? avatarInputRef.current.files[0] : bannerInputRef.current.files[0];
    if (!file) return;

    const data = new FormData();
    data.append(field, file);

    api.patch('profile/', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => {
      setUser(res.data);
      enqueueSnackbar('Изображение обновлено', { variant: 'success' });
    });
  };

  const handleSave = () => {
    api.patch('profile/', formData).then(res => {
      setUser(res.data);
      setIsEditing(false);
      enqueueSnackbar('Профиль сохранён!', { variant: 'success' });
    });
  };

  if (!user) return <div className={styles.loading}>Загрузка...</div>;

  return (
    <div className={styles.container}>
      {/* Кнопка "На главную" */}
      <div onClick={() => navigate('/')} className={styles.backLink}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        На главную
      </div>

      {/* Баннер */}
      <div className={styles.bannerWrapper}>
        {user.banner ? (
          <img src={user.banner} alt="Баннер" className={styles.bannerImage} />
        ) : (
          <div className={styles.bannerPlaceholder}>
            <p>Ваш баннер</p>
          </div>
        )}
        {isEditing && (
          <button onClick={() => bannerInputRef.current.click()} className={styles.bannerEditButton}>
            Изменить
          </button>
        )}
        <input
          type="file"
          ref={bannerInputRef}
          className={styles.hiddenInput}
          accept="image/*"
          onChange={() => handleFileUpload('banner')}
        />
      </div>

      <div className={styles.mainContent}>
        {/* Аватар */}
        <div className={styles.avatarWrapper}>
          {user.avatar ? (
            <img src={user.avatar} alt="Аватар" className={styles.avatarImage} />
          ) : (
            <div className={styles.avatarPlaceholder}></div>
          )}
          {isEditing && (
            <button
              onClick={() => avatarInputRef.current?.click()}
              className={styles.avatarEditButton}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5535 2.49392C12.4114 2.33852 12.2106 2.25 12 2.25C11.7894 2.25 11.5886 2.33852 11.4465 2.49392L7.44648 6.86892C7.16698 7.17462 7.18822 7.64902 7.49392 7.92852C7.79963 8.20802 8.27402 8.18678 8.55352 7.88108L11.25 4.9318V16C11.25 16.4142 11.5858 16.75 12 16.75C12.4142 16.75 12.75 16.4142 12.75 16V4.9318L15.4465 7.88108C15.726 8.18678 16.2004 8.20802 16.5061 7.92852C16.8118 7.64902 16.833 7.17462 16.5535 6.86892L12.5535 2.49392Z" fill="white"/>
                <path d="M3.75 15C3.75 14.5858 3.41422 14.25 3 14.25C2.58579 14.25 2.25 14.5858 2.25 15V15.0549C2.24998 16.4225 2.24996 17.5248 2.36652 18.3918C2.48754 19.2919 2.74643 20.0497 3.34835 20.6516C3.95027 21.2536 4.70814 21.5125 5.60825 21.6335C6.47522 21.75 7.57754 21.75 8.94513 21.75H15.0549C16.4225 21.75 17.5248 21.75 18.3918 21.6335C19.2919 21.5125 20.0497 21.2536 20.6517 20.6516C21.2536 20.0497 21.5125 19.2919 21.6335 18.3918C21.75 17.5248 21.75 16.4225 21.75 15.0549V15C21.75 14.5858 21.4142 14.25 21 14.25C20.5858 14.25 20.25 14.5858 20.25 15C20.25 16.4354 20.2484 17.4365 20.1469 18.1919C20.0482 18.9257 19.8678 19.3142 19.591 19.591C19.3142 19.8678 18.9257 20.0482 18.1919 20.1469C17.4365 20.2484 16.4354 20.25 15 20.25H9C7.56459 20.25 6.56347 20.2484 5.80812 20.1469C5.07435 20.0482 4.68577 19.8678 4.40901 19.591C4.13225 19.3142 3.9518 18.9257 3.85315 18.1919C3.75159 17.4365 3.75 16.4354 3.75 15Z" fill="white"/>
              </svg>
            </button>
          )}
          <input
            type="file"
            ref={avatarInputRef}
            className={styles.hiddenInput}
            accept="image/*"
            onChange={() => handleFileUpload('avatar')}
          />
        </div>

        {/* Информация о пользователе */}
        <div className={styles.infoSection}>
          <div className={styles.headerRow}>
            {isEditing ? (
              <input
                value={formData.nickname}
                onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                className={styles.nicknameInput}
                placeholder="Ваш никнейм"
              />
            ) : (
              <h1 className={styles.nicknameDisplay}>{user.nickname || 'Без имени'}</h1>
            )}

            <button
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              className={isEditing ? styles.saveButton : styles.editButton}
            >
              {isEditing ? 'Применить' : '/'}
            </button>
          </div>

          {isEditing ? (
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Расскажите о себе..."
              rows="4"
              className={styles.bioTextarea}
            />
          ) : (
            <p className={styles.bioDisplay}>
              {user.bio || 'Расскажите о себе...'}
            </p>
          )}

          <div className={styles.details}>
            <p><strong>Имя:</strong> {user.first_name || '-'} {user.last_name || ''}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Телефон:</strong> {user.phone || '-'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;