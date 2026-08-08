import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaBook,
  FaSignOutAlt,
  FaChalkboardTeacher,
  FaUser,
  FaShoppingCart,
  FaChartBar,
} from "react-icons/fa";
import { courseService } from "../../services/courseService";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [isOpenAvatarMenu, setIsOpenAvatarMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const searchRef = useRef(null);
  const avatarMenuRef = useRef(null);
  const navigate = useNavigate();

  // Đọc user và danh sách khóa học thực tế để làm thanh tìm kiếm
  useEffect(() => {
    const userStored = localStorage.getItem("elearning_user");
    if (userStored) {
      try {
        setCurrentUser(JSON.parse(userStored));
      } catch (err) {
        console.error("Lỗi đọc thông tin user:", err);
      }
    }

    // Lấy số lượng giỏ hàng thực tế từ localStorage
    const updateCartCount = () => {
      const cart =
        JSON.parse(localStorage.getItem("elearning_cart_items")) || [];
      setCartCount(cart.length);
    };

    updateCartCount();
    // Lắng nghe sự kiện thay đổi giỏ hàng từ các tab/component khác
    window.addEventListener("storage", updateCartCount);

    // Custom event để cập nhật ngay lập tức trong cùng tab
    window.addEventListener("cartUpdated", updateCartCount);

    // Lấy danh sách khóa học thật từ Backend phục vụ thanh tìm kiếm
    const fetchCoursesForSearch = async () => {
      try {
        const data = await courseService.getAllCourses();
        setAllCourses(Array.isArray(data) ? data : data.courses || []);
      } catch (err) {
        console.error("Lỗi tải khóa học cho tìm kiếm:", err);
      }
    };

    fetchCoursesForSearch();

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  // X xử lý tìm kiếm thực tế từ Database
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setIsOpenSearch(false);
    } else {
      const filtered = allCourses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setSearchResults(filtered);
      setIsOpenSearch(true);
    }
  }, [searchQuery, allCourses]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpenSearch(false);
      }
      if (
        avatarMenuRef.current &&
        !avatarMenuRef.current.contains(event.target)
      ) {
        setIsOpenAvatarMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("elearning_user");
    setCurrentUser(null);
    setIsOpenAvatarMenu(false);
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          to={currentUser?.role === "teacher" ? "/teacher/dashboard" : "/"}
          className="text-3xl font-extrabold text-blue-600"
        >
          E-Learning
        </Link>

        {/* Menu động theo phân quyền (Chỉ hiển thị cho học viên hoặc khách, giảng viên ẩn menu ngang chính) */}
        <nav>
          <ul className="flex items-center gap-8 text-[15px] font-medium">
            {(!currentUser || currentUser.role === "student") && (
              <>
                <li>
                  <Link to="/" className="transition hover:text-blue-600">
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/courses"
                    className="transition hover:text-blue-600"
                  >
                    Khóa học
                  </Link>
                </li>
                <li>
                  <Link
                    to="/practice"
                    className="transition hover:text-blue-600"
                  >
                    Luyện đề
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="transition hover:text-blue-600">
                    Blog
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Right Area */}
        <div className="flex items-center gap-4">
          {(!currentUser || currentUser.role === "student") && (
            <div className="relative" ref={searchRef}>
              <div className="flex items-center rounded-full border border-gray-300 px-4 py-2 bg-gray-50/50 focus-within:border-blue-600 focus-within:bg-white transition-all">
                <FaSearch className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm khóa học..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="ml-3 w-40 bg-transparent outline-none text-xs font-medium text-slate-800"
                />
              </div>

              {isOpenSearch && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
                  <div className="p-3 bg-slate-50 border-b border-slate-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Kết quả tìm kiếm ({searchResults.length})
                    </span>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {searchResults.length > 0 ? (
                      searchResults.map((course) => (
                        <Link
                          key={course.id}
                          to={`/courses/${course.id}`}
                          onClick={() => {
                            setIsOpenSearch(false);
                            setSearchQuery("");
                          }}
                          className="flex items-center gap-3 p-3 hover:bg-blue-50/50 transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-slate-800 truncate">
                              {course.title}
                            </h4>
                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                              {course.category}
                            </span>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="p-6 text-center text-xs text-slate-500 font-medium">
                        Không tìm thấy khóa học phù hợp.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {currentUser && currentUser.role === "student" && (
            <Link
              to="/cart"
              className="relative p-2.5 rounded-full border border-gray-300 text-gray-600 hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50/50 transition-all flex items-center justify-center"
              title="Giỏ hàng khóa học"
            >
              <FaShoppingCart className="text-base" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          {currentUser ? (
            <div className="relative" ref={avatarMenuRef}>
              <button
                onClick={() => setIsOpenAvatarMenu(!isOpenAvatarMenu)}
                className="flex items-center gap-3 focus:outline-none transition group"
              >
                <img
                  src={
                    currentUser.avatar ||
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                  }
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-600/30 group-hover:ring-blue-600 transition-all shadow-sm"
                />
              </button>

              {isOpenAvatarMenu && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-50">
                  <div className="p-4 bg-gradient-to-br from-slate-900 to-blue-950 text-white">
                    <p className="text-xs font-bold truncate">
                      {currentUser.name}
                    </p>
                    <p className="text-[11px] text-slate-300 truncate mt-0.5">
                      {currentUser.email}
                    </p>
                    <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-blue-500/30 text-blue-300 border border-blue-400/30">
                      Vai trò: {currentUser.role}
                    </span>
                  </div>

                  <div className="p-2 divide-y divide-slate-100">
                    {currentUser.role === "teacher" ? (
                      <div className="py-1 space-y-1">
                        <Link
                          to="/teacher/dashboard"
                          onClick={() => setIsOpenAvatarMenu(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                        >
                          <FaChalkboardTeacher className="text-indigo-600 text-sm" />{" "}
                          Tổng quan giảng dạy
                        </Link>
                        <Link
                          to="/teacher/analytics"
                          onClick={() => setIsOpenAvatarMenu(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                        >
                          <FaChartBar className="text-indigo-600 text-sm" />{" "}
                          Thống kê doanh thu
                        </Link>
                        <Link
                          to="/teacher/profile"
                          onClick={() => setIsOpenAvatarMenu(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                        >
                          <FaUser className="text-indigo-600 text-sm" /> Hồ sơ
                          giảng viên
                        </Link>
                      </div>
                    ) : (
                      <div className="py-1">
                        <Link
                          to="/profile"
                          onClick={() => setIsOpenAvatarMenu(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                        >
                          Thông tin cá nhân
                        </Link>
                        <Link
                          to="/my-courses"
                          onClick={() => setIsOpenAvatarMenu(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                        >
                          <FaBook className="text-emerald-600 text-sm" /> Khóa
                          học của tôi
                        </Link>
                      </div>
                    )}

                    <div className="py-1 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors text-left"
                      >
                        <FaSignOutAlt className="text-red-500 text-sm" /> Đăng
                        xuất hệ thống
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="font-medium transition hover:text-blue-600 text-sm"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-white text-sm font-bold transition hover:bg-blue-700 shadow-md shadow-blue-600/20"
              >
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
