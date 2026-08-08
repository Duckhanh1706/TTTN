import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaTags,
  FaPlus,
  FaTrash,
  FaTimes,
  FaSyncAlt,
} from "react-icons/fa";
import axiosClient from "../../services/axiosClient";

function PromotionManagement() {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPromo, setNewPromo] = useState({
    code: "",
    discount: "",
    expiry: "",
    status: "Đang hoạt động",
  });

  const fetchPromotions = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get("/api/admin/promotions");
      const data = response.data.promotions || response.data || [];
      setPromos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Lỗi tải danh sách mã giảm giá:", err);
      setError("Không thể tải danh sách mã giảm giá từ máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  // Xóa mã giảm giá
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có muốn xóa mã giảm giá này khỏi cơ sở dữ liệu?")) {
      try {
        await axiosClient.delete(`/api/admin/promotions/${id}`);
        setPromos(promos.filter((p) => p.id !== id));
      } catch (err) {
        console.error("Lỗi xóa mã giảm giá:", err);
        alert("Không thể xóa mã giảm giá.");
      }
    }
  };

  // Thay đổi trạng thái (Đang hoạt động <-> Tạm ngưng) do Admin chủ động chỉnh
  const handleToggleStatus = async (item) => {
    const nextStatus =
      item.status === "Đang hoạt động" ? "Tạm ngưng" : "Đang hoạt động";
    try {
      await axiosClient.put(`/api/admin/promotions/${item.id}/status`, {
        status: nextStatus,
      });
      setPromos(
        promos.map((p) =>
          p.id === item.id ? { ...p, status: nextStatus } : p,
        ),
      );
    } catch (err) {
      console.error("Lỗi đổi trạng thái:", err);
      alert("Không thể thay đổi trạng thái mã giảm giá.");
    }
  };

  const handleCreatePromo = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post("/api/admin/promotions", newPromo);
      setIsModalOpen(false);
      setNewPromo({
        code: "",
        discount: "",
        expiry: "",
        status: "Đang hoạt động",
      });
      fetchPromotions();
    } catch (err) {
      console.error("Lỗi thêm mã giảm giá:", err);
      alert("Không thể tạo mã giảm giá (Mã code có thể bị trùng).");
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
              Quản lý mã giảm giá & Khuyến mãi
            </h1>
            <p className="text-xs text-slate-500">
              Quản lý và chủ động bật/tắt trạng thái các mã ưu đãi học phí cho
              học viên trực tiếp từ CSDL.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-2xl text-xs font-bold transition shadow-md shadow-red-600/20"
          >
            <FaPlus /> Tạo mã giảm giá
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
                  <th className="py-4 px-6">Mã giảm giá (Code)</th>
                  <th className="py-4 px-6">Mức giảm</th>
                  <th className="py-4 px-6">Hạn sử dụng</th>
                  <th className="py-4 px-6">Trạng thái (Bấm để đổi)</th>
                  <th className="py-4 px-6 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                {loading ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-12 text-center text-slate-400 italic"
                    >
                      Đang tải danh sách mã giảm giá từ cơ sở dữ liệu...
                    </td>
                  </tr>
                ) : promos.length > 0 ? (
                  promos.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 font-bold flex items-center justify-center text-sm shadow-sm">
                            <FaTags />
                          </div>
                          <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                            {item.code}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-black text-emerald-600">
                        {item.discount}
                      </td>
                      <td className="py-4 px-6 text-slate-500">
                        {item.expiry}
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleToggleStatus(item)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition shadow-sm cursor-pointer ${
                            item.status === "Đang hoạt động"
                              ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                          }`}
                          title="Bấm để đổi trạng thái"
                        >
                          <FaSyncAlt className="text-[9px]" />
                          {item.status}
                        </button>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2.5 bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-xl transition"
                          title="Xóa mã"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-8 text-center text-slate-400 italic"
                    >
                      Chưa có mã giảm giá nào trong hệ thống.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Tạo mã giảm giá mới */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 space-y-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900">
                Tạo mã giảm giá mới
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl bg-slate-50 transition"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleCreatePromo} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Mã Code
                </label>
                <input
                  type="text"
                  required
                  value={newPromo.code}
                  onChange={(e) =>
                    setNewPromo({
                      ...newPromo,
                      code: e.target.value.toUpperCase(),
                    })
                  }
                  placeholder="VD: SUMMER2026"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-xs font-mono font-bold text-slate-700 outline-none focus:border-red-600 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Mức giảm
                </label>
                <input
                  type="text"
                  required
                  value={newPromo.discount}
                  onChange={(e) =>
                    setNewPromo({ ...newPromo, discount: e.target.value })
                  }
                  placeholder="VD: 20% hoặc 50.000 đ"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-xs font-bold text-slate-700 outline-none focus:border-red-600 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Hạn sử dụng
                </label>
                <input
                  type="text"
                  required
                  value={newPromo.expiry}
                  onChange={(e) =>
                    setNewPromo({ ...newPromo, expiry: e.target.value })
                  }
                  placeholder="VD: 31/12/2026"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-xs font-bold text-slate-700 outline-none focus:border-red-600 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Trạng thái ban đầu
                </label>
                <select
                  value={newPromo.status}
                  onChange={(e) =>
                    setNewPromo({ ...newPromo, status: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-xs font-bold text-slate-700 outline-none focus:border-red-600 transition"
                >
                  <option value="Đang hoạt động">Đang hoạt động</option>
                  <option value="Tạm ngưng">Tạm ngưng</option>
                </select>
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
                  Lưu mã giảm giá
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PromotionManagement;
