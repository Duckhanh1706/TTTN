import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBook,
  FaUsers,
  FaChartLine,
  FaPlus,
  FaDollarSign,
  FaEdit,
  FaTrash,
  FaTasks,
} from "react-icons/fa";
import axiosClient from "../../services/axiosClient";

function TeacherDashboard() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  // Gọi API lấy đúng danh sách khóa học của riêng giảng viên đang đăng nhập
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get("/api/courses/teacher/my-courses");
      const courseList = Array.isArray(response.data)
        ? response.data
        : response.data.courses || [];

      setCourses(courseList);

      // Tự động tính toán số liệu thống kê tổng quan từ danh sách khóa học thực tế
      let totalCourses = courseList.length;
      let totalStudents = 0;
      let totalRevenue = 0;

      courseList.forEach((course) => {
        const studentsCount = parseInt(course.students_count) || 0;
        const price = parseFloat(course.price) || 0;
        totalStudents += studentsCount;
        totalRevenue += studentsCount * price;
      });

      setStats({
        totalCourses,
        totalStudents,
        totalRevenue,
      });
    } catch (err) {
      console.error("Lỗi tải dữ liệu tổng quan Dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Xóa khóa học trực tiếp từ cơ sở dữ liệu qua API
  const handleDeleteCourse = async (courseId, e) => {
    e.stopPropagation();
    if (window.confirm("Bạn có chắc chắn muốn xóa khóa học này không?")) {
      try {
        await axiosClient.delete(`/api/courses/${courseId}`);
        const updatedCourses = courses.filter((c) => c.id !== courseId);
        setCourses(updatedCourses);

        // Cập nhật lại số liệu thống kê sau khi xóa
        let totalCourses = updatedCourses.length;
        let totalStudents = 0;
        let totalRevenue = 0;

        updatedCourses.forEach((course) => {
          const studentsCount = parseInt(course.students_count) || 0;
          const price = parseFloat(course.price) || 0;
          totalStudents += studentsCount;
          totalRevenue += studentsCount * price;
        });

        setStats({
          totalCourses,
          totalStudents,
          totalRevenue,
        });
      } catch (err) {
        console.error("Lỗi khi xóa khóa học:", err);
        alert("Không thể xóa khóa học từ máy chủ. Vui lòng thử lại sau.");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <p className="text-slate-500 font-bold text-xs animate-pulse">
          Đang tải tổng quan giảng dạy từ hệ thống...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Dashboard */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
              Hệ thống Giảng viên
            </span>
            <h1 className="text-2xl font-black text-slate-900">
              Tổng quan giảng dạy 📊
            </h1>
            <p className="text-xs text-slate-500">
              Quản lý các khóa học và theo dõi hiệu suất doanh thu trực tiếp từ
              cơ sở dữ liệu.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/teacher/analytics"
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-3 rounded-2xl text-xs font-bold transition"
            >
              <FaChartLine /> Thống kê chi tiết
            </Link>
            <Link
              to="/teacher/courses/new"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-2xl text-xs font-bold transition shadow-md shadow-indigo-600/20"
            >
              <FaPlus /> Tạo khóa học mới
            </Link>
          </div>
        </div>

        {/* Các Thẻ Thống Kê Tổng Quan */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">
                Tổng khóa học
              </span>
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <FaBook />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900">
              {stats.totalCourses} Khóa học
            </p>
            <span className="text-[11px] text-indigo-600 font-bold">
              Do bạn sở hữu trực tiếp
            </span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">
                Tổng học viên
              </span>
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <FaUsers />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900">
              {stats.totalStudents} Học viên
            </p>
            <span className="text-[11px] text-blue-600 font-bold">
              Đã ghi danh tham gia
            </span>
          </div>

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
              {Number(stats.totalRevenue).toLocaleString("vi-VN")} đ
            </p>
            <span className="text-[11px] text-emerald-600 font-bold">
              Tính trên các khóa học đã tạo
            </span>
          </div>
        </div>

        {/* Danh sách khóa học gần đây */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-base font-extrabold text-slate-900">
              Khóa học của bạn gần đây
            </h3>
            <Link
              to="/teacher/courses"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
            >
              Quản lý tất cả &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.length > 0 ? (
              courses.map((course) => (
                <div
                  key={course.id}
                  onClick={() =>
                    navigate(`/teacher/courses/${course.id}/exams`)
                  }
                  className="bg-slate-50 rounded-2xl p-5 border border-slate-100 hover:border-indigo-200 transition cursor-pointer flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold text-indigo-600 bg-indigo-100/60 px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {course.category?.name || course.category || "Tổng hợp"}
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        ID: #{course.id}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 line-clamp-2">
                      {course.title}
                    </h4>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/60">
                      <span>{course.students_count || 0} học viên</span>
                      <span className="font-bold text-emerald-600">
                        {Number(course.price || 0).toLocaleString("vi-VN")} đ
                      </span>
                    </div>
                  </div>

                  {/* Nút thao tác nhanh: Bài tập, Chỉnh sửa, Xóa */}
                  <div
                    className="flex items-center justify-end gap-1.5 pt-2 border-t border-slate-200/60"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Link
                      to={`/teacher/courses/${course.id}/exams`}
                      className="p-2 bg-white hover:bg-blue-50 text-slate-600 hover:text-blue-600 rounded-xl transition border border-slate-200/60 shadow-sm"
                      title="Quản lý đề thi / bài tập"
                    >
                      <FaTasks className="text-xs" />
                    </Link>

                    <Link
                      to={`/teacher/courses/${course.id}/edit`}
                      className="p-2 bg-white hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-xl transition border border-slate-200/60 shadow-sm"
                      title="Chỉnh sửa khóa học"
                    >
                      <FaEdit className="text-xs" />
                    </Link>

                    <button
                      onClick={(e) => handleDeleteCourse(course.id, e)}
                      className="p-2 bg-white hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-xl transition border border-slate-200/60 shadow-sm"
                      title="Xóa khóa học"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-slate-500 text-xs font-bold">
                Bạn chưa có khóa học nào trên hệ thống. Hãy bấm "Tạo khóa học
                mới" để bắt đầu!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
