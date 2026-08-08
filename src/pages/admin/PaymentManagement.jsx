import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaSearch,
} from "react-icons/fa";
import axiosClient from "../../services/axiosClient";

function PaymentManagement() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Gọi API lấy danh sách giao dịch thực tế từ Database
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get("/api/admin/payments");
        const data = response.data.payments || response.data || [];
        setPayments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Lỗi tải danh sách thanh toán:", err);
        setError("Không thể tải lịch sử giao dịch từ máy chủ.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const filteredPayments = payments.filter(
    (p) =>
      (p.student &&
        p.student.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (p.id && String(p.id).toLowerCase().includes(searchTerm.toLowerCase())),
  );

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
              Quản lý thanh toán & Giao dịch
            </h1>
            <p className="text-xs text-slate-500">
              Theo dõi lịch sử hóa đơn, trạng thái thanh toán học phí của học
              viên trực tiếp từ cơ sở dữ liệu.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 gap-2 w-64">
              <FaSearch className="text-slate-400 text-xs" />
              <input
                type="text"
                placeholder="Tìm mã hóa đơn, học viên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent text-xs font-medium text-slate-800 outline-none w-full"
              />
            </div>
          </div>
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
                  <th className="py-4 px-6">Mã hóa đơn</th>
                  <th className="py-4 px-6">Học viên</th>
                  <th className="py-4 px-6">Khóa học thanh toán</th>
                  <th className="py-4 px-6">Số tiền</th>
                  <th className="py-4 px-6">Ngày giao dịch</th>
                  <th className="py-4 px-6 text-right">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                {loading ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="py-12 text-center text-slate-400 italic"
                    >
                      Đang tải lịch sử giao dịch từ cơ sở dữ liệu...
                    </td>
                  </tr>
                ) : filteredPayments.length > 0 ? (
                  filteredPayments.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-4 px-6 font-mono font-bold text-slate-900">
                        INV-{item.id}
                      </td>
                      <td className="py-4 px-6 font-bold text-slate-800">
                        {item.student || "Học viên"}
                      </td>
                      <td className="py-4 px-6 text-slate-600">
                        {item.course || "Khóa học"}
                      </td>
                      <td className="py-4 px-6 font-black text-slate-900">
                        {Number(item.amount || 0).toLocaleString("vi-VN")} đ
                      </td>
                      <td className="py-4 px-6 text-slate-500">{item.date}</td>
                      <td className="py-4 px-6 text-right">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${
                            item.status === "Thành công" ||
                            item.status === "completed"
                              ? "bg-emerald-50 text-emerald-600"
                              : item.status === "Đang chờ" ||
                                  item.status === "pending"
                                ? "bg-amber-50 text-amber-600"
                                : "bg-red-50 text-red-600"
                          }`}
                        >
                          {(item.status === "Thành công" ||
                            item.status === "completed") && <FaCheckCircle />}
                          {(item.status === "Đang chờ" ||
                            item.status === "pending") && <FaClock />}
                          {(item.status === "Thất bại" ||
                            item.status === "failed") && <FaTimesCircle />}
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="py-8 text-center text-slate-400 italic"
                    >
                      Không tìm thấy giao dịch nào trong hệ thống.
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

export default PaymentManagement;
