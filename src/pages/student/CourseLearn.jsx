import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaPlayCircle,
  FaArrowLeft,
  FaBookOpen,
  FaMoon,
  FaSun,
  FaCommentAlt,
  FaPaperPlane,
  FaVideoSlash,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import { courseService } from "../../services/courseService";
import { lessonService } from "../../services/lessonService";

function CourseLearn() {
  const { id } = useParams();
  const courseId = parseInt(id) || 1;

  const [course, setCourse] = useState(null);
  const [lessonsList, setLessonsList] = useState([]);
  const [activeLesson, setActiveLesson] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);

  // Quản lý trạng thái xem xong video của bài hiện tại
  const [isVideoFinished, setIsVideoFinished] = useState(false);

  // Ref cho MP4 thô
  const videoRef = useRef(null);
  const lastTimeRef = useRef(0);

  // Ref & State cho YouTube Player API (chặn tua YouTube)
  const ytPlayerRef = useRef(null);
  const ytIntervalRef = useRef(null);
  const lastYtTimeRef = useRef(0);
  const [ytApiLoaded, setYtApiLoaded] = useState(false);

  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      const saved = localStorage.getItem(`completed_lessons_${courseId}`);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Quản lý bình luận
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");

  // Tải YouTube IFrame API script tự động vào trang
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        setYtApiLoaded(true);
      };
    } else {
      setYtApiLoaded(true);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        `completed_lessons_${courseId}`,
        JSON.stringify(completedLessons),
      );
    } catch (e) {}
  }, [completedLessons, courseId]);

  useEffect(() => {
    const fetchLearnData = async () => {
      try {
        setLoading(true);
        const courseData = await courseService.getCourseById(courseId);
        setCourse(courseData || {});

        const lessons = await lessonService.getLessonsByCourse(courseId);
        const finalLessons = Array.isArray(lessons) ? lessons : [];
        setLessonsList(finalLessons);

        if (finalLessons.length > 0) {
          let initialLesson = finalLessons[0];
          try {
            const savedLastLessonId = localStorage.getItem(
              `last_lesson_${courseId}`,
            );
            if (savedLastLessonId) {
              const foundLesson = finalLessons.find(
                (l) => l.id === parseInt(savedLastLessonId),
              );
              if (foundLesson) initialLesson = foundLesson;
            }
          } catch (e) {}
          setActiveLesson(initialLesson);
        }
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu bài học từ CSDL:", err);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchLearnData();
    }
  }, [courseId]);

  // Tải danh sách bình luận từ CSDL khi chuyển bài học
  useEffect(() => {
    const fetchComments = async () => {
      if (!activeLesson?.id) return;
      try {
        const data = await lessonService.getCommentsByLesson(activeLesson.id);
        setComments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Lỗi tải bình luận:", err);
        setComments([]);
      }
    };

    fetchComments();
  }, [activeLesson]);

  // Trợ lý kiểm tra URL YouTube và lấy Video ID
  const isYouTubeUrl = (url) => {
    if (!url) return false;
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  const getYouTubeVideoId = (url) => {
    if (!url) return "";
    let videoId = "";
    if (url.includes("v=")) {
      videoId = url.split("v=")[1]?.split("&")[0];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("/embed/")) {
      videoId = url.split("/embed/")[1]?.split("?")[0];
    }
    return videoId;
  };

  // Mỗi khi đổi bài học, khởi tạo lại bộ đếm / trình phát video
  useEffect(() => {
    if (activeLesson) {
      const isAlreadyCompleted = completedLessons.includes(activeLesson.id);
      setIsVideoFinished(isAlreadyCompleted);
      lastTimeRef.current = 0;
      lastYtTimeRef.current = 0;

      if (ytIntervalRef.current) {
        clearInterval(ytIntervalRef.current);
      }

      const videoSrc =
        activeLesson?.video_url ||
        activeLesson?.videoUrl ||
        activeLesson?.url ||
        "";

      // Nếu là YouTube và API đã sẵn sàng, khởi tạo YouTube Player để chống tua
      if (
        isYouTubeUrl(videoSrc) &&
        ytApiLoaded &&
        window.YT &&
        window.YT.Player
      ) {
        const videoId = getYouTubeVideoId(videoSrc);
        if (videoId) {
          if (
            ytPlayerRef.current &&
            typeof ytPlayerRef.current.destroy === "function"
          ) {
            try {
              ytPlayerRef.current.destroy();
            } catch (e) {}
          }

          ytPlayerRef.current = new window.YT.Player("youtube-player", {
            videoId: videoId,
            playerVars: {
              controls: 1,
              modestbranding: 1,
              rel: 0,
            },
            events: {
              onStateChange: (event) => {
                // Khi video chạy (playing = 1)
                if (event.data === window.YT.PlayerState.PLAYING) {
                  if (ytIntervalRef.current)
                    clearInterval(ytIntervalRef.current);

                  ytIntervalRef.current = setInterval(() => {
                    if (
                      ytPlayerRef.current &&
                      typeof ytPlayerRef.current.getCurrentTime === "function"
                    ) {
                      const currentTime = ytPlayerRef.current.getCurrentTime();
                      const duration = ytPlayerRef.current.getDuration();

                      // Chống tua nhanh (> 2 giây so với mốc lớn nhất đã xem)
                      if (!isAlreadyCompleted && !isVideoFinished) {
                        if (currentTime > lastYtTimeRef.current + 2.0) {
                          ytPlayerRef.current.seekTo(
                            lastYtTimeRef.current,
                            true,
                          );
                        } else if (currentTime > lastYtTimeRef.current) {
                          lastYtTimeRef.current = currentTime;
                        }
                      } else {
                        // Nếu đã hoàn thành bài rồi thì cho phép tua tự do
                        lastYtTimeRef.current = Math.max(
                          lastYtTimeRef.current,
                          currentTime,
                        );
                      }

                      // Kiểm tra xem đã xem gần hết video chưa (cách cuối 1.5s coi như hết)
                      if (duration > 0 && currentTime >= duration - 1.5) {
                        setIsVideoFinished(true);
                        setCompletedLessons((prev) => {
                          if (!prev.includes(activeLesson.id)) {
                            return [...prev, activeLesson.id];
                          }
                          return prev;
                        });
                      }
                    }
                  }, 500);
                } else {
                  if (ytIntervalRef.current) {
                    clearInterval(ytIntervalRef.current);
                  }
                }
              },
            },
          });
        }
      }

      if (videoRef.current) {
        videoRef.current.load();
      }
    }

    return () => {
      if (ytIntervalRef.current) clearInterval(ytIntervalRef.current);
    };
  }, [activeLesson, ytApiLoaded, completedLessons]);

  const handleSelectLesson = (les) => {
    setActiveLesson(les);
    try {
      localStorage.setItem(`last_lesson_${courseId}`, les.id);
    } catch (e) {}
  };

  // Chặn học viên tua video (dành cho file MP4 thô)
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.currentTime > lastTimeRef.current + 1.5 && !isVideoFinished) {
      video.currentTime = lastTimeRef.current;
    } else if (video.currentTime > lastTimeRef.current) {
      lastTimeRef.current = video.currentTime;
    }
  };

  // Khi xem xong hết video (MP4 thô)
  const handleVideoEnded = () => {
    setIsVideoFinished(true);
    if (activeLesson && !completedLessons.includes(activeLesson.id)) {
      const updated = [...completedLessons, activeLesson.id];
      setCompletedLessons(updated);
    }
  };

  // Nút chuyển sang bài tiếp theo
  const handleNextLesson = () => {
    if (!isVideoFinished || !activeLesson) return;
    const currentIndex = lessonsList.findIndex((l) => l.id === activeLesson.id);
    if (currentIndex !== -1 && currentIndex < lessonsList.length - 1) {
      handleSelectLesson(lessonsList[currentIndex + 1]);
    }
  };

  // Gửi bình luận và lưu vào CSDL
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newCommentText.trim() || !activeLesson?.id) return;

    try {
      const savedComment = await lessonService.postComment(
        activeLesson.id,
        newCommentText,
      );
      setComments([savedComment, ...comments]);
      setNewCommentText("");
    } catch (err) {
      console.error("Lỗi khi gửi bình luận lên CSDL:", err);
      alert("Không thể gửi bình luận, vui lòng thử lại sau.");
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center font-bold bg-slate-900 text-white min-h-screen flex items-center justify-center">
        Đang đồng bộ dữ liệu từ cơ sở dữ liệu...
      </div>
    );
  }

  const totalLessonsCount = lessonsList.length;
  const progressPercent =
    totalLessonsCount > 0
      ? Math.round((completedLessons.length / totalLessonsCount) * 100)
      : 0;

  const videoSrc =
    activeLesson?.video_url ||
    activeLesson?.videoUrl ||
    activeLesson?.url ||
    "";

  const isLastLesson =
    lessonsList.findIndex((l) => l.id === activeLesson?.id) ===
    lessonsList.length - 1;

  const isYoutube = isYouTubeUrl(videoSrc);

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
            {course?.title || "Chi tiết khóa học"}
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
            Tiến độ thực tế: {progressPercent}% ({completedLessons.length}/
            {totalLessonsCount} bài)
          </span>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 p-6 lg:p-10 space-y-6 overflow-y-auto">
          {activeLesson ? (
            <>
              {/* KHUNG VIDEO: Tích hợp chống tua tự động cho cả YouTube và MP4 */}
              <div className="w-full aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-800 relative flex items-center justify-center">
                {videoSrc ? (
                  isYoutube ? (
                    <div id="youtube-player" className="w-full h-full"></div>
                  ) : (
                    <video
                      ref={videoRef}
                      key={activeLesson?.id}
                      controls
                      playsInline
                      preload="auto"
                      controlsList="nodownload noremoteplayback"
                      onTimeUpdate={handleTimeUpdate}
                      onEnded={handleVideoEnded}
                      className="w-full h-full object-cover"
                      poster={course?.thumbnail}
                    >
                      <source src={videoSrc} type="video/mp4" />
                      Trình duyệt không hỗ trợ thẻ video.
                    </video>
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 text-slate-500 p-6 text-center">
                    <FaVideoSlash className="text-3xl text-slate-600" />
                    <p className="text-xs font-semibold">
                      Bài học này hiện chưa được cấu hình đường dẫn video trong
                      Cơ sở dữ liệu.
                    </p>
                  </div>
                )}
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
                    Bài học trực tuyến
                  </span>

                  <button
                    onClick={handleNextLesson}
                    disabled={!isVideoFinished || isLastLesson}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all shadow-md ${
                      isVideoFinished && !isLastLesson
                        ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30 cursor-pointer active:scale-95"
                        : "bg-slate-800/50 text-slate-500 border border-slate-700/50 cursor-not-allowed opacity-60"
                    }`}
                  >
                    <span>
                      {isLastLesson
                        ? "Đã hoàn thành khóa học"
                        : "Bài tiếp theo"}
                    </span>
                    <FaArrowRight />
                  </button>
                </div>

                <h2 className="text-xl sm:text-2xl font-black">
                  {activeLesson.title}
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
                    {activeLesson.content ||
                      activeLesson.description ||
                      "Chưa có mô tả chi tiết cho bài học này."}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-20 bg-slate-950 rounded-3xl border border-slate-800 text-slate-400">
              Khóa học này hiện chưa có bài học nào được khởi tạo trên hệ thống.
            </div>
          )}

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
                      src={
                        comment.avatar ||
                        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
                      }
                      alt={comment.author}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <h5 className="text-xs font-bold">
                        {comment.author || comment.user_name || "Học viên"}
                      </h5>
                      <span className="text-[10px] text-slate-400">
                        {comment.time || comment.created_at || "Vừa xong"}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs font-medium pl-11">
                    {comment.text || comment.content}
                  </p>
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
              Nội dung khóa học ({lessonsList.length} bài)
            </h3>
          </div>

          <div className="space-y-4 flex-1">
            <div className="space-y-2">
              <div className="space-y-1.5">
                {lessonsList.length > 0 ? (
                  lessonsList.map((les) => (
                    <button
                      key={les.id}
                      onClick={() => handleSelectLesson(les)}
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
                        <p className="text-xs font-bold truncate">
                          {les.title}
                        </p>
                        <span className="text-[10px] text-slate-400">
                          Bài giảng video
                        </span>
                      </div>
                    </button>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 text-center py-6">
                    Chưa có bài học nào.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseLearn;
