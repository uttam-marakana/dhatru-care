# 🏥 Dhatru Care Admin Dashboard — **Complete Guide**

![React](https://img.shields.io/badge/React-18-blue)
![Firebase](https://img.shields.io/badge/Firebase-orange)
![Admin](https://img.shields.io/badge/Admin-Dashboard-8B5CF6)

**Full hospital management** with **CRUD, analytics, bulk tools, real-time Firestore**.

**Access**: `/admin` | **Role**: `users/{uid}.role = "admin"`

---

## 📂 **Complete Admin Folder Structure**

```
src/admin/
│
├── components/                    # UI Components
│   ├── cards/                     # Dashboard cards
│   │   ├── AppointmentCard.jsx
│   │   └── DashboardCard.jsx
│   │
│   ├── common/                    # Reusable components
│   │   ├── AdminTable.jsx         # Search/Filter/Pagination
│   │   ├── ContactAnalytics.jsx
│   │   ├── EmptyState.jsx
│   │   ├── FormCard.jsx
│   │   ├── LeadDrawer.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── NotesModal.jsx
│   │   └── StatusBadge.jsx
│   │
│   ├── forms/                     # CRUD Forms (Frontend-style)
│   │   ├── BlogForm.jsx
│   │   ├── DepartmentForm.jsx
│   │   ├── DoctorForm.jsx         # Schedule + hours
│   │   ├── DoctorScheduleForm.jsx
│   │   ├── PackageForm.jsx
│   │   └── PatientForm.jsx
│   │
│   ├── layout/                    # Admin Layout
│   │   ├── AdminHeader.jsx
│   │   └── AdminNavbar.jsx
│   │
│   ├── modals/                    # Dialogs
│   │   ├── BlogFormModal.jsx
│   │   ├── ConfirmDeleteModal.jsx
│   │   ├── DepartmentFormModal.jsx
│   │   └── DoctorFormModal.jsx
│   │
│   └── tables/                    # Data Tables (Glass UI)
│       ├── AppointmentsTable.jsx  # Status dropdown
│       ├── BlogsTable.jsx
│       ├── ContactMessagesTable.jsx
│       ├── DepartmentsTable.jsx
│       ├── DoctorsTable.jsx
│       └── PackagesTable.jsx
│
├── pages/                         # Admin Pages
│   ├── AdminDashboard.jsx         # Revenue + overview
│   ├── BillingDashboard.jsx
│   ├── BulkUpload.jsx             # JSON import
│   ├── DataUpload.jsx
│   ├── DoctorSchedule.jsx         # Slot generation
│   ├── ManageAppointments.jsx     # Filters + revenue
│   ├── ManageBlogs.jsx
│   ├── ManageContacts.jsx
│   ├── ManageDepartments.jsx
│   ├── ManageDoctors.jsx
│   ├── ManagePackages.jsx
│   └── ManagePatients.jsx
│
└── utils/                         # Admin Helpers
    ├── adminConstants.js
    └── adminHelpers.js
```

---

## 👑 **Admin Role & Firestore Access**

```
Firestore users/{admin_uid}:
  role: "admin"  # Required for write access
```

**Permissions**:
| Action | Collections | Rule |
|--------|-------------|------|
| **CRUD** | doctors, departments, packages, blogs | `write: if isAdmin()` |
| **Status** | appointments | `update: if isAdmin()` |
| **Read** | All + real-time | Public read |

---

## 🎯 **Page-by-Page Usage**

| Page | Features | Firestore Operations | Filters |
|------|----------|---------------------|---------|
| **AdminDashboard** | Revenue cards, stats | Aggregate `appointments` | - |
| **ManageAppointments** | Status dropdown (pending→confirmed), revenue | Transactional updates | Status/Date/Search |
| **ManageDoctors** | DoctorForm + schedule, slot gen | `doctors` + `appointmentSlots` | Name/Specialty |
| **ManageDepartments** | Simple CRUD | `departments` | Name |
| **ManagePackages** | Price/Duration/Featured | `packages` | Price |
| **ManageBlogs** | Title/Author/Category | `blog_posts` | Category |
| **BulkUpload** | JSON → batch write | All collections | File type |
| **DoctorSchedule** | Bulk slot generation | `appointmentSlots` | Doctor/Date |

---

## 🔥 **Firestore Workflow**

### **Real-time Data**
```javascript
// AdminTable.jsx
onSnapshot(query(appointmentsRef), setData)
```

### **Safe Updates** (Transactions)
```javascript
// Status change locks/unlocks slots atomically
runTransaction: appointment.status + slot.isBooked
```

### **Security Rules** (firebase/firestore.rules)
```javascript
function isAdmin() { return get(users/$(request.auth.uid)).data.role == "admin"; }
match /doctors/{doc} { allow write: if isAdmin(); }
```

---

## 🛠 **Complete Setup Guide**

### **1. Firebase Console**
```
1. Create project
2. Enable Auth + Firestore
3. Set rules/indexes
4. Add admin user: users/{uid}.role = "admin"
```

### **2. Environment (.env)**
```
VITE_FIREBASE_PROJECT_ID=your_project
VITE_FIREBASE_API_KEY=...
```

### **3. Local Development**
```bash
yarn install
yarn dev
```

### **4. Deploy**
```
yarn build
vercel --prod
firebase deploy --only firestore
```

---

## 📱 **Responsive Glass UI**

**Tables**: Glass containers, hover states, mobile scroll
**Forms**: Grid layouts, Input/CustomSelect validation  
**Dashboard**: Cards with animations (`animate-fade-in-up`)

Matches public frontend perfectly.

---

**Production hospital admin panel** — **Full Firestore integration + secure role system** 🚀
