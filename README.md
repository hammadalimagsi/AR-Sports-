# AR Sports Islamabad — Premium Sports Store 🏏⚽🏸

A responsive **React + Vite** e-commerce frontend for a premium sports equipment and custom sportswear store based in Islamabad / Rawalpindi.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/sports-store)

---

## ✨ Features

- 🏠 Home page with animated hero banner
- 🏷️ Sports category mega-menu (Cricket, Football, Badminton, Basketball, Volleyball)
- 🔍 Product search, filtering and sorting
- 📦 Product listing & detail pages
- 🎽 Custom jersey designer (name, number, size, colour, logo)
- 🛒 Shopping cart (React state + `localStorage`)
- 📲 WhatsApp ordering with pre-filled message
- 🌙 Dark / Light theme toggle
- 📱 Fully responsive (mobile, tablet, desktop)

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS v3 |
| 3D Rendering | Three.js, React Three Fiber, Drei |
| Icons | Lucide React |
| Deployment | Vercel |

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/sports-store.git
cd sports-store

# Install dependencies
npm --prefix client install

# Start development server
npm run dev
# → http://localhost:5173
```

## 🏗️ Build for Production

```bash
npm run build
# Output: client/dist/
```

## 📁 Project Structure

```
sports-store/
├── client/                 # Vite + React app
│   ├── public/
│   │   └── assets/         # Images, 3D models, branding
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── context/        # Cart & Theme context
│   │   ├── data/           # Product catalogue (sample data)
│   │   └── App.jsx
│   ├── vite.config.js
│   └── package.json
├── client-info/            # Business profile (not deployed)
├── docs/                   # Project documentation
├── vercel.json             # Vercel deployment config
└── .github/workflows/      # GitHub Actions CI/CD
```

## ☁️ Deploying to Vercel

### Option A — One-Click (recommended)
Click the **Deploy with Vercel** button at the top of this README.

### Option B — Vercel CLI
```bash
npm i -g vercel
vercel
```

### Option C — GitHub Actions (automatic)
1. Push this repo to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects `vercel.json` and deploys on every push to `main`

## 🔧 Configuration

All configurable values live in `client/src/data/` (products, business info, WhatsApp number).
See [`client-info/`](./client-info/) for the business profile template.

## ⚠️ Disclaimer

This is a **frontend-only** project. No backend, database or real payment processing is included. WhatsApp ordering requires the customer to press **Send** manually.

---

*Built with ❤️ for AR Sports Islamabad*
