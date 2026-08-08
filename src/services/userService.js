import axiosClient from "./axiosClient";

export const userService = {
  getProfile: async () => {
    const response = await axiosClient.get("/api/users/profile");
    return response.data;
  },
  updateProfile: async (profileData) => {
    const response = await axiosClient.put("/api/users/profile", profileData);
    return response.data;
  },
};
