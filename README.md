# EcoTwin AI — Smart Energy Optimization

AI-Powered Digital Twin platform for smart energy optimization. This is a fully standalone, self-hosted web application built with a React/Vite frontend and a Node.js Express + MongoDB backend.

## Architecture

- **Frontend**: React + Vite + Tailwind CSS + Lucide icons + Recharts (under `src/`)
- **Backend**: Express + Mongoose + JWT Auth (under `backend/`)
- **Database**: MongoDB (Local or Atlas)
- **State/Auth**: Local JWT Token Auth (with verification OTP mock)

---

## Prerequisites

Ensure you have the following installed locally:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (running on localhost:27017)

---

## Setup & Execution

### 1. Install Dependencies
Run the following command in the root of the project:
```bash
npm install
```

### 2. Configure Environment Variables
A `.env` file has been created in the root directory:
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/ecotwin
JWT_SECRET=ecotwin_jwt_super_secret_key_2026
NODE_ENV=development
```

### 3. Seed the Database
Before running the application for the first time, populate the MongoDB collections with sample machines, alerts, and default users:
```bash
node backend/seed.js
```
This seeds the following mock credentials:
* **Admin**: `admin@ecotwin.ai` / `admin12345`
* **Operator**: `operator@ecotwin.ai` / `operator12345`

### 4. Run the Development Environment
Launch both the Vite frontend and Express server concurrently:
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

---

## Production Build

To compile and build the frontend assets for production:
```bash
npm run build
```
Production assets are generated in the `dist/` directory, which the Express server is configured to serve automatically when `NODE_ENV=production` is active.

---

## License

MIT
