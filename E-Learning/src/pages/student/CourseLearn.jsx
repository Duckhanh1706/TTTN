import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaPlayCircle,
  FaArrowLeft,
  FaBookOpen,
  FaMoon,
  FaSun,
  FaCommentAlt,
  FaPaperPlane,
} from "react-icons/fa";
import MOCK_COURSES from "../../data/mockCourses.json";

function CourseLearn() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([1]);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Trần Minh Quân",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
      time: "2 giờ trước",
      text: "Bài giảng rất chi tiết và dễ hiểu ạ. Cho mình hỏi phần tài liệu IPA có thể tải ở đâu vậy ạ?",
      replies: [
        {
          id: 101,
          author: "Giảng viên",
          avatar:
            "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100",
          time: "1 giờ trước",
          text: "Chào bạn, bạn có thể xem ở phần tài liệu đính kèm bên góc phải nhé!",
        },
      ],
    },
  ]);
  const [newCommentText, setNewCommentText] = useState("");

  useEffect(() => {
    const courseId = parseInt(id) || 1;
    const found =
      MOCK_COURSES.find((c) => c.id === courseId) || MOCK_COURSES[0];
    setCourse(found);

    setActiveLesson({
      id: 1,
      title: `Bài 1: Giới thiệu tổng quan ${found.title}`,
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      duration: "15:00 phút",
      content: `Nội dung chuyên sâu thuộc khóa học ${found.title}. Giúp học viên nắm bắt phương pháp học tập chuẩn xác.`,
    });
  }, [id]);

  const toggleComplete = (lessonId) => {
    if (completedLessons.includes(lessonId)) {
      setCompletedLessons(completedLessons.filter((i) => i !== lessonId));
    } else {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment = {
      id: Date.now(),
      author: "Bạn (Học viên)",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
      time: "Vừa xong",
      text: newCommentText,
      replies: [],
    };

    setComments([newComment, ...comments]);
    setNewCommentText("");
  };

  if (!course)
    return (
      <div className="p-10 text-center font-bold bg-slate-900 text-white min-h-screen">
        Đang tải dữ liệu bài học...
      </div>
    );

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isDarkMode ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      <header
        className={`border-b px-6 py-4 flex items-center justify-between shadow-md transition-colors duration-300 ${
          isDarkMode
            ? "bg-slate-950 border-slate-800"
            : "bg-white border-slate-200"
        }`}
      >
        <div className="flex items-center gap-4">
          <Link
            to="/my-courses"
            className={`flex items-center gap-2 text-xs font-bold transition-colors px-3 py-2 rounded-xl border ${
              isDarkMode
                ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                : "bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900"
            }`}
          >
            <FaArrowLeft /> Quay lại khóa học của tôi
          </Link>
          <h1
            className={`text-sm font-black truncate max-w-md hidden sm:block ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            {course.title}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2.5 rounded-xl border transition-all flex items-center justify-center text-sm ${
              isDarkMode
                ? "bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800"
                : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>

          <span
            className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${
              isDarkMode
                ? "text-cyan-400 bg-cyan-500/10 border-cyan-500/20"
                : "text-blue-600 bg-blue-50 border-blue-200"
            }`}
          >
            Tiến độ: {Math.round((completedLessons.length / 4) * 100)}%
          </span>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 p-6 lg:p-10 space-y-6 overflow-y-auto">
          <div className="w-full aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-800 relative flex items-center justify-center">
            <video
              key={activeLesson?.id}
              controls
              className="w-full h-full object-cover"
              poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"
            >
              <source src={activeLesson?.videoUrl} type="video/mp4" />
              Trình duyệt không hỗ trợ thẻ video.
            </video>
          </div>

          <div
            className={`border rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl ${
              isDarkMode
                ? "bg-slate-950 border-slate-800 text-white"
                : "bg-white border-slate-200 text-slate-900"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                  isDarkMode
                    ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                    : "bg-blue-50 text-blue-600 border-blue-200"
                }`}
              >
                {activeLesson?.duration}
              </span>
              <button
                onClick={() => toggleComplete(activeLesson?.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  completedLessons.includes(activeLesson?.id)
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : isDarkMode
                      ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <FaCheckCircle />{" "}
                {completedLessons.includes(activeLesson?.id)
                  ? "Đã hoàn thành"
                  : "Đánh dấu hoàn thành"}
              </button>
            </div>

            <h2 className="text-xl sm:text-2xl font-black">
              {activeLesson?.title}
            </h2>

            <div
              className={`border-t pt-4 ${
                isDarkMode ? "border-slate-800" : "border-slate-100"
              }`}
            >
              <h4
                className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                  isDarkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Nội dung chi tiết bài học
              </h4>
              <p
                className={`text-xs sm:text-sm leading-relaxed font-medium ${
                  isDarkMode ? "text-slate-300" : "text-slate-600"
                }`}
              >
                {activeLesson?.content}
              </p>
            </div>
          </div>

          <div
            className={`border rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl ${
              isDarkMode
                ? "bg-slate-950 border-slate-800 text-white"
                : "bg-white border-slate-200 text-slate-900"
            }`}
          >
            <div className="flex items-center gap-2 border-b pb-4 border-slate-800">
              <FaCommentAlt className="text-blue-500" />
              <h3 className="text-base font-extrabold uppercase tracking-wider">
                Hỏi đáp & Thảo luận bài học ({comments.length})
              </h3>
            </div>

            <form onSubmit={handleAddComment} className="space-y-3">
              <textarea
                rows="3"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Đặt câu hỏi cho giảng viên..."
                className={`w-full p-4 rounded-2xl text-xs font-medium border outline-none ${
                  isDarkMode
                    ? "bg-slate-900 border-slate-800 text-white placeholder-slate-500"
                    : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"
                }`}
              ></textarea>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md"
                >
                  <FaPaperPlane /> Gửi câu hỏi
                </button>
              </div>
            </form>

            <div className="space-y-4 pt-2">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className={`p-4 rounded-2xl border space-y-3 ${
                    isDarkMode
                      ? "bg-slate-900/60 border-slate-800/80"
                      : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={comment.avatar}
                      alt={comment.author}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <h5 className="text-xs font-bold">{comment.author}</h5>
                      <span className="text-[10px] text-slate-400">
                        {comment.time}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs font-medium pl-11">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`border-t lg:border-t-0 lg:border-l p-6 flex flex-col h-full overflow-y-auto ${
            isDarkMode
              ? "bg-slate-950 border-slate-800"
              : "bg-white border-slate-200"
          }`}
        >
          <div className="flex items-center gap-2 mb-6">
            <FaBookOpen className="text-cyan-400" />
            <h3 className="text-sm font-extrabold uppercase tracking-wider">
              Nội dung khóa học (Syllabus)
            </h3>
          </div>

          <div className="space-y-4 flex-1">
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-slate-400">
                Chương 1: Nền tảng cốt lõi
              </h4>
              <div className="space-y-1.5">
                {[
                  {
                    id: 1,
                    title: "Bài 1: Giới thiệu tổng quan lộ trình",
                    duration: "15:00",
                  },
                  {
                    id: 2,
                    title: "Bài 2: Phát âm chuẩn IPA",
                    duration: "25:40",
                  },
                ].map((les) => (
                  <button
                    key={les.id}
                    onClick={() =>
                      setActiveLesson({
                        id: les.id,
                        title: les.title,
                        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
                        duration: les.duration,
                        content: `Nội dung chi tiết của ${les.title}.`,
                      })
                    }
                    className={`w-full text-left p-3.5 rounded-2xl transition-all flex items-start gap-3 border ${
                      activeLesson?.id === les.id
                        ? "bg-blue-600/15 border-blue-500/40 text-blue-500 font-bold"
                        : "bg-slate-900/60 border-slate-800 text-slate-300"
                    }`}
                  >
                    <span className="mt-0.5 text-cyan-400">
                      {completedLessons.includes(les.id) ? (
                        <FaCheckCircle className="text-emerald-400 text-sm" />
                      ) : (
                        <FaPlayCircle className="text-sm" />
                      )}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate">{les.title}</p>
                      <span className="text-[10px] text-slate-400">
                        {les.duration}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseLearn;
