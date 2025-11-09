# NALA Automotive 🚗

A modern, full-stack car marketplace platform featuring a clean, responsive React frontend, a secure Node.js & Express backend, and a robust MongoDB database.

[![React][React-shield]][React-url]
[![Node.js][Node-shield]][Node-url]
[![Tailwind CSS][Tailwind-shield]][Tailwind-url]
[![MongoDB][Mongo-shield]][Mongo-url]
[![Vercel][Vercel-shield]][Vercel-url]
[![Railway][Railway-shield]][Railway-url]

---

## 🚀 Live Demo

* **Frontend (Vercel):** `https://nala-automotive.vercel.app/`
* **Backend (Railway):** `nala-automotive.up.railway.app`
* **Admin Account (for testing):
* E-mail : admin@gmail.com
* Password : admin123
---

## ✨ Key Features

* **Full User Authentication:** Secure registration and login system using JWT.
* **Access & Refresh Tokens:** Advanced token rotation pattern for persistent, secure user sessions.
* **Frontend State Management:** Global state (user, auth) managed with **Zustand**.
* **Modern UI:** Built with **Tailwind CSS** and animated with **Framer Motion**.
* **Robust Form Validation:** Client-side validation using  **Zod**.
* **Protected Routes:** Frontend and backend routes are protected based on user authentication and roles.
* **Car Listings:** Browse available cars.
* **User Inquiries:** Logged-in users can make inquiries on vehicles.
* **Static Pages:** Clean, responsive About and Contact pages.
* **CORS & Security:** Backend is fully configured for cross-domain communication with the frontend.

---

## 🛠️ Tech Stack

This project is a full-stack monorepo with a clear separation of concerns.

### Frontend
* **Framework:** [React 19](https://reactjs.org/)
* **Routing:** [React Router DOM](https://reactrouter.com/)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
* **Form Management:** [React Hook Form](https://react-hook-form.com/)
* **Schema Validation:** [Zod](https://zod.dev/)
* **HTTP Client:** [Axios](https://axios-http.com/) (with interceptors for auth)
* **Animations:** [Framer Motion](https://www.framer.com/motion/)
* **Notifications:** [React Hot Toast](https://react-hot-toast.com/)


### Backend
* **Framework:** [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
* **Database:** [MongoDB](https://www.mongodb.com/)
* **ODM:** [Mongoose](https://mongoosejs.com/)
* **Authentication:** [JSON Web Token (JWT)](https://jwt.io/)
* **Middleware:** `cors`, `asyncHandler`,`custom MW`
*  **Media:** [Cloudinary](https://cloudinary.com/)

### Deployment
* **Frontend:** [Vercel](https://vercel.com/) 
* **Backend:** [Railway](https://railway.app/)
* **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas)
---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* [Node.js](https://nodejs.org/) (v18 or higher)
* `npm`
* A [MongoDB Atlas](https://www.mongodb.com/atlas) account (or a local MongoDB instance)
* Git

### 1. Clone the Repository

```sh
git clone [https://github.com/Ahmed-Ossamaa/Nala-Automotive.git](https://github.com/Ahmed-Ossamaa/Nala-Automotive.git)
cd NALA-Automotive

**Navigate to the backend directory:
cd server
npm install

**creat .env file: (in root dir inside the ./server)
PORT=5000
CLIENT_URL=http://localhost:xxxx (ex:5173)
JWT_SECRET=XXXXXXXXXXXXXXXXXX
JWT_REFRESH_SECRET=XXXXXXXXXXXXXX
JWT_ACCESS_EXPIRE=30m
JWT_REFRESH_EXPIRE=5d
CLOUDINARY_URL=cloudinary://123......:.............@xxxxxxx (for images)

****Navigate to the frontend directory:
cd client
npm install

****creat .env file: (in root dir inside the ./client)
VITE_API_URL=http://localhost:5000/api/v1

**finally run both with npm run dev






