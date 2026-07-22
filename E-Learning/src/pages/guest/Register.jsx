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
    // Giả lập đăng ký/đăng nhập nhanh bằng tài khoản Google
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
    <div className="register-page min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
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
            Bắt đầu hành trình học tập
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight leading-snug">
            Tạo tài khoản miễn phí và khám phá hàng trăm khóa học chất lượng.
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Đăng ký nhanh chóng qua Google hoặc email để lưu trữ tiến độ và nhận
            tài liệu độc quyền.
          </p>
        </div>

        <div className="relative z-10 text-xs text-slate-400 font-medium">
          © 2026 E-Learning Platform. All rights reserved.
        </div>
      </div>

      <div className="flex flex-col justify-center items-center p-8 sm:p-12 lg:p-16 bg-[#F8FAFC] lg:bg-white">
        <div className="max-w-md w-full bg-white lg:bg-transparent rounded-3xl lg:rounded-none p-6 sm:p-8 lg:p-0 border border-slate-200/70 lg:border-none shadow-xl lg:shadow-none shadow-slate-200/50 animate-fade-in-up">
          <div className="mb-6">
            <div className="lg:hidden mb-6">
              <Link
                to="/"
                className="text-xl font-black tracking-tight text-slate-900"
              >
                E-<span className="text-blue-600">Learning</span>
              </Link>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Đăng ký tài khoản
            </h1>
            <p className="text-xs text-slate-500 mt-2">
              Lựa chọn phương thức đăng ký nhanh chóng để vào hệ thống
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-xs font-semibold animate-fade-in-up">
              {error}
            </div>
          )}

          {/* Social Register Buttons */}
          <div className="space-y-3 mb-6">
            <button
              type="button"
              onClick={handleGoogleRegister}
              className="w-full flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white py-3.5 px-4 text-xs font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-95"
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

          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-slate-200 w-full"></div>
            <span className="absolute bg-[#F8FAFC] lg:bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Hoặc dùng email
            </span>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Họ và tên
              </label>
              <input
                type="text"
                required
                placeholder="Nguyễn Văn A"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Email đăng ký
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
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Mật khẩu
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-blue-600 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-blue-700 shadow-lg shadow-blue-600/25 active:scale-95 mt-2"
            >
              Đăng ký tài khoản
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-500 font-medium">
            Đã có tài khoản trên hệ thống?{" "}
            <Link
              to="/login"
              className="font-bold text-blue-600 hover:underline"
            >
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
