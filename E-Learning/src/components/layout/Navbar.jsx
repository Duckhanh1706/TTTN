import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold text-blue-600">
          E-Learning
        </Link>

        {/* Menu */}
        <nav>
          <ul className="flex items-center gap-8 text-[15px] font-medium">
            <li>
              <Link to="/" className="transition hover:text-blue-600">
                Trang chủ
              </Link>
            </li>

            <li>
              <Link to="/courses" className="transition hover:text-blue-600">
                Khóa học
              </Link>
            </li>

            <li>
              <Link to="/practice" className="transition hover:text-blue-600">
                Luyện đề
              </Link>
            </li>

            <li>
              <Link to="/flashcards" className="transition hover:text-blue-600">
                Flashcards
              </Link>
            </li>

            <li>
              <Link to="/blog" className="transition hover:text-blue-600">
                Blog
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right */}

        <div className="flex items-center gap-5">
          {/* Search */}

          <div className="flex items-center rounded-full border border-gray-300 px-4 py-2">
            <FaSearch className="text-gray-400" />

            <input
              type="text"
              placeholder="Tìm khóa học..."
              className="ml-3 w-52 bg-transparent outline-none"
            />
          </div>

          <Link
            to="/login"
            className="font-medium transition hover:text-blue-600"
          >
            Đăng nhập
          </Link>

          <Link
            to="/register"
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-white transition hover:bg-blue-700"
          >
            Đăng ký
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
