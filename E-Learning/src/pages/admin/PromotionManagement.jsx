import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaTags, FaPlus, FaTrash } from "react-icons/fa";

function PromotionManagement() {
  const [promos, setPromos] = useState([
    {
      id: 1,
      code: "SUMMER2026",
      discount: "20%",
      expiry: "31/12/2026",
      status: "Đang hoạt động",
    },
    {
      id: 2,
      code: "WELCOMEBACK",
      discount: "50.000 đ",
      expiry: "30/09/2026",
      status: "Đang hoạt động",
    },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có muốn xóa mã giảm giá này?")) {
      setPromos(promos.filter((p) => p.id !== id));
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
              Tạo lập các mã ưu đãi học phí áp dụng cho giỏ hàng của học viên.
            </p>
          </div>

          <button
            onClick={() => alert("Mở modal thêm mã giảm giá")}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-2xl text-xs font-bold transition shadow-md shadow-red-600/20"
          >
            <FaPlus /> Tạo mã giảm giá
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/70 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <th className="py-4 px-6">Mã giảm giá (Code)</th>
                  <th className="py-4 px-6">Mức giảm</th>
                  <th className="py-4 px-6">Hạn sử dụng</th>
                  <th className="py-4 px-6">Trạng thái</th>
                  <th className="py-4 px-6 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                {promos.map((item) => (
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
                    <td className="py-4 px-6 text-slate-500">{item.expiry}</td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600">
                        {item.status}
                      </span>
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PromotionManagement;
