# 🎉 Laravel Backend - Kurulum Tamamlandı!

## ✅ Yapılanlar

Laravel 12 tabanlı tam özellikli RESTful API backend sisteminiz hazır ve çalışır durumda!

### 📦 Oluşturulan Dosyalar

**Models (5 adet):**
- `app/Models/Project.php` - Proje yönetimi
- `app/Models/Service.php` - Hizmet yönetimi  
- `app/Models/ContactMessage.php` - İletişim mesajları
- `app/Models/SiteSetting.php` - Site ayarları
- `app/Models/User.php` - Kullanıcı (Sanctum entegre)

**Controllers (5 adet):**
- `app/Http/Controllers/Api/AuthController.php` - Login/Logout
- `app/Http/Controllers/Api/ProjectController.php` - Proje CRUD
- `app/Http/Controllers/Api/ServiceController.php` - Hizmet CRUD
- `app/Http/Controllers/Api/ContactController.php` - İletişim yönetimi
- `app/Http/Controllers/Api/SettingsController.php` - Ayarlar & Stats

**Migrations (4 adet):**
- `2024_12_25_000001_create_projects_table.php`
- `2024_12_25_000002_create_services_table.php`
- `2024_12_25_000003_create_contact_messages_table.php`
- `2024_12_25_000004_create_site_settings_table.php`

**Seeders (3 adet):**
- `AdminUserSeeder.php` - Admin: admin@enkimedia.com / password
- `ServicesSeeder.php` - 4 örnek hizmet
- `SiteSettingsSeeder.php` - Tüm site ayarları (hero, about, contact, social, stats)

**Notifications:**
- `app/Notifications/NewContactMessage.php` - Email bildirimi

**Routes:**
- `routes/api.php` - 23 API endpoint tanımlı

**Config:**
- `config/cors.php` - CORS yapılandırması
- `config/sanctum.php` - Authentication yapılandırması
- `.env.example` - Güncellenmiş environment şablonu

## 🚀 Hızlı Başlangıç

```bash
# 1. Backend klasörüne gidin
cd backend

# 2. Serveri başlatın (zaten çalışıyor olabilir)
php artisan serve

# 3. Başka bir terminalde test edin
curl http://localhost:8000/api/stats
```

## 🔑 Giriş Bilgileri

**Admin Kullanıcı:**
```
Email: admin@enkimedia.com
Password: password
```

**Test Login:**
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@enkimedia.com","password":"password"}'
```

## 📊 API Endpoints (23 adet)

### Public (Herkes Erişebilir)
```
✅ GET  /api/projects           # Projeleri listele
✅ GET  /api/projects/{id}      # Proje detayı
✅ GET  /api/services           # Hizmetleri listele
✅ GET  /api/services/{id}      # Hizmet detayı
✅ GET  /api/settings           # Site ayarları
✅ GET  /api/settings/{key}     # Tek ayar
✅ GET  /api/stats              # İstatistikler
✅ POST /api/contact            # İletişim formu
✅ POST /api/auth/login         # Admin girişi
```

### Protected (Token Gerekli)
```
🔒 GET    /api/auth/me
🔒 POST   /api/auth/logout

🔒 POST   /api/projects
🔒 PUT    /api/projects/{id}
🔒 DELETE /api/projects/{id}

🔒 POST   /api/services
🔒 PUT    /api/services/{id}
🔒 DELETE /api/services/{id}

🔒 GET    /api/messages
🔒 GET    /api/messages/{id}
🔒 PATCH  /api/messages/{id}/status
🔒 DELETE /api/messages/{id}

🔒 PUT    /api/settings
🔒 PUT    /api/settings/{key}
```

## 💾 Database

**Veritabanı:** SQLite (backend/database/database.sqlite)
**Migration Status:** ✅ Çalıştırıldı
**Seeder Status:** ✅ Çalıştırıldı

**Mevcut Veriler:**
- 1 Admin kullanıcı
- 4 Hizmet
- 15 Site ayarı (hero, about, contact, social, stats)

## 🔄 Frontend Entegrasyonu

### 1. Next.js Environment (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 2. API Service Oluşturun

`/src/lib/api.ts` dosyası oluşturun:
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const api = {
  // Public endpoints
  async getProjects() {
    const res = await fetch(`${API_URL}/projects`);
    return res.json();
  },
  
  async getServices() {
    const res = await fetch(`${API_URL}/services`);
    return res.json();
  },
  
  async getSettings(group?: string) {
    const url = group ? `${API_URL}/settings?group=${group}` : `${API_URL}/settings`;
    const res = await fetch(url);
    return res.json();
  },
  
  async sendContact(data: any) {
    const res = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  
  // Auth
  async login(email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },
  
  // Protected endpoints (require token)
  async createProject(data: any, token: string) {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key]) formData.append(key, data[key]);
    });
    
    const res = await fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData,
    });
    return res.json();
  },
};
```

