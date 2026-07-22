import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        {/* Cột 1: Thông tin thương hiệu */}
        <div className="space-y-4 md:col-span-1">
          <span className="font-black text-xl text-white tracking-tight">
            Lumina<span className="text-blue-500">Learning</span>
          </span>
          <p className="text-xs text-slate-400 leading-relaxed">
            Nền tảng học tập trực tuyến thông minh, chuẩn hóa lộ trình luyện thi
            ngoại ngữ giúp bạn bứt phá band điểm nhanh chóng.
          </p>
        </div>

        {/* Cột 2: Khám phá nhanh */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
            Khám phá
          </h4>
          <ul className="space-y-2.5 text-xs font-semibold">
            <li>
              <Link to="/" className="hover:text-blue-400 transition-colors">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                className="hover:text-blue-400 transition-colors"
              >
                Khóa học
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-blue-400 transition-colors"
              >
                Về chúng tôi
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-blue-400 transition-colors"
              >
                Liên hệ
              </Link>
            </li>
          </ul>
        </div>

        {/* Cột 3: Chương trình học */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
            Chương trình học
          </h4>
          <ul className="space-y-2.5 text-xs font-semibold text-slate-400">
            <li>
              <Link
                to="/courses"
                className="hover:text-blue-400 transition-colors"
              >
                Luyện thi IELTS
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                className="hover:text-blue-400 transition-colors"
              >
                Luyện thi TOEIC
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                className="hover:text-blue-400 transition-colors"
              >
                Tiếng Anh Giao Tiếp
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                className="hover:text-blue-400 transition-colors"
              >
                Ngữ pháp căn bản
              </Link>
            </li>
          </ul>
        </div>

        {/* Cột 4: Hỗ trợ & Mạng xã hội */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
            Hỗ trợ học viên
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Hotline: 1900 xxxx (8:00 - 22:00)
            <br />
            Email: support@elearning.vn
          </p>
          <div className="flex gap-3 text-xs font-semibold">
            <span className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer text-white">
              FB
            </span>
            <span className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer text-white">
              YT
            </span>
            <span className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer text-white">
              IG
            </span>
          </div>
        </div>
      </div>

      {/* Copyright & Policy */}
      <div className="max-w-7xl mx-auto px-6 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>© 2026 Lumina Learning. All rights reserved.</p>
        <div className="flex gap-6 font-semibold">
          <a href="#" className="hover:text-slate-300 transition-colors">
            Chính sách bảo mật
          </a>
          <a href="#" className="hover:text-slate-300 transition-colors">
            Điều khoản dịch vụ
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
