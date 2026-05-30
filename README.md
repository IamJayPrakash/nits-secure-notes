# 🔐 NITS Secure Notes

A secure, full-stack notes application built with **Next.js** (frontend) and **Express.js** (backend) featuring client-side AES encryption and JWT refresh token rotation.

---

## ⚙️ Prerequisites

- **Node.js** v18+
- **MongoDB** (Local or MongoDB Atlas cluster)

---

## 🚀 Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/IamJayPrakash/nits-secure-notes.git
cd nitsAssessment
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env.local` file inside `backend/`:
```env
PORT=5000
MONGO_URI=your_mongodb_uri_here
JWT_SECRET=your_super_secret_access_key
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_SECRET=your_super_secret_refresh_key
REFRESH_TOKEN_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
```

Start the backend:
```bash
npm run dev
```

---

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create a `.env.local` file inside `frontend/`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_ENCRYPTION_KEY=your_client_aes_key
```

Start the frontend:
```bash
npm run dev
```

---

## 🔒 Core Features

- **Client-Side AES Encryption**: Notes are encrypted on the client using `crypto-js` before being sent to the DB.
- **JWT Refresh Rotation**: Auto-rotating access tokens and database-backed refresh tokens.
- **Input Sanitization & Security**: Protection against XSS (`helmet`) and NoSQL injection (`express-mongo-sanitize`).
- **Postman Collection**: Included in the root (`Secure-Notes-App.postman_collection.json`).
