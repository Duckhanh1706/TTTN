import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaUserPlus,
  FaTrash,
  FaSearch,
  FaLock,
  FaUnlock,
} from "react-icons/fa";
import axiosClient from "../../services/axiosClient";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState("all");

  // Hàm gọi API lấy danh sách người dùng thực tế từ Database
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get("/api/admin/users"); // Điều chỉnh endpoint tùy theo backend của bạn
      // Giả sử API trả về mảng user hoặc object chứa mảng user
      const userData = Array.isArray(response.data)
        ? response.data
        : response.data.users || [];
      setUsers(userData);
    } catch (err) {
      console.error("Lỗi khi tải danh sách người dùng:", err);
      setError("Không thể tải danh sách người dùng từ hệ thống.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Xóa người dùng qua API thực
  const handleDeleteUser = async (id) => {
    if (
      window.confirm(
        "Bạn có chắc chắn muốn xóa tài khoản này khỏi cơ sở dữ liệu không?",
      )
    ) {
      try {
        await axiosClient.delete(`/api/admin/users/${id}`);
        // Cập nhật lại state giao diện sau khi xóa thành công
        setUsers(users.filter((user) => user.id !== id));
      } catch (err) {
        console.error("Lỗi khi xóa người dùng:", err);
        alert(err.response?.data?.message || "Không thể xóa người dùng này.");
      }
    }
  };

  // Thay đổi trạng thái Khóa / Mở khóa tài khoản qua API thực
  const handleToggleStatus = async (user) => {
    const newStatus = user.status === "Hoạt động" ? "Đã khóa" : "Hoạt động";
    try {
      await axiosClient.put(`/api/admin/users/${user.id}/status`, {
        status: newStatus,
      });
      setUsers(
        users.map((u) => {
          if (u.id === user.id) {
            return { ...u, status: newStatus };
          }
          return u;
        }),
      );
    } catch (err) {
      console.error("Lỗi cập nhật trạng thái:", err);
      alert("Không thể thay đổi trạng thái tài khoản.");
    }
  };

  // Thay đổi phân quyền (Role) qua API thực
  const handleChangeRole = async (id, newRole) => {
    try {
      await axiosClient.put(`/api/admin/users/${id}/role`, {
        role: newRole,
      });
      setUsers(
        users.map((u) => {
          if (u.id === id) {
            return { ...u, role: newRole };
          }
          return u;
        }),
      );
    } catch (err) {
      console.error("Lỗi phân quyền:", err);
      alert("Không thể thay đổi quyền hạn của tài khoản này.");
    }
  };

  // Lọc danh sách theo từ khóa tìm kiếm và vai trò
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      (user.name &&
        user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.email &&
        user.email.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole =
      selectedRoleFilter === "all" || user.role === selectedRoleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Nút quay lại */}
        <div>
          <Link
            to="/admin/dashboard"
            className="inline-flex items-center gap-2 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 border border-red-100 px-4 py-2 rounded-xl transition"
          >
            <FaArrowLeft /> Quay lại Bảng điều khiển Quản trị
          </Link>
        </div>

        {/* Header & Bộ lọc */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-red-50 text-red-600 px-3 py-1 rounded-full">
              Hệ thống Quản trị
            </span>
            <h1 className="text-2xl font-black text-slate-900">
              Quản lý tài khoản & Phân quyền
            </h1>
            <p className="text-xs text-slate-500">
              Kiểm soát danh sách thành viên, thay đổi phân quyền và trạng thái
              tài khoản từ cơ sở dữ liệu.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 gap-2 w-64">
              <FaSearch className="text-slate-400 text-xs" />
              <input
                type="text"
                placeholder="Tìm tên, email thành viên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent text-xs font-medium text-slate-800 outline-none w-full"
              />
            </div>

            <select
              value={selectedRoleFilter}
              onChange={(e) => setSelectedRoleFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-xs font-bold text-slate-700 outline-none focus:border-red-600 transition"
            >
              <option value="all">Tất cả vai trò</option>
              <option value="student">Học viên</option>
              <option value="teacher">Giảng viên</option>
              <option value="admin">Quản trị viên</option>
            </select>

            <button
              onClick={() => alert("Tính năng thêm thành viên trực tiếp")}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-2xl text-xs font-bold transition shadow-md shadow-red-600/25 whitespace-nowrap"
            >
              <FaUserPlus /> Thêm thành viên
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-xs font-semibold rounded-2xl">
            {error}
          </div>
        )}

        {/* Bảng danh sách User */}
        <div className="bg-white rounded-3xl border border-slate-200/70 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <th className="py-4 px-6">Thành viên</th>
                  <th className="py-4 px-6">Phân quyền (Role)</th>
                  <th className="py-4 px-6">Trạng thái</th>
                  <th className="py-4 px-6 text-right">Thao tác quản trị</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                {loading ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-12 text-center text-slate-400 text-xs italic"
                    >
                      Đang tải dữ liệu từ cơ sở dữ liệu...
                    </td>
                  </tr>
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-slate-900 to-red-950 text-white font-bold flex items-center justify-center text-xs shadow-sm">
                            {user.name
                              ? user.name.charAt(0).toUpperCase()
                              : "U"}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block">
                              {user.name}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {user.email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <select
                            value={user.role}
                            onChange={(e) =>
                              handleChangeRole(user.id, e.target.value)
                            }
                            className={`px-3 py-1.5 rounded-xl text-[11px] font-bold outline-none border transition cursor-pointer ${
                              user.role === "admin"
                                ? "bg-red-50 text-red-600 border-red-200"
                                : user.role === "teacher"
                                  ? "bg-indigo-50 text-indigo-600 border-indigo-200"
                                  : "bg-blue-50 text-blue-600 border-blue-200"
                            }`}
                          >
                            <option value="student">Học viên (Student)</option>
                            <option value="teacher">
                              Giảng viên (Teacher)
                            </option>
                            <option value="admin">Quản trị (Admin)</option>
                          </select>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                            user.status === "Hoạt động" || !user.status
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-amber-50 text-amber-600"
                          }`}
                        >
                          {user.status || "Hoạt động"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => handleToggleStatus(user)}
                          className={`p-2.5 rounded-xl transition ${
                            user.status === "Hoạt động" || !user.status
                              ? "bg-slate-50 hover:bg-amber-50 text-slate-600 hover:text-amber-600"
                              : "bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600"
                          }`}
                          title={
                            user.status === "Hoạt động" || !user.status
                              ? "Khóa tài khoản"
                              : "Mở khóa tài khoản"
                          }
                        >
                          {user.status === "Hoạt động" || !user.status ? (
                            <FaLock className="text-xs" />
                          ) : (
                            <FaUnlock className="text-xs" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2.5 bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-xl transition"
                          title="Xóa vĩnh viễn tài khoản"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-8 text-center text-slate-400 text-xs italic"
                    >
                      Không tìm thấy người dùng phù hợp với bộ lọc.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
