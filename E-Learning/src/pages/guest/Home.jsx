import { Link } from "react-router-dom";
import hero from "../../assets/hero.png";
import MOCK_COURSES from "../../data/mockCourses.json";

function Home() {
  const featuredCourses = MOCK_COURSES.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="home-hero relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 py-24 lg:py-32 text-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[1000px] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none"></div>
        <div className="absolute -left-20 top-1/3 h-96 w-96 rounded-full bg-indigo-600/15 blur-[100px] pointer-events-none"></div>
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none"></div>

        <div className="home-hero__container mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 px-6 lg:flex-row lg:gap-16 relative z-10">
          <div className="home-hero__left w-full lg:w-1/2">
            <span className="home-hero__badge inline-flex items-center gap-2.5 rounded-full bg-blue-500/15 px-5 py-2 text-xs font-bold uppercase tracking-wider text-blue-300 border border-blue-400/30 backdrop-blur-md shadow-lg shadow-blue-500/10">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-ping"></span>
              Nền tảng học tiếng Anh trực tuyến 4.0
            </span>

            <h1 className="home-hero__title mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.12]">
              Học tiếng Anh
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">
                thông minh hơn
              </span>
              <br />
              mỗi ngày cùng AI
            </h1>

            <p className="home-hero__desc mt-6 text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
              Xây dựng lộ trình học cá nhân hóa, luyện IELTS, TOEIC và giao tiếp
              với hệ thống bài học tương tác, flashcards thông minh và luyện đề
              chuẩn xác tuyệt đối.
            </p>

            <div className="home-hero__actions mt-8 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="home-hero__btn-primary group relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-blue-600/30 transition-all duration-300 hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/50 hover:-translate-y-1 active:translate-y-0"
              >
                Bắt đầu học ngay miễn phí
              </Link>

              <Link
                to="/courses"
                className="home-hero__btn-secondary inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:border-white/40 hover:-translate-y-1"
              >
                Khám phá khóa học
              </Link>
            </div>

            <div className="home-hero__stats mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
              <div className="home-hero__stat-item">
                <h3 className="home-hero__stat-value text-3xl font-black tracking-tight text-white">
                  50K+
                </h3>
                <p className="home-hero__stat-label mt-1 text-xs font-semibold uppercase tracking-wider text-blue-300/80">
                  Học viên tin chọn
                </p>
              </div>
              <div className="home-hero__stat-item">
                <h3 className="home-hero__stat-value text-3xl font-black tracking-tight text-white">
                  200+
                </h3>
                <p className="home-hero__stat-label mt-1 text-xs font-semibold uppercase tracking-wider text-blue-300/80">
                  Khóa học chuẩn
                </p>
              </div>
              <div className="home-hero__stat-item">
                <h3 className="home-hero__stat-value text-3xl font-black tracking-tight text-white">
                  100+
                </h3>
                <p className="home-hero__stat-label mt-1 text-xs font-semibold uppercase tracking-wider text-blue-300/80">
                  Giảng viên Pro
                </p>
              </div>
            </div>
          </div>

          <div className="home-hero__right flex w-full justify-center lg:w-1/2 lg:justify-end">
            <div className="home-hero__card w-full max-w-md rounded-3xl bg-slate-900/80 backdrop-blur-2xl p-6 shadow-2xl shadow-cyan-500/10 border border-white/15 sm:p-8 relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

              <div className="relative z-10">
                <div className="overflow-hidden rounded-2xl shadow-inner bg-slate-800 border border-white/10">
                  <img
                    src={hero}
                    alt="Hero"
                    className="home-hero__image w-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="home-hero__progress mt-6">
                  <div className="home-hero__progress-header flex items-center justify-between text-sm">
                    <span className="font-bold text-slate-200">
                      IELTS Goal Target
                    </span>
                    <span className="font-black text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-lg border border-cyan-500/20">
                      78%
                    </span>
                  </div>
                  <div className="home-hero__progress-bar mt-3 h-3 overflow-hidden rounded-full bg-slate-800 p-0.5 border border-white/10">
                    <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/50"></div>
                  </div>
                </div>

                <div className="home-hero__metrics mt-6 grid grid-cols-2 gap-4">
                  <div className="home-hero__metric-card rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-4 border border-white/10 shadow-sm backdrop-blur-md">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Flashcards
                    </h4>
                    <p className="mt-1 text-2xl font-black text-cyan-400">
                      120
                    </p>
                    <span className="text-[11px] font-medium text-slate-400">
                      Đã thuộc lòng
                    </span>
                  </div>

                  <div className="home-hero__metric-card rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-4 border border-white/10 shadow-sm backdrop-blur-md">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Accuracy
                    </h4>
                    <p className="mt-1 text-2xl font-black text-emerald-400">
                      86%
                    </p>
                    <span className="text-[11px] font-medium text-slate-400">
                      Độ chính xác
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="home-courses py-24 bg-gradient-to-b from-white via-slate-50/50 to-white">
        <div className="home-courses__container mx-auto max-w-7xl px-6">
          <div className="home-courses__header mx-auto mb-16 max-w-2xl text-center">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-100/70 px-4 py-1.5 rounded-full shadow-sm">
              Chương trình đào tạo
            </span>
            <h2 className="home-courses__title mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Khóa học nổi bật hàng đầu
            </h2>
            <p className="home-courses__desc mt-4 text-slate-600 font-medium">
              Lựa chọn lộ trình tối ưu được thiết kế riêng biệt cho mục tiêu bứt
              phá band điểm của bạn.
            </p>
          </div>

          <div className="home-courses__grid grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredCourses.map((course) => (
              <div
                key={course.id}
                className="home-courses__card group flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-300"
              >
                <div>
                  <div className="home-courses__image h-52 w-full rounded-2xl bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 overflow-hidden relative shadow-inner p-5 flex flex-col justify-between">
                    <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="self-start rounded-full bg-white/20 backdrop-blur-md px-3.5 py-1 text-[11px] font-bold text-white border border-white/20 shadow-sm">
                      {course.level}
                    </span>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300">
                        {course.category}
                      </span>
                      <h4 className="text-white font-extrabold text-base mt-1 line-clamp-1">
                        {course.title}
                      </h4>
                    </div>
                  </div>

                  <div className="home-courses__info mt-6 flex items-center justify-between text-xs font-bold text-slate-500">
                    <span className="bg-slate-100 px-3 py-1.5 rounded-xl">
                      ⏳ {course.duration}
                    </span>
                    <span className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-xl border border-amber-200/50">
                      ⭐ {course.rating}
                    </span>
                  </div>

                  <p className="home-courses__students mt-4 text-xs font-semibold text-slate-500">
                    👥 {course.studentsCount} học viên đang tham gia học tập
                  </p>
                </div>

                <Link
                  to={`/courses/${course.id}`}
                  className="home-courses__btn mt-8 block text-center w-full rounded-2xl bg-slate-900 py-4 text-xs font-black uppercase tracking-wider text-white transition-all duration-300 hover:bg-blue-600 shadow-md shadow-slate-900/20 active:scale-95"
                >
                  Xem chi tiết khóa học →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="home-path bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="home-path__container mx-auto max-w-7xl px-6 relative z-10">
          <div className="home-path__header mx-auto mb-16 max-w-2xl text-center">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full">
              Lộ trình bài bản chuẩn quốc tế
            </span>
            <h2 className="home-path__title mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Định hướng cấp độ phù hợp
            </h2>
            <p className="home-path__desc mt-4 text-slate-400 font-medium">
              Chọn mốc khởi đầu chính xác với năng lực hiện tại để tối ưu hóa
              thời gian và tiền bạc.
            </p>
          </div>

          <div className="home-path__grid grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="home-path__card rounded-3xl border border-white/10 bg-slate-800/60 backdrop-blur-xl p-8 shadow-xl transition-all hover:bg-slate-800 hover:border-emerald-500/50">
              <span className="home-path__badge inline-block rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3.5 py-1 text-xs font-bold text-emerald-400">
                Beginner
              </span>
              <h3 className="home-path__name mt-5 text-2xl font-black text-white">
                IELTS Foundation
              </h3>
              <p className="home-path__text mt-3 text-sm text-slate-300 leading-relaxed font-medium">
                Xây dựng gốc rễ vững chắc về phát âm chuẩn IPA, từ vựng nền tảng
                và ngữ pháp cốt lõi.
              </p>
              <ul className="home-path__list mt-8 space-y-3.5 text-xs font-bold text-slate-200">
                <li className="flex items-center gap-2.5 text-emerald-400">
                  ✔ Pronunciation Mastery
                </li>
                <li className="flex items-center gap-2.5 text-emerald-400">
                  ✔ Grammar Essentials
                </li>
                <li className="flex items-center gap-2.5 text-emerald-400">
                  ✔ Vocabulary Builder
                </li>
                <li className="flex items-center gap-2.5 text-emerald-400">
                  ✔ Diagnostic Mini Tests
                </li>
              </ul>
            </div>

            <div className="home-path__card home-path__card--popular relative rounded-3xl border-2 border-blue-500 bg-slate-800 p-8 shadow-2xl shadow-blue-500/20 transform lg:-translate-y-2">
              <span className="absolute -top-3.5 right-6 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-lg">
                ★ Phổ biến nhất
              </span>
              <span className="home-path__badge inline-block rounded-full bg-blue-500/20 border border-blue-400/30 px-3.5 py-1 text-xs font-bold text-blue-300">
                Intermediate
              </span>
              <h3 className="home-path__name mt-5 text-2xl font-black text-white">
                IELTS 5.5+
              </h3>
              <p className="home-path__text mt-3 text-sm text-slate-300 leading-relaxed font-medium">
                Tập trung luyện sâu 4 kỹ năng với hệ thống kho bài tập bám sát
                cấu trúc đề thi thực chiến.
              </p>
              <ul className="home-path__list mt-8 space-y-3.5 text-xs font-bold text-blue-300">
                <li className="flex items-center gap-2.5">
                  ✔ Reading Skills Strategy
                </li>
                <li className="flex items-center gap-2.5">
                  ✔ Listening Advanced Tricks
                </li>
                <li className="flex items-center gap-2.5">
                  ✔ Writing Task 1 & 2 Blueprint
                </li>
                <li className="flex items-center gap-2.5">
                  ✔ Speaking Simulation 1-1
                </li>
              </ul>
            </div>

            <div className="home-path__card rounded-3xl border border-white/10 bg-slate-800/60 backdrop-blur-xl p-8 shadow-xl transition-all hover:bg-slate-800 hover:border-orange-500/50">
              <span className="home-path__badge inline-block rounded-full bg-orange-500/15 border border-orange-500/30 px-3.5 py-1 text-xs font-bold text-orange-400">
                Advanced
              </span>
              <h3 className="home-path__name mt-5 text-2xl font-black text-white">
                IELTS 7.0+
              </h3>
              <p className="home-path__text mt-3 text-sm text-slate-300 leading-relaxed font-medium">
                Chuyên luyện đề nâng cao, tối ưu hóa band điểm và hoàn thiện
                chiến thuật phòng thi điểm số cao.
              </p>
              <ul className="home-path__list mt-8 space-y-3.5 text-xs font-bold text-slate-200">
                <li className="flex items-center gap-2.5 text-orange-400">
                  ✔ Full-length Mock Tests
                </li>
                <li className="flex items-center gap-2.5 text-orange-400">
                  ✔ AI Essay Deep Feedback
                </li>
                <li className="flex items-center gap-2.5 text-orange-400">
                  ✔ Senior Mentor Coaching
                </li>
                <li className="flex items-center gap-2.5 text-orange-400">
                  ✔ Guaranteed Band Target
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-cta pb-24 bg-white pt-16">
        <div className="home-cta__container mx-auto max-w-7xl px-6">
          <div className="home-cta__box relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 px-8 py-16 text-center text-white shadow-2xl shadow-blue-500/25 sm:px-12 lg:py-20">
            <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/20 blur-3xl pointer-events-none"></div>
            <div className="absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-black/20 blur-3xl pointer-events-none"></div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="home-cta__title text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl leading-tight">
                Sẵn sàng bứt phá mục tiêu
                <br />
                chinh phục tương lai cùng E-Learning?
              </h2>

              <p className="home-cta__desc mt-5 text-sm sm:text-base text-blue-100 leading-relaxed font-medium">
                Đăng ký tài khoản ngay hôm nay để trải nghiệm hệ thống học tập
                công nghệ cao và nhận trọn bộ tài liệu độc quyền.
              </p>

              <div className="home-cta__actions mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  to="/register"
                  className="home-cta__btn-primary rounded-2xl bg-white px-8 py-4 text-xs font-black uppercase tracking-wider text-blue-600 shadow-xl transition-all duration-300 hover:bg-slate-100 hover:scale-105 active:scale-95"
                >
                  Đăng ký miễn phí ngay
                </Link>

                <Link
                  to="/courses"
                  className="home-cta__btn-secondary rounded-2xl border border-white/40 bg-white/10 px-8 py-4 text-xs font-black uppercase tracking-wider text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-blue-600 hover:border-white active:scale-95 shadow-lg"
                >
                  Khám phá toàn bộ khóa học
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
