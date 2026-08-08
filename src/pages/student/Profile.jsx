import React, { useState, useEffect } from "react";
import { enrollmentService } from "../../services/enrollmentService";
import { lessonService } from "../../services/lessonService";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("info");
  const [stats, setStats] = useState({
    enrolledCount: 0,
    completedCount: 0,
    certificatesCount: 0,
  });
  const [user, setUser] = useState({
    name: "Học viên",
    email: "student@learning.com",
    phone: "",
    goal: "IELTS 7.0+",
  });

  useEffect(() => {
    // 1. Lấy thông tin user từ localStorage
    const userStored = localStorage.getItem("elearning_user");
    if (userStored) {
      try {
        const parsedUser = JSON.parse(userStored);
        setUser({
          name: parsedUser.name || parsedUser.username || "Học viên",
          email: parsedUser.email || "student@learning.com",
          phone: parsedUser.phone || "",
          goal: parsedUser.goal || "IELTS 7.0+",
        });
      } catch (e) {}
    }

    // 2. Tính toán chính xác số khóa học, số khóa hoàn thành và số chứng chỉ từ CSDL/localStorage
    const fetchRealStats = async () => {
      try {
        const response = await enrollmentService.getMyCourses();
        let coursesList = [];
        if (Array.isArray(response)) {
          coursesList = response;
        } else if (response && Array.isArray(response.courses)) {
          coursesList = response.courses;
        } else if (response && Array.isArray(response.data)) {
          coursesList = response.data;
        } else if (response && Array.isArray(response.enrollments)) {
          coursesList = response.enrollments;
        }

        // Tính tiến độ thời gian thực cho từng khóa học
        let completedCourses = 0;
        for (const item of coursesList) {
          const course = item.course || item.Course || item;
          if (!course || !course.id) continue;
          const courseId = course.id;

          // Lấy danh sách bài đã học trong localStorage
          const savedCompleted = localStorage.getItem(
            `completed_lessons_${courseId}`,
          );
          const completedArray = savedCompleted
            ? JSON.parse(savedCompleted)
            : [];
          const completedCount = completedArray.length;

          // Lấy tổng số bài học từ CSDL
          let totalLessons = 0;
          try {
            const lessons = await lessonService.getLessonsByCourse(courseId);
            if (Array.isArray(lessons)) {
              totalLessons = lessons.length;
            }
          } catch (e) {
            totalLessons = Number(course.lessons || course.lessons_count || 0);
          }

          // Nếu có bài học và đã hoàn thành 100%
          if (totalLessons > 0 && completedCount >= totalLessons) {
            completedCourses++;
          }
        }

        setStats({
          enrolledCount: coursesList.length,
          completedCount: completedCourses,
          certificatesCount: completedCourses, // 1 khóa hoàn thành = 1 chứng chỉ
        });
      } catch (err) {
        console.error("Lỗi tải thống kê:", err);
      }
    };

    fetchRealStats();
  }, []);

  // Xử lý cập nhật thông tin cá nhân
  const handleUpdateInfo = (e) => {
    e.preventDefault();
    const updatedUser = { ...user };
    localStorage.setItem("elearning_user", JSON.stringify(updatedUser));
    alert("Cập nhật thông tin cá nhân thành công!");
  };

  // Xử lý đổi mật khẩu
  const handleChangePassword = (e) => {
    e.preventDefault();
    alert("Đổi mật khẩu thành công!");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header Profile */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/70 p-6 mb-8 flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white text-3xl font-bold rounded-full flex items-center justify-center shadow-lg shadow-blue-200 uppercase shrink-0">
          {user.name ? user.name.charAt(0) : "U"}
        </div>
        <div className="text-center md:text-left flex-1">
          <h1 className="text-2xl font-black text-slate-900">{user.name}</h1>
          <p className="text-slate-500 text-xs mt-1">
            {user.email} • Mục tiêu: {user.goal}
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
            <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-100">
              🔥 Học viên tích cực
            </span>
            <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-100">
              🎓 Đã đạt {stats.certificatesCount} chứng chỉ
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar menu trong Profile */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200/70 h-fit space-y-1">
          <button
            onClick={() => setActiveTab("info")}
            className={`w-full text-left px-4 py-3 rounded-2xl font-bold text-xs transition-all ${
              activeTab === "info"
                ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            👤 Thông tin tài khoản
          </button>
          <button
            onClick={() => setActiveTab("stats")}
            className={`w-full text-left px-4 py-3 rounded-2xl font-bold text-xs transition-all ${
              activeTab === "stats"
                ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            📊 Thống kê học tập
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`w-full text-left px-4 py-3 rounded-2xl font-bold text-xs transition-all ${
              activeTab === "password"
                ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            🔒 Đổi mật khẩu
          </button>
        </div>

        {/* Form hiển thị theo Tab */}
        <div className="md:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-200/70">
          {activeTab === "info" && (
            <div>
              <h2 className="text-base font-extrabold text-slate-900 mb-4 pb-3 border-b border-slate-100">
                Chỉnh sửa thông tin cá nhân
              </h2>
              <form className="space-y-4" onSubmit={handleUpdateInfo}>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-blue-600 text-xs font-medium text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Địa chỉ Email
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none text-xs font-medium bg-slate-50 text-slate-500"
                    disabled
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Email dùng để đăng nhập và nhận thông báo khóa học (Không
                    thể thay đổi).
                  </span>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    value={user.phone || ""}
                    onChange={(e) =>
                      setUser({ ...user, phone: e.target.value })
                    }
                    placeholder="Nhập số điện thoại của bạn"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-blue-600 text-xs font-medium text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mục tiêu học tập
                  </label>
                  <select
                    value={user.goal}
                    onChange={(e) => setUser({ ...user, goal: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-blue-600 text-xs font-medium bg-white text-slate-800"
                  >
                    <option value="IELTS 7.0+">IELTS 7.0+</option>
                    <option value="Giao tiếp tiếng Anh công sở">
                      Giao tiếp tiếng Anh công sở
                    </option>
                    <option value="Lấy gốc phát âm & Ngữ pháp">
                      Lấy gốc phát âm & Ngữ pháp
                    </option>
                  </select>
                </div>
                <div className="pt-4">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20 text-xs uppercase tracking-wider"
                  >
                    Lưu thay đổi
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "stats" && (
            <div>
              <h2 className="text-base font-extrabold text-slate-900 mb-6 pb-3 border-b border-slate-100">
                Thống kê kết quả học tập thực tế
              </h2>
              {/* Bố cục ngang chuẩn 3 cột, hiển thị cân đối không bị lệch chữ */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="p-5 bg-blue-50/60 rounded-2xl border border-blue-100 flex flex-col justify-between space-y-3">
                  <span className="text-[11px] font-extrabold text-blue-700 uppercase tracking-wide leading-tight">
                    Đã đăng ký
                  </span>
                  <p className="text-3xl font-black text-slate-900">
                    {stats.enrolledCount}{" "}
                    <span className="text-xs font-bold text-slate-500">
                      Khóa
                    </span>
                  </p>
                </div>

                <div className="p-5 bg-emerald-50/60 rounded-2xl border border-emerald-100 flex flex-col justify-between space-y-3">
                  <span className="text-[11px] font-extrabold text-emerald-700 uppercase tracking-wide leading-tight">
                    Đã hoàn thành
                  </span>
                  <p className="text-3xl font-black text-slate-900">
                    {stats.completedCount}{" "}
                    <span className="text-xs font-bold text-slate-500">
                      Khóa
                    </span>
                  </p>
                </div>

                <div className="p-5 bg-purple-50/60 rounded-2xl border border-purple-100 flex flex-col justify-between space-y-3">
                  <span className="text-[11px] font-extrabold text-purple-700 uppercase tracking-wide leading-tight">
                    Chứng chỉ
                  </span>
                  <p className="text-3xl font-black text-slate-900">
                    {stats.certificatesCount}{" "}
                    <span className="text-xs font-bold text-slate-500">
                      Bằng
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "password" && (
            <div>
              <h2 className="text-base font-extrabold text-slate-900 mb-4 pb-3 border-b border-slate-100">
                Thay đổi mật khẩu tài khoản
              </h2>
              <form className="space-y-4" onSubmit={handleChangePassword}>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mật khẩu hiện tại
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-blue-600 text-xs font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mật khẩu mới
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-blue-600 text-xs font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Xác nhận mật khẩu mới
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-blue-600 text-xs font-medium"
                    required
                  />
                </div>
                <div className="pt-4">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20 text-xs uppercase tracking-wider"
                  >
                    Cập nhật mật khẩu
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
