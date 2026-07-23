import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaSearch,
  FaBook,
  FaUsers,
  FaEdit,
  FaTrash,
  FaClipboardCheck,
  FaTasks,
} from "react-icons/fa";
import MOCK_COURSES from "../../data/mockCourses.json";

function TeacherCourseStudents() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Lấy danh sách khóa học (Giả lập lấy các khóa học do giảng viên tạo hoặc toàn bộ mock data)
  useEffect(() => {
    setCourses(MOCK_COURSES);
  }, []);

  // Lọc khóa học theo từ khóa tìm kiếm
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDeleteCourse = (courseId, e) => {
    e.stopPropagation();
    if (window.confirm("Bạn có chắc chắn muốn xóa khóa học này không?")) {
      setCourses(courses.filter((c) => c.id !== courseId));
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header & Nút tạo khóa học mới */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
              Hệ thống Giảng viên
            </span>
            <h1 className="text-2xl font-black text-slate-900">
              Quản lý các khóa học đã tạo
            </h1>
            <p className="text-xs text-slate-500">
              Quản lý thông tin, nội dung bài học và theo dõi danh sách học viên
              tham gia.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Thanh tìm kiếm */}
            <div className="relative flex-1 md:w-64">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input
                type="text"
                placeholder="Tìm kiếm khóa học..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-10 pr-4 text-xs font-medium text-slate-800 outline-none focus:border-indigo-600 transition-all"
              />
            </div>

            {/* Nút tạo khóa học mới */}
            <Link
              to="/teacher/courses/new"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-2xl text-xs font-bold transition shadow-md shadow-indigo-600/20 whitespace-nowrap"
            >
              <FaPlus /> Tạo khóa học mới
            </Link>
          </div>
        </div>

        {/* Danh sách các khóa học dưới dạng Grid card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div
                key={course.id}
                onClick={() =>
                  navigate(`/teacher/courses/${course.id}/students`)
                }
                className="bg-white rounded-3xl border border-slate-200/70 shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between cursor-pointer group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider">
                      {course.category || "Lập trình"}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      ID: #{course.id}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2">
                    {course.description ||
                      "Khóa học cung cấp kiến thức nền tảng và nâng cao giúp học viên làm chủ công nghệ thực tế."}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
                    <FaUsers className="text-indigo-600" />
                    <span>24 Học viên</span>
                  </div>

                  {/* Nhóm các nút chức năng thao tác nhanh */}
                  <div
                    className="flex items-center gap-1.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Điểm danh */}
                    <Link
                      to={`/teacher/courses/${course.id}/attendance`}
                      className="p-2.5 bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 rounded-xl transition"
                      title="Quản lý điểm danh"
                    >
                      <FaClipboardCheck className="text-xs" />
                    </Link>

                    {/* Bài tập */}
                    <Link
                      to={`/teacher/courses/${course.id}/assignments`}
                      className="p-2.5 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 rounded-xl transition"
                      title="Quản lý bài tập"
                    >
                      <FaTasks className="text-xs" />
                    </Link>

                    {/* Chỉnh sửa khóa học */}
                    <Link
                      to={`/teacher/courses/${course.id}/edit`}
                      className="p-2.5 bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-xl transition"
                      title="Chỉnh sửa khóa học"
                    >
                      <FaEdit className="text-xs" />
                    </Link>

                    {/* Xóa khóa học */}
                    <button
                      onClick={(e) => handleDeleteCourse(course.id, e)}
                      className="p-2.5 bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-xl transition"
                      title="Xóa khóa học"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-slate-200/70">
              <FaBook className="mx-auto text-slate-300 text-3xl mb-3" />
              <p className="text-xs font-bold text-slate-600">
                Không tìm thấy khóa học nào phù hợp.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeacherCourseStudents;
