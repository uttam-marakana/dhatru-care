# 🏥 Dhatru Care — Hospital Management Platform

### Built by **Uttam Marakana (Shadow)**  
React & Shopify Developer • System Builder • Product Architect  

A modern hospital website + admin dashboard built with **React + Firebase**, designed for scalable healthcare platforms with secure role-based access, responsive UI, and production-level architecture.


# 🚀 Project Overview

Dhatru Care is a full frontend system that includes:

- Public hospital website
- Authentication system
- User dashboard pages
- Admin dashboard
- Firestore data management
- Bulk JSON upload system
- Role-based access control


# 🧱 Tech Stack

## Frontend
- React (Vite)
- React Router v6
- Tailwind CSS
- React Icons
- Formik + Yup

## Backend / Platform
- Firebase Authentication
- Firestore Database
- Firebase Security Rules

## Architecture
- Layout-based routing
- Role-based access
- Protected routes
- Responsive dashboard system


# 📁 Folder Structure

```bash
dhatru-care/
│
├── dist/                         # Production build output (auto-generated)
├── node_modules/                 # Installed dependencies
├── public/                       # Static public assets
│   └── vite.svg
│
├── src/                          # Main application source
│   │
│   ├── admin/                    # Admin dashboard domain
│   │   ├── components/           # Admin-specific UI components
│   │   │   └── AdminNavbar.jsx
│   │   ├── forms/                # Admin data management forms
│   │   │   ├── BlogForm.jsx
│   │   │   ├── DepartmentForm.jsx
│   │   │   ├── DoctorForm.jsx
│   │   │   ├── FormCard.jsx
│   │   │   └── PackageForm.jsx
│   │   └── pages/                # Admin pages
│   │       ├── BulkUpload.jsx    # JSON bulk upload UI
│   │       └── DataUpload.jsx
│   │
│   ├── api/                      # Firestore API abstraction layer
│   │   ├── appointmentsApi.js
│   │   ├── blogsApi.js
│   │   ├── contactApi.js
│   │   ├── departmentsApi.js
│   │   ├── doctorsApi.js
│   │   ├── newsletterApi.js
│   │   └── packagesApi.js
│   │
│   ├── assets/                   # Static assets used inside app
│   │   ├── icons/
│   │   ├── images/
│   │   └── react.svg
│   │
│   ├── auth/                     # Authentication domain
│   │   ├── authApi.js            # Auth-related Firebase logic
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   │
│   ├── components/               # Shared reusable components
│   │   ├── common/               # Design-system style primitives
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── ThemeToggle.jsx
│   │   │
│   │   ├── forms/                # Public-facing forms
│   │   │   ├── AppointmentForm.jsx
│   │   │   ├── ContactForm.jsx
│   │   │   └── NewsletterForm.jsx
│   │   │
│   │   └── layout/               # Layout building blocks
│   │       ├── Container.jsx
│   │       ├── Header.jsx
│   │       ├── Footer.jsx
│   │       └── TopBar.jsx
│   │
│   ├── context/                  # Global state providers
│   │   └── ThemeContext.jsx
│   │
│   ├── data/                     # Local JSON seed/mock data
│   │   ├── appointments.json
│   │   ├── blog_posts.json
│   │   ├── departments.json
│   │   ├── doctors.json
│   │   └── packages.json
│   │
│   ├── hooks/                    # Custom reusable React hooks
│   │   ├── useDebounce.js
│   │   └── useInView.js
│   │
│   ├── layouts/                  # High-level page layouts
│   │   ├── AdminLayout.jsx       # Dashboard layout wrapper
│   │   ├── AuthLayout.jsx        # Login / Signup layout
│   │   └── PublicLayout.jsx      # Main website layout
│   │
│   ├── pages/                    # Route-level pages
│   │   ├── Home.jsx
│   │   ├── Doctors.jsx
│   │   ├── Departments.jsx
│   │   ├── Blog.jsx
│   │   ├── Search.jsx
│   │   └── NotFound.jsx
│   │
│   ├── routes/                   # Routing & access control
│   │   ├── AppRoutes.jsx         # Central route definitions
│   │   ├── ProtectedRoute.jsx    # Logged-in access guard
│   │   └── AdminRoute.jsx        # Admin-only guard
│   │
│   ├── scripts/                  # Utility scripts (non-UI logic)
│   │   └── bulkUpload.js
│   │
│   ├── sections/                 # Page composition sections
│   │   ├── home/                 # Home page modular sections
│   │   ├── blog/
│   │   ├── doctors/
│   │   ├── departments/
│   │   └── shared/               # Shared page blocks
│   │
│   ├── utils/                    # Helper utilities & validators
│   │   ├── constants.js
│   │   ├── formatDate.js
│   │   ├── formatPhone.js
│   │   └── validators.js
│   │
│   ├── App.jsx                   # Root app component
│   ├── main.jsx                  # React entry point
│   ├── firebase.js               # Firebase initialization
│   └── App.css
│
├── .env                          # Environment variables (private)
├── .env.example                  # Example env structure
├── index.html                    # Vite HTML entry
├── package.json                  # Project dependencies & scripts
├── vite.config.js                # Vite configuration
└── README.md
````

---

# 🧭 Layout Architecture

```text
PublicLayout  → Website UI
AuthLayout    → Login / Signup
AdminLayout   → Admin Dashboard
```

Each layout isolates UI logic for scalability.

---

# 🔐 Authentication & Roles

Authentication uses **Firebase Auth**.

Roles stored in Firestore:

```bash
users/{uid}
role: "user" | "admin"
```

### Access Control

* `ProtectedRoute` → logged users
* `AdminRoute` → admin only

---

# 🛡 Firestore Security

Rules enforce:

* Admin-only database writes
* Public read access
* Secure user role validation

---

# ⚙️ Admin Features

* Data Upload Forms
* Bulk JSON Import
* Role-based dashboard access
* Responsive sidebar layout

---

# 📱 Responsive Design

Supports:

* Mobile
* Tablet
* Desktop
* Dashboard responsive sidebar

---

# 🧪 Development

Install dependencies:

```bash
yarn install
```

Run locally:

```bash
yarn run dev
```

---

# 📌 Project Goals

* Scalable healthcare platform
* Clean SaaS-style architecture
* Secure Firebase integration
* Long-term maintainable codebase

---

# 👨‍💻 About Developer

**Uttam Marakana (Shadow)**
Builder focused on scalable systems, eCommerce technology, and product-driven engineering.

* ReactJS & Shopify Development
* Firebase & Headless Architecture
* System-first engineering mindset

---

# ⭐ Future Improvements

* Global Auth Context
* Admin analytics dashboard
* Role management UI
* Real-time notifications
* Hospital ERP expansion

---

## 📄 License

Private / Internal Project – All rights reserved.
