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
        redirectPath = "/admin/dashboard";
      } else if (foundUser.role === "teacher") {
        redirectPath = "/teacher/dashboard";
      } else {
        redirectPath = "/dashboard";
      }

      navigate(redirectPath, { replace: true });
    } else {
      setError(
        "Email hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại thông tin!",
      );
    }
  };

  return (
    <div className="login-form-container">
      <div className="mb-6">
        <div className="lg:hidden mb-4">
          <Link
            to="/"
            className="text-xl font-black tracking-tight text-slate-900"
          >
            E-<span className="text-blue-600">Learning English</span>
          </Link>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Đăng nhập tài khoản
        </h1>
        <p className="text-xs text-slate-500 mt-1.5">
          Nhập thông tin chi tiết để tiếp tục vào hệ thống học tập
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3.5 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-xs font-semibold">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Email đăng nhập
          </label>
          <input
            type="email"
            required
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
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
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-2xl bg-blue-600 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-blue-700 shadow-lg shadow-blue-600/25 active:scale-95"
        >
          Đăng nhập ngay
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-slate-500 font-medium">
        Chưa có tài khoản trên hệ thống?{" "}
        <Link
          to="/register"
          className="font-bold text-blue-600 hover:underline"
        >
          Đăng ký miễn phí
        </Link>
      </p>
    </div>
  );
}

export default Login;
