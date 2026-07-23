import { useState } from "react";

export default function Practice() {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Tiêu đề & Đồng hồ đếm ngược */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6 gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            Luyện tập: Ngữ pháp tiếng Anh nâng cao
          </h1>
          <p className="text-gray-500 text-sm">
            Bài kiểm tra gồm 15 câu hỏi - Thời gian: 20 phút
          </p>
        </div>
        <div className="flex items-center gap-3 bg-red-50 text-red-600 px-4 py-2 rounded-xl font-semibold border border-red-100">
          <span>⏱ Thời gian còn lại:</span>
          <span className="text-lg">18:30</span>
        </div>
      </div>

      {/* Khung nội dung chính */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Câu hỏi hiện tại */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
              Câu hỏi số 1
            </span>
            <span className="text-xs text-gray-400">Điểm: 1.0</span>
          </div>

          <h2 className="text-lg font-medium text-gray-800 mb-6">
            Choose the correct option: "If I _____ about the heavy traffic, I
            would have taken another route."
          </h2>

          <div className="space-y-3">
            {["A. know", "B. knew", "C. had known", "D. would know"].map(
              (option, index) => (
                <label
                  key={index}
                  onClick={() => setSelectedOption(index)}
                  className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedOption === index
                      ? "border-blue-600 bg-blue-50/50 text-blue-900 font-medium shadow-sm"
                      : "border-gray-200 hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="question"
                    className="mr-3 accent-blue-600"
                    checked={selectedOption === index}
                    readOnly
                  />
                  {option}
                </label>
              ),
            )}
          </div>

          {/* Nút chuyển câu */}
          <div className="flex justify-between mt-8 pt-4 border-t border-gray-100">
            <button className="px-5 py-2 border border-gray-300 text-gray-600 rounded-xl hover:bg-gray-50 text-sm font-medium">
              ← Câu trước
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm font-medium shadow-md shadow-blue-200">
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
            {[...Array(10)].map((_, i) => (
              <button
                key={i}
                className={`h-10 rounded-xl font-medium text-sm transition-all ${
                  i === 0
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button className="w-full mt-6 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-100 text-sm">
            Nộp bài kiểm tra
          </button>
        </div>
      </div>
    </div>
  );
}
