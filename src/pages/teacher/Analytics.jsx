import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaChartLine,
  FaDollarSign,
  FaUserGraduate,
  FaStar,
} from "react-icons/fa";
import axiosClient from "../../services/axiosClient";

function TeacherAnalytics() {
  const [timeRange, setTimeRange] = useState("month");
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState({
    totalRevenue: 0,
    newStudents: 0,
    completionRate: 0,
    averageRating: 5.0,
    coursesBreakdown: [],
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        // Gọi API lấy thống kê thực tế theo khoảng thời gian
        const response = await axiosClient.get(
          `/api/courses/teacher/analytics?range=${timeRange}`,
        );
        if (response.data && response.data.success) {
          setAnalyticsData(response.data.data);
        }
      } catch (err) {
        console.error("Không thể tải số liệu thống kê từ máy chủ:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeRange]);

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
              doanh thu thực tế từ cơ sở dữ liệu.
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

        {loading ? (
          <div className="text-center py-20 text-slate-500 font-bold">
            Đang tổng hợp số liệu thống kê...
          </div>
        ) : (
          <>
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
                <p className="text-2xl font-black text-slate-900">
                  {Number(analyticsData.totalRevenue).toLocaleString("vi-VN")} đ
                </p>
                <span className="text-[11px] text-emerald-600 font-bold">
                  Cập nhật thời gian thực từ CSDL
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
                <p className="text-2xl font-black text-slate-900">
                  +{analyticsData.newStudents} Học viên
                </p>
                <span className="text-[11px] text-blue-600 font-bold">
                  Ghi danh thành công
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
                <p className="text-2xl font-black text-slate-900">
                  {analyticsData.completionRate}%
                </p>
                <span className="text-[11px] text-indigo-600 font-bold">
                  Dựa trên tiến độ bài học
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
                <p className="text-2xl font-black text-slate-900">
                  {analyticsData.averageRating} / 5.0
                </p>
                <span className="text-[11px] text-amber-600 font-bold">
                  Đánh giá chất lượng khóa học
                </span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-sm space-y-6">
              <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-4">
                Chi tiết doanh thu theo từng khóa học thực tế
              </h3>

              <div className="space-y-4">
                {analyticsData.coursesBreakdown.length > 0 ? (
                  analyticsData.coursesBreakdown.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100"
                    >
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          {item.studentsCount} học viên đăng ký
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-black text-emerald-600 block">
                          {Number(item.courseRevenue || 0).toLocaleString(
                            "vi-VN",
                          )}{" "}
                          đ
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 text-center py-6">
                    Chưa có khóa học nào phát sinh doanh thu.
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TeacherAnalytics;
