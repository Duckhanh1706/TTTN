import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaFolderPlus,
  FaTrash,
  FaLayerGroup,
  FaTimes,
} from "react-icons/fa";
import axiosClient from "../../services/axiosClient";

function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State quản lý Modal thêm danh mục
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", slug: "" });

  // 1. Lấy danh sách danh mục từ Database
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get("/api/admin/categories");
      const data = Array.isArray(response.data)
        ? response.data
        : response.data.categories || [];
      setCategories(data);
    } catch (err) {
      console.error("Lỗi khi tải danh sách danh mục:", err);
      setError("Không thể tải danh sách danh mục từ hệ thống.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 2. Xóa danh mục qua API
  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Bạn có chắc chắn muốn xóa danh mục này khỏi cơ sở dữ liệu?",
      )
    ) {
      try {
        await axiosClient.delete(`/api/admin/categories/${id}`);
        setCategories(categories.filter((cat) => cat.id !== id));
      } catch (err) {
        console.error("Lỗi xóa danh mục:", err);
        alert("Không thể xóa danh mục này do đang có khóa học liên kết.");
      }
    }
  };

  // 3. Thêm danh mục mới qua API
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post("/api/admin/categories", newCategory);
      setIsModalOpen(false);
      setNewCategory({ name: "", slug: "" });
      fetchCategories(); // Tải lại danh sách mới
    } catch (err) {
      console.error("Lỗi thêm danh mục:", err);
      alert("Không thể thêm danh mục mới.");
    }
  };

  // Tự động tạo slug từ tên danh mục
  const handleNameChange = (e) => {
    const val = e.target.value;
    const generatedSlug = val
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/([^0-9a-z-\s])/g, "")
      .replace(/(\s+)/g, "-");
    setNewCategory({ name: val, slug: generatedSlug });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <Link
            to="/admin/dashboard"
            className="inline-flex items-center gap-2 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 border border-red-100 px-4 py-2 rounded-xl transition"
          >
            <FaArrowLeft /> Quay lại Bảng điều khiển Quản trị
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-red-50 text-red-600 px-3 py-1 rounded-full">
              Hệ thống Quản trị
            </span>
            <h1 className="text-2xl font-black text-slate-900">
              Quản lý danh mục khóa học
            </h1>
            <p className="text-xs text-slate-500">
              Tạo và quản lý các lĩnh vực đào tạo hiển thị trên nền tảng
              E-Learning trực tiếp từ CSDL.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-2xl text-xs font-bold transition shadow-md shadow-red-600/20"
          >
            <FaFolderPlus /> Thêm danh mục
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-xs font-semibold rounded-2xl">
            {error}
          </div>
        )}

        <div className="bg-white rounded-3xl border border-slate-200/70 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <th className="py-4 px-6">Tên danh mục</th>
                  <th className="py-4 px-6">Đường dẫn (Slug)</th>
                  <th className="py-4 px-6">Số lượng khóa học</th>
                  <th className="py-4 px-6 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                {loading ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-12 text-center text-slate-400 text-xs italic"
                    >
                      Đang tải danh mục từ cơ sở dữ liệu...
                    </td>
                  </tr>
                ) : categories.length > 0 ? (
                  categories.map((cat) => (
                    <tr
                      key={cat.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-sm shadow-sm">
                            <FaLayerGroup />
                          </div>
                          <span className="font-bold text-slate-900">
                            {cat.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-500 font-mono text-[11px]">
                        {cat.slug}
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                          {cat.totalCourses || 0} khóa học
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleDelete(cat.id)}
                          className="p-2.5 bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-xl transition"
                          title="Xóa danh mục"
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
                      Chưa có danh mục nào trong hệ thống.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Thêm danh mục */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 space-y-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900">
                Thêm danh mục mới
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl bg-slate-50 transition"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleCreateCategory} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Tên danh mục
                </label>
                <input
                  type="text"
                  required
                  value={newCategory.name}
                  onChange={handleNameChange}
                  placeholder="Ví dụ: Lập trình Web"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-xs font-bold text-slate-700 outline-none focus:border-red-600 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Đường dẫn (Slug)
                </label>
                <input
                  type="text"
                  required
                  value={newCategory.slug}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, slug: e.target.value })
                  }
                  placeholder="lap-trinh-web"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-xs font-mono text-slate-700 outline-none focus:border-red-600 transition"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-3 rounded-2xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-3 rounded-2xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition shadow-md shadow-red-600/20"
                >
                  Lưu danh mục
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryManagement;
