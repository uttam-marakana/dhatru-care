# 🏥 Dhatru Care — Hospital Management Platform

![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-Build-purple)
![Firebase](https://img.shields.io/badge/Firebase-Backend-orange)
![Firestore](https://img.shields.io/badge/Firestore-Database-yellow)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-UI-38B2AC)
![Vercel](https://img.shields.io/badge/Vercel-Deployment-black)

### Built by **Uttam Marakana (Shadow)**

React & Shopify Developer 

A modern **hospital website + admin dashboard** built with **React + Firebase**, designed for scalable healthcare platforms with secure role-based access, responsive UI, and production-grade architecture.

---

# 🌐 Live Demo

Public Website

```
https://dhatrucare.vercel.app
```

Admin Dashboard

```
https://dhatrucare.vercel.app/admin/upload
```


---

# 🚀 Project Overview

**Dhatru Care** is a modern healthcare platform frontend that includes:

• Public hospital website
• Authentication system
• User dashboard pages
• Admin dashboard
• Firestore data management
• Bulk JSON upload system
• Role-based access control
• Modular section-based UI architecture

The project demonstrates **real-world SaaS style architecture using React + Firebase**.

---

# 🧱 Tech Stack

## Frontend

* React (Vite)
* React Router v6
* Tailwind CSS
* React Icons
* Formik + Yup

## Backend / Platform

* Firebase Authentication
* Firestore Database
* Firebase Security Rules

## Architecture Principles

* Layout-based routing
* Role-based access control
* Protected routes
* Modular UI sections
* Admin domain isolation

---

# 🏗 System Architecture

```
                ┌────────────────────────┐
                │      User Browser      │
                └──────────┬─────────────┘
                           │
                           ▼
                ┌────────────────────────┐
                │   React Frontend       │
                │      (Vite)            │
                └──────────┬─────────────┘
                           │
                           ▼
                ┌────────────────────────┐
                │ Firebase Authentication│
                └──────────┬─────────────┘
                           │
                           ▼
                ┌────────────────────────┐
                │   Firestore Database   │
                └──────────┬─────────────┘
                           │
                           ▼
                ┌────────────────────────┐
                │   Admin Dashboard      │
                │ Data & Content Mgmt    │
                └──────────┬─────────────┘
```

Benefits of this architecture:

• Serverless backend
• Real-time database
• Secure authentication
• Scalable infrastructure
• Clean separation between frontend and data layer

---

# 📁 Folder Structure

```bash
dhatrucare/
│
├── dist/
├── node_modules/
├── public/
│
├── src/
│   ├── admin/
│   │   ├── components/
│   │   ├── forms/
│   │   └── pages/
│
│   ├── api/
│   │   ├── appointmentsApi.js
│   │   ├── blogsApi.js
│   │   ├── contactApi.js
│   │   ├── departmentsApi.js
│   │   ├── doctorsApi.js
│   │   ├── newsletterApi.js
│   │   └── packagesApi.js
│
│   ├── assets/
│   │   ├── icons/
│   │   └── images/
│
│   ├── auth/
│   │   ├── authApi.js
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│
│   ├── components/
│   │   ├── common/
│   │   ├── filters/
│   │   ├── forms/
│   │   └── layout/
│
│   ├── context/
│   │   ├── HomeDataContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── AuthContext.jsx
│
│   ├── data/
│   │   ├── appointments.json
│   │   ├── blog_posts.json
│   │   ├── departments.json
│   │   ├── doctors.json
│   │   └── packages.json
│
│   ├── hooks/
│   │   ├── useDebounce.js
│   │   ├── useInView.js
│   │   ├── useUniversalSearch.js
│   │   └── useSearchSuggestions.js
│
│   ├── layouts/
│   │   ├── AdminLayout.jsx
│   │   ├── AuthLayout.jsx
│   │   └── PublicLayout.jsx
│
│   ├── pages/
│   │   ├── protected/
│   │   └── public/
│
│   ├── routes/
│   │   ├── AdminRoute.jsx
│   │   ├── AppRoutes.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── autoRoutes.jsx
│
│   ├── scripts/
│   │   ├── bulkUpload.jsx
│   │   └── generateAllDoctorSlots.js
│
│   ├── sections/
│   ├── utils/
│
│   ├── firebase.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── firebase/
│   ├── firestore.rules
│   └── firestore.indexes.json
│
├── .env
├── .env.example
├── package.json
├── vite.config.js
└── README.md
```

---

# 🧭 Layout Architecture

```
PublicLayout
   ├── Home
   ├── Doctors
   ├── Departments
   └── Blog

AuthLayout
   ├── Login
   └── Signup

AdminLayout
   ├── Admin dashboard
   ├── Data management
   └── Upload tools
```

---

# 🔐 Authentication & Roles

Authentication uses **Firebase Authentication**.

Roles stored in Firestore:

```
users/{uid}

role: "user"
role: "admin"
```

### Route Guards

| Guard          | Purpose              |
| -------------- | -------------------- |
| ProtectedRoute | Logged-in users only |
| AdminRoute     | Admin access only    |

---

# 🔧 Firebase Setup

1. Create Firebase project
2. Enable Authentication
3. Enable Firestore
4. Register Web App

Example configuration:

```javascript
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
}
```

---

# 🔐 Environment Variables

Create `.env`

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Example `.env.example`

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

# ⚠️ Environment Variable Security

Do **not commit `.env` files** to GitHub.

Ensure `.gitignore` contains:

```
.env
.env.local
.env.production
```

Only commit:

```
.env.example
```

---

# 🛡 Firestore Security Rules

Example rule structure:

```javascript
rules_version = '2';
service cloud.firestore {

match /databases/{database}/documents {

function isLoggedIn() {
return request.auth != null;
}

function isAdmin() {
return isLoggedIn() &&
get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin";
}

match /doctors/{doc} {
allow read: if true;
allow write: if isAdmin();
}

}
}
```

Full rules file:

```
firebase/firestore.rules
```

Deploy:

```
firebase deploy --only firestore:rules
```

---

# 📊 Firestore Indexes

Example index:

```json
{
 "collectionGroup": "appointments",
 "queryScope": "COLLECTION",
 "fields": [
  { "fieldPath": "userId", "order": "ASCENDING" },
  { "fieldPath": "createdAt", "order": "DESCENDING" }
 ]
}
```

Indexes file:

```
firebase/firestore.indexes.json
```

Deploy:

```
firebase deploy --only firestore:indexes
```

---

# 📂 Firestore Data Model

```
users/{uid}

doctors/{doctorId}

departments/{departmentId}

packages/{packageId}

blog_posts/{blogId}

appointments/{appointmentId}

appointmentSlots/{slotId}

contacts/{contactId}

newsletter/{subscriberId}
```

---

# ☁️ Deploy to Vercel

Push project to GitHub

```
git init
git add .
git commit -m "initial commit"
git push origin main
```

Import project

```
https://vercel.com/new
```

Build settings

```
Framework: Vite
Build Command: yarn build
Output Directory: dist
```

---

# ⚙️ Configure Environment Variables in Vercel

Open **Vercel Dashboard**

Navigate to:

```
Project Settings → Environment Variables
```

Add the following variables:

| Key                               | Value                        |
| --------------------------------- | ---------------------------- |
| VITE_FIREBASE_API_KEY             | Firebase API key             |
| VITE_FIREBASE_AUTH_DOMAIN         | your_project.firebaseapp.com |
| VITE_FIREBASE_PROJECT_ID          | Firebase project id          |
| VITE_FIREBASE_STORAGE_BUCKET      | your_project.appspot.com     |
| VITE_FIREBASE_MESSAGING_SENDER_ID | Firebase sender id           |
| VITE_FIREBASE_APP_ID              | Firebase app id              |

After adding the variables:

```
Redeploy the project
```

https://dhatrucare.vercel.app
```

---


# 📌 How Environment Variables Are Used

Inside `src/firebase.js`

```javascript
import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

export const app = initializeApp(firebaseConfig)
```

---

# 🧪 Development

Install dependencies

```
yarn install
```

Run development server

```
yarn dev
```

Build production

```
yarn build
```

---

# ⚙️ Admin Features

• Blog management
• Doctor management
• Department management
• Health package management
• Appointment management
• Bulk JSON data import

---

# 📱 Responsive Design

Fully responsive UI supporting:

• Mobile
• Tablet
• Desktop
• Admin dashboard layout

---

# 📌 Project Goals

• Scalable healthcare platform
• Clean modular architecture
• Secure Firebase integration
• Maintainable React codebase
• Admin-friendly data management

---

# ⭐ Future Improvements

• Global Auth Context
• Admin analytics dashboard
• Role management interface
• Real-time notifications
• Hospital ERP system expansion

---

# 👨‍💻 About the Developer

**Uttam Marakana (Shadow)**
React & Shopify Developer

Focused on building **scalable systems, modern frontend architecture, and product-driven platforms**.

Core areas:

• ReactJS development
• Shopify architecture
• Firebase backend systems
• System-driven engineering

---

# 📄 License

Private / Internal Project — All rights reserved.
