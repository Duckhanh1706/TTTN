import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaReceipt,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaSearch,
} from "react-icons/fa";

function PaymentManagement() {
  const [payments, setPayments] = useState([
    {
      id: "INV-001",
      student: "Nguyễn Đức Khánh",
      course: "Lập trình ReactJS Nâng cao",
      amount: "599.000 đ",
      date: "24/07/2026",
      status: "Thành công",
    },
    {
      id: "INV-002",
      student: "Trần Văn Hoàng",
      course: "Spring Boot Microservices",
      amount: "799.000 đ",
      date: "23/07/2026",
      status: "Đang chờ",
    },
    {
      id: "INV-003",
      student: "Lê Minh Thư",
      course: "Cấu trúc dữ liệu và giải thuật",
      amount: "499.000 đ",
      date: "22/07/2026",
      status: "Thành công",
    },
    {
      id: "INV-004",
      student: "Phạm Văn Nam",
      course: "AI trong Giáo dục",
      amount: "899.000 đ",
      date: "20/07/2026",
      status: "Thất bại",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredPayments = payments.filter(
    (p) =>
      p.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase()),
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
              viên trên toàn nền tảng.
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
                {filteredPayments.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-4 px-6 font-mono font-bold text-slate-900">
                      {item.id}
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-800">
                      {item.student}
                    </td>
                    <td className="py-4 px-6 text-slate-600">{item.course}</td>
                    <td className="py-4 px-6 font-black text-slate-900">
                      {item.amount}
                    </td>
                    <td className="py-4 px-6 text-slate-500">{item.date}</td>
                    <td className="py-4 px-6 text-right">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${
                          item.status === "Thành công"
                            ? "bg-emerald-50 text-emerald-600"
                            : item.status === "Đang chờ"
                              ? "bg-amber-50 text-amber-600"
                              : "bg-red-50 text-red-600"
                        }`}
                      >
                        {item.status === "Thành công" && <FaCheckCircle />}
                        {item.status === "Đang chờ" && <FaClock />}
                        {item.status === "Thất bại" && <FaTimesCircle />}
                        {item.status}
                      </span>
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

export default PaymentManagement;
