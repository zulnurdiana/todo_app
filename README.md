# Todo App - REST API dengan Express.js dan PostgreSQL

Aplikasi Todo sederhana dengan REST API yang dibangun menggunakan Express.js, PostgreSQL, dan JWT untuk autentikasi. Dilengkapi dengan frontend web yang responsif menggunakan React.js .

## 📚 Penjelasan Konsep

### 1. Apa itu REST API?

REST (Representational State Transfer) API adalah arsitektur web yang menggunakan HTTP methods untuk berkomunikasi antara client dan server. REST API memungkinkan aplikasi untuk berbagi data melalui endpoint.

**Karakteristik REST API:**

- **Stateless**: Setiap request bersifat independen
- **Client-Server**: Pemisahan antara client dan server
- **Uniform Interface**: Menggunakan HTTP methods standar (GET, POST, PUT, DELETE)
- **Resource-based**: Data diakses melalui URL yang mewakili resource

**Contoh endpoint REST API:**

```
GET    /api/todos     - Mengambil semua todos
POST   /api/todos     - Membuat todo baru
PUT    /api/todos/1   - Update todo dengan ID 1
DELETE /api/todos/1   - Hapus todo dengan ID 1
```

### 2. Apa itu CORS dan Bagaimana Cara Menanganinya di Backend?

CORS (Cross-Origin Resource Sharing) adalah mekanisme keamanan browser yang membatasi request HTTP dari domain yang berbeda untuk mengakses sebuah resource REST api.

**Masalah CORS:**

- Browser memblokir request dari `http://localhost:3001` ke `http://localhost:3000`
- Error: "Access to fetch at 'http://localhost:3000/api/todos' from origin 'http://localhost:3001' has been blocked by CORS policy"

**Solusi di Backend:**

```javascript
const cors = require("cors");

// Mengizinkan semua origin
app.use(cors());

// Atau konfigurasi spesifik
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
```

### 3. Perbedaan SQL dan NoSQL Database

| Aspek           | SQL Database                  | NoSQL Database                       |
| --------------- | ----------------------------- | ------------------------------------ |
| **Struktur**    | Tabel dengan kolom dan baris  | Dokumen, key-value, graph            |
| **Schema**      | Fixed schema (struktur tetap) | Flexible schema (struktur fleksibel) |
| **Scalability** | Vertical scaling              | Horizontal scaling                   |
| **Query**       | SQL language                  | Query language spesifik              |
| **Contoh**      | PostgreSQL, MySQL, SQLite     | MongoDB, Redis, Cassandra            |

**Kapan menggunakan SQL:**

- Data terstruktur dan relasional
- Memerlukan ACID compliance
- Query kompleks dengan JOIN

**Kapan menggunakan NoSQL:**

- Data tidak terstruktur
- Skala besar dan distribusi
- Development cepat

### 4. Apa itu Middleware?

Middleware adalah fungsi yang berjalan di antara request dan response dalam aplikasi web. Middleware dapat memodifikasi request, response.

**Jenis Middleware:**

- **Authentication**: Memverifikasi token JWT
- **Validation**: Memvalidasi input data
- **Logging**: Mencatat log request
- **Error Handling**: Menangani error
- **CORS**: Mengatur cross-origin requests

**Contoh Middleware:**

```javascript
// Authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Token required" });
  // Verifikasi token...
  next();
};

// Validation middleware
const validateTodo = (req, res, next) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: "Title required" });
  next();
};
```

## 🚀 Implementasi REST API (Point 5)

Aplikasi ini mengimplementasikan REST API sederhana dengan fitur lengkap sesuai permintaan:

### A. Register dan Login User (JWT)

- **Register**: `POST /api/auth/register` - Membuat akun user baru
- **Login**: `POST /api/auth/login` - Autentikasi user dengan email/password
- **JWT Token**: Token JWT dengan expiry 24 jam untuk session management
- **Password Hashing**: Menggunakan bcryptjs untuk keamanan password

### B. CRUD untuk Tabel Todos

- **Create**: `POST /api/todos` - Membuat todo baru
- **Read**: `GET /api/todos` - Mengambil semua todos (dengan pagination)
- **Read by ID**: `GET /api/todos/:id` - Mengambil todo spesifik
- **Update**: `PUT /api/todos/:id` - Update todo
- **Delete**: `DELETE /api/todos/:id` - Hapus todo
- **Field Lengkap**: id, title, description, is_done, user_id, created_at, updated_at

### C. Authorization (User Isolation)

- **Authentication Middleware**: Semua endpoint `/api/todos` dilindungi JWT
- **User Authorization**: User hanya bisa CRUD todo milik mereka sendiri
- **Database Query**: Selalu include `WHERE user_id = $userId` untuk isolasi data

### D. Database (PostgreSQL)

- **Database**: PostgreSQL dipilih untuk relasi yang proper
- **Schema**: Tabel `users` dan `todos` dengan foreign key relationship
- **ACID Compliance**: Transaksi yang konsisten dan reliable

### E. Framework (Express.js + React)

- **Backend**: Express.js dengan middleware untuk auth, validation, dan CORS
- **Frontend**: React.js dengan Context API untuk state management
- **HTTP Client**: Axios untuk komunikasi dengan API

### F. Tampilan Web

