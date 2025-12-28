# NALA Automotive 🚗

A modern, full-stack car marketplace platform featuring a clean, responsive React frontend, a secure Node.js & Express backend, and a robust MongoDB database.

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)

---

## 🚀 Live Demo

Check out the live application:

* **Frontend (Vercel):** [https://nala-automotive.vercel.app/](https://nala-automotive.vercel.app/)
* **Backend (Render):** [https://nala-automotive.onrender.com](https://nala-automotive.onrender.com)

### 🔑 Admin Account (For Testing)
Use these credentials to test admin features:
| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@gmail.com` | `admin123` |

---

## ✨ Key Features

* **Full User Authentication:** Secure registration and login system using JWT.
* **Access & Refresh Tokens:** Advanced token rotation pattern for persistent, secure user sessions.
* **Frontend State Management:** Global state (user, auth) managed with **Zustand**.
* **Modern UI:** Built with **Tailwind CSS** and animated with **Framer Motion**.
* **Robust Form Validation:** Client-side validation using **Zod**.
* **Protected Routes:** Frontend and backend routes are protected based on user authentication and roles.
* **Car Listings:** Browse available cars with ease.
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
* **Middleware:** `cors`, `asyncHandler`, custom middleware
* **Media:** [Cloudinary](https://cloudinary.com/)

### Deployment
* **Frontend:** [Vercel](https://vercel.com/)
* **Backend:** [Render](https://render.com/)
* **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas)

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* [Node.js](https://nodejs.org/) (v18 or higher)
* `npm`
* A [MongoDB Atlas](https://www.mongodb.com/atlas) account (or a local MongoDB instance)
* Git

### Installation

**1. Clone the Repository**
```sh
git clone [https://github.com/Ahmed-Ossamaa/Nala-Automotive.git](https://github.com/Ahmed-Ossamaa/Nala-Automotive.git)
cd NALA-Automotive
```

**2. Backend Setup: Navigate to the server directory and install dependencies:**
```sh
cd server
npm install
```

Create a .env file in the ./server root directory:
```sh
PORT=5000
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_here
JWT_ACCESS_EXPIRE=30m
JWT_REFRESH_EXPIRE=5d
CLOUDINARY_URL=cloudinary://key:secret@cloud_name
```
**3. Frontend Setup: Navigate to the client directory and install dependencies:**
```sh
cd ../client
npm install
```
Create a .env file in the ./client root directory:
```sh
VITE_API_URL=http://localhost:5000/api/v1
```
**4. Run the Application Open two terminals.**
<ol>
  <li>
    Terminal 1 (Backend):
    
    cd server
    npm run dev
    
  </li>
  <li>
    Terminal 2 (Frontend):
    
    cd client
    npm run dev
    
  </li>
</ol>

