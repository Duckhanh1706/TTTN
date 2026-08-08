import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaPlus,
  FaClock,
  FaLayerGroup,
  FaTrashAlt,
  FaEdit,
  FaPaperPlane,
} from "react-icons/fa";
import axiosClient from "../../services/axiosClient";

function TeacherExamsManager() {
  const { id } = useParams();

  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state tạo đề thi mới với các lựa chọn đầy đủ
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState("Trắc nghiệm tự động");
  const [newDuration, setNewDuration] = useState("45 phút");
  const [newQuestionsCount, setNewQuestionsCount] = useState(30);

  // Gọi API lấy danh sách đề thi/kiểm tra thực tế của khóa học từ cơ sở dữ liệu
  const fetchExams = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get(`/api/courses/${id}/exams`);
      const examList = Array.isArray(response.data)
        ? response.data
        : response.data.exams || [];
      setExams(examList);
    } catch (err) {
      console.error("Lỗi tải danh sách đề kiểm tra từ hệ thống:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchExams();
    }
  }, [id]);

  const handleCreateExam = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const payload = {
        title: newTitle,
        type: newType,
        duration: newDuration,
        questionsCount: Number(newQuestionsCount),
        status: "Đang mở",
      };

      const response = await axiosClient.post(
        `/api/courses/${id}/exams`,
        payload,
      );
      const createdExam = response.data.exam || response.data;

      setExams((prev) => [...prev, createdExam]);
      setNewTitle("");
      setNewDuration("45 phút");
      setNewQuestionsCount(30);
      alert("Đã tạo đề kiểm tra / ôn tập định kỳ thành công trên hệ thống!");
    } catch (err) {
      console.error("Lỗi khi tạo đề kiểm tra:", err);
      alert("Không thể tạo đề kiểm tra từ máy chủ. Vui lòng thử lại sau.");
    }
  };

  const handleDeleteExam = async (examId) => {
    if (
      window.confirm(
        "Bạn có chắc chắn muốn xóa đề kiểm tra này từ cơ sở dữ liệu không?",
      )
    ) {
      try {
        await axiosClient.delete(`/api/exams/${examId}`);
        setExams((prev) => prev.filter((item) => item.id !== examId));
      } catch (err) {
        console.error("Lỗi khi xóa đề kiểm tra:", err);
        alert("Không thể xóa đề kiểm tra từ máy chủ. Vui lòng thử lại sau.");
      }
    }
  };

  const handleEditExam = (examTitle, examId) => {
    alert(
      `Mở giao diện soạn thảo chi tiết câu hỏi cho đề ID #${examId}: "${examTitle}"`,
    );
  };

  // Hàm giao bài thi và cập nhật trạng thái lên CSDL
  const handleAssignExam = async (exam) => {
    const confirmAssign = window.confirm(
      `Bạn có muốn giao bài kiểm tra "${exam.title}" cho toàn bộ học viên trong khóa học này không?`,
    );

    if (!confirmAssign) return;

    try {
      const response = await axiosClient.post(`/api/exams/${exam.id}/assign`, {
        courseId: id,
        status: "Đã giao / Đang mở",
      });

      setExams((prev) =>
        prev.map((item) =>
          item.id === exam.id ? { ...item, status: "Đã giao" } : item,
        ),
      );

      alert(
        response.data?.message ||
          "Đã giao bài thi thành công và cập nhật lên cơ sở dữ liệu!",
      );
    } catch (err) {
      console.error("Lỗi khi giao bài thi:", err);
      alert("Không thể giao bài thi từ máy chủ. Vui lòng thử lại sau.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <p className="text-slate-500 font-bold text-xs animate-pulse">
          Đang đồng bộ danh sách đề kiểm tra trực tiếp từ hệ thống...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <Link
            to="/teacher/courses"
            className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-xl transition"
          >
            <FaArrowLeft /> Quay lại Quản lý khóa học
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-sm space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
            Hệ thống Khảo thí & Đánh giá
          </span>
          <h1 className="text-2xl font-black text-slate-900">
            Quản lý Đề kiểm tra & Ôn tập định kỳ (Khóa học #{id})
          </h1>
          <p className="text-xs text-slate-500">
            Tạo, phân công giao bài và quản lý các bài kiểm tra đánh giá năng
            lực, đề thi giữa kỳ, cuối kỳ hoàn toàn từ cơ sở dữ liệu.
          </p>
        </div>

        {/* Form tạo đề kiểm tra mới */}
        <form
          onSubmit={handleCreateExam}
          className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-sm space-y-4"
        >
          <h3 className="text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-3">
            Soạn thảo đề kiểm tra / Bài ôn tập mới
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tiêu đề bài kiểm tra
              </label>
              <input
                type="text"
                placeholder="Ví dụ: Kiểm tra 15 phút từ vựng Unit 1..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:border-indigo-600 text-slate-900 bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Hình thức kiểm tra
              </label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:border-indigo-600 text-slate-900 bg-white"
              >
                <option value="Trắc nghiệm tự động">Trắc nghiệm tự động</option>
                <option value="Tự luận / Bài tập lớn">
                  Tự luận / Bài tập lớn
                </option>
                <option value="Mock Test định kỳ">Mock Test định kỳ</option>
                <option value="Flashcard / Ôn tập">Flashcard / Ôn tập</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Thời gian làm bài
              </label>
              <input
                type="text"
                placeholder="Ví dụ: 45 phút"
                value={newDuration}
                onChange={(e) => setNewDuration(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:border-indigo-600 text-slate-900 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Số lượng câu hỏi
              </label>
              <input
                type="number"
                placeholder="Ví dụ: 30"
                value={newQuestionsCount}
                onChange={(e) => setNewQuestionsCount(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:border-indigo-600 text-slate-900 bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-md shadow-indigo-600/20 inline-flex items-center gap-2 cursor-pointer"
          >
            <FaPlus /> Tạo đề kiểm tra ngay
          </button>
        </form>

        {/* Danh sách các đề kiểm tra đã tạo */}
        <div className="bg-white rounded-3xl border border-slate-200/70 shadow-sm p-6 space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-3">
            Danh sách đề kiểm tra & ôn tập ({exams.length})
          </h3>

          <div className="space-y-4">
            {exams.length > 0 ? (
              exams.map((exam) => (
                <div
                  key={exam.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100 gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider bg-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-full">
                        {exam.type || "Trắc nghiệm tự động"}
                      </span>
                      <span
                        className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                          (exam.status || "Đang mở") === "Đang mở" ||
                          (exam.status || "") === "Đã giao"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {exam.status || "Đang mở"}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">
                      {exam.title}
                    </h4>
                    <p className="text-xs text-slate-500 flex items-center gap-3">
                      <span className="inline-flex items-center gap-1">
                        <FaClock className="text-slate-400" /> Thời gian:{" "}
                        <strong className="text-slate-700">
                          {exam.duration || "Không giới hạn"}
                        </strong>
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <FaLayerGroup className="text-slate-400" /> Số câu hỏi:{" "}
                        <strong className="text-indigo-600">
                          {exam.questionsCount ?? exam.questions_count ?? 0} câu
                        </strong>
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => handleAssignExam(exam)}
                      className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition inline-flex items-center gap-1.5 shadow-sm shadow-emerald-600/20 cursor-pointer"
                    >
                      <FaPaperPlane /> Giao bài thi
                    </button>

                    <button
                      type="button"
                      onClick={() => handleEditExam(exam.title, exam.id)}
                      className="px-4 py-2.5 bg-slate-200/70 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <FaEdit /> Soạn câu hỏi
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteExam(exam.id)}
                      className="p-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition cursor-pointer"
                      title="Xóa đề kiểm tra"
                    >
                      <FaTrashAlt className="text-xs" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-slate-500 text-xs font-bold">
                Chưa có đề kiểm tra hay bài ôn tập định kỳ nào từ hệ thống cơ sở
                dữ liệu.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherExamsManager;
