import { FaShieldAlt } from "react-icons/fa";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Banner Chào mừng Quản trị viên kết hợp Hình ảnh minh họa */}
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-10 text-white shadow-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Hiệu ứng trang trí nền */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 bg-red-600/20 text-red-400 border border-red-500/30 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
              <FaShieldAlt /> Khu vực Quản trị tối cao
            </div>

            <h1 className="text-3xl font-black tracking-tight">
              Chào mừng trở lại, Quản trị viên! 👋
            </h1>

            <p className="text-xs text-slate-300 leading-relaxed">
              Hệ thống E-Learning đang vận hành ổn định. Sử dụng thanh menu bên
              trái để điều hướng nhanh đến các phân hệ kiểm soát người dùng, phê
              duyệt khóa học và cấu hình toàn hệ thống.
            </p>
          </div>

          {/* Khung chứa hình ảnh minh họa */}
          <div className="relative z-10 shrink-0">
            <img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500"
              alt="Admin Dashboard Illustration"
              className="w-56 h-40 object-cover rounded-2xl shadow-lg ring-4 ring-white/10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
