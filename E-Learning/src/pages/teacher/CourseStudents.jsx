import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaSearch, FaCheckCircle, FaClock } from "react-icons/fa";
import MOCK_COURSES from "../../data/mockCourses.json";

function TeacherCourseStudents() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Dữ liệu giả lập danh sách học viên trong khóa học này
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Khánh / Đức Anh",
      email: "student@englishlearning.com",
      progress: 75,
      lastActive: "Hôm nay",
      status: "Đang học",
    },
    {
      id: 2,
      name: "Nguyễn Văn Nam",
      email: "nam.nv@gmail.com",
      progress: 100,
      lastActive: "Hôm qua",
      status: "Hoàn thành",
    },
    {
      id: 3,
      name: "Trần Minh Thư",
      email: "thu.tm@gmail.com",
      progress: 40,
      lastActive: "3 ngày trước",
      status: "Đang học",
    },
    {
      id: 4,
      name: "Lê Hoàng Long",
      email: "long.lh@gmail.com",
      progress: 15,
      lastActive: "1 tuần trước",
      status: "Đang học",
    },
  ]);

  useEffect(() => {
    const found = MOCK_COURSES.find((c) => c.id === parseInt(id));
    setCourse(found || MOCK_COURSES[0]);
  }, [id]);

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleGradeAssignment = (studentName) => {
    alert(
      `Đã mở giao diện chấm bài tập Speaking/Writing cho học viên: ${studentName}`,
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Quay lại Dashboard */}
        <div>
          <Link
            to="/teacher/dashboard"
            className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-xl transition"
          >
            <FaArrowLeft /> Quay lại Dashboard Giảng viên
          </Link>
        </div>

        {/* Tiêu đề khóa học */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
              Quản lý lớp học
            </span>
            <h1 className="text-2xl font-black text-slate-900">
              {course?.title}
            </h1>
            <p className="text-xs text-slate-500">
              Giảng viên phụ trách:{" "}
              <span className="font-bold text-slate-700">
                {course?.instructor}
              </span>{" "}
              • Tổng số học viên:{" "}
              <span className="font-bold text-indigo-600">
                {students.length}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:w-72">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input
                type="text"
                placeholder="Tìm kiếm học viên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-10 pr-4 text-xs font-medium text-slate-800 outline-none focus:border-indigo-600 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Bảng danh sách học viên */}
        <div className="bg-white rounded-3xl border border-slate-200/70 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900">
              Danh sách học viên tham gia
            </h3>
            <span className="text-xs font-semibold text-slate-400">
              Hiển thị {filteredStudents.length} học viên
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <th className="py-4 px-6">Học viên</th>
                  <th className="py-4 px-6">Tiến độ khóa học</th>
                  <th className="py-4 px-6">Trạng thái</th>
                  <th className="py-4 px-6">Hoạt động cuối</th>
                  <th className="py-4 px-6 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-sm">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block">
                            {student.name}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {student.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 w-56">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-bold">
                          <span className="text-slate-600">
                            {student.progress}%
                          </span>
                          <span
                            className={
                              student.progress === 100
                                ? "text-emerald-600"
                                : "text-indigo-600"
                            }
                          >
                            {student.progress === 100
                              ? "Hoàn thành"
                              : "Đang học"}
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              student.progress === 100
                                ? "bg-emerald-500"
                                : "bg-indigo-600"
                            }`}
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {student.progress === 100 ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                          <FaCheckCircle /> Hoàn thành
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100">
                          <FaClock /> Đang học
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-slate-500 text-[11px]">
                      {student.lastActive}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleGradeAssignment(student.name)}
                        className="px-4 py-2 bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white rounded-xl text-xs font-bold transition shadow-sm"
                      >
                        Chấm bài & Nhận xét
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

export default TeacherCourseStudents;
