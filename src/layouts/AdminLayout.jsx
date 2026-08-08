import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaUsers,
  FaBook,
  FaLayerGroup,
  FaTags,
  FaReceipt,
  FaCertificate,
  FaSlidersH,
  FaSignOutAlt,
  FaShieldAlt,
  FaChartBar,
} from "react-icons/fa";

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("elearning_user");
    navigate("/login", { replace: true });
  };

  // Đã xóa mục "Tổng quan Dashboard" khỏi danh sách này
  const menuItems = [
    { path: "/admin/users", name: "Quản lý người dùng", icon: <FaUsers /> },
    { path: "/admin/courses", name: "Duyệt khóa học", icon: <FaBook /> },
    {
      path: "/admin/analytics",
      name: "Thống kê doanh thu",
      icon: <FaChartBar />,
    },
    {
      path: "/admin/categories",
      name: "Quản lý danh mục",
      icon: <FaLayerGroup />,
    },
    { path: "/admin/promotions", name: "Mã giảm giá", icon: <FaTags /> },
    {
      path: "/admin/payments",
      name: "Quản lý thanh toán",
      icon: <FaReceipt />,
    },
    {
      path: "/admin/certificates",
      name: "Quản lý chứng chỉ",
      icon: <FaCertificate />,
    },
    { path: "/admin/settings", name: "Cài đặt hệ thống", icon: <FaSlidersH /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      {/* Sidebar Quản trị cố định bên trái */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col justify-between border-r border-slate-800 shrink-0">
        <div className="p-6 space-y-8">
          {/* Logo & Tiêu đề hệ thống */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-600 flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-red-600/30">
              <FaShieldAlt />
            </div>
            <div>
              <h3 className="font-black text-sm uppercase tracking-wider">
                Admin Portal
              </h3>
              <p className="text-[10px] text-slate-400">
                Hệ thống Quản trị E-Learning
              </p>
            </div>
          </div>

          {/* Menu Điều hướng quản trị */}
          <nav className="space-y-1.5 text-xs font-bold">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition ${
                    isActive
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/25"
                      : "hover:bg-slate-800 text-slate-300 hover:text-white"
                  }`}
                >
                  <span className="text-sm">{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Nút đăng xuất */}
        <div className="p-6 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white transition text-xs font-bold"
          >
            <FaSignOutAlt className="text-sm" /> Đăng xuất hệ thống
          </button>
        </div>
      </aside>

      {/* Main Content Area bên phải */}
      <main className="flex-1 overflow-y-auto min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
