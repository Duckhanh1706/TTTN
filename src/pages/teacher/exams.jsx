import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function TeacherExamQuestions() {
  const { examId } = useParams();
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <Link
            to={-1}
            className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-xl transition"
          >
            <FaArrowLeft /> Quay lại danh sách đề thi
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-sm space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
            Trang soạn thảo câu hỏi
          </span>
          <h1 className="text-xl font-black text-slate-900">
            Quản lý câu hỏi cho Đề thi (ID: #{examId})
          </h1>
          <p className="text-xs text-slate-500">
            Thêm mới câu hỏi trắc nghiệm, thiết lập đáp án đúng và điểm số cho
            từng câu.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TeacherExamQuestions;
