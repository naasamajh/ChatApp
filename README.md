# IncogniChat — Anonymous Real-Time Chatroom

> **Jump in. Chat freely. Stay anonymous.**
> No signup. No accounts. No history. Just pick a name and start chatting instantly.

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4.8-010101?logo=socketdotio&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![Render](https://img.shields.io/badge/Deploy-Render-46E3B7?logo=render&logoColor=white)

---

## 🏗️ Architecture

This is a **unified full-stack application** — no separate client/server folders. 

- **Express server** (`server.js`) handles API, Socket.IO, and serves the React build
- **React frontend** (`src/client/`) is built by Vite into `/dist`
- **Server logic** (`src/server/`) contains models, controllers, middleware, sockets, utils
- **Single `npm install`** and **single deploy** — optimized for Render

```
ChatApp/
├── server.js                          # Express + Socket.IO + static server
├── package.json                       # Unified dependencies & scripts
├── vite.config.js                     # Vite build config
├── index.html                         # Vite HTML entry
├── .env                               # Environment variables
│
└── src/
    ├── server/                        # Backend logic
    │   ├── models/
    │   │   ├── Admin.js
    │   │   └── Message.js
    │   ├── controllers/
    │   │   └── adminController.js
    │   ├── routes/
    │   │   └── adminRoutes.js
    │   ├── middleware/
    │   │   └── auth.js
    │   ├── socket/
    │   │   └── chatSocket.js
    │   └── utils/
    │       ├── moderator.js
    │       └── nameGenerator.js
    │
    └── client/                        # React frontend
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── components/
        │   └── Logo.jsx
        ├── services/
        │   ├── socket.js
        │   └── api.js
        └── pages/
            ├── Landing.jsx / .css
            ├── Chat.jsx / .css
            ├── AdminLogin.jsx / .css
            └── Admin.jsx / .css
```

---

## ✨ Features

### 🚀 Zero-Friction Chat
- **No signup, no login, no email** — just enter a username and start chatting
- **Random name generator** — one-click anonymous username creation
- **Instant connection** — Socket.IO powered real-time messaging with typing indicators

### 🔒 Privacy First
- **Ephemeral messages** — all chat history is automatically deleted when users disconnect
- **No accounts stored** — users exist only as live socket connections
- **Session-based identity** — usernames vanish when the tab closes

### 🤖 AI-Powered Moderation
- **Groq AI (LLaMA 3.3 70B)** — real-time content analysis for every message
- **Fallback profanity filter** — keyword-based filtering when AI is unavailable
- **Transparent warnings** — users are notified when their message is flagged

### 👑 Admin Dashboard
- **Real-time stats** — online users, total messages, flagged content, hourly activity
- **User management** — kick active users, ban usernames, view live connections
- **Integrated analytics** — bar charts, donut charts, area charts, top chatters
- **Message clearing** — wipe all messages with one click

### 💎 Premium UI/UX
- **3D effects** — tilt cards, perspective transforms, orbiting rings
- **Aurora background** — animated gradient orbs with mouse-reactive parallax
- **Framer Motion** animations — scroll-driven effects, word-by-word text reveal
- **Dark glassmorphism** design with purple accent gradients
- **Fully responsive** — desktop, tablet, and mobile

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **MongoDB Atlas** account (or local MongoDB)
- **Groq API key** ([console.groq.com](https://console.groq.com)) — optional

### 1. Install Dependencies

```bash
cd ChatApp
npm install
```

### 2. Configure Environment

Create `.env` in the root:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI="your_mongodb_connection_string"
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# Groq AI (optional — uses fallback filter if not set)
GROQ_API_KEY=your_groq_api_key

# Default admin credentials
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=YourSecurePassword
```

### 3. Run Development

```bash
npm run dev
```

This starts both the Express server (port 5000) and Vite dev server (port 5173) concurrently.

- **Chat:** [http://localhost:5173](http://localhost:5173)
- **Admin:** [http://localhost:5173/admin-login](http://localhost:5173/admin-login)

---

## 🌐 Deploy to Render

### Manual Deployment Guide

1. Push this repo to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com) → **New → Web Service**
3. Connect your repo
4. Configure:
   - **Build Command:** `npm run render-build`
   - **Start Command:** `npm start`
   - **Environment:** `Node`
5. Add environment variables:
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = your MongoDB Atlas connection string
   - `JWT_SECRET` = your secret key
   - `JWT_EXPIRES_IN` = `7d`
   - `GROQ_API_KEY` = your Groq API key
   - `ADMIN_EMAIL` = admin email
   - `ADMIN_PASSWORD` = admin password

### How It Works on Render

1. **Build:** `npm install` → `vite build` (outputs React to `/dist`)
2. **Start:** `node server.js` (Express serves `/dist` + API + Socket.IO)
3. **Single port** — everything runs on Render's assigned `PORT`

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, Vite 6, Framer Motion 11, React Router 7 |
| **Styling** | Vanilla CSS (custom design system with CSS variables) |
| **Real-time** | Socket.IO 4.8 (WebSocket + polling fallback) |
| **Backend** | Node.js, Express 4, Helmet, CORS, Rate Limiting |
| **Database** | MongoDB Atlas (Mongoose ODM) |
| **AI Moderation** | Groq SDK (LLaMA 3.3 70B Versatile) |
| **Auth** | JWT (admin-only) |
| **Deploy** | Render (Web Service) |

---

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">
  <strong>IncogniChat</strong> — Chat anonymously, safely, and freely.<br>
  Built with ❤️ using React, Node.js, Socket.IO, Framer Motion & Groq AI
</p>
