import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MOCK_COURSES from "../../data/mockCourses.json";

function MyCourses() {
  const [myCourses, setMyCourses] = useState([]);
  const [activeTab, setActiveTab] = useState("learning"); // "learning" hoặc "completed"

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("elearning_user"));
    const enrolledIds = storedUser?.enrolledCourses || [1, 2, 3];

    // Lọc các khóa học đã đăng ký
    const filtered = MOCK_COURSES.filter((course) =>
      enrolledIds.includes(course.id),
    );

    // Gán tiến độ và bài học hiện tại (khóa học đầu tiên giả lập hoàn thành 100% để test tab hoàn thành)
    const withProgress = filtered.map((course, index) => ({
      ...course,
      progress: index === 0 ? 100 : index === 1 ? 50 : 30,
      lastLesson:
        index === 0
          ? "Hoàn thành toàn bộ khóa học"
          : index === 1
            ? "Bài 2: Phát âm IPA"
            : "Bài 1: Tổng quan Part 5",
    }));

    setMyCourses(withProgress);
  }, []);

  // Phân loại danh sách theo tab
  const learningCourses = myCourses.filter((course) => course.progress < 100);
  const completedCourses = myCourses.filter(
    (course) => course.progress === 100,
  );

  const displayedCourses =
    activeTab === "learning" ? learningCourses : completedCourses;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Tiêu đề trang */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
              Khu vực học viên
            </span>
            <h1 className="text-3xl font-black text-slate-900 mt-2">
              Khóa học của tôi
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Tiếp tục hành trình chinh phục ngoại ngữ của bạn ngay hôm nay.
            </p>
          </div>

          {/* Thanh Tab chuyển đổi: Đang học / Đã hoàn thành */}
          <div className="flex bg-slate-200/70 p-1.5 rounded-2xl w-fit">
            <button
              onClick={() => setActiveTab("learning")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "learning"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Đang học ({learningCourses.length})
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "completed"
                  ? "bg-white text-emerald-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Đã hoàn thành ({completedCourses.length})
            </button>
          </div>
        </div>

        {/* Danh sách khóa học */}
        {displayedCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                      {course.category}
                    </span>
                    <span className="text-xs font-extrabold text-slate-400">
                      {course.level}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-4">
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-slate-600">Tiến độ hoàn thành</span>
                      <span
                        className={
                          course.progress === 100
                            ? "text-emerald-600"
                            : "text-blue-600"
                        }
                      >
                        {course.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          course.progress === 100
                            ? "bg-emerald-500"
                            : "bg-blue-600"
                        }`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2">
                      {course.progress === 100 ? (
                        <span className="font-bold text-emerald-600">
                          ✓ Đã hoàn thành khóa học
                        </span>
                      ) : (
                        <>
                          Đang học:{" "}
                          <span className="font-semibold text-slate-700">
                            {course.lastLesson}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">
                    ⭐ Đánh giá: {course.rating}
                  </span>
                  <Link
                    to={`/courses/${course.id}/learn`}
                    className={`rounded-xl px-5 py-2.5 text-xs font-bold text-white transition shadow-md active:scale-95 ${
                      course.progress === 100
                        ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20"
                        : "bg-blue-600 hover:bg-blue-700 shadow-blue-600/20"
                    }`}
                  >
                    {course.progress === 100
                      ? "Xem lại bài học →"
                      : "Vào học ngay →"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
            <p className="text-sm font-semibold text-slate-500 mb-4">
              {activeTab === "learning"
                ? "Bạn không có khóa học nào đang học."
                : "Bạn chưa hoàn thành khóa học nào."}
            </p>
            <Link
              to="/courses"
              className="inline-block rounded-2xl bg-blue-600 px-6 py-3 text-xs font-bold text-white uppercase tracking-wider shadow-md shadow-blue-600/20"
            >
              Khám phá danh sách khóa học
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyCourses;
