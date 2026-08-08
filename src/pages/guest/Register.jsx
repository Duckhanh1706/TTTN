import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp. Vui lòng kiểm tra lại!");
      return;
    }

    try {
      // Gửi yêu cầu đăng ký lên Backend để lưu vào cơ sở dữ liệu MySQL
      await authService.register({
        name,
        email,
        password,
        role: "student", // Mặc định là student khi đăng ký qua form
      });

      alert("Đăng ký tài khoản thành công! Vui lòng đăng nhập.");
      navigate("/login", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Đăng ký thất bại, email này có thể đã được sử dụng.",
      );
    }
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
          Nhập thông tin cá nhân để tạo tài khoản mới trên hệ thống
        </p>
      </div>

      {error && (
        <div className="mb-3 p-3 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-xs font-semibold">
          {error}
        </div>
      )}

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
