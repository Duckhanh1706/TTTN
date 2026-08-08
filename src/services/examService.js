// src/services/examService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const examService = {
  getExamDetails: async (examId) => {
    // Gọi thẳng vào API backend vừa tạo, không cần dùng mock data nữa
    const response = await axios.get(`${API_URL}/exams/${examId}`);
    return response.data; // Trả về { exam, questions } từ MySQL
  },

  submitExam: async (submissionData) => {
    const response = await axios.post(
      `${API_URL}/exams/submit`,
      submissionData,
    );
    return response.data;
  },
};
