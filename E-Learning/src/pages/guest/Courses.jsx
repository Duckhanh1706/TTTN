import { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import MOCK_COURSES from "../../data/mockCourses.json";

function Courses() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    { label: "Tất cả khóa học", value: "All" },
    { label: "Luyện thi IELTS", value: "IELTS" },
    { label: "Luyện thi TOEIC", value: "TOEIC" },
    { label: "Tiếng Anh Giao Tiếp", value: "Communication" },
    { label: "Ngữ pháp căn bản", value: "Grammar" },
  ];

  const filteredCourses = MOCK_COURSES.filter((course) => {
    return selectedCategory === "All" || course.category === selectedCategory;
  });

  return (
    <>
      <div className="courses-page bg-[#F8FAFC] min-h-screen">
        {/* Hero Banner mới: Thiết kế 2 cột hiện đại, có hình ảnh minh họa và không còn thanh tìm kiếm */}
        <section className="courses-hero bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 py-16 lg:py-20 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-blue-600/25 rounded-full blur-3xl pointer-events-none"></div>

          <div className="courses-hero__container mx-auto max-w-7xl px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Nội dung text bên trái */}
            <div className="space-y-6 text-center lg:text-left">
              <span className="inline-block py-1.5 px-4 rounded-full bg-blue-500/20 text-blue-300 font-semibold text-xs tracking-wider uppercase border border-blue-400/20 shadow-sm">
                🎓 Hệ thống học ngoại ngữ thông minh
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Chinh phục band điểm mục tiêu cùng chuyên gia
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Lộ trình học tập cá nhân hóa kết hợp công nghệ luyện từ vựng và
                luyện đề độc quyền, giúp bạn bứt phá năng lực ngoại ngữ nhanh
                nhất.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-xs font-medium border border-white/10">
                  <span>⭐ 4.9/5 Đánh giá</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-xs font-medium border border-white/10">
                  <span>👥 15,000+ Học viên</span>
                </div>
              </div>
            </div>

            {/* Hình ảnh minh họa bên phải banner */}
            <div className="relative flex justify-center">
              <div className="relative w-full max-w-md h-72 sm:h-80 rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-br from-blue-600/30 to-indigo-700/30 backdrop-blur-md flex items-center justify-center p-6 text-center">
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl mx-auto flex items-center justify-center text-3xl shadow-lg shadow-blue-500/40">
                    🚀
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Lộ trình chuẩn hóa
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Cam kết đầu ra bằng văn bản, hỗ trợ 1-1 cùng giảng viên giàu
                    kinh nghiệm.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="courses-content py-12 lg:py-16">
          <div className="courses-content__container mx-auto max-w-7xl px-6">
            {/* Categories Filter Tabs */}
            <div className="courses-filters flex flex-wrap items-center justify-center gap-3 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`rounded-xl px-5 py-3 text-xs font-bold transition-all duration-200 shadow-sm ${
                    selectedCategory === cat.value
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/25 scale-105"
                      : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Courses Grid */}
            <div className="courses-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className="courses-card group flex flex-col justify-between bg-white rounded-3xl border border-slate-200/70 p-6 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 relative overflow-hidden"
                  >
                    <div>
                      <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-extrabold px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider shadow-sm">
                        {course.category}
                      </div>

                      <div className="h-48 w-full rounded-2xl bg-gradient-to-tr from-slate-100 to-slate-200 mb-6 flex flex-col justify-between p-4 relative overflow-hidden">
                        <span className="self-start bg-white/90 backdrop-blur-md text-emerald-600 font-extrabold text-[11px] px-3 py-1 rounded-full shadow-sm">
                          ✓ {course.commitment}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                        <span className="text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                          {course.level}
                        </span>
                        <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-lg">
                          <span>⭐</span>
                          <span>{course.rating}</span>
                          <span className="text-slate-400 font-normal">
                            ({course.reviewsCount})
                          </span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                        {course.title}
                      </h3>

                      <div className="mt-4 flex items-center gap-3 pt-4 border-t border-slate-100">
                        <img
                          src={course.instructor.avatar}
                          alt={course.instructor.name}
                          className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">
                            {course.instructor.name}
                          </h4>
                          <p className="text-[11px] font-medium text-slate-400">
                            {course.instructor.role}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between text-xs text-slate-500 font-medium bg-slate-50 p-3 rounded-xl">
                        <span>📚 {course.lessons} bài học</span>
                        <span>👥 {course.students} học viên</span>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-xl font-black text-blue-600 block leading-none">
                          {course.price}
                        </span>
                        <span className="text-xs text-slate-400 line-through font-medium mt-1 block">
                          {course.oldPrice}
                        </span>
                      </div>

                      <Link
                        to={`/courses/${course.id}`}
                        className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-blue-600 shadow-sm active:scale-95"
                      >
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-16 text-center text-slate-500">
                  <p className="text-lg font-semibold">
                    Không tìm thấy khóa học trong danh mục này.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Courses;
