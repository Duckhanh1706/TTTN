import { Outlet, Link } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F8FAFC]">
      {/* Cột trái: Brand / Hình ảnh minh họa đồng bộ phong cách với trang About */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 p-12 flex-col justify-between text-white relative overflow-hidden">
        {/* Hiệu ứng ánh sáng nền giống phần Hero */}
        <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-blue-600/25 rounded-full blur-3xl pointer-events-none"></div>

        {/* Logo / Tên hệ thống */}
        <div className="relative z-10">
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-tight flex items-center gap-2"
          >
            <span className="bg-blue-500/25 text-blue-300 px-3 py-1 rounded-full border border-blue-400/20 text-sm">
              EL
            </span>
            E-Learning English
          </Link>
        </div>

        {/* Nội dung giới thiệu */}
        <div className="relative z-10 max-w-lg space-y-4 animate-fade-in-up">
          <span className="inline-block py-1.5 px-4 rounded-full bg-blue-500/25 text-blue-300 font-bold text-xs uppercase tracking-wider border border-blue-400/20">
            Nền tảng học tập thông minh
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Sứ mệnh kiến tạo thế hệ công dân toàn cầu
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Hệ thống học tập trực tuyến kết hợp công nghệ AI tiên tiến, giúp bạn
            chinh phục ngoại ngữ chuẩn hóa, hiệu quả và tối ưu thời gian nhất.
          </p>
        </div>

        {/* Footer nhỏ bên dưới */}
        <div className="relative z-10 text-xs font-semibold text-slate-400 tracking-wider">
          &copy; 2026 E-Learning System. All rights reserved.
        </div>
      </div>

      {/* Cột phải: Khu vực chứa Form đăng nhập / đăng ký (Outlet) */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/70 shadow-sm animate-fade-in-up">
          {/* Outlet sẽ render component Login hoặc Register tại đây */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