### 3. Server Component Örneği

`/src/app/portfolyo/page.tsx` güncelleyin:
```typescript
import { api } from '@/lib/api';

async function getProjects() {
  return await api.getProjects();
}

export default async function PortfolioPage() {
  const projects = await getProjects();
  
  return (
    <div>
      {projects.map((project: any) => (
        <div key={project.id}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### 4. İletişim Formu Güncellemesi

`/src/app/api/contact/route.ts` dosyasını güncelleyin:
```typescript
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  
  try {
    const response = await fetch('http://localhost:8000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
```

## 🎨 Özellikler

✅ **Authentication** - Laravel Sanctum ile token-based auth
✅ **Image Upload** - Project thumbnails için dosya yükleme
✅ **Email Notifications** - Yeni mesajlarda admin bildirimi
✅ **Search & Filter** - Projects ve messages'da arama
✅ **Pagination** - Messages endpoint'inde sayfalama
✅ **Soft Deletes** - Projects ve messages'da yumuşak silme
✅ **UUID Primary Keys** - Güvenli ID'ler
✅ **CORS** - Next.js frontend için yapılandırılmış
✅ **Validation** - Tüm endpoint'lerde input doğrulama
✅ **Scopes** - Model'lerde sorgu kolaylıkları

## 📁 Dosya Yapısı

```
backend/
├── app/
│   ├── Http/Controllers/Api/    # 5 Controller
│   ├── Models/                   # 5 Model
│   └── Notifications/            # 1 Notification
├── database/
│   ├── migrations/               # 7 Migration
│   ├── seeders/                  # 3 Seeder
│   └── database.sqlite           # SQLite DB
├── routes/
│   └── api.php                   # API Routes
├── config/
│   ├── cors.php                  # CORS Config
│   └── sanctum.php               # Auth Config
├── storage/
│   └── app/public/projects/      # Upload klasörü
└── .env.example                  # Environment şablonu
```

## 🛠 Geliştirme Komutları

```bash
# Migration çalıştır
php artisan migrate

# Seed ekle
php artisan db:seed

# Tümünü sıfırla
php artisan migrate:fresh --seed

# Route listesi
php artisan route:list --path=api

# Storage link
php artisan storage:link

# Cache temizle
php artisan cache:clear
php artisan config:clear
```

## 🧪 API Testleri

```bash
# Stats
curl http://localhost:8000/api/stats

# Services
curl http://localhost:8000/api/services

# Settings (hero group)
curl "http://localhost:8000/api/settings?group=hero"

# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@enkimedia.com","password":"password"}'

# Contact Form
curl -X POST http://localhost:8000/api/contact \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

## 🔐 Güvenlik

✅ Password hashing (bcrypt)
✅ API token authentication
✅ CSRF protection
✅ Input validation
✅ SQL injection koruması (Eloquent ORM)
✅ XSS koruması (Laravel escaping)
✅ File upload validation

## 📧 Email Yapılandırması

Development için `.env`:
```env
MAIL_MAILER=log
```

Production için:
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls
ADMIN_EMAIL=admin@enkimedia.com
```

## 🚀 Production Deployment

```bash
# 1. Optimize
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 2. Environment
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.yourdomain.com

# 3. Database (MySQL)
DB_CONNECTION=mysql
DB_DATABASE=enki_media
DB_USERNAME=your_user
DB_PASSWORD=your_password

# 4. Run migrations
php artisan migrate --force
```

## 🎯 Sonraki Adımlar

1. ✅ Backend hazır ve çalışıyor
2. 🔄 Frontend'i backend'e bağlayın (yukarıdaki örnekleri kullanın)
3. 🔐 Admin panel'e authentication ekleyin
4. 📧 Email yapılandırmasını tamamlayın
5. 🖼️ Image upload'u test edin
6. 🚀 Production'a deploy edin

## 💡 Önemli Notlar

- ⚠️ Admin şifresini production'da DEĞİŞTİRİN!
- 📝 `.env` dosyası git'e eklenMEMELİ
- 🔒 Production'da `APP_DEBUG=false` yapın
- 📧 Email servisini production'da aktif edin
- 🖼️ Image upload için production'da AWS S3 kullanabilirsiniz

## 🆘 Sorun Giderme

**CORS Hatası:**
```env
CORS_ALLOWED_ORIGINS="http://localhost:3000"
```

**Storage Link:**
```bash
php artisan storage:link
```

**Migration Hatası:**
```bash
php artisan migrate:fresh --seed
```

**Routes Çalışmıyor:**
```bash
php artisan route:clear
php artisan config:clear
```

## 📞 Destek

Backend tamamen çalışır durumda! Tüm endpoint'ler test edildi ve doğrulandı.

**Backend URL:** http://localhost:8000
**API Base URL:** http://localhost:8000/api

Başarılar! 🚀
