# Здоровый стол — Backend

Backend новостного портала о здоровом питании «Здоровый стол».  
Реализован на Django + Django REST Framework с JWT-аутентификацией.

## Требования

- **Python 3.13.5**

## Зависимости

Все зависимости указаны в `requirements.txt`. Ключевые пакеты:

- **Django 5.2.3** — основной фреймворк.
- **djangorestframework 3.16.1** — REST API.
- **djangorestframework-simplejwt 5.5.1** — JWT-аутентификация (access 60 мин, refresh 1 день, rotate tokens).
- **django-unfold 0.73.1** — кастомная современная админ-панель.
- **django-ckeditor 6.7.3** — богатый редактор для полного текста статей с загрузкой изображений.
- **django-cors-headers 4.9.0** — поддержка CORS для frontend на порту 5173.
- **Pillow 11.3.0** — обработка изображений.

## Структура проекта
backend/
├── accounts/                   
│   ├── admin.py
│   ├── apps.py
│   ├── models.py               
│   ├── serializers.py          
│   ├── views.py                
│   ├── urls.py                 
│   └── __init__.py
├── articles/                   
│   ├── admin.py
│   ├── apps.py
│   ├── models.py               
│   ├── serializers.py          
│   ├── views.py                
│   ├── urls.py
│   └── __init__.py
├── media/                      
│   ├── articles/               
│   ├── avatars/                
│   ├── banners/                
│   ├── icons/                  
│   ├── page_about/             
│   └── page_main/              
├── backend/                    
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py             
│   ├── urls.py                 
│   └── wsgi.py
├── manage.py
├── requirements.txt            
└── db.sqlite3                  

## Основной функционал

### Аутентификация и пользователи
- **Регистрация** (`POST /api/register/`):  
  Полная валидация (логин латиницей ≥3 симв., никнейм ≤50, имя/фамилия/отчество кириллицей, пол, email, телефон +7, пароль ≥6). Проверка уникальности. Успешный ответ: сообщение + никнейм.

- **Вход** (`POST /api/login/`):  
  По логину и паролю. При успехе выдаются **JWT-токены**:  
  - `access` (60 минут) — для авторизованных запросов  
  - `refresh` (1 день) — для обновления access-токена (с ротацией)  
  + данные пользователя (id, nickname).

- **Профиль** (`GET/PATCH /api/profile/`):  
  Требует действующий access-токен.  
  GET — все данные пользователя (с URL аватара/баннера).  
  PATCH — редактирование nickname, bio, загрузка avatar/banner.

### Статьи и новости
- **Список статей** (`GET /api/articles/` или аналогичный эндпоинт):  
  - Пагинация: 9 статей на странице  
  - Поиск по заголовку, описанию, контенту, тегам  
  - Сортировка по дате, лайкам, просмотрам  
  - Фильтрация по категории (`?category=slug`)  
  - Короткий сериализатор

- **Детальная статья** (`GET /api/articles/<slug>/`):  
  Полный контент, автор, теги, категория.  
  При просмотре — автоматическое увеличение views на 5–50.

- **Категории** (`GET /api/categories/`): список с name и slug.

### Админ-панель
- Кастомизирована через **django-unfold** (русский заголовок "Здоровый стол").
- **CKEditor** с полной панелью инструментов и загрузкой изображений.
- Превью изображений в списке и формах редактирования.

### Дополнительно
- Кастомная модель пользователя (`accounts.User`).
- Поддержка медиафайлов в development (`/media/`).
- CORS настроен для `http://localhost:5173` (Vite).
- Язык интерфейса — русский.

## API эндпоинты

- `POST /api/register/` — регистрация
- `POST /api/login/` — вход (возврат access + refresh токенов)
- `GET/PATCH /api/profile/` — профиль (требует access-токен)
- `GET /api/categories/` — категории
- `GET /api/articles/` — список статей (пагинация, поиск, сортировка)
- `GET /api/articles/<slug>/` — детальная статья

## Установка и запуск

1. Создайте виртуальное окружение:
   bash
   python -m venv venv
   source venv/bin/activate        # Linux/Mac
   venv\Scripts\activate           # Windows

Установите зависимости:

Bash
pip install -r requirements.txt

Примените миграции:

Bash
python manage.py makemigrations
python manage.py migrate

Создайте суперпользователя:
Bash
python manage.py createsuperuser

Запустите сервер:

Bash
python manage.py runserver

Админ-панель: http://127.0.0.1:8000/admin/
API: http://127.0.0.1:8000/api/