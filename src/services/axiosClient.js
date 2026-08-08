import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://tttn-be-psz6.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Tự động đính kèm Token xác thực tương ứng dựa theo khu vực đang truy cập
axiosClient.interceptors.request.use(
  (config) => {
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
