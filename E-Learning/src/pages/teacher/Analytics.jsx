import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaChartLine,
  FaDollarSign,
  FaUserGraduate,
  FaStar,
} from "react-icons/fa";

function TeacherAnalytics() {
  const [timeRange, setTimeRange] = useState("month");

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <Link
            to="/teacher/dashboard"
            className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-xl transition"
          >
            <FaArrowLeft /> Quay lại Dashboard
          </Link>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
              Thống kê & Báo cáo
            </span>
            <h1 className="text-3xl font-black text-slate-900 mt-2">
              Hiệu suất giảng dạy & Doanh thu 📈
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Phân tích số liệu học viên đăng ký, tỷ lệ hoàn thành bài học và
              doanh thu tài chính.
            </p>
          </div>

          <div className="flex bg-white p-1 rounded-2xl border border-slate-200/70 shadow-sm">
            <button
              onClick={() => setTimeRange("week")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${timeRange === "week" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-50"}`}
            >
              Tuần này
            </button>
            <button
              onClick={() => setTimeRange("month")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${timeRange === "month" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-50"}`}
            >
              Tháng này
            </button>
            <button
              onClick={() => setTimeRange("year")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${timeRange === "year" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-50"}`}
            >
              Cả năm
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">
                Tổng doanh thu
              </span>
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <FaDollarSign />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900">14.250.000 đ</p>
            <span className="text-[11px] text-emerald-600 font-bold">
              ↑ +22% so với kỳ trước
            </span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">
                Học viên mới
              </span>
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <FaUserGraduate />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900">+142 Học viên</p>
            <span className="text-[11px] text-blue-600 font-bold">
              Ghi danh thành công qua VNPay
            </span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">
                Tỷ lệ hoàn thành
              </span>
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <FaChartLine />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900">86.4%</p>
            <span className="text-[11px] text-indigo-600 font-bold">
              Cao hơn mức trung bình hệ thống
            </span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">
                Điểm đánh giá
              </span>
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <FaStar />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900">4.9 / 5.0</p>
            <span className="text-[11px] text-amber-600 font-bold">
              Dựa trên 450+ lượt đánh giá
            </span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-sm space-y-6">
          <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-4">
            Chi tiết doanh thu theo từng khóa học
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  IELTS Master Speaking 8.0+
                </h4>
                <p className="text-[11px] text-slate-500">
                  95 học viên đăng ký • 7 khóa học con
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-black text-emerald-600 block">
                  9.500.000 đ
                </span>
                <span className="text-[10px] text-slate-400">
                  66% tổng doanh thu
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  English for Office Professionals
                </h4>
                <p className="text-[11px] text-slate-500">
                  47 học viên đăng ký • 5 khóa học con
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-black text-emerald-600 block">
                  4.750.000 đ
                </span>
                <span className="text-[10px] text-slate-400">
                  34% tổng doanh thu
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherAnalytics;
