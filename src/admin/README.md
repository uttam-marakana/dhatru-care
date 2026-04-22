# 🏥 Dhatru Care **Admin Dashboard** — **Every Page Explained**

![React Admin](https://img.shields.io/badge/React-18-blue) ![Firebase](https://img.shields.io/badge/Firebase-orange) ![Admin](https://img.shields.io/badge/Admin-8B5CF6)

**Access**: `/admin` | **Role**: `users/{uid}.role = "admin"`

---

## 📂 **Admin Folder Structure**

```
src/admin/
├── components/cards/     (DashboardCard.jsx)
├── components/common/    (AdminTable, StatusBadge, LoadingSpinner)
├── components/forms/     (DoctorForm, PatientForm, 6 forms)
├── components/layout/    (AdminHeader, AdminNavbar)
├── components/modals/    (5 modals: BlogFormModal etc.)
├── components/tables/    (6 tables: AppointmentsTable etc.)
├── pages/               (11 pages ↓)
└── utils/
```

---

## 📖 **EVERY Admin Page — Usage & How It Works**

### **1. AdminDashboard.jsx** `/admin`
| **Purpose** | Revenue, stats, quick links |
|-------------|-----------------------------|
| **Features** | Total/today revenue, appointment count, charts |
| **Firestore** | Aggregate `appointments` queries |
| **UI** | Dashboard cards, metrics |
| **Works** | Real-time subscriptions → auto-refresh stats |

### **2. ManageAppointments.jsx** `/admin/appointments`
| **Purpose** | Manage all bookings |
|-------------|----------------------|
| **Features** | Filter (status/date/search), revenue breakdown, status dropdown |
| **Firestore** | `appointments` + `appointmentSlots` |
| **UI** | AdminTable + AppointmentsTable + revenue cards |
| **Works** | Status change → transaction (appointment + slot unlock) |

### **3. ManageDoctors.jsx** `/admin/doctors`
| **Purpose** | Doctor CRUD + schedules |
|-------------|-------------------------|
| **Features** | Add/edit via DoctorForm, bulk slot generation |
| **Firestore** | `doctors` + `appointmentSlots` |
| **UI** | DoctorsTable + DoctorFormModal |
| **Works** | Form → API → createDoctor() → generate slots |

### **4. ManageDepartments.jsx** `/admin/departments`
| **Purpose** | Department CRUD |
|-------------|------------------|
| **Features** | Add/edit departments (Cardiology etc.) |
| **Firestore** | `departments` |
| **UI** | DepartmentsTable + DepartmentForm |
| **Works** | Standard CRUD via AdminTable |

### **5. ManagePackages.jsx** `/admin/packages`
| **Purpose** | Health package CRUD |
|-------------|--------------------|
| **Features** | Pricing, duration, featured toggle |
| **Firestore** | `packages` |
| **UI** | PackagesTable + PackageFormModal |
| **Works** | Form validation → createPackage() |

### **6. ManageBlogs.jsx** `/admin/blogs`
| **Purpose** | Blog content |
|-------------|---------------|
| **Features** | Title/author/category CRUD |
| **Firestore** | `blog_posts` |
| **UI** | BlogsTable + BlogFormModal |
| **Works** | Rich text → blogService |

### **7. ManageContacts.jsx** `/admin/contacts`
| **Purpose** | Patient inquiries |
|-------------|--------------------|
| **Features** | Contact form responses |
| **Firestore** | `contacts` |
| **UI** | ContactMessagesTable |
| **Works** | Real-time new inquiries |

### **8. ManagePatients.jsx** `/admin/patients`
| **Purpose** | Patient records |
|-------------|------------------|
| **Features** | Patient profile CRUD |
| **Firestore** | `patients` |
| **UI** | Patient table + PatientForm |
| **Works** | Phone lookup + auto-link |

### **9. BillingDashboard.jsx** `/admin/billing`
| **Purpose** | Billing overview |
|-------------|-------------------|
| **Features** | Revenue by doctor/package |
| **Firestore** | `appointments` aggregates |
| **UI** | Billing charts/metrics |

### **10. BulkUpload.jsx** `/admin/upload`
| **Purpose** | Data import |
|-------------|---------------|
| **Features** | JSON → Firestore, slot generation |
| **Firestore** | Batch writes |
| **UI** | File upload + progress |
| **Works** | `scripts/bulkUpload.js` → collections |

### **11. DoctorSchedule.jsx** `/admin/schedule`
| **Purpose** | Slot management |
|-------------|------------------|
| **Features** | Generate all doctor slots |
| **Firestore** | `appointmentSlots` bulk |
| **UI** | Schedule generator form |

---

## 🔥 **Firestore Architecture**

**Collections Admin Controls**:
```
appointments/{id}           # Status: pending → completed
doctors/{id}                # Profiles + schedules
departments/{id}            # Specialties
packages/{id}               # Health checkups
blog_posts/{id}             # Articles
appointmentSlots/{id}       # doctor_date_time (locked)
patients/{id}               # Patient records
contacts/{id}               # Inquiries
```

**Real-time**: `onSnapshot()` in all tables
**Transactions**: Status + slot atomic updates
**Rules**: Admin write-only

---

## 🛠 **Setup (5 mins)**

1. **Firebase**: Enable Auth/Firestore
2. **Admin User**: `users/uid.role = "admin"`
3. **Env**: VITE_FIREBASE_* vars
4. **Dev**: `yarn dev`
5. **Deploy**: `vercel --prod`

---

**Every page documented** with **Firestore flow, usage, features** ✅

**Production hospital admin** ready!
