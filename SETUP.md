# 🔧 Panduan Setup Lengkap - Keuangan Smart

## Persyaratan Sistem

### Minimum
- **OS**: Windows, macOS, atau Linux
- **Node.js**: v14 atau lebih baru
- **npm**: v6 atau lebih baru
- **Browser**: Chrome, Firefox, Safari, Edge (modern)

### Optional (untuk AI backend)
- **Python**: v3.8 atau lebih baru
- **pip**: Package manager Python

---

## Step 1: Setup Node.js Backend

### 1.1 Cek instalasi Node.js

```bash
node --version
npm --version
```

Jika belum terinstall, download dari [nodejs.org](https://nodejs.org)

### 1.2 Install Dependencies

```bash
# Masuk ke folder project
cd keuangan-smart

# Install semua dependencies dari package.json
npm install
```

Dependencies yang akan diinstall:
- `express` - Web framework
- `cors` - Cross-Origin Resource Sharing
- `jsonwebtoken` - JWT authentication
- `node-fetch` - HTTP client

### 1.3 Jalankan Server

```bash
npm start
```

Jika sukses, akan muncul:
```
Server running
```

✅ Backend Node.js sudah running di `http://localhost:3000`

---

## Step 2: Buka Frontend di Browser

### Opsi A: Direct File
1. Buka file explorer
2. Navigasi ke folder `keuangan-smart`
3. Double-click file `keuindex.html`
4. Browser akan membuka aplikasi

### Opsi B: Via Server
1. Server Node.js sudah running (Step 1.3)
2. Buka browser
3. Ketik: `http://localhost:3000/keuindex.html`

---

## Step 3 (Optional): Setup Python AI Backend

### 3.1 Cek Python Installation

```bash
python --version
pip --version
```

Jika belum terinstall, download dari [python.org](https://www.python.org)

### 3.2 Install Python Dependencies

```bash
# Buat virtual environment (recommended)
python -m venv venv

# Aktifkan virtual environment

# Windows:
venv\Scripts\activate

# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3.3 Jalankan AI Server

```bash
python ai.py
```

Jika sukses:
```
* Running on http://127.0.0.1:5000
```

✅ Backend Python sudah running di `http://localhost:5000`

---

## Troubleshooting

### ❌ Error: "npm: command not found"

**Solusi**: Node.js belum terinstall atau PATH tidak benar
```bash
# Cek ulang instalasi
which node
which npm

# Atau download ulang dari nodejs.org
```

### ❌ Error: "Port 3000 already in use"

**Solusi 1**: Tutup aplikasi lain yang menggunakan port 3000

**Solusi 2**: Gunakan port berbeda
```bash
# Edit server.js
app.listen(3001,()=>console.log("Server running"));
```

### ❌ Error: "Cannot find module 'express'"

**Solusi**: Dependencies belum terinstall
```bash
npm install
```

### ❌ Frontend tidak bisa connect ke backend

**Cek**:
1. Server running? Cek terminal: "Server running"
2. Port 3000 terbuka? Coba `curl http://localhost:3000`
3. CORS enabled? Cek server.js line 7: `app.use(cors());`
4. Browser console? Buka DevTools (F12) > Console

### ❌ Error: "ModuleNotFoundError: No module named 'flask'"

**Solusi**: Install Python dependencies
```bash
pip install -r requirements.txt
```

---

## Verifikasi Setup

### 1️⃣ Cek Backend Running
```bash
curl http://localhost:3000/rates
```

Harus return JSON dengan exchange rates.

### 2️⃣ Cek Frontend Loading
Buka `http://localhost:3000/keuindex.html` di browser

Harus melihat:
- Login form
- Tombol "Switch Login/Register"
- Input username & password

### 3️⃣ Test Register
1. Masukkan username: `testuser`
2. Masukkan password: `testpass123`
3. Klik "Submit"
4. Harus muncul alert "Register sukses"

### 4️⃣ Test Login
1. Username: `testuser`
2. Password: `testpass123`
3. Klik "Submit"
4. Harus masuk ke dashboard

### 5️⃣ Test Add Expense
1. Di dashboard, masukkan: `1000000`
2. Klik "Tambah"
3. Saldo harus terupdate
4. Status harus jadi "Hemat" (hijau)

---

## Development Tips

### 🔄 Auto-reload Server

Gunakan nodemon untuk auto-restart saat ada perubahan:

```bash
# Install nodemon
npm install --save-dev nodemon

# Edit package.json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}

# Jalankan
npm run dev
```

### 🔍 Debug Mode

```bash
# Jalankan dengan debug logging
DEBUG=* npm start
```

### 📋 Check Logs

Buka browser Developer Tools (F12):
1. Tab "Console" - Lihat JavaScript errors
2. Tab "Network" - Lihat API requests
3. Tab "Application" - Lihat localStorage

---

## Struktur Folder

```
keuangan-smart/
│
├── server.js              # Main backend server
├── ai.py                  # AI analysis backend
│
├── keuindex.html          # Main frontend
├── keu2index.html         # Alternative frontend
├── 3index.html            # Test version
│
├── package.json           # Node.js config
├── requirements.txt       # Python config
│
├── README.md              # Main documentation
├── SETUP.md               # This file
├── .gitignore             # Git ignore rules
├── .env.example           # Environment template
│
├── node_modules/          # Node dependencies (auto-created)
└── venv/                  # Python env (if created)
```

---

## Deployment

### Siap untuk Production?

Baca panduan di README.md bagian "Untuk Production"

### Platform yang Direkomendasikan
- **Backend**: Heroku, Railway, Render, DigitalOcean
- **Frontend**: Netlify, Vercel, GitHub Pages
- **Database**: MongoDB Atlas, Firebase, PostgreSQL

---

## Next Steps

1. ✅ Setup selesai?
2. 📖 Baca [README.md](README.md) untuk dokumentasi lengkap
3. 🚀 Mulai development
4. 🧪 Test semua fitur
5. 📝 Modifikasi sesuai kebutuhan

---

## Support

Kalau ada masalah:
1. Cek troubleshooting di atas
2. Buka DevTools (F12) untuk error details
3. Check terminal logs
4. Buat GitHub issue

**Happy Coding! 🎉**
