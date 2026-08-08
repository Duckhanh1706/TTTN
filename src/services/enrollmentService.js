import axiosClient from "./axiosClient";

export const enrollmentService = {
  // Học viên đăng ký/mua khóa học
  enrollCourse: async (courseId) => {
    const response = await axiosClient.post("/api/enrollments", {
      courseId: courseId,
      course_id: courseId,
    });
    return response.data;
  },

  // Lấy danh sách khóa học của tôi
  getMyCourses: async () => {
    const response = await axiosClient.get("/api/enrollments/my-courses");
    return response.data;
  },
};
