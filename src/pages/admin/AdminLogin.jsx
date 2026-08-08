import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShieldAlt } from "react-icons/fa";
import { authService } from "../../services/authService";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Gọi đúng API đăng nhập chuyên biệt dành cho Admin ở Backend
      await authService.adminLogin({ email, password });

      navigate("/admin/dashboard", { replace: true });
      window.location.reload();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Email hoặc mật khẩu quản trị không chính xác. Vui lòng kiểm tra lại thông tin!",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200/70 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto text-xl font-bold">
            <FaShieldAlt />
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
            Khu vực Quản trị tối cao
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Đăng nhập Admin
          </h1>
          <p className="text-xs text-slate-500">
            Xác thực tài khoản quản trị hệ thống E-Learning
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Email quản trị
            </label>
            <input
              type="email"
              required
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Mật khẩu bảo mật
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-indigo-600 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-indigo-700 shadow-lg shadow-indigo-600/25 active:scale-95 disabled:opacity-50"
          >
            {loading ? "Đang xác thực bảo mật..." : "Xác thực & Truy cập Admin"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
