import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout"; // <-- Layout riêng cho Admin có Sidebar

// Guest Pages
import Home from "../pages/guest/Home";
import About from "../pages/guest/About";
import Courses from "../pages/guest/Courses";
import CourseDetail from "../pages/guest/CourseDetail";
import Contact from "../pages/guest/Contact";
import Login from "../pages/guest/Login";
import Register from "../pages/guest/Register";
import NotFound from "../pages/guest/NotFound";

// Student Pages
import StudentDashboard from "../pages/student/Dashboard";
import MyCourses from "../pages/student/MyCourses";
import CourseLearn from "../pages/student/CourseLearn";
import Practice from "../pages/student/Practice";
import Flashcards from "../pages/student/Flashcards";
import StudentProfile from "../pages/student/Profile";
import Cart from "../pages/student/Cart";
import Checkout from "../pages/student/Checkout";

// Teacher Pages
import TeacherDashboard from "../pages/teacher/Dashboard";
import TeacherCourseForm from "../pages/teacher/CourseForm";
import TeacherCourseStudents from "../pages/teacher/CourseStudents";
import TeacherAttendance from "../pages/teacher/Attendance";
import TeacherAssignments from "../pages/teacher/Assignments";
import TeacherAnalytics from "../pages/teacher/Analytics";
import TeacherProfile from "../pages/teacher/Profile";

// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import UserManagement from "../pages/admin/UserManagement";
import CourseApproval from "../pages/admin/CourseApproval";
import RevenueAnalytics from "../pages/admin/RevenueAnalytics";
import CategoryManagement from "../pages/admin/CategoryManagement";
import PromotionManagement from "../pages/admin/PromotionManagement";
import PaymentManagement from "../pages/admin/PaymentManagement";
import CertificateManagement from "../pages/admin/CertificateManagement";
import SystemSettings from "../pages/admin/SystemSettings";

// Component thông minh tự động phân phối trang chủ dựa trên Role
const HomeRouter = () => {
  const userStored = localStorage.getItem("elearning_user");

  if (!userStored) {
    return <Home />;
  }

  try {
    const currentUser = JSON.parse(userStored);
    if (currentUser.role === "student") {
      return <StudentDashboard />;
    }
    if (currentUser.role === "teacher") {
      return <TeacherDashboard />;
    }
    if (currentUser.role === "admin") {
      return <AdminDashboard />;
    }
  } catch (err) {
    console.error("Lỗi đọc user:", err);
  }

  return <Home />;
};

// Component bảo vệ Route theo Role
const ProtectedRoute = ({ allowedRoles, children }) => {
  const userStored = localStorage.getItem("elearning_user");

  if (!userStored) {
    return <Navigate to="/login" replace />;
  }

  const currentUser = JSON.parse(userStored);

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* --- NHÓM 1: CÁC TRANG CÔNG KHAI --- */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomeRouter />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* --- NHÓM 2: STUDENT PORTAL --- */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/profile" element={<StudentProfile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>

      {/* --- NHÓM 3: TRANG HỌC TẬP RIÊNG BIỆT --- */}
      <Route
        path="/courses/:id/learn"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <CourseLearn />
          </ProtectedRoute>
        }
      />

      {/* --- NHÓM 4: TEACHER PORTAL --- */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["teacher", "admin"]}>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/courses/new" element={<TeacherCourseForm />} />
        <Route
          path="/teacher/courses/:id/edit"
          element={<TeacherCourseForm />}
        />
        <Route
          path="/teacher/courses/:id/students"
          element={<TeacherCourseStudents />}
        />
        <Route
          path="/teacher/courses/:id/attendance"
          element={<TeacherAttendance />}
        />
        <Route
          path="/teacher/courses/:id/assignments"
          element={<TeacherAssignments />}
        />
        <Route path="/teacher/analytics" element={<TeacherAnalytics />} />
        <Route path="/teacher/profile" element={<TeacherProfile />} />
      </Route>

      {/* --- NHÓM 5: ADMIN PORTAL (Sử dụng AdminLayout dọc bên trái) --- */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/courses" element={<CourseApproval />} />
        <Route path="/admin/analytics" element={<RevenueAnalytics />} />
        <Route path="/admin/categories" element={<CategoryManagement />} />
        <Route path="/admin/promotions" element={<PromotionManagement />} />
        <Route path="/admin/payments" element={<PaymentManagement />} />
        <Route path="/admin/certificates" element={<CertificateManagement />} />
        <Route path="/admin/settings" element={<SystemSettings />} />
      </Route>

      {/* --- NHÓM 6: AUTHENTICATION --- */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* --- TRANG 404 NOT FOUND --- */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
