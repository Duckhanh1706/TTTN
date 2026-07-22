import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MOCK_USERS from "../../data/mockUsers.json";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const foundUser = MOCK_USERS.find(
      (user) => user.email === email && user.password === password,
    );

    if (foundUser) {
      localStorage.setItem("elearning_user", JSON.stringify(foundUser));

      let redirectPath = "/";
      if (foundUser.role === "admin") {
        redirectPath = "/admin";
      } else if (foundUser.role === "teacher") {
        redirectPath = "/teacher";
      } else {
        redirectPath = "/";
      }

      navigate(redirectPath, { replace: true });
    } else {
      setError(
        "Email hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại thông tin!",
      );
    }
  };

  return (
    <div className="login-page min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 p-12 text-white relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <Link
            to="/"
            className="text-2xl font-black tracking-tight text-white"
          >
            E-<span className="text-blue-500">Learning</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-lg space-y-4 my-auto">
          <span className="inline-block py-1.5 px-4 rounded-full bg-blue-500/20 text-blue-300 font-bold text-xs uppercase tracking-wider border border-blue-400/20">
            Nền tảng học tập thông minh
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight leading-snug">
            Chinh phục mục tiêu ngoại ngữ cùng chuyên gia hàng đầu.
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Hệ thống lộ trình chuẩn hóa kết hợp công nghệ luyện tập độc quyền
            giúp bạn bứt phá band điểm nhanh chóng.
          </p>
        </div>

        <div className="relative z-10 text-xs text-slate-400 font-medium">
          © 2026 E-Learning Platform. All rights reserved.
        </div>
      </div>

      <div className="flex flex-col justify-center items-center p-8 sm:p-12 lg:p-16 bg-[#F8FAFC] lg:bg-white">
        <div className="max-w-md w-full bg-white lg:bg-transparent rounded-3xl lg:rounded-none p-6 sm:p-8 lg:p-0 border border-slate-200/70 lg:border-none shadow-xl lg:shadow-none shadow-slate-200/50 animate-fade-in-up">
          <div className="mb-8">
            <div className="lg:hidden mb-6">
              <Link
                to="/"
                className="text-xl font-black tracking-tight text-slate-900"
              >
                E-<span className="text-blue-600">Learning</span>
              </Link>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Đăng nhập tài khoản
            </h1>
            <p className="text-xs text-slate-500 mt-2">
              Nhập thông tin chi tiết để tiếp tục vào hệ thống học tập
            </p>
          </div>

          {error && (
            <div className="mb-5 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-xs font-semibold animate-fade-in-up">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Email đăng nhập
              </label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-700">
                  Mật khẩu
                </label>
                <a
                  href="#"
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  Quên mật khẩu?
                </a>
              </div>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-blue-600 py-4 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-blue-700 shadow-lg shadow-blue-600/25 active:scale-95"
            >
              Đăng nhập ngay
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-slate-500 font-medium">
            Chưa có tài khoản trên hệ thống?{" "}
            <Link
              to="/register"
              className="font-bold text-blue-600 hover:underline"
            >
              Đăng ký miễn phí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
