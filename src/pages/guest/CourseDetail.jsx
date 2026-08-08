import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { courseService } from "../../services/courseService";
import { enrollmentService } from "../../services/enrollmentService";

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Gọi API lấy thông tin chi tiết khóa học thật từ Backend MySQL theo ID
  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        setLoading(true);
        const data = await courseService.getCourseById(id);

        const formattedCourse = {
          ...data,
          priceFormatted:
            Number(data.price || 0).toLocaleString("vi-VN") + " VNĐ",
          description:
            data.description || "Chưa có mô tả chi tiết cho khóa học này.",
          benefits: data.benefits
            ? JSON.parse(data.benefits)
            : [
                "Nắm vững hệ thống kiến thức chuẩn hóa từ cơ bản đến nâng cao",
                "Thực hành trực tiếp qua hệ thống bài học thực chiến",
                "Hỗ trợ giải đáp thắc mắc trực tiếp từ giảng viên",
              ],
          curriculum: data.curriculum || [],
          instructor: {
            name: data.teacher_name || "Giảng viên",
            role: data.teacher_role || "Chuyên gia đào tạo",
            experience:
              data.teacher_experience || "Nhiều năm kinh nghiệm giảng dạy",
            avatar: data.teacher_avatar || "",
          },
          students: data.students_count || 0,
          rating: data.rating || "5.0",
          reviewsCount: data.reviews_count || 0,
          level: data.level || "Cơ bản",
          category: data.category || "Tổng hợp",
          lessons: data.lessons_count || 0,
        };

        setCourse(formattedCourse);
      } catch (err) {
        console.error("Lỗi khi tải chi tiết khóa học:", err);
        setError("Không thể tải thông tin khóa học từ máy chủ.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourseDetail();
    }
  }, [id]);

  const handleProtectedAction = async (actionType) => {
    const userStored = localStorage.getItem("elearning_user");

    if (!userStored) {
      navigate("/login", {
        state: { from: `/courses/${id}`, action: actionType },
      });
    } else {
      if (actionType === "cart") {
        // Lấy giỏ hàng hiện tại từ localStorage
        const existingCart =
          JSON.parse(localStorage.getItem("elearning_cart_items")) || [];
        const isExisted = existingCart.some((item) => item.id === course.id);

        if (!isExisted) {
          const updatedCart = [...existingCart, course];
          localStorage.setItem(
            "elearning_cart_items",
            JSON.stringify(updatedCart),
          );

          // Phát tín hiệu thông báo cho Navbar cập nhật số lượng badge
          window.dispatchEvent(new Event("cartUpdated"));

          alert("Đã thêm khóa học vào giỏ hàng thành công!");
        } else {
          alert("Khóa học này đã có trong giỏ hàng của bạn!");
        }
      } else if (actionType === "checkout") {
        // Đưa trực tiếp khóa học này vào danh sách thanh toán đơn lẻ
        localStorage.setItem(
          "elearning_checkout_items",
          JSON.stringify([course]),
        );
        // Chuyển hướng sang trang thanh toán VNPay
        navigate("/checkout");
      }
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <p className="text-slate-500 font-medium">
          Đang tải thông tin khóa học...
        </p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center space-y-4">
        <p className="text-red-500 font-semibold">
          {error || "Không tìm thấy khóa học."}
        </p>
        <Link
          to="/courses"
          className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold uppercase"
        >
          Quay lại danh sách khóa học
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="course-detail bg-[#F8FAFC] min-h-screen py-12 lg:py-16">
        <div className="course-detail__container mx-auto max-w-7xl px-6">
          {/* Breadcrumb */}
          <div className="course-detail__breadcrumb mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
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
              <div className="course-detail__header bg-white rounded-3xl border border-slate-200/70 p-8 shadow-sm">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
                    {course.category}
                  </span>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                    {course.level}
                  </span>
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg text-amber-700">
                    ⭐ {course.rating} ({course.reviewsCount} đánh giá)
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
              <div className="course-detail__benefits bg-white rounded-3xl border border-slate-200/70 p-8 shadow-sm">
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

              {/* Instructor Info */}
              <div className="course-detail__instructor bg-white rounded-3xl border border-slate-200/70 p-8 shadow-sm">
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
                    <div className="h-20 w-20 rounded-full bg-slate-200 ring-4 ring-slate-50 flex-shrink-0 flex items-center justify-center text-slate-500 font-bold text-xl">
                      {course.instructor.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {course.instructor.name}
                    </h3>
                    <p className="text-xs font-bold text-blue-600 mt-0.5">
                      {course.instructor.role}
                    </p>
                    <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                      {course.instructor.experience}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sticky Checkout Sidebar */}
            <div className="lg:col-span-1">
              <div className="course-sidebar sticky top-8 bg-white rounded-3xl border border-slate-200/70 p-8 shadow-xl shadow-slate-200/50">
                <div className="h-48 w-full rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 mb-6 flex items-center justify-center text-white font-bold text-sm shadow-inner relative overflow-hidden">
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <span>🎬 Video giới thiệu khóa học</span>
                  )}
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-blue-600">
                    {course.priceFormatted}
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
