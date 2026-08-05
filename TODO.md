# Implementation TODO

## Task-1: Packages (Home + Packages page + package→doctor filtering)
- [x] Create `src/config/packageDoctorMap.js` (centralized package → department mapping)
- [x] Update `HealthPackages.jsx` to support `limit` prop + "View All Packages" button
- [x] Update `Home.jsx` to pass `limit={3}`
- [x] Update `AppointmentForm.jsx` to filter doctors by selected package mapping

## Task-2: Filter button responsive (tablet/mobile)
- [x] Update `UniversalFilterLayout.jsx` to reposition mobile filter FAB + z-index

## Task-3: Filters on list pages
- [x] Create `src/sections/departments/DepartmentFilters.jsx`
- [x] Create `src/sections/packages/PackageFilters.jsx`
- [x] Update `Departments.jsx` to add search + category filters
- [x] Update `Packages.jsx` to add search + price range filters

## Task-4: Mobile drawer background
- [x] Update `MobileDrawer.jsx` to use fully opaque background with clear contrast

## Extra
- [x] Fix `UniversalFilters.jsx` to accept both `schema` and `fields` (fixes Blog filter bug, improves reuse)
- [x] Update `UniversalFilterLayout.jsx` mobile FAB active count badge

## Feedback: Lock package on booking
- [x] Add `disabled` prop to `CustomSelect.jsx` (locked visual + no dropdown)
- [x] `AppointmentForm.jsx`: lock the **package** dropdown when coming from a package "Book Now"
- [x] `AppointmentForm.jsx`: department dropdown stays **enabled** so the patient can select a department
- [x] Doctor list is intersected with (a) the patient's selected department and (b) the package's mapped departments, so the package always shows only relevant doctors
- [x] Fix step 2 doctor visibility: restore reliable `getDoctorsByDepartment` server-side query so doctors show correctly per selected department
- [x] When a package is locked, restrict the department dropdown to the package's relevant departments so step 2 always has applicable doctors
- [x] Add loading + empty states to step 2 so the doctor grid never appears blank/confusing
