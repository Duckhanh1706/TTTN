import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaChartLine,
  FaDollarSign,
  FaFileExport,
  FaCalendarAlt,
} from "react-icons/fa";
import axiosClient from "../../services/axiosClient";

function RevenueAnalytics() {
  const [timeRange, setTimeRange] = useState("year");
  const [revenueData, setRevenueData] = useState([]);
  const [summary, setSummary] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    averageMonthly: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Gọi API lấy dữ liệu doanh thu từ Database
  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get(
          `/api/admin/revenue?range=${timeRange}`,
        );
        const data = response.data;

        if (data.success) {
          setRevenueData(data.revenueData || []);
          setSummary(
            data.summary || {
              totalRevenue: 0,
              totalOrders: 0,
              averageMonthly: 0,
            },
          );
        }
      } catch (err) {
        console.error("Lỗi tải dữ liệu doanh thu:", err);
        setError("Không thể tải báo cáo tài chính từ máy chủ.");
      } finally {
        setLoading(false);
      }
    };

    fetchRevenueData();
  }, [timeRange]);

  // Xuất báo cáo Excel / CSV
  const handleExportReport = async () => {
    try {
      alert("Đang xuất file báo cáo Excel...");
      // Bạn có thể tích hợp gọi API export backend tại đây nếu có
    } catch (err) {
      console.error("Lỗi xuất báo cáo:", err);
    }
  };

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

        {/* Header */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-red-50 text-red-600 px-3 py-1 rounded-full">
              Báo cáo tài chính
            </span>
            <h1 className="text-2xl font-black text-slate-900">
              Thống kê doanh thu toàn hệ thống
            </h1>
            <p className="text-xs text-slate-500">
              Tổng hợp chi tiết doanh số bán khóa học, biểu đồ tăng trưởng và
              lịch sử giao dịch trực tiếp từ hệ thống.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-xs font-bold text-slate-700 outline-none focus:border-red-600 transition"
            >
              <option value="year">Năm 2026</option>
              <option value="quarter">Quý này</option>
              <option value="month">Tháng này</option>
            </select>
            <button
              onClick={handleExportReport}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-2xl text-xs font-bold transition shadow-md whitespace-nowrap"
            >
              <FaFileExport /> Xuất báo cáo
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-xs font-semibold rounded-2xl">
            {error}
          </div>
        )}

        {/* Tổng quan chỉ số tài chính */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg font-bold">
              <FaDollarSign />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase">
                Tổng doanh thu
              </p>
              <h4 className="text-xl font-black text-slate-900 mt-0.5">
                {Number(summary.totalRevenue || 0).toLocaleString("vi-VN")} đ
              </h4>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg font-bold">
              <FaChartLine />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase">
                Tổng đơn hàng
              </p>
              <h4 className="text-xl font-black text-slate-900 mt-0.5">
                {summary.totalOrders || 0} đơn
              </h4>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-lg font-bold">
              <FaCalendarAlt />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase">
                Trung bình / Kỳ
              </p>
              <h4 className="text-xl font-black text-slate-900 mt-0.5">
                {Number(summary.averageMonthly || 0).toLocaleString("vi-VN")} đ
              </h4>
            </div>
          </div>
        </div>

        {/* Bảng chi tiết doanh thu */}
        <div className="bg-white rounded-3xl border border-slate-200/70 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">
              Chi tiết doanh thu theo thời gian
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <th className="py-4 px-6">Thời gian</th>
                  <th className="py-4 px-6">Số lượng đơn hàng</th>
                  <th className="py-4 px-6 text-right">Tổng doanh thu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                {loading ? (
                  <tr>
                    <td
                      colSpan="3"
                      className="py-12 text-center text-slate-400 italic"
                    >
                      Đang tải dữ liệu tài chính...
                    </td>
                  </tr>
                ) : revenueData.length > 0 ? (
                  revenueData.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-4 px-6 font-bold text-slate-900">
                        {item.month_key || item.month}
                      </td>
                      <td className="py-4 px-6">
                        {item.total_orders || item.orders} đơn thành công
                      </td>
                      <td className="py-4 px-6 text-right font-black text-emerald-600">
                        {Number(
                          item.total_revenue || item.revenue || 0,
                        ).toLocaleString("vi-VN")}{" "}
                        đ
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="py-8 text-center text-slate-400 italic"
                    >
                      Chưa có dữ liệu giao dịch trong khoảng thời gian này.
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

export default RevenueAnalytics;
