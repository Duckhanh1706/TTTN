import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { examService } from "../../services/examService";

export default function Practice() {
  const { id } = useParams(); // Lấy ID bài kiểm tra từ URL (nếu có)
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [examInfo, setExamInfo] = useState(null); // Thông tin bài kiểm tra (tiêu đề, thời gian...)
  const [questions, setQuestions] = useState([]); // Danh sách câu hỏi lấy từ CSDL
  const [currentIndex, setCurrentIndex] = useState(0); // Vị trí câu hỏi hiện tại (bắt đầu từ 0)

  // Lưu đáp án của người dùng: { [questionId]: selectedOptionIndex }
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1200); // Mặc định 20 phút = 1200 giây

  // 1. Gọi API lấy dữ liệu bài kiểm tra và danh sách câu hỏi từ CSDL khi load trang
  useEffect(() => {
    const fetchExamData = async () => {
      try {
        setLoading(true);
        const data = await examService.getExamDetails(id || 1);

        setExamInfo(
          data?.exam || {
            title: "Luyện tập: Ngữ pháp tiếng Anh nâng cao",
            description: "Bài kiểm tra chất lượng",
            duration: 20, // tính theo phút
          },
        );

        const fetchedQuestions = data?.questions || [];
        setQuestions(fetchedQuestions);

        // Nếu API trả về thời gian làm bài (phút), quy đổi ra giây
        if (data?.exam?.duration) {
          setTimeLeft(data.exam.duration * 60);
        }
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu bài kiểm tra từ CSDL:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExamData();
  }, [id]);

  // 2. Xử lý đồng hồ đếm ngược thời gian làm bài
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmitExam(); // Tự động nộp bài khi hết giờ
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format thời gian từ giây sang dạng MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // 3. Xử lý khi học viên chọn đáp án (có tự động chuyển sang câu tiếp theo)
  const handleSelectOption = (optionIndex) => {
    const currentQuestion = questions[currentIndex];
    if (!currentQuestion) return;

    setUserAnswers({
      ...userAnswers,
      [currentQuestion.id]: optionIndex,
    });

    // Tự động chuyển sang câu tiếp theo sau 300ms để trải nghiệm mượt mà hơn
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 300);
  };

  // 4. Chuyển câu hỏi thủ công trước / sau
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // 5. Nộp bài kiểm tra lên API
  const handleSubmitExam = async () => {
    try {
      const submissionData = {
        examId: id || 1,
        answers: userAnswers,
      };

      console.log("Dữ liệu nộp bài:", submissionData);
      // await examService.submitExam(submissionData);

      alert("Nộp bài kiểm tra thành công!");
      navigate("/my-courses");
    } catch (err) {
      console.error("Lỗi khi nộp bài:", err);
      alert("Có lỗi xảy ra khi nộp bài, vui lòng thử lại.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-bold text-gray-700 bg-slate-50">
        Đang tải dữ liệu bài kiểm tra từ hệ thống...
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center font-medium text-gray-500 bg-slate-50">
        Bài kiểm tra này hiện chưa có câu hỏi nào.
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const selectedOption = userAnswers[currentQuestion?.id] ?? null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Tiêu đề & Đồng hồ đếm ngược */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6 gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            {examInfo?.title || "Bài kiểm tra"}
          </h1>
          <p className="text-gray-500 text-sm">
            Bài kiểm tra gồm {questions.length} câu hỏi - Thời gian:{" "}
            {examInfo?.duration || 20} phút
          </p>
        </div>
        <div className="flex items-center gap-3 bg-red-50 text-red-600 px-4 py-2 rounded-xl font-semibold border border-red-100">
          <span>⏱ Thời gian còn lại:</span>
          <span className="text-lg">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Khung nội dung chính */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Câu hỏi hiện tại */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
                Câu hỏi số {currentIndex + 1} / {questions.length}
              </span>
              <span className="text-xs text-gray-400">
                Điểm: {currentQuestion?.points || 1.0}
              </span>
            </div>

            <h2 className="text-lg font-medium text-gray-800 mb-6">
              {currentQuestion?.question_text || currentQuestion?.title}
            </h2>

            <div className="space-y-3">
              {(
                currentQuestion?.options || [
                  currentQuestion?.option_a,
                  currentQuestion?.option_b,
                  currentQuestion?.option_c,
                  currentQuestion?.option_d,
                ]
              ).map((optionText, index) => {
                if (!optionText) return null;
                return (
                  <label
                    key={index}
                    onClick={() => handleSelectOption(index)}
                    className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedOption === index
                        ? "border-blue-600 bg-blue-50/50 text-blue-900 font-medium shadow-sm"
                        : "border-gray-200 hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question_${currentQuestion.id}`}
                      className="mr-3 accent-blue-600"
                      checked={selectedOption === index}
                      readOnly
                    />
                    {optionText}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Nút chuyển câu */}
          <div className="flex justify-between mt-8 pt-4 border-t border-gray-100">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`px-5 py-2 border rounded-xl text-sm font-medium transition-all ${
                currentIndex === 0
                  ? "opacity-40 cursor-not-allowed border-gray-200 text-gray-400"
                  : "border-gray-300 text-gray-600 hover:bg-gray-50 cursor-pointer"
              }`}
            >
              ← Câu trước
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= questions.length - 1}
              className={`px-6 py-2 rounded-xl text-sm font-medium shadow-md transition-all ${
                currentIndex >= questions.length - 1
                  ? "opacity-40 cursor-not-allowed bg-blue-400 text-white"
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200 cursor-pointer"
              }`}
            >
              Câu tiếp theo →
            </button>
          </div>
        </div>

        {/* Bảng điều hướng câu hỏi */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h3 className="text-sm font-bold text-gray-700 mb-4">
            Danh sách câu hỏi
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((q, i) => {
              const isAnswered = userAnswers[q.id] !== undefined;
              const isCurrent = i === currentIndex;

              return (
                <button
                  key={q.id || i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-10 rounded-xl font-medium text-sm transition-all cursor-pointer ${
                    isCurrent
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200 ring-2 ring-blue-300"
                      : isAnswered
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          <button
            onClick={handleSubmitExam}
            className="w-full mt-6 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-100 text-sm cursor-pointer"
          >
            Nộp bài kiểm tra
          </button>
        </div>
      </div>
    </div>
  );
}
