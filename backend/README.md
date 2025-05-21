# DigiMedia Backend API

این بک‌اند با FastAPI ساخته شده و از The Movie Database API برای دریافت اطلاعات فیلم‌ها استفاده می‌کند.

## پیش‌نیازها

- Python 3.8 یا بالاتر
- pip (مدیر بسته‌های پایتون)

## نصب و راه‌اندازی

1. ابتدا یک محیط مجازی پایتون ایجاد کنید:
```bash
python -m venv venv
```

2. محیط مجازی را فعال کنید:
- در Windows:
```bash
.\venv\Scripts\activate
```
- در Linux/Mac:
```bash
source venv/bin/activate
```

3. وابستگی‌ها را نصب کنید:
```bash
pip install -r requirements.txt
```

4. فایل `.env` را ویرایش کنید و کلید API خود را از The Movie Database قرار دهید:
```
TMDB_API_KEY=your_api_key_here
```

5. سرور را اجرا کنید:
```bash
python main.py
```

سرور در آدرس `http://localhost:8000` در دسترس خواهد بود.

## API Endpoints

### دریافت فیلم‌های ترند
```
GET /api/movies/trending
```

### دریافت جزئیات یک فیلم خاص
```
GET /api/movies/{movie_id}
```

### جستجوی فیلم‌ها
```
GET /api/movies/search/{query}
```

## مستندات API

برای مشاهده مستندات کامل API، پس از اجرای سرور به آدرس زیر مراجعه کنید:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc` 