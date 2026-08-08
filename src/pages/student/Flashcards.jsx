import { useState } from "react";

export default function Flashcards() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Dữ liệu mẫu từ vựng tiếng Anh
  const flashcards = [
    {
      id: 1,
      term: "Resilient /rɪˈzɪliənt/",
      meaning: "Kiên cường, có khả năng phục hồi nhanh sau khó khăn",
      example: "She is a resilient leader who never gives up.",
    },
    {
      id: 2,
      term: "Eloquent /ˈeləkwənt/",
      meaning: "Hùng biện, có tài ăn nói lưu loát",
      example: "He gave an eloquent speech at the conference.",
    },
    {
      id: 3,
      term: "Meticulous /məˈtɪkjələs/",
      meaning: "Tỉ mỉ, kỹ càng, chu đáo đến từng chi tiết",
      example: "He is meticulous about his research data.",
    },
  ];

  const currentCard = flashcards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(
      (prev) => (prev - 1 + flashcards.length) % flashcards.length,
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Thẻ từ vựng (Flashcards)
          </h1>
          <p className="text-gray-500 text-sm">
            Ghi nhớ từ vựng tiếng Anh nhanh chóng qua thẻ lật
          </p>
        </div>
        <span className="bg-blue-100 text-blue-700 font-medium px-4 py-1.5 rounded-full text-sm">
          Thẻ {currentIndex + 1} / {flashcards.length}
        </span>
      </div>

      {/* Khung chứa thẻ lật */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full h-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:shadow-2xl relative overflow-hidden group"
      >
        <div className="absolute top-4 right-4 text-xs font-semibold text-gray-400 group-hover:text-blue-600 transition-colors">
          Bấm để lật thẻ ⟲
        </div>

        <div className="flex items-center justify-center h-full text-center">
          <div>
            <span className="text-xs uppercase tracking-wider text-blue-600 font-bold block mb-2">
              {isFlipped ? "Nghĩa & Câu ví dụ" : "Từ vựng & Phiên âm"}
            </span>
            <h2 className="text-2xl font-semibold text-gray-800">
              {isFlipped ? (
                <div>
                  <p className="text-emerald-700 font-bold mb-2">
                    {currentCard.meaning}
                  </p>
                  <p className="text-sm italic text-gray-500">
                    "{currentCard.example}"
                  </p>
                </div>
              ) : (
                currentCard.term
              )}
            </h2>
          </div>
        </div>

        <div className="text-center text-xs text-gray-400">
          Gợi ý: Click vào bất kỳ đâu trên thẻ để xem nghĩa và ví dụ
        </div>
      </div>

      {/* Nút điều hướng */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={handlePrev}
          className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
        >
          ← Thẻ trước
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-200"
        >
          Thẻ tiếp theo →
        </button>
      </div>
    </div>
  );
}
