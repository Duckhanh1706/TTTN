import axiosClient from "./axiosClient";

export const lessonService = {
  getLessonsByCourse: async (courseId) => {
    try {
      const response = await axiosClient.get(`/api/lessons/course/${courseId}`);
      const resData = response.data;

      if (Array.isArray(resData)) return resData;
      if (resData && Array.isArray(resData.data)) return resData.data;
      if (resData && Array.isArray(resData.lessons)) return resData.lessons;

      return [];
    } catch (err) {
      console.warn(
        `Chưa tải được bài học cho khóa học ID ${courseId}:`,
        err?.response?.status || err.message,
      );
      return [];
    }
  },

  // Lấy danh sách bình luận của bài học từ CSDL
  getCommentsByLesson: async (lessonId) => {
    try {
      const response = await axiosClient.get(
        `/api/lessons/${lessonId}/comments`,
      );
      const resData = response.data;
      if (Array.isArray(resData)) return resData;
      if (resData && Array.isArray(resData.data)) return resData.data;
      return [];
    } catch (err) {
      console.warn(
        `Không thể tải bình luận cho bài học ID ${lessonId}:`,
        err.message,
      );
      return [];
    }
  },

  // Gửi bình luận mới và lưu trực tiếp vào CSDL
  postComment: async (lessonId, content) => {
    try {
      const response = await axiosClient.post(
        `/api/lessons/${lessonId}/comments`,
        { content },
      );
      return response.data;
    } catch (err) {
      console.error("Lỗi khi gửi bình luận:", err);
      throw err;
    }
  },
};
