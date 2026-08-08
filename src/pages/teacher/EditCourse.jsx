import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaArrowLeft, FaPlus, FaTrashAlt, FaSave } from "react-icons/fa";
import { courseService } from "../../services/courseService";

function TeacherEditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form state lưu trữ thông tin chi tiết chính xác của khóa học cần sửa
  const [formData, setFormData] = useState({
    title: "",
    category: "IELTS",
    price: "",
    oldPrice: "",
    level: "Mất gốc / Cơ bản",
    duration: "3 tháng",
    shortDescription: "",
    description: "",
  });

  // State quản lý danh sách video/bài học của riêng khóa học này
  const [lessons, setLessons] = useState([]);

  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [newLessonVideo, setNewLessonVideo] = useState("");

  // Gọi API lấy dữ liệu thực tế của khóa học tương ứng dựa theo id trên URL
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const courseData = await courseService.getCourseById(id);
        if (courseData) {
          setFormData({
            title: courseData.title || "",
            category: courseData.category || "IELTS",
            price: courseData.price || "",
            oldPrice: courseData.oldPrice || "",
            level: courseData.level || "Mất gốc / Cơ bản",
            duration: courseData.duration || "3 tháng",
            shortDescription: courseData.shortDescription || "",
            description: courseData.description || "",
          });
          if (Array.isArray(courseData.lessons)) {
            setLessons(courseData.lessons);
          }
        }
      } catch (err) {
        console.error("Lỗi tải thông tin chi tiết khóa học:", err);
        alert("Không thể tải thông tin khóa học từ hệ thống.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourseDetails();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Thêm bài học mới vào danh sách
  const handleAddLesson = (e) => {
    e.preventDefault();
    if (!newLessonTitle.trim()) return;

    const newItem = {
      id: Date.now(),
      title: newLessonTitle,
      videoUrl: newLessonVideo || "https://youtube.com/embed/sample",
      duration: "30 phút",
    };

    setLessons((prev) => [...prev, newItem]);
    setNewLessonTitle("");
    setNewLessonVideo("");
  };

  // Xóa bài học
  const handleRemoveLesson = (lessonId) => {
    setLessons((prev) => prev.filter((l) => l.id !== lessonId));
  };

  // Gửi dữ liệu cập nhật lên server
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price) {
      alert("Vui lòng điền đầy đủ tên khóa học và học phí!");
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        ...formData,
        lessons,
      };

      await courseService.updateCourse(id, payload);
      alert(
        `Đã cập nhật thành công khóa học: "${formData.title}" trên hệ thống!`,
      );
      navigate("/teacher/dashboard");
    } catch (err) {
      console.error("Lỗi khi cập nhật khóa học:", err);
      alert("Không thể lưu thay đổi lên máy chủ. Vui lòng thử lại sau.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <p className="text-slate-500 font-bold text-xs animate-pulse">
          Đang tải thông tin chi tiết khóa học #{id} từ cơ sở dữ liệu...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Nút quay lại */}
        <div>
          <Link
            to="/teacher/dashboard"
            className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-xl transition"
          >
            <FaArrowLeft /> Quay lại Dashboard Giảng viên
          </Link>
        </div>

        {/* Tiêu đề */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
            Chỉnh sửa học thuật & Quản trị
          </span>
          <h1 className="text-3xl font-black text-slate-900 mt-2">
            Chỉnh sửa khóa học: {formData.title || `ID #${id}`}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Cập nhật thông tin học phí, mô tả chi tiết và cấu trúc danh sách bài
            giảng trực tiếp từ cơ sở dữ liệu.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Thông tin cơ bản */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-sm space-y-6">
            <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">
              1. Thông tin chung khóa học
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tên khóa học
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Ví dụ: IELTS Master Speaking 8.0+"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-indigo-600 text-xs font-medium text-slate-900 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Danh mục chuyên môn
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-indigo-600 text-xs font-medium bg-white text-slate-900"
                >
                  <option value="IELTS">IELTS</option>
                  <option value="TOEIC">TOEIC</option>
                  <option value="Communication">Giao tiếp công sở</option>
                  <option value="Pronunciation">Phát âm IPA</option>
                  <option value="Lập trình">Lập trình</option>
                  <option value="Tổng hợp">Tổng hợp</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Cấp độ học viên
                </label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-indigo-600 text-xs font-medium bg-white text-slate-900"
                >
                  <option value="Mất gốc / Cơ bản">Mất gốc / Cơ bản</option>
                  <option value="Trung cấp (TOEIC 450+)">
                    Trung cấp (TOEIC 450+)
                  </option>
                  <option value="Nâng cao (IELTS 6.0+)">
                    Nâng cao (IELTS 6.0+)
                  </option>
                  <option value="Mọi cấp độ">Mọi cấp độ</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Học phí (VNĐ)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Ví dụ: 1200000"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-indigo-600 text-xs font-medium text-slate-900 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Giá gốc (Hiển thị gạch ngang)
                </label>
                <input
                  type="number"
                  name="oldPrice"
                  value={formData.oldPrice}
                  onChange={handleChange}
                  placeholder="Ví dụ: 2000000"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-indigo-600 text-xs font-medium text-slate-900 bg-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mô tả ngắn
                </label>
                <input
                  type="text"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  placeholder="Tóm tắt ngắn gọn giá trị khóa học trong 1 câu..."
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-indigo-600 text-xs font-medium text-slate-900 bg-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mô tả chi tiết nội dung
                </label>
                <textarea
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Giới thiệu chi tiết lộ trình học tập, cam kết đầu ra..."
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-indigo-600 text-xs font-medium resize-none text-slate-900 bg-white"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Quản lý danh sách video / bài giảng */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-sm space-y-6">
            <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
              <span>2. Quản lý Video & Bài học ({lessons.length})</span>
            </h3>

            {/* Danh sách bài học hiện tại */}
            <div className="space-y-3">
              {lessons.length > 0 ? (
                lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">
                          {lesson.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-medium">
                          Thời lượng: {lesson.duration || "30 phút"} • Liên kết
                          video hệ thống
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveLesson(lesson.id)}
                      className="text-slate-400 hover:text-red-600 p-2 rounded-xl hover:bg-red-50 transition"
                      title="Xóa bài học"
                    >
                      <FaTrashAlt className="text-xs" />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 text-center py-4">
                  Chưa có bài học nào trong khóa học này.
                </p>
              )}
            </div>

            {/* Form thêm bài học nhanh */}
            <div className="p-4 rounded-2xl border border-dashed border-indigo-200 bg-indigo-50/30 space-y-3">
              <span className="text-xs font-bold text-indigo-900 block">
                Thêm bài học / video mới
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Tên bài học (Ví dụ: Bài 3: Kỹ năng Skimming)..."
                  value={newLessonTitle}
                  onChange={(e) => setNewLessonTitle(e.target.value)}
                  className="sm:col-span-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium outline-none focus:border-indigo-600 text-slate-900"
                />
                <input
                  type="text"
                  placeholder="Link Video (YouTube Embed URL)..."
                  value={newLessonVideo}
                  onChange={(e) => setNewLessonVideo(e.target.value)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium outline-none focus:border-indigo-600 text-slate-900"
                />
              </div>
              <button
                type="button"
                onClick={handleAddLesson}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-sm inline-flex items-center gap-1.5"
              >
                <FaPlus /> Thêm bài học này
              </button>
            </div>
          </div>

          {/* Nút lưu cuối trang */}
          <div className="flex justify-end gap-4 pb-10">
            <Link
              to="/teacher/dashboard"
              className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold transition"
            >
              Hủy bỏ
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition shadow-lg shadow-indigo-600/25 flex items-center gap-2 disabled:opacity-50"
            >
              <FaSave />
              {submitting ? "Đang lưu..." : "Lưu thay đổi khóa học"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TeacherEditCourse;
