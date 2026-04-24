# 💰 Keuangan Smart - Fintech Super App

Aplikasi manajemen keuangan personal dengan fitur expense tracking, currency converter, dan AI analysis.

## ✨ Fitur Utama

- 📊 **Dashboard Keuangan** - Lihat saldo dan status pengeluaran
- 💸 **Expense Tracker** - Catat pengeluaran harian
- 💱 **Currency Converter** - Konversi IDR ↔ USD ↔ EUR
- 📈 **Grafik Statistik** - Visualisasi pengeluaran
- 🤖 **AI Analysis** - Saran pengeluaran cerdas
- 🌙 **Dark/Light Mode** - Tema gelap dan terang
- 🏦 **Multi Account** - Kelola beberapa rekening

## 🚀 Instalasi Cepat

### Prerequisites
- Node.js (v14+)
- Python (v3.8+) - opsional untuk AI backend
- npm atau yarn

### Setup

```bash
# 1. Clone atau download repository
cd keuangan-smart

# 2. Install dependencies
npm install

# 3. Jalankan server
npm start

# Server akan berjalan di http://localhost:3000
```

### Buka Aplikasi

1. Buka `keuindex.html` di browser Anda
2. Atau akses melalui `http://localhost:3000/keuindex.html`

## 📝 Penggunaan

### Register
1. Buka aplikasi
2. Masukkan username dan password baru
3. Klik "Submit" untuk mendaftar

### Login
1. Masukkan username dan password
2. Klik "Submit"

### Tambah Pengeluaran
1. Masukkan jumlah pengeluaran di "Pengeluaran"
2. Klik "Tambah"
3. Saldo akan terupdate otomatis

### Cek Status
- **Hemat** 🟢 - Pengeluaran < 2.000.000
- **Normal** 🟡 - Pengeluaran 2.000.000 - 5.000.000
- **Boros** 🔴 - Pengeluaran > 5.000.000

## 📂 Struktur File

```
keuangan-smart/
├── server.js              # Backend Express.js
├── ai.py                  # Backend Python AI (opsional)
├── keuindex.html          # Frontend utama
├── keu2index.html         # Frontend alternatif
├── 3index.html            # Versi test
├── package.json           # Node.js dependencies
├── requirements.txt       # Python dependencies
├── README.md              # Dokumentasi ini
├── SETUP.md               # Panduan setup detail
├── .gitignore             # Git ignore rules
└── .env.example           # Template environment
```

## 🔧 API Endpoints

### Authentication
- `POST /register` - Register user baru
- `POST /login` - Login dan dapatkan JWT token

### Expense Management
- `POST /expense` - Tambah pengeluaran (requires auth)
- `GET /expense` - Lihat pengeluaran (requires auth)

### Currency
- `GET /rates` - Lihat kurs terbaru

### AI Analysis
- `GET /ai` - Analisis pengeluaran (requires auth)

## 🐍 Python AI Backend (Opsional)

Untuk fitur AI analysis lebih advanced:

```bash
# 1. Install Python dependencies
pip install -r requirements.txt

# 2. Jalankan AI server
python ai.py

# Server akan berjalan di http://localhost:5000
```

## 📊 Teknologi yang Digunakan

### Frontend
- HTML5
- CSS3 (dengan Glassmorphism design)
- Vanilla JavaScript
- Chart.js (untuk grafik)

### Backend
- Node.js & Express.js
- JWT (JSON Web Tokens)
- CORS
- Python & Flask (opsional)
- NumPy (untuk AI analysis)

### API External
- ExchangeRate API (untuk kurs mata uang)

## 🔐 Security Notes

⚠️ **Development Only** - Aplikasi ini masih dalam tahap development:
- Secret key hardcoded (ubah di production)
- Database in-memory (data hilang saat restart)
- Auth sederhana (gunakan proper auth di production)
- Tidak ada encryption untuk password

## 🚧 Untuk Production

1. Gunakan environment variables untuk secrets
2. Setup real database (MongoDB, PostgreSQL, etc)
3. Implementasi proper password hashing (bcrypt)
4. Tambahkan rate limiting
5. Setup HTTPS
6. Implementasi proper error handling
7. Tambahkan logging dan monitoring

## 📝 Contoh .env

```
NODE_ENV=development
PORT=3000
JWT_SECRET=your-secret-key-here
DATABASE_URL=your-database-url
```

## 🤝 Contributing

Contributions welcome! Feel free to:
1. Fork repository
2. Create feature branch
3. Submit pull request

## 📄 License

MIT License - Feel free to use this project!

## 🆘 Troubleshooting

### Port 3000 sudah digunakan
```bash
# Edit server.js dan ubah port
app.listen(3001,()=>console.log("Server running on 3001"));
```

### Dependencies tidak terinstall
```bash
# Hapus node_modules dan install ulang
rm -rf node_modules
npm install
```

### Frontend tidak bisa connect ke backend
- Pastikan server.js sudah running
- Check CORS settings di server.js
- Buka browser console untuk error details

## 📞 Support

Buat issue di GitHub untuk pertanyaan atau bug reports.

---

**Happy Coding! 🚀**
