import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlayCircle, FaCheckCircle, FaBookOpen } from "react-icons/fa";
import { enrollmentService } from "../../services/enrollmentService";
import { lessonService } from "../../services/lessonService";

function MyCourses() {
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("learning"); // "learning" hoặc "completed"

  useEffect(() => {
    const fetchRealEnrolledCourses = async () => {
      try {
        setLoading(true);

        // 1. Gọi trực tiếp API lấy danh sách khóa học đã đăng ký từ Backend / MySQL
        const response = await enrollmentService.getMyCourses();

        // Chuẩn hóa dữ liệu mảng trả về từ server
        let coursesList = [];
        if (Array.isArray(response)) {
          coursesList = response;
        } else if (response && Array.isArray(response.courses)) {
          coursesList = response.courses;
        } else if (response && Array.isArray(response.data)) {
          coursesList = response.data;
        } else if (response && Array.isArray(response.enrollments)) {
          coursesList = response.enrollments;
        }

        // 2. Tính toán tiến độ thời gian thực dựa hoàn toàn vào CSDL và tiến độ học thật
        const updatedCourses = await Promise.all(
          coursesList.map(async (enrollmentItem) => {
            // Lấy thông tin khóa học (có thể nằm trong enrollmentItem hoặc enrollmentItem.Course)
            const course =
              enrollmentItem.course || enrollmentItem.Course || enrollmentItem;
            if (!course || !course.id) return null;

            const courseId = course.id;

            // Đọc các bài học học viên đã hoàn thành từ localStorage (ghi nhận theo thời gian thực khi học)
            const savedCompleted = localStorage.getItem(
              `completed_lessons_${courseId}`,
            );
            const completedArray = savedCompleted
              ? JSON.parse(savedCompleted)
              : [];
            const completedCount = completedArray.length;

            // Lấy danh sách bài học thực tế từ Database để tính tổng số bài chuẩn xác
            let totalLessons = 0;
            try {
              const lessons = await lessonService.getLessonsByCourse(courseId);
              if (Array.isArray(lessons)) {
                totalLessons = lessons.length;
              }
            } catch (e) {
              totalLessons = Number(
                course.lessons || course.lessons_count || 0,
              );
            }

            // Nếu khóa học chưa khởi tạo bài học nào trên CSDL thì tiến độ mặc định là 0%
            let calculatedProgress = 0;
            if (totalLessons > 0) {
              calculatedProgress = Math.round(
                (completedCount / totalLessons) * 100,
              );
              if (calculatedProgress > 100) calculatedProgress = 100;
            }

            return {
              ...course,
              progress: calculatedProgress,
              totalLessons: totalLessons,
              completedCount: completedCount,
              lastLesson:
                calculatedProgress === 100
                  ? "Hoàn thành toàn bộ khóa học"
                  : totalLessons > 0
                    ? `Đã hoàn thành ${completedCount}/${totalLessons} bài học`
                    : "Chưa có bài học",
            };
          }),
        );

        setMyCourses(updatedCourses.filter(Boolean));
      } catch (err) {
        console.error("Lỗi khi tải danh sách khóa học thực tế:", err);
        setMyCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRealEnrolledCourses();
  }, []);

  // Phân loại Tab dựa trên tiến độ thời gian thực từ CSDL
  const learningCourses = myCourses.filter(
    (course) => (course.progress || 0) < 100,
  );
  const completedCourses = myCourses.filter(
    (course) => (course.progress || 0) === 100,
  );

  const displayedCourses =
    activeTab === "learning" ? learningCourses : completedCourses;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <p className="text-slate-500 font-medium text-xs">
          Đang tải dữ liệu khóa học từ cơ sở dữ liệu...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200/80 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full">
              Khu vực học viên
            </span>
            <h1 className="text-3xl font-black text-slate-900 mt-2 tracking-tight">
              Khóa học của tôi
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Tiếp tục hành trình chinh phục ngoại ngữ của bạn ngày hôm nay.
            </p>
          </div>

          <div className="flex bg-slate-200/70 p-1.5 rounded-2xl w-fit">
            <button
              onClick={() => setActiveTab("learning")}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "learning"
                  ? "bg-white text-blue-600 shadow-md shadow-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Đang học ({learningCourses.length})
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "completed"
                  ? "bg-white text-emerald-600 shadow-md shadow-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Đã hoàn thành ({completedCourses.length})
            </button>
          </div>
        </div>

        {displayedCourses.length > 0 ? (
          <div className="space-y-5">
            {displayedCourses.map((course) => (
              <div
                key={course.id || Math.random()}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col md:flex-row items-center gap-6"
              >
                <div className="w-full md:w-56 h-36 rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-950 overflow-hidden relative shrink-0 shadow-inner flex items-center justify-center">
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-black text-2xl">📚</span>
                  )}
                  <div className="absolute inset-0 bg-blue-950/20"></div>
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-blue-600 font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-sm">
                    {course.category || "Tiếng Anh"}
                  </span>
                </div>

                <div className="flex-1 space-y-3 w-full">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wide">
                      Trình độ: {course.level || "Cơ bản"}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      ⭐ {course.rating || "5.0"}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 line-clamp-1 hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-1 font-medium">
                    {course.description ||
                      "Khóa học chất lượng cao giúp bạn nâng cao kỹ năng thực chiến."}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-600 flex items-center gap-1.5">
                        <FaBookOpen className="text-blue-600" /> Tiến độ thực
                        tế:{" "}
                        <strong
                          className={
                            course.progress === 100
                              ? "text-emerald-600"
                              : "text-blue-600"
                          }
                        >
                          {course.progress}%
                        </strong>
                      </span>
                      <span className="text-slate-400 font-medium text-[11px]">
                        {course.lastLesson}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200/50">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          course.progress === 100
                            ? "bg-emerald-500"
                            : "bg-gradient-to-r from-blue-600 to-indigo-600"
                        }`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-auto flex md:flex-col items-center justify-between md:justify-center border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 gap-3 shrink-0">
                  <Link
                    to={`/courses/${course.id}/learn`}
                    className={`w-full md:w-44 py-3.5 px-6 rounded-2xl text-xs font-black uppercase tracking-wider text-white transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 ${
                      course.progress === 100
                        ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/25"
                        : "bg-blue-600 hover:bg-blue-700 shadow-blue-600/25"
                    }`}
                  >
                    {course.progress === 100 ? (
                      <>
                        <FaCheckCircle /> Xem lại
                      </>
                    ) : (
                      <>
                        <FaPlayCircle /> Vào học
                      </>
                    )}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/70 shadow-sm space-y-4">
            <p className="text-sm font-semibold text-slate-500">
              {activeTab === "learning"
                ? "Bạn chưa đăng ký khóa học nào."
                : "Bạn chưa hoàn thành khóa học nào."}
            </p>
            <Link
              to="/courses"
              className="inline-block rounded-2xl bg-blue-600 px-6 py-3.5 text-xs font-bold text-white uppercase tracking-wider shadow-md shadow-blue-600/20"
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
