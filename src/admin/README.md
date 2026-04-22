# 🏥 Dhatru Care — **Admin Dashboard**

![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-Build-purple)
![Firebase](https://img.shields.io/badge/Firebase-Backend-orange)
![Admin](https://img.shields.io/badge/Admin-Dashboard-8B5CF6)

**Complete hospital management interface** built with React + Firebase. **Admin role**: Full CRUD access to all hospital data.

Access: `/admin` (requires Firestore `users/{uid}.role = "admin"`)

---

## 👑 **Admin Role & Responsibilities**

| Role | Permissions | Firestore Access |
|------|-------------|------------------|
| **Admin** | Full CRUD + Status Management | `write: if isAdmin()` |
| **Doctor** | View own appointments | `read: if isDoctor()` |
| **User** | Own appointments only | `read/write: own data` |

**Admin sets up**: Doctors, departments, packages, blog content, slot generation.

---

## 🎯 **Complete Feature List**

### **Dashboard & Analytics**
- Revenue tracking (total/today)
- Appointment overview
- Contact leads dashboard

### **Core Management**
| Module | Features |
|--------|----------|
| **Appointments** | List/filter/search, status changes (pending→confirmed→completed), revenue |
| **Doctors** | Add/edit doctors, schedules, working hours, slot generation |
| **Departments** | CRUD departments |
| **Health Packages** | Create/edit packages with pricing |
| **Blogs** | Content CRUD |
| **Patients/Contacts** | Lead management |

### **Admin Tools**
- **Bulk Upload**: JSON → Firestore
- **Slot Generator**: Auto-generate doctor availability
- **Real-time**: Live data sync

---

## 🔄 **How Admin Works (Data Flow)**

```
1. Admin Login → Firebase Auth → role: "admin" check
2. Real-time Subscriptions → Firestore collections
3. CRUD Operations → API → Services → Transactions
4. Status Updates → Validate transitions → Audit log
5. Bulk Operations → Scripts → Firestore batch writes
```

**Example Status Flow**:
```
Pending → [Confirmed/Cancelled/Rejected] → Completed
```

---

## 🗄 **Firestore Collections (Admin Managed)**

| Collection | Admin Role | Security Rule |
|------------|------------|---------------|
| `doctors` | CRUD | `write: if isAdmin()` |
| `departments` | CRUD | `write: if isAdmin()` |
| `packages` | CRUD | `write: if isAdmin()` |
| `blog_posts` | CRUD | `write: if isAdmin()` |
| `appointments` | Status mgmt | `update: if isAdmin()` |
| `appointmentSlots` | View/Lock | Real-time subscriptions |
| `contacts` | Read | `write: if isAdmin()` |

**Real-time**: AdminTable uses `onSnapshot()` queries.

**Transactions**: Status updates + slot locking atomic.

---

## 📁 **File Structure**

```
src/admin/
├── components/
│   ├── common/
│   │   ├── AdminTable.jsx     # Search/Pagination/Filter
│   │   └── StatusBadge.jsx
│   ├── tables/                # Entity tables
│   │   ├── AppointmentsTable
│   │   ├── DoctorsTable
│   │   └── PackagesTable
│   └── forms/                 # Frontend-style forms
│       ├── DoctorForm.jsx     # Input/CustomSelect layout
│       └── PatientForm.jsx
├── pages/
│   ├── ManageAppointments.jsx # Revenue + filters
│   └── BulkUpload.jsx         # JSON import
└── utils/
```

---

## 🚀 **Quick Start**

```
yarn dev
```

**Admin Login**: Create user with `role: "admin"` in Firestore

**Routes**:
- `/admin/appointments`
- `/admin/doctors`
- `/admin/packages`
- `/admin/upload` (bulk)

---

## 🔐 **Firebase Security**

**Firestore Rules** (`firebase/firestore.rules`):
```javascript
function isAdmin() {
  return request.auth != null && 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin";
}

match /doctors/{doc} {
  allow read: if true;           // Public read
  allow write: if isAdmin();     // Admin write
}

match /appointments/{appt} {
  allow read, update: if isAdmin();  // Admin full access
}
```

**Deploy**: `firebase deploy --only firestore:rules`

---

## 📱 **Responsive Design**

| Device | Features |
|--------|----------|
| **Mobile** | Collapsible tables, touch buttons |
| **Tablet** | 2-col forms, horizontal scroll tables |
| **Desktop** | Full dashboard, multi-filter |

**Glassmorphism** design matching public frontend.

---

**Production-ready hospital admin panel** with secure Firebase integration 🚀
