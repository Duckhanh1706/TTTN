import axiosClient from "./axiosClient";

export const authService = {
  // Đăng nhập cho Student / Teacher (Dùng chung key elearning_user)
  login: async (credentials) => {
    const response = await axiosClient.post("/api/auth/login", credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "elearning_user",
        JSON.stringify(response.data.user),
      );
    }
    return response.data;
  },

  // Đăng nhập riêng biệt cho Admin (Dùng key riêng admin_token và admin_user)
  adminLogin: async (credentials) => {
    const response = await axiosClient.post(
      "/api/auth/admin-login",
      credentials,
    );
    if (response.data.token) {
      localStorage.setItem("admin_token", response.data.token);
      localStorage.setItem("admin_user", JSON.stringify(response.data.user));
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await axiosClient.post("/api/auth/register", userData);
    return response.data;
  },
};
