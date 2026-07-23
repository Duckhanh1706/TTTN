import { Link, useParams, useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import MOCK_COURSES from "../../data/mockCourses.json";

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleProtectedAction = (actionType) => {
    // Kiểm tra trạng thái đăng nhập thực tế từ localStorage
    const userStored = localStorage.getItem("elearning_user");

    if (!userStored) {
      // Nếu chưa đăng nhập -> Chuyển đến trang login và lưu lại trạng thái đang xem dở
      navigate("/login", {
        state: { from: `/courses/${id}`, action: actionType },
      });
    } else {
      // Nếu đã đăng nhập -> Xử lý nghiệp vụ giỏ hàng hoặc thanh toán
      if (actionType === "cart") {
        alert("Đã thêm khóa học vào giỏ hàng thành công!");
      } else {
        alert("Chuyển đến cổng thanh toán khóa học!");
      }
    }
  };

  // Tìm khóa học theo id từ file courses.json
  const courseId = parseInt(id) || 1;
  const foundCourse =
    MOCK_COURSES.find((item) => item.id === courseId) || MOCK_COURSES[0];

  // Chuẩn hóa dữ liệu course
  const course = {
    ...foundCourse,
    description:
      foundCourse.description ||
      "Khóa học được thiết kế chuyên sâu giúp học viên nắm vững kiến thức nền tảng và bứt phá mục tiêu band điểm nhanh chóng.",
    benefits: foundCourse.benefits || [
      "Nắm vững hệ thống kiến thức chuẩn hóa từ cơ bản đến nâng cao",
      "Thực hành trực tiếp qua hệ thống bài tập thực chiến đa dạng",
      "Xây dựng kho từ vựng và ngữ pháp chuyên sâu áp dụng ngay",
      "Hỗ trợ giải đáp thắc mắc và chữa bài chi tiết từ chuyên gia",
      "Tặng kèm trọn bộ tài liệu và flashcards độc quyền",
    ],
    curriculum: foundCourse.curriculum || [
      {
        section: "Phần 1: Giới thiệu và định hướng lộ trình",
        lessonsCount: 8,
        duration: "2 tuần",
      },
      {
        section: "Phần 2: Kiến thức cốt lõi nền tảng",
        lessonsCount: 12,
        duration: "3 tuần",
      },
      {
        section: "Phần 3: Thực hành và giải đề thực chiến",
        lessonsCount: 15,
        duration: "3 tuần",
      },
      {
        section: "Phần 4: Tổng ôn và bứt phá điểm số",
        lessonsCount: 10,
        duration: "2 tuần",
      },
    ],
    instructor: foundCourse.instructor || {
      name: "Nguyễn Văn A",
      role: "Chuyên gia đào tạo ngoại ngữ",
      experience: "8+ năm kinh nghiệm giảng dạy",
    },
    students: foundCourse.students || "2.3K",
    reviewsCount: foundCourse.reviewsCount
      ? `${foundCourse.reviewsCount} đánh giá`
      : "348 đánh giá",
  };

  return (
    <>
      <div className="course-detail bg-[#F8FAFC] min-h-screen py-12 lg:py-16">
        <div className="course-detail__container mx-auto max-w-7xl px-6">
          {/* Breadcrumb */}
          <div className="course-detail__breadcrumb mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 animate-fade-in-up">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Trang chủ
            </Link>
            <span>/</span>
            <Link
              to="/courses"
              className="hover:text-blue-600 transition-colors"
            >
              Khóa học
            </Link>
            <span>/</span>
            <span className="text-slate-700">{course.category}</span>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Left Content Column */}
            <div className="lg:col-span-2 space-y-10">
              {/* Header Info */}
              <div className="course-detail__header bg-white rounded-3xl border border-slate-200/70 p-8 shadow-sm animate-fade-in-up">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
                    {course.category}
                  </span>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                    {course.level}
                  </span>
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg text-amber-700">
                    ⭐ {course.rating} ({course.reviewsCount})
                  </span>
                </div>

                <h1 className="course-detail__title mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  {course.title}
                </h1>

                <p className="course-detail__desc mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                  {course.description}
                </p>

                <div className="course-detail__meta mt-6 flex flex-wrap items-center gap-6 border-t border-slate-100 pt-6 text-xs font-semibold text-slate-500">
                  <span>📚 {course.lessons} bài học chi tiết</span>
                  <span>👥 {course.students} học viên đăng ký</span>
                  <span>⏱️ Học mọi lúc, mọi nơi</span>
                </div>
              </div>

              {/* What You Will Learn */}
              <div className="course-detail__benefits bg-white rounded-3xl border border-slate-200/70 p-8 shadow-sm animate-fade-in-up delay-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Bạn sẽ học được gì?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {course.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 bg-slate-50/60 p-4 rounded-2xl border border-slate-100"
                    >
                      <span className="text-blue-600 font-bold mt-0.5">✔</span>
                      <span className="text-xs font-semibold text-slate-700 leading-relaxed">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curriculum */}
              <div className="course-detail__curriculum bg-white rounded-3xl border border-slate-200/70 p-8 shadow-sm animate-fade-in-up delay-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Nội dung khóa học
                </h2>
                <div className="space-y-4">
                  {course.curriculum.map((section, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200/60 p-5 bg-slate-50/40 flex items-center justify-between transition-all hover:bg-white hover:shadow-md cursor-pointer"
                    >
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">
                          {section.section}
                        </h3>
                        <p className="mt-1 text-xs text-slate-400 font-medium">
                          📚 {section.lessonsCount} bài học • ⏱️ Thời lượng:{" "}
                          {section.duration}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl">
                        Chi tiết
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructor Info */}
              <div className="course-detail__instructor bg-white rounded-3xl border border-slate-200/70 p-8 shadow-sm animate-fade-in-up delay-300">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Giảng viên phụ trách
                </h2>
                <div className="flex items-center gap-6">
                  {course.instructor.avatar ? (
                    <img
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                      className="h-20 w-20 rounded-full object-cover ring-4 ring-slate-50 flex-shrink-0"
                    />
                  ) : (
                    <div className="h-20 w-20 rounded-full bg-slate-200 ring-4 ring-slate-50 flex-shrink-0"></div>
                  )}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {course.instructor.name}
                    </h3>
                    <p className="text-xs font-bold text-blue-600 mt-0.5">
                      {course.instructor.role}
                    </p>
                    <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                      {course.instructor.experience ||
                        "Giảng viên chuyên gia nhiều năm kinh nghiệm thực chiến."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sticky Checkout Sidebar */}
            <div className="lg:col-span-1">
              <div className="course-sidebar sticky top-8 bg-white rounded-3xl border border-slate-200/70 p-8 shadow-xl shadow-slate-200/50 animate-fade-in-up">
                <div className="h-48 w-full rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 mb-6 flex items-center justify-center text-white font-bold text-sm shadow-inner">
                  🎬 Video giới thiệu khóa học
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-blue-600">
                    {course.price}
                  </span>
                  <span className="text-sm font-medium text-slate-400 line-through">
                    {course.oldPrice}
                  </span>
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => handleProtectedAction("checkout")}
                    className="w-full rounded-2xl bg-blue-600 py-4 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-blue-700 shadow-lg shadow-blue-600/25 active:scale-95"
                  >
                    Đăng ký học ngay
                  </button>

                  <button
                    onClick={() => handleProtectedAction("cart")}
                    className="w-full rounded-2xl border border-slate-200 bg-white py-4 text-xs font-bold uppercase tracking-wider text-slate-700 transition-all duration-300 hover:bg-slate-50 active:scale-95 shadow-sm"
                  >
                    Thêm vào giỏ hàng
                  </button>
                </div>

                <div className="mt-8 border-t border-slate-100 pt-6 space-y-4 text-xs font-semibold text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>Trình độ học viên:</span>
                    <span className="text-slate-900">{course.level}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Tổng số bài học:</span>
                    <span className="text-slate-900">{course.lessons} bài</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Hình thức học:</span>
                    <span className="text-slate-900">Trực tuyến 100%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Truy cập:</span>
                    <span className="text-slate-900">Trọn đời</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseDetail;
