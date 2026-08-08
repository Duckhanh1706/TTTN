import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api`
    : "https://tttn-be-psz6.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Tự động đính kèm Token xác thực tương ứng dựa theo khu vực đang truy cập
axiosClient.interceptors.request.use(
  (config) => {
    // Nếu đang ở đường dẫn /admin, ưu tiên lấy token của admin trước
    const isAdminPath = window.location.pathname.startsWith("/admin");

    const token = isAdminPath
      ? localStorage.getItem("admin_token") ||
        localStorage.getItem("token") ||
        localStorage.getItem("elearning_token")
      : localStorage.getItem("token") ||
        localStorage.getItem("elearning_token") ||
        localStorage.getItem("admin_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosClient;
