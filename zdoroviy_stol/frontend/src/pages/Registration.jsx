import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IMaskInput } from "react-imask";
import { enqueueSnackbar } from "notistack";
import api from "../api";

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

  const getInputStyle = (field) =>
    touched[field] && getFieldError(field)
      ? styles.errorInput
      : styles.baseInput;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Регистрация</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Логин */}
        <div>
          <input
            name="username"
            placeholder="Логин (от 3 символов)"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            style={getInputStyle("username")}
          />
          {touched.username && getFieldError("username") && (
            <p style={styles.errorText}>Ошибка: {getFieldError("username")}</p>
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
            style={getInputStyle("nickname")}
          />
          {touched.nickname && getFieldError("nickname") && (
            <p style={styles.errorText}>Ошибка: {getFieldError("nickname")}</p>
          )}
        </div>

        {/* ФИО */}
        <div style={styles.nameGrid}>
          <div>
            <input
              name="last_name"
              placeholder="Фамилия"
              value={formData.last_name}
              onChange={handleChange}
              onBlur={handleBlur}
              style={getInputStyle("last_name")}
            />
          </div>
          <div>
            <input
              name="first_name"
              placeholder="Имя"
              value={formData.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
              style={getInputStyle("first_name")}
            />
          </div>
          <div>
            <input
              name="patronymic"
              placeholder="Отчество (необ.)"
              value={formData.patronymic}
              onChange={handleChange}
              onBlur={handleBlur}
              style={getInputStyle("patronymic")}
            />
          </div>
        </div>

        {/* Пол */}
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          style={styles.select}
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
            style={getInputStyle("email")}
          />
          {touched.email && getFieldError("email") && (
            <p style={styles.errorText}>Ошибка: {getFieldError("email")}</p>
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
            style={getInputStyle("phone")}
          />
          {touched.phone && getFieldError("phone") && (
            <p style={styles.errorText}>Ошибка: {getFieldError("phone")}</p>
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
            style={getInputStyle("password")}
          />
          {touched.password && getFieldError("password") && (
            <p style={styles.errorText}>Ошибка: {getFieldError("password")}</p>
          )}
        </div>

        {/* Чекбоксы */}
        <div style={styles.agreements}>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="agreePrivacy"
              checked={formData.agreePrivacy}
              onChange={handleChange}
            />
            <span style={styles.checkboxText}>
              Я принимаю{" "}
              <span
                onClick={() =>
                  openDocModal("Политика конфиденциальности", "Текст...")
                }
                style={styles.link}
              >
                Политику конфиденциальности
              </span>
            </span>
          </label>

          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="agreeProcessing"
              checked={formData.agreeProcessing}
              onChange={handleChange}
            />
            <span style={styles.checkboxText}>
              Я даю{" "}
              <span
                onClick={() =>
                  openDocModal("Согласие на обработку ПД", "Текст...")
                }
                style={styles.link}
              >
                согласие на обработку персональных данных
              </span>
            </span>
          </label>
        </div>

        <button type="submit" style={styles.submitButton}>
          Зарегистрироваться
        </button>
      </form>

      <p style={styles.loginLink}>
        Уже есть аккаунт?{" "}
        <Link to="/login" style={styles.linkBold}>
          Войти
        </Link>
      </p>

      {/* Модалка */}
      {docModal.open && (
        <div
          style={styles.modalOverlay}
          onClick={() => setDocModal({ open: false })}
        >
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>{docModal.title}</h2>
            <div
              style={{
                color: "#333",
                lineHeight: "1.7",
                whiteSpace: "pre-wrap",
              }}
            >
              {docModal.text}
            </div>
            <button
              onClick={() => setDocModal({ open: false })}
              style={styles.modalCloseBtn}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "620px",
    margin: "50px auto",
    padding: "40px",
    background: "#fff",
    borderRadius: "20px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    color: "#1a1a1a",
    marginBottom: "35px",
    fontSize: "28px",
    fontWeight: "600",
  },
  form: { display: "grid", gap: "20px" },

  baseInput: {
    width: "100%",
    padding: "14px 16px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "1px solid #999",
    backgroundColor: "#fff",
    color: "#1a1a1a",
    boxSizing: "border-box",
    transition: "all 0.2s ease",
  },
  errorInput: {
    width: "100%",
    padding: "14px 16px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "2px solid #e74c3c",
    backgroundColor: "#fdf2f2",
    color: "#1a1a1a",
    boxSizing: "border-box",
  },
  select: {
    width: "100%",
    padding: "14px 16px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "1px solid #999",
    backgroundColor: "#fff",
    color: "#1a1a1a",
    height: "50px",
    cursor: "pointer",
  },
  errorText: {
    color: "#e74c3c",
    fontSize: "14px",
    margin: "6px 0 0",
    fontWeight: "500",
  },
  nameGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "12px",
  },

  agreements: {
    padding: "20px",
    background: "#f8fff8",
    borderRadius: "12px",
    border: "1px solid #c8e6c9",
  },
  checkboxLabel: {
    display: "flex",
    gap: "10px",
    fontSize: "14.5px",
    marginBottom: "14px",
    alignItems: "flex-start",
    cursor: "pointer",
  },
  checkboxText: {
    color: "#1a1a1a", // ← теперь текст тёмный и отлично видно!
    lineHeight: "1.5",
  },
  link: { color: "#2e7d32", textDecoration: "underline", cursor: "pointer" },
  linkBold: { color: "#2e7d32", fontWeight: "bold" },

  submitButton: {
    padding: "16px",
    background: "#2e7d32",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    height: "56px",
  },
  loginLink: {
    textAlign: "center",
    marginTop: "25px",
    color: "#555",
    fontSize: "15px",
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  modalContent: {
    background: "white",
    padding: "35px",
    borderRadius: "16px",
    maxWidth: "600px",
    maxHeight: "80vh",
    overflow: "auto",
  },
  modalTitle: { color: "#1a1a1a", margin: "0 0 20px 0", fontSize: "24px" },
  modalCloseBtn: {
    marginTop: "25px",
    padding: "10px 30px",
    background: "#2e7d32",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Registration;
