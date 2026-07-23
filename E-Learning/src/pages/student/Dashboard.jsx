import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaGraduationCap,
  FaBookReader,
  FaAward,
  FaChartLine,
  FaArrowRight,
  FaClock,
  FaPlayCircle,
} from "react-icons/fa";
import MOCK_COURSES from "../../data/mockCourses.json";

function StudentDashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const userStored = localStorage.getItem("elearning_user");
    let user = userStored ? JSON.parse(userStored) : null;

    if (!user) {
      user = { name: "Học viên", enrolledCourses: [1, 2, 3] };
    }
    setCurrentUser(user);

    const ids = user.enrolledCourses || [1, 2, 3];
    const filtered = MOCK_COURSES.filter((c) => ids.includes(c.id)).slice(0, 3);

    const syncedData = filtered.map((course, idx) => ({
      ...course,
      progress: idx === 0 ? 75 : idx === 1 ? 50 : 30,
      currentLesson:
        idx === 0
          ? "Bài 4: Kỹ năng Skimming"
          : idx === 1
            ? "Bài 2: Phát âm IPA"
            : "Bài 1: Tổng quan Part 5",
    }));

    setEnrolledCourses(syncedData);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8 bg-[#F8FAFC] min-h-screen">
      {/* Welcome Banner sáng sủa, hiện đại */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 rounded-3xl p-8 lg:p-10 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="space-y-3 text-center md:text-left relative z-10">
          <span className="inline-block bg-blue-500/20 text-blue-300 text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-blue-400/20 shadow-sm">
            Student Portal
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Chào mừng trở lại, {currentUser?.name || "Học viên"}! 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Tiếp tục hành trình chinh phục ngoại ngữ của bạn ngày hôm nay. Đừng
            quên hoàn thành các bài tập luyện đề và flashcards.
          </p>
        </div>

        <Link
          to="/my-courses"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl text-xs font-bold transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 shrink-0 relative z-10 active:scale-95"
        >
          Tiếp tục học tập <FaArrowRight />
        </Link>
      </div>

      {/* Thống kê nhanh Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200/70 p-6 rounded-3xl shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl shadow-sm">
            <FaBookReader />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Khóa học đang học
            </p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">
              {enrolledCourses.length} Khóa
            </h3>
          </div>
        </div>

        <div className="bg-white border border-slate-200/70 p-6 rounded-3xl shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
          <div className="w-14 h-14 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center text-2xl shadow-sm">
            <FaChartLine />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Tiến độ tổng thể
            </p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">51%</h3>
          </div>
        </div>

        <div className="bg-white border border-slate-200/70 p-6 rounded-3xl shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl shadow-sm">
            <FaAward />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Chứng chỉ đạt được
            </p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">
              2 Chứng chỉ
            </h3>
          </div>
        </div>
      </div>

      {/* Tiến độ khóa học & Hoạt động nhanh */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Danh sách tiến độ khóa học */}
        <div className="lg:col-span-2 bg-white border border-slate-200/70 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <FaGraduationCap className="text-blue-600 text-lg" /> Tiến độ khóa
              học của bạn
            </h3>
            <Link
              to="/my-courses"
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              Xem tất cả →
            </Link>
          </div>

          <div className="space-y-4">
            {enrolledCourses.map((item) => (
              <div
                key={item.id}
                className="bg-slate-50/70 border border-slate-200/60 p-5 rounded-2xl space-y-3 transition-all hover:bg-white hover:shadow-md"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{item.title}</span>
                  <span className="text-blue-600 font-extrabold bg-blue-50 px-2.5 py-1 rounded-lg">
                    {item.progress}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>
                    Đang học:{" "}
                    <strong className="text-slate-700">
                      {item.currentLesson}
                    </strong>
                  </span>
                  <Link
                    to={`/courses/${item.id}/learn`}
                    className="inline-flex items-center gap-1.5 text-blue-600 font-bold hover:underline"
                  >
                    <FaPlayCircle /> Vào học ngay
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hoạt động nhanh */}
        <div className="bg-white border border-slate-200/70 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <FaClock className="text-amber-500 text-lg" /> Hoạt động nhanh
          </h3>
          <div className="space-y-4 text-xs">
            <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2">
              <span className="bg-blue-600 text-white px-2.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider">
                Flashcards
              </span>
              <p className="font-bold text-slate-800 pt-1">
                Đã ôn tập 15 từ vựng mới hôm nay.
              </p>
              <Link
                to="/flashcards"
                className="text-blue-600 font-bold block hover:underline pt-1"
              >
                Mở bộ thẻ từ vựng →
              </Link>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2">
              <span className="bg-emerald-600 text-white px-2.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider">
                Luyện đề
              </span>
              <p className="font-bold text-slate-800 pt-1">
                Hoàn thành bài Test TOEIC Mini Part 5.
              </p>
              <Link
                to="/practice"
                className="text-emerald-600 font-bold block hover:underline pt-1"
              >
                Làm thêm đề thi thử →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
