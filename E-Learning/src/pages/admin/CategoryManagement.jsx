import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaFolderPlus,
  FaTrash,
  FaLayerGroup,
} from "react-icons/fa";

function CategoryManagement() {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Frontend Development",
      slug: "frontend-development",
      totalCourses: 24,
    },
    {
      id: 2,
      name: "Backend Development",
      slug: "backend-development",
      totalCourses: 18,
    },
    { id: 3, name: "Computer Science Core", slug: "cs-core", totalCourses: 12 },
    {
      id: 4,
      name: "Artificial Intelligence",
      slug: "ai-in-education",
      totalCourses: 8,
    },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      setCategories(categories.filter((cat) => cat.id !== id));
    }
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
              E-Learning.
            </p>
          </div>

          <button
            onClick={() => alert("Mở modal thêm danh mục mới")}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-2xl text-xs font-bold transition shadow-md shadow-red-600/20"
          >
            <FaFolderPlus /> Thêm danh mục
          </button>
        </div>

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
                {categories.map((cat) => (
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
                        {cat.totalCourses} khóa học
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryManagement;
