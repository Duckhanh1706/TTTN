import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaPlus,
  FaFileUpload,
  FaCheckCircle,
} from "react-icons/fa";

function TeacherAssignments() {
  const { id } = useParams();
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Bài tập Writing Task 2: Environment Issues",
      deadline: "30/07/2026",
      submittedCount: 15,
      totalCount: 20,
    },
    {
      id: 2,
      title: "Bài tập Speaking Mock Test Part 1-3",
      deadline: "02/08/2026",
      submittedCount: 10,
      totalCount: 20,
    },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newDeadline, setNewDeadline] = useState("");

  const handleCreateAssignment = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setAssignments([
      ...assignments,
      {
        id: Date.now(),
        title: newTitle,
        deadline: newDeadline || "Hôm nay",
        submittedCount: 0,
        totalCount: 20,
      },
    ]);
    setNewTitle("");
    setNewDeadline("");
    alert(
      "Đã tạo và giao bài tập mới thành công cho toàn bộ học viên trong khóa học!",
    );
  };

  const handleGrade = (title) => {
    alert(
      `Mở giao diện chấm bài chi tiết và đưa nhận xét cho bài tập: "${title}"`,
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <Link
            to="/teacher/dashboard"
            className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-xl transition"
          >
            <FaArrowLeft /> Quay lại Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-sm space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
            Quản lý Bài tập & Đánh giá năng lực
          </span>
          <h1 className="text-2xl font-black text-slate-900">
            Danh sách bài tập khóa học #{id}
          </h1>
          <p className="text-xs text-slate-500">
            Tạo đề thi, giao bài tập về nhà và chấm điểm, đưa phản hồi chi tiết
            cho học viên.
          </p>
        </div>

        {/* Form tạo bài tập mới */}
        <form
          onSubmit={handleCreateAssignment}
          className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-sm space-y-4"
        >
          <h3 className="text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-3">
            Tạo bài tập mới
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Tiêu đề bài tập (Ví dụ: Reading Practice Test 1)..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="md:col-span-2 px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:border-indigo-600"
              required
            />
            <input
              type="text"
              placeholder="Hạn nộp (Ví dụ: 05/08/2026)..."
              value={newDeadline}
              onChange={(e) => setNewDeadline(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:border-indigo-600"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-md shadow-indigo-600/20 inline-flex items-center gap-2"
          >
            <FaPlus /> Giao bài tập ngay
          </button>
        </form>

        {/* Danh sách bài tập đã giao */}
        <div className="bg-white rounded-3xl border border-slate-200/70 shadow-sm p-6 space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-3">
            Các bài tập đã giao ({assignments.length})
          </h3>

          <div className="space-y-4">
            {assignments.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100 gap-4"
              >
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Hạn nộp:{" "}
                    <span className="font-bold text-slate-700">
                      {item.deadline}
                    </span>{" "}
                    • Đã nộp:{" "}
                    <span className="font-bold text-indigo-600">
                      {item.submittedCount}/{item.totalCount} học viên
                    </span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleGrade(item.title)}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-sm inline-flex items-center gap-2"
                >
                  <FaCheckCircle /> Chấm bài & Nhận xét
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherAssignments;
