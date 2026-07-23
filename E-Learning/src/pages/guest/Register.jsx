import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MOCK_USERS from "../../data/mockUsers.json";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp. Vui lòng kiểm tra lại!");
      return;
    }

    const existingUsers =
      JSON.parse(localStorage.getItem("elearning_custom_users")) || MOCK_USERS;
    const userExists = existingUsers.some((u) => u.email === email);

    if (userExists) {
      setError(
        "Email này đã được đăng ký trên hệ thống. Vui lòng chọn email khác!",
      );
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role: "student",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
    };

    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem(
      "elearning_custom_users",
      JSON.stringify(updatedUsers),
    );
    localStorage.setItem("elearning_user", JSON.stringify(newUser));

    navigate("/", { replace: true });
  };

  const handleGoogleRegister = () => {
    const googleUser = {
      id: Date.now(),
      name: "Google User",
      email: "google.user@gmail.com",
      role: "student",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
    };

    const existingUsers =
      JSON.parse(localStorage.getItem("elearning_custom_users")) || MOCK_USERS;
    const userExists = existingUsers.some((u) => u.email === googleUser.email);

    if (!userExists) {
      const updatedUsers = [...existingUsers, googleUser];
      localStorage.setItem(
        "elearning_custom_users",
        JSON.stringify(updatedUsers),
      );
    }

    localStorage.setItem("elearning_user", JSON.stringify(googleUser));
    navigate("/", { replace: true });
  };

  return (
    <div className="register-form-container">
      <div className="mb-4">
        <div className="lg:hidden mb-3">
          <Link
            to="/"
            className="text-xl font-black tracking-tight text-slate-900"
          >
            E-<span className="text-blue-600">Learning English</span>
          </Link>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Đăng ký tài khoản
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Lựa chọn phương thức đăng ký nhanh chóng để vào hệ thống
        </p>
      </div>

      {error && (
        <div className="mb-3 p-3 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-xs font-semibold">
          {error}
        </div>
      )}

      {/* Social Register Button */}
      <div className="mb-4">
        <button
          type="button"
          onClick={handleGoogleRegister}
          className="w-full flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white py-3 px-4 text-xs font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-95"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.19v3.15C3.18 21.32 7.21 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.19C.43 8.1 0 9.8 0 12s.43 3.9 1.19 5.42l4.09-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.21 0 3.18 2.68 1.19 6.58l4.09 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          Đăng ký nhanh với Google
        </button>
      </div>

      <div className="relative flex items-center justify-center mb-4">
        <div className="border-t border-slate-200 w-full"></div>
        <span className="absolute bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Hoặc dùng email
        </span>
      </div>

      <form onSubmit={handleRegister} className="space-y-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Họ và tên
          </label>
          <input
            type="text"
            required
            placeholder="Nguyễn Văn A"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Email đăng ký
          </label>
          <input
            type="email"
            required
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Mật khẩu
          </label>
          <input
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Xác nhận mật khẩu
          </label>
          <input
            type="password"
            required
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-2xl bg-blue-600 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-blue-700 shadow-lg shadow-blue-600/25 active:scale-95 mt-1"
        >
          Đăng ký tài khoản
        </button>
      </form>

      <p className="mt-4 text-center text-xs text-slate-500 font-medium">
        Đã có tài khoản trên hệ thống?{" "}
        <Link to="/login" className="font-bold text-blue-600 hover:underline">
          Đăng nhập ngay
        </Link>
      </p>
    </div>
  );
}

export default Register;
