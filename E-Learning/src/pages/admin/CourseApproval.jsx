import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaBook, FaCheck, FaTimes, FaEye } from "react-icons/fa";

function CourseApproval() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Lập trình ReactJS Nâng cao",
      instructor: "Trần Văn Hoàng",
      category: "Frontend",
      price: "599.000 đ",
      status: "Chờ duyệt",
    },
    {
      id: 2,
      title: "Spring Boot Microservices",
      instructor: "Nguyễn Văn A",
      category: "Backend",
      price: "799.000 đ",
      status: "Chờ duyệt",
    },
    {
      id: 3,
      title: "AI trong Giáo dục Đại học",
      instructor: "Phạm Thị B",
      category: "AI",
      price: "899.000 đ",
      status: "Đã duyệt",
    },
  ]);

  const handleApprove = (id) => {
    setCourses(
      courses.map((c) => (c.id === id ? { ...c, status: "Đã duyệt" } : c)),
    );
  };

  const handleReject = (id) => {
    setCourses(
      courses.map((c) => (c.id === id ? { ...c, status: "Đã từ chối" } : c)),
    );
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
              Phê duyệt khóa học
            </h1>
            <p className="text-xs text-slate-500">
              Xem xét và kiểm duyệt nội dung các khóa học mới do giảng viên gửi
              lên trước khi công khai.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/70 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <th className="py-4 px-6">Khóa học</th>
                  <th className="py-4 px-6">Giảng viên</th>
                  <th className="py-4 px-6">Danh mục</th>
                  <th className="py-4 px-6">Học phí</th>
                  <th className="py-4 px-6">Trạng thái</th>
                  <th className="py-4 px-6 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                {courses.map((course) => (
                  <tr
                    key={course.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 font-bold flex items-center justify-center text-sm shadow-sm">
                          <FaBook />
                        </div>
                        <span className="font-bold text-slate-900">
                          {course.title}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-700 font-semibold">
                      {course.instructor}
                    </td>
                    <td className="py-4 px-6 text-slate-500">
                      {course.category}
                    </td>
                    <td className="py-4 px-6 font-black text-slate-900">
                      {course.price}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                          course.status === "Đã duyệt"
                            ? "bg-emerald-50 text-emerald-600"
                            : course.status === "Chờ duyệt"
                              ? "bg-amber-50 text-amber-600"
                              : "bg-red-50 text-red-600"
                        }`}
                      >
                        {course.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => handleApprove(course.id)}
                        className="p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-xl transition"
                        title="Phê duyệt"
                      >
                        <FaCheck className="text-xs" />
                      </button>
                      <button
                        onClick={() => handleReject(course.id)}
                        className="p-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition"
                        title="Từ chối"
                      >
                        <FaTimes className="text-xs" />
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

export default CourseApproval;
