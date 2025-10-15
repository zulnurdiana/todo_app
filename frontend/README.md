# Todo App - React Frontend

React frontend untuk aplikasi Todo dengan REST API backend.

## 🚀 Fitur

- **Modern React**: Menggunakan React 18 dengan hooks dan context
- **Responsive Design**: Tampilan yang responsif untuk desktop dan mobile
- **State Management**: Context API untuk state management
- **Routing**: React Router untuk navigasi
- **Form Validation**: Validasi form yang komprehensif
- **Error Handling**: Error handling yang user-friendly
- **Loading States**: Indikator loading untuk operasi async
- **Pagination**: Pagination untuk daftar todos
- **Filtering**: Filter todos berdasarkan status

## 📋 Prerequisites

- Node.js (v14 atau lebih baru)
- npm atau yarn

## 🛠️ Instalasi

1. **Install dependencies**

   ```bash
   cd frontend
   npm install
   ```

2. **Setup Environment Variables**

   - Copy file `env.example` menjadi `.env`
   - Edit file `.env` dengan konfigurasi API:
     ```env
     REACT_APP_API_URL=http://localhost:3000/api
     ```

3. **Jalankan aplikasi**

   ```bash
   # Development mode
   npm start

   # Build untuk production
   npm run build
   ```

## 🏗️ Struktur Proyek

```
frontend/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── AuthPage.js
│   │   │   ├── LoginForm.js
│   │   │   └── RegisterForm.js
│   │   ├── common/
│   │   │   └── LoadingSpinner.js
│   │   └── todo/
│   │       ├── Pagination.js
│   │       ├── TodoForm.js
│   │       ├── TodoItem.js
│   │       ├── TodoList.js
│   │       └── TodoPage.js
│   ├── contexts/
│   │   ├── AuthContext.js
│   │   └── TodoContext.js
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🎨 Komponen

### Auth Components

- **AuthPage**: Halaman utama untuk login/register
- **LoginForm**: Form login dengan validasi
- **RegisterForm**: Form register dengan validasi

### Todo Components

- **TodoPage**: Halaman utama untuk manajemen todos
- **TodoList**: Daftar todos dengan pagination
- **TodoItem**: Item todo individual
- **TodoForm**: Form untuk create/edit todo
- **Pagination**: Komponen pagination

### Common Components

- **LoadingSpinner**: Indikator loading

## 🔧 Context

### AuthContext

Mengelola state autentikasi:

- Login/logout
- User data
- Token management
- Error handling

### TodoContext

Mengelola state todos:

- CRUD operations
- Pagination
- Filtering
- Loading states

## 🌐 API Integration

Menggunakan Axios untuk HTTP requests dengan:

- Request/Response interceptors
- Automatic token attachment
- Error handling
- Base URL configuration

## 📱 Responsive Design

- Mobile-first approach
- Flexbox dan CSS Grid
- Breakpoints untuk tablet dan desktop
- Touch-friendly interface

## 🚀 Development

### Scripts

```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App
```

### Development dengan Backend

```bash
# Dari root directory
npm run dev-full   # Jalankan backend dan frontend bersamaan
```

## 🔒 Security

- JWT token storage di localStorage
- Automatic token refresh
- Protected routes
- Input validation dan sanitization

## 📦 Build

Build files akan tersimpan di `build/` directory dan siap untuk deployment.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

