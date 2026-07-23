import { useState, useEffect } from "react";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("info");
  const [enrolledCount, setEnrolledCount] = useState(0);

  useEffect(() => {
    // Đọc danh sách khóa học đã đăng ký từ localStorage để đồng bộ tuyệt đối với các trang khác
    const userStored = localStorage.getItem("elearning_user");
    if (userStored) {
      const user = JSON.parse(userStored);
      const count = user.enrolledCourses ? user.enrolledCourses.length : 3;
      setEnrolledCount(count);
    } else {
      setEnrolledCount(3); // Mặc định nếu chưa có session
    }
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header Profile */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/70 p-6 mb-8 flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white text-3xl font-bold rounded-full flex items-center justify-center shadow-lg shadow-blue-200">
          K
        </div>
        <div className="text-center md:text-left flex-1">
          <h1 className="text-2xl font-black text-slate-900">
            Khánh / Đức Anh
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Học viên tiếng Anh • Mục tiêu: IELTS 7.0+
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
            <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-100">
              🔥 Chuỗi 15 ngày học liên tiếp
            </span>
            <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-100">
              📚 Đã học 340 từ vựng
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
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    defaultValue="Khánh / Đức Anh"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-blue-600 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Địa chỉ Email
                  </label>
                  <input
                    type="email"
                    defaultValue="student@englishlearning.com"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none text-xs font-medium bg-slate-50 text-slate-500"
                    disabled
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Email dùng để đăng nhập và nhận thông báo khóa học.
                  </span>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập số điện thoại của bạn"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-blue-600 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mục tiêu học tập
                  </label>
                  <select className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-blue-600 text-xs font-medium bg-white">
                    <option>IELTS 7.0+</option>
                    <option>Giao tiếp tiếng Anh công sở</option>
                    <option>Lấy gốc phát âm & Ngữ pháp</option>
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
              <h2 className="text-base font-extrabold text-slate-900 mb-4 pb-3 border-b border-slate-100">
                Thống kê kết quả học tập
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-1">
                  <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider">
                    Khóa học đã đăng ký
                  </span>
                  <p className="text-2xl font-black text-slate-900">
                    {enrolledCount} Khóa
                  </p>
                </div>
                <div className="p-5 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-1">
                  <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-wider">
                    Từ vựng đã thuộc
                  </span>
                  <p className="text-2xl font-black text-slate-900">340 Từ</p>
                </div>
                <div className="p-5 bg-amber-50/50 rounded-2xl border border-amber-100 space-y-1">
                  <span className="text-[10px] font-extrabold text-amber-600 uppercase tracking-wider">
                    Bài tập đã hoàn thành
                  </span>
                  <p className="text-2xl font-black text-slate-900">28 Bài</p>
                </div>
                <div className="p-5 bg-purple-50/50 rounded-2xl border border-purple-100 space-y-1">
                  <span className="text-[10px] font-extrabold text-purple-600 uppercase tracking-wider">
                    Điểm kiểm tra trung bình
                  </span>
                  <p className="text-2xl font-black text-slate-900">8.5/10</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "password" && (
            <div>
              <h2 className="text-base font-extrabold text-slate-900 mb-4 pb-3 border-b border-slate-100">
                Thay đổi mật khẩu tài khoản
              </h2>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mật khẩu hiện tại
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-blue-600 text-xs font-medium"
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
