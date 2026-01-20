# README.md (English)

# SOLA-MARKET — MERN E-Commerce Platform

A modern e-commerce platform built with the MERN stack. Includes authentication, an admin dashboard, product management, cart & checkout with Stripe, and multilingual UI (EN/DE).

## Features

### Customer
- Browse products by category
- New Arrivals rail + Featured products
- Add to cart, update quantity, remove items
- Coupon / gift card UI
- Stripe Checkout (test mode ready)
- Responsive UI (desktop/mobile)
- Multilingual UI: English 🇬🇧 / German 🇩🇪 (i18n)

### Admin Dashboard
- Secure admin route (role-based)
- Create / delete products
- Toggle "Featured" products
- Analytics section (structure ready)

### Backend
- REST API with Express + MongoDB (Mongoose)
- JWT authentication + roles (user/admin)
- Cloudinary image upload
- Redis caching (Upstash) for featured products (optional)
- Stripe checkout session creation

---

## Tech Stack

**Frontend**
- React + Vite
- Tailwind CSS
- Zustand (state management)
- React Router
- Axios
- i18next + react-i18next
- Stripe.js (client)
- Framer Motion + Lucide Icons

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT Auth
- Stripe (Checkout Sessions)
- Cloudinary
- Redis (Upstash)

---

## Project Structure

```
root/
backend/
frontend/
package.json
```

Key frontend areas:
- `src/stores/useProductStore.js`  
  Separated states: `newProducts`, `featuredProducts`, `categoryProducts`, `adminProducts`
- `src/locales/en.json` + `src/locales/de.json`

---

## Environment Variables

### Backend (`backend/.env`)
```env
PORT=5000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_JWT_SECRET

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

STRIPE_SECRET_KEY=sk_test_...

UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...

CLIENT_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
VITE_API_URL=http://localhost:5000/api
```

> Note: Vite env variables must start with `VITE_`.

---

## Install & Run (Local Development)

### 1) Clone

```bash
git clone https://github.com/SOULAIMANEIDBOUFKER/<your-repo>.git
cd <your-repo>
```

### 2) Install dependencies

```bash
npm install
cd backend && npm install
cd ../frontend && npm install
```

### 3) Add environment files

* Create `backend/.env`
* Create `frontend/.env`

### 4) Run both servers

In two terminals:

**Backend**

```bash
cd backend
npm run dev
```

**Frontend**

```bash
cd frontend
npm run dev
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:5000`

---

## Stripe Test Mode

* Use test keys for both backend + frontend:

  * Backend: `STRIPE_SECRET_KEY = sk_test_...`
  * Frontend: `VITE_STRIPE_PUBLISHABLE_KEY = pk_test_...`
* For testing payments, use Stripe test cards (e.g. `4242 4242 4242 4242`).

---

## i18n (EN/DE)

Translations are stored in:

* `frontend/src/locales/en.json`
* `frontend/src/locales/de.json`

Rules:

* No hardcoded text in UI
* Use `t("...")` keys (organized like: `home.*`, `cart.*`, `auth.*`, `admin.*`, `common.*`)

---

## Author

Soulaimane Id Boufker

* GitHub: [https://github.com/SOULAIMANEIDBOUFKER](https://github.com/SOULAIMANEIDBOUFKER)
* LinkedIn: [www.linkedin.com/in/soulaimane-id-boufker-92aab92aa](http://www.linkedin.com/in/soulaimane-id-boufker-92aab92aa)
* Email: [soulaimaneidboufker@gmail.com](mailto:soulaimaneidboufker@gmail.com)

---

## License

Provided for portfolio and educational purposes.

---

# README.de.md (Deutsch)

# SOLA-MARKET — MERN E-Commerce Plattform

Eine moderne E-Commerce Plattform mit dem MERN-Stack. Enthält Authentifizierung, Admin-Dashboard, Produktverwaltung, Warenkorb & Stripe-Checkout sowie eine mehrsprachige UI (EN/DE).

## Features

### Kunde
- Produkte nach Kategorie entdecken
- New Arrivals Rail + Featured-Produkte
- In den Warenkorb legen, Menge ändern, entfernen
- Coupon / Gift Card UI
- Stripe Checkout (Testmodus bereit)
- Responsive UI (Desktop/Mobile)
- Mehrsprachig: Englisch 🇬🇧 / Deutsch 🇩🇪 (i18n)

### Admin-Dashboard
- Geschützte Admin-Route (Role-Based)
- Produkte erstellen / löschen
- Featured-Status umschalten
- Analytics-Bereich (Struktur vorbereitet)

### Backend
- REST API mit Express + MongoDB (Mongoose)
- JWT Auth + Rollen (user/admin)
- Cloudinary Image Upload
- Redis Caching (Upstash) für Featured (optional)
- Stripe Checkout Session Erstellung

---

## Tech Stack

**Frontend**
- React + Vite
- Tailwind CSS
- Zustand
- React Router
- Axios
- i18next + react-i18next
- Stripe.js (Client)
- Framer Motion + Lucide Icons

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT Auth
- Stripe (Checkout Sessions)
- Cloudinary
- Redis (Upstash)

---

## Projektstruktur

```
root/
backend/
frontend/
package.json
```

Wichtige Frontend-Bereiche:
- `src/stores/useProductStore.js`  
  Getrennte States: `newProducts`, `featuredProducts`, `categoryProducts`, `adminProducts`
- `src/locales/en.json` + `src/locales/de.json`

---

## Environment Variablen

### Backend (`backend/.env`)
```env
PORT=5000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_JWT_SECRET

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

STRIPE_SECRET_KEY=sk_test_...

UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...

CLIENT_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
VITE_API_URL=http://localhost:5000/api
```

> Hinweis: Vite-Variablen müssen mit `VITE_` starten.

---

## Installation & Start (Lokale Entwicklung)

### 1) Clone

```bash
git clone https://github.com/SOULAIMANEIDBOUFKER/<your-repo>.git
cd <your-repo>
```

### 2) Dependencies installieren

```bash
npm install
cd backend && npm install
cd ../frontend && npm install
```

### 3) Env Dateien erstellen

* `backend/.env`
* `frontend/.env`

### 4) Beide Server starten

In zwei Terminals:

**Backend**

```bash
cd backend
npm run dev
```

**Frontend**

```bash
cd frontend
npm run dev
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:5000`

---

## Stripe Testmodus

* Test Keys in Backend und Frontend:

  * Backend: `STRIPE_SECRET_KEY = sk_test_...`
  * Frontend: `VITE_STRIPE_PUBLISHABLE_KEY = pk_test_...`
* Zum Testen kannst du Stripe Test-Karten nutzen (z.B. `4242 4242 4242 4242`).

---

## i18n (EN/DE)

Übersetzungen:

* `frontend/src/locales/en.json`
* `frontend/src/locales/de.json`

Regeln:

* Keine hardcoded Texte
* Immer `t("...")` verwenden (Keys: `home.*`, `cart.*`, `auth.*`, `admin.*`, `common.*`)

---

## Autor

Soulaimane Id Boufker

* GitHub: [https://github.com/SOULAIMANEIDBOUFKER](https://github.com/SOULAIMANEIDBOUFKER)
* LinkedIn: [www.linkedin.com/in/soulaimane-id-boufker-92aab92aa](http://www.linkedin.com/in/soulaimane-id-boufker-92aab92aa)
* E-Mail: [soulaimaneidboufker@gmail.com](mailto:soulaimaneidboufker@gmail.com)

---




