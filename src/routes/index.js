import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import Doctor from "../pages/DoctorPage/Doctor";
// import DoctorList from "../pages/AdminPage/Doctor/DoctorList";
import DoctorDetail from "../pages/DoctorPage/DoctorDetail";
import DoctorPage from "../pages/DoctorPage/DoctorPage";
// import ProductsPage from "../pages/ProductsPage/ProductsPage";
import History from "../pages/Profile/History";
import Profile from "../pages/Profile/Profile";
import Schedule from "../pages/Profile/Schedule";
import PatientList from "../pages/Profile/PatientList";
import AdminPatientList from "../pages/AdminPage/PatientList";
import AdminPage from "../pages/AdminPage/AdminPage";
import DoctorList from "../pages/AdminPage/DoctorList";
import MedicineList from "../pages/AdminPage/MedicineList";
import CreateDoctor from "../pages/AdminPage/CreateDoctor";
import CreateMedicine from "../pages/AdminPage/CreateMedicine";
import CreateSpecialty from "../pages/AdminPage/CreateSpecialty";

import SpecialtyDetail from "../pages/HomePage/SpecialtyDetail";
import Specialty from "../pages/HomePage/Specialty";
import FormBMI from "../pages/HomePage/FormBMI";
import Medicine from "../pages/HomePage/Medicine";
import SpecialtyList from "../pages/AdminPage/SpecialtyList";

// import UserList from "../pages/AdminPage/UserList";
// import ThongTinBenhVien from "../pages/ThongTinBenhVien/ThongTinBenhVien";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/specialty-detail',
        page: SpecialtyDetail,
        isShowHeader: true
    },
    {
        path: '/specialty',
        page: Specialty,
        isShowHeader: true
    },
    {
        path: '/bmi',
        page: FormBMI,
        isShowHeader: true
    },
    {
        path: '/medicine',
        page: Medicine,
        isShowHeader: true
    },

    // {
    //     path: '/products',
    //     page: ProductsPage,
    //     isShowHeader: true
    // },
    {
        path: '/signin',
        page: SignInPage,
        isShowHeader: true
    },
    {
        path: '/signup',
        page: SignUpPage,
        isShowHeader: true
    },
    {
        path: '/profile/history',
        page: History,
        isShowHeader: true
    },
    {
        path: '/profile',
        page: Profile,
        isShowHeader: true
    },
    {
        path: '/profile/schedule',
        page: Schedule,
        isShowHeader: true
    },
    {
        path: '/profile/patient-list',
        page: PatientList,
        isShowHeader: true
    },
    // {
    //     path: '/thongtinbenhvien',
    //     page: ThongTinBenhVien,
    //     isShowHeader: true
    // },
    {
        path: '/admin',
        page: AdminPage,
        isShowHeader: true
    },
    {
        path: '/admin/doctor-list',
        page: DoctorList,
        isShowHeader: true
    },
    {
        path: '/admin/patient-list',
        page: AdminPatientList,
        isShowHeader: true
    },
    {
        path: '/admin/medicine-list',
        page: MedicineList,
        isShowHeader: true
    },
    {
        path: '/admin/specialty-list',
        page: SpecialtyList,
        isShowHeader: true
    },
    {
        path: '/admin/create-doctor',
        page: CreateDoctor,
        isShowHeader: true
    },
    {
        path: '/admin/create-medicine',
        page: CreateMedicine,
        isShowHeader: true
    },
    {
        path: '/admin/create-specialty',
        page: CreateSpecialty,
        isShowHeader: true
    },

    // {
    //     path: '/admin/doctor',
    //     page: Doctor,
    //     isShowHeader: true
    // },
    // {
    //     path: '/admin/doctor/list',
    //     page: DoctorList,
    //     isShowHeader: true
    // },
    // {
    //     path: '/admin/user/list',
    //     page: UserList,
    //     isShowHeader: true
    // },
    {
        path: '/doctor',
        page: DoctorPage,
        isShowHeader: true
    },
    {
        path: '/doctor/:id',
        page: Doctor,
        isShowHeader: true
    },
    {
        path: '/doctor-schedule/:id',
        page: DoctorDetail,
        isShowHeader: true
    },
    {
        path: '*',
        page: NotFoundPage
    },
];