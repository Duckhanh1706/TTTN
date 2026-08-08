import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";

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
import TeacherExamsManager from "../pages/teacher/Assignments";
import TeacherAnalytics from "../pages/teacher/Analytics";
import TeacherProfile from "../pages/teacher/Profile";
import TeacherEditCourse from "../pages/teacher/EditCourse";

// Admin Pages & Admin Login
import AdminDashboard from "../pages/admin/Dashboard";
import AdminLogin from "../pages/admin/AdminLogin";
import UserManagement from "../pages/admin/UserManagement";
import CourseApproval from "../pages/admin/CourseApproval";
import RevenueAnalytics from "../pages/admin/RevenueAnalytics";
import CategoryManagement from "../pages/admin/CategoryManagement";
import PromotionManagement from "../pages/admin/PromotionManagement";
import PaymentManagement from "../pages/admin/PaymentManagement";
import CertificateManagement from "../pages/admin/CertificateManagement";
import CertificateConfig from "../pages/admin/CertificateConfig";
import SystemSettings from "../pages/admin/SystemSettings";

const HomeRouter = () => {
  const userStored = localStorage.getItem("elearning_user");
  if (!userStored) return <Home />;

  try {
    const currentUser = JSON.parse(userStored);
    if (currentUser.role === "student") return <StudentDashboard />;
    if (currentUser.role === "teacher") return <TeacherDashboard />;
    // Admin không nên dùng chung kho elearning_user, nhưng nếu có thì điều hướng chuẩn
    if (currentUser.role === "admin")
      return <Navigate to="/admin/dashboard" replace />;
  } catch (err) {
    console.error("Lỗi đọc user:", err);
  }
  return <Home />;
};

const ProtectedRoute = ({ allowedRoles, children }) => {
  // 1. Kiểm tra riêng nếu route thuộc về Admin (Sử dụng kho lưu trữ admin riêng biệt)
  if (
    allowedRoles &&
    allowedRoles.includes("admin") &&
    allowedRoles.length === 1
  ) {
    const adminStored = localStorage.getItem("admin_user");
    if (!adminStored) return <Navigate to="/system-control-login" replace />;

    try {
      const currentAdmin = JSON.parse(adminStored);
      if (currentAdmin.role !== "admin") {
        return <Navigate to="/system-control-login" replace />;
      }
      return children;
    } catch (err) {
      localStorage.removeItem("admin_user");
      localStorage.removeItem("admin_token");
      return <Navigate to="/system-control-login" replace />;
    }
  }

  // 2. Kiểm tra cho các phân quyền thông thường (Student / Teacher)
  const userStored = localStorage.getItem("elearning_user");
  if (!userStored) return <Navigate to="/login" replace />;

  try {
    const currentUser = JSON.parse(userStored);
    if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
      return <Navigate to="/" replace />;
    }
    return children;
  } catch (err) {
    localStorage.removeItem("elearning_user");
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
};

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomeRouter />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

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

      <Route
        path="/courses/:id/learn"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <CourseLearn />
          </ProtectedRoute>
        }
      />

      {/* --- TEACHER PORTAL --- */}
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
          element={<TeacherEditCourse />}
        />
        <Route
          path="/teacher/courses/:id/exams"
          element={<TeacherExamsManager />}
        />
        <Route path="/teacher/analytics" element={<TeacherAnalytics />} />
        <Route path="/teacher/profile" element={<TeacherProfile />} />
      </Route>

      {/* --- ADMIN PORTAL --- */}
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
        <Route
          path="/admin/certificates/config"
          element={<CertificateConfig />}
        />
        <Route path="/admin/settings" element={<SystemSettings />} />
      </Route>

      {/* --- AUTHENTICATION --- */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="/system-control-login" element={<AdminLogin />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
