import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IMaskInput } from "react-imask";
import { enqueueSnackbar } from "notistack";
import api from "../api";
import styles from './Registration.module.css';

function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    nickname: "",
    first_name: "",
    last_name: "",
    patronymic: "",
    gender: "N",
    email: "",
    phone: "",
    password: "",
    agreePrivacy: false,
    agreeProcessing: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [docModal, setDocModal] = useState({
    open: false,
    title: "",
    text: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const openDocModal = (title, text) => {
    setDocModal({ open: true, title, text });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreePrivacy || !formData.agreeProcessing) {
      enqueueSnackbar("Необходимо принять все соглашения", {
        variant: "warning",
      });
      return;
    }

    try {
      await api.post("register/", formData);
      enqueueSnackbar("Регистрация успешна!", { variant: "success" });
      navigate("/login");
    } catch (err) {
      if (err.response?.data) {
        setErrors(err.response.data);
        setTouched(
          Object.keys(err.response.data).reduce(
            (acc, key) => ({ ...acc, [key]: true }),
            {}
          )
        );
        enqueueSnackbar("Исправьте ошибки в форме", { variant: "error" });
      }
    }
  };

  const getFieldError = (field) => {
    return errors[field]
      ? Array.isArray(errors[field])
        ? errors[field][0]
        : errors[field]
      : null;
  };

  const getInputClass = (field) =>
    touched[field] && getFieldError(field)
      ? `${styles.baseInput} ${styles.errorInput}`
      : styles.baseInput;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Регистрация</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Логин */}
        <div>
          <input
            name="username"
            placeholder="Логин (от 3 символов)"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClass("username")}
          />
          {touched.username && getFieldError("username") && (
            <p className={styles.errorText}>Ошибка: {getFieldError("username")}</p>
          )}
        </div>

        {/* Никнейм */}
        <div>
          <input
            name="nickname"
            placeholder="Никнейм"
            value={formData.nickname}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClass("nickname")}
          />
          {touched.nickname && getFieldError("nickname") && (
            <p className={styles.errorText}>Ошибка: {getFieldError("nickname")}</p>
          )}
        </div>

        {/* ФИО */}
        <div className={styles.nameGrid}>
          <div>
            <input
              name="last_name"
              placeholder="Фамилия"
              value={formData.last_name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass("last_name")}
            />
          </div>
          <div>
            <input
              name="first_name"
              placeholder="Имя"
              value={formData.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass("first_name")}
            />
          </div>
          <div>
            <input
              name="patronymic"
              placeholder="Отчество (необ.)"
              value={formData.patronymic}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass("patronymic")}
            />
          </div>
        </div>

        {/* Пол */}
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="N">Пол не указан</option>
          <option value="M">Мужской</option>
          <option value="F">Женский</option>
        </select>

        {/* Email */}
        <div>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClass("email")}
          />
          {touched.email && getFieldError("email") && (
            <p className={styles.errorText}>Ошибка: {getFieldError("email")}</p>
          )}
        </div>

        {/* Телефон */}
        <div>
          <IMaskInput
            mask="+7 (000) 000-00-00"
            name="phone"
            placeholder="Телефон"
            value={formData.phone}
            onAccept={(value) => {
              setFormData((prev) => ({ ...prev, phone: value }));
              setTouched((prev) => ({ ...prev, phone: true }));
            }}
            onBlur={() => setTouched((prev) => ({ ...prev, phone: true }))}
            className={getInputClass("phone")}
          />
          {touched.phone && getFieldError("phone") && (
            <p className={styles.errorText}>Ошибка: {getFieldError("phone")}</p>
          )}
        </div>

        {/* Пароль */}
        <div>
          <input
            name="password"
            type="password"
            placeholder="Пароль (мин. 6 символов)"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClass("password")}
          />
          {touched.password && getFieldError("password") && (
            <p className={styles.errorText}>Ошибка: {getFieldError("password")}</p>
          )}
        </div>

        {/* Чекбоксы */}
        <div className={styles.agreements}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="agreePrivacy"
              checked={formData.agreePrivacy}
              onChange={handleChange}
            />
            <span className={styles.checkboxText}>
              Я принимаю{" "}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  openDocModal("Политика конфиденциальности", "Текст политики конфиденциальности...");
                }}
                className={styles.link}
              >
                Политику конфиденциальности
              </span>
            </span>
          </label>

          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="agreeProcessing"
              checked={formData.agreeProcessing}
              onChange={handleChange}
            />
            <span className={styles.checkboxText}>
              Я даю{" "}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  openDocModal("Согласие на обработку ПД", "Текст согласия на обработку персональных данных...");
                }}
                className={styles.link}
              >
                согласие на обработку персональных данных
              </span>
            </span>
          </label>
        </div>

        <button type="submit" className={styles.submitButton}>
          Зарегистрироваться
        </button>
      </form>

      <p className={styles.loginLink}>
        Уже есть аккаунт?{" "}
        <Link to="/login" className={styles.linkBold}>
          Войти
        </Link>
      </p>

      {/* Модалка */}
      {docModal.open && (
        <div className={styles.modalOverlay} onClick={() => setDocModal({ open: false })}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>{docModal.title}</h2>
            <div style={{ color: "#333", lineHeight: "1.7", whiteSpace: "pre-wrap" }}>
              {docModal.text}
            </div>
            <button
              onClick={() => setDocModal({ open: false })}
              className={styles.modalCloseBtn}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Registration;