import axiosClient from "./axiosClient";

export const courseService = {
  // Lấy tất cả khóa học (Dùng cho trang Courses.jsx, Home.jsx)
  getAllCourses: async () => {
    const response = await axiosClient.get("/api/courses");
    return response.data;
  },

  // Lấy chi tiết 1 khóa học (Dùng cho CourseDetail.jsx, CourseLearn.jsx)
  getCourseById: async (id) => {
    const response = await axiosClient.get(`/api/courses/${id}`);
    return response.data;
  },

  // Tạo khóa học mới (Dành cho Teacher tại CourseForm.jsx)
  createCourse: async (courseData) => {
    const response = await axiosClient.post("/api/courses", courseData);
    return response.data;
  },

  // Cập nhật khóa học (Dành cho Teacher khi chỉnh sửa)
  updateCourse: async (id, courseData) => {
    const response = await axiosClient.put(`/api/courses/${id}`, courseData);
    return response.data;
  },
};