- **Modern UI**: Interface responsif dengan CSS modern
- **Real-time**: Update data secara real-time tanpa refresh
- **User Experience**: Modal forms, loading states, error handling
- **Responsive**: Tampilan optimal untuk desktop dan mobile

## 🚀 Fitur Aplikasi

- **Autentikasi User**: Register dan login dengan JWT
- **CRUD Todos**: Create, Read, Update, Delete todos
- **Authorization**: User hanya bisa mengakses todos miliknya sendiri
- **Database**: PostgreSQL dengan relasi yang proper
- **Frontend**: Interface web yang responsif dan modern
- **Validasi**: Input validation dan error handling
- **Pagination**: Pagination untuk daftar todos
- **Filtering**: Filter todos berdasarkan status (pending/completed)

## 📋 Prerequisites

- Node.js (v14 atau lebih baru)
- PostgreSQL (v12 atau lebih baru)
- npm atau yarn

## 🚀 Quick Start

1. **Clone & Install**

   ```bash
   git clone <repository-url>
   cd nagaexchange
   npm install
   cd frontend && npm install && cd ..
   ```

2. **Setup Database**

   ```bash
   createdb todo_db
   npm run setup-db
   ```

3. **Setup Environment**

   ```bash
   # Buat file .env
   echo 'PORT=3000
   DATABASE_URL="postgresql://postgres:password@localhost:5432/todo_db"
   JWT_SECRET="your_super_secret_jwt_key_here_12345"
   JWT_EXPIRES_IN="24h"
   NODE_ENV=development' > .env
   ```

4. **Jalankan Aplikasi**

   ```bash
   # Terminal 1
   npm start

   # Terminal 2
   cd frontend && npm start
   ```

5. **Akses**: http://localhost:3001

## 🛠️ Cara Menjalankan Aplikasi (Detail)

### 1. Setup Database

```bash
# Buat database PostgreSQL
createdb todo_db

# Atau melalui psql
psql -U postgres
CREATE DATABASE todo_db;
\q
```

### 2. Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 3. Setup Environment Variables

Buat file `.env` di root directory:

```env
PORT=3000
DATABASE_URL="postgresql://postgres:password@localhost:5432/todo_db"
JWT_SECRET="your_super_secret_jwt_key_here_12345"
JWT_EXPIRES_IN="24h"
NODE_ENV=development
```

### 4. Setup Database Schema

```bash
# Jalankan script setup database
npm run setup-db
```

### 5. Jalankan Aplikasi

```bash
# Terminal 1 - Backend
npm start

# Terminal 2 - Frontend
cd frontend
npm start
```

### 6. Akses Aplikasi

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000

## 📚 API Documentation

### Base URL

```
http://localhost:3000/api
```

### Authentication Endpoints

#### POST /api/auth/register

Register user baru

```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "Password123"
}
```

#### POST /api/auth/login

Login user

```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

#### GET /api/auth/profile

Get profile user yang sedang login (memerlukan token)

### Todo Endpoints

Semua endpoint todo memerlukan authentication token.

#### GET /api/todos

Get semua todos user

- Query parameters:
  - `page` (optional): Halaman (default: 1)
  - `limit` (optional): Jumlah item per halaman (default: 10)
  - `is_done` (optional): Filter berdasarkan status (true/false)

#### GET /api/todos/:id

Get todo berdasarkan ID

#### POST /api/todos

Buat todo baru

```json
{
  "title": "Belajar Express.js",
  "description": "Mempelajari framework Node.js",
  "is_done": false
}
```

#### PUT /api/todos/:id

Update todo

```json
{
  "title": "Belajar Express.js - Updated",
  "description": "Mempelajari framework Node.js dengan lebih detail",
  "is_done": true
}
```

#### DELETE /api/todos/:id

Hapus todo

### Headers

Untuk endpoint yang memerlukan authentication, tambahkan header:

```
Authorization: Bearer <your_jwt_token>
```

## 🗄️ Database Schema

### Users Table

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Todos Table

```sql
CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    is_done BOOLEAN DEFAULT FALSE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🎨 Frontend Features

- **Responsive Design**: Tampilan yang responsif untuk desktop dan mobile
- **Real-time Updates**: Interface yang update secara real-time
- **Modal Forms**: Form untuk add/edit todo dalam modal
- **Pagination**: Navigasi halaman untuk daftar todos
- **Filtering**: Filter todos berdasarkan status
- **Loading States**: Indikator loading untuk operasi async
- **Error Handling**: Pesan error yang user-friendly

## 🔧 Development

### Project Structure

```
nagaexchange/
├── config/
│   └── database.js          # Database configuration
├── controllers/
│   ├── authController.js    # Authentication logic
│   └── todoController.js    # Todo CRUD logic
├── database/
│   └── init.sql            # Database schema
├── middleware/
│   ├── auth.js             # JWT authentication
│   └── validation.js       # Input validation
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts
│   │   ├── services/       # API services
│   │   └── App.js         # Main App component
│   ├── public/
│   └── package.json
├── routes/
│   ├── auth.js             # Auth routes
│   └── todos.js            # Todo routes
├── server.js               # Main server file
├── setup-db.js            # Database setup script
├── package.json
└── README.md
```

### Scripts

```bash
# Backend
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run setup-db   # Setup database schema

# Frontend
cd frontend
npm start          # Start React development server
```
