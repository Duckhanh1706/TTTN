import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaUserEdit,
  FaSave,
  FaTimes,
  FaEnvelope,
  FaPhone,
  FaAward,
  FaBookOpen,
} from "react-icons/fa";
import axiosClient from "../../services/axiosClient";

function TeacherProfile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    title: "",
    bio: "",
    avatar: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Lấy dữ liệu thực tế từ CSDL khi tải trang
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get("/api/users/profile");
        const userData = response.data.data || response.data;
        if (userData) {
          setProfile({
            name: userData.name || "",
            email: userData.email || "",
            phone: userData.phone || "",
            title: userData.title || "Giảng viên chuyên môn",
            bio: userData.bio || "Chưa có tiểu sử cập nhật.",
            avatar:
              userData.avatar ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
          });
        }
      } catch (err) {
        console.error("Không thể tải thông tin hồ sơ:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.put("/api/users/profile", profile);
      if (response.data && response.data.success !== false) {
        alert("Đã cập nhật thông tin hồ sơ giảng viên thành công!");
        setIsEditing(false); // Chuyển về chế độ xem sau khi lưu
      } else {
        alert("Cập nhật thất bại, vui lòng thử lại.");
      }
    } catch (err) {
      console.error("Lỗi cập nhật hồ sơ:", err);
      alert("Đã xảy ra lỗi khi lưu thông tin lên máy chủ.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-slate-500 font-bold text-sm">
        Đang tải thông tin hồ sơ...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Nút quay lại */}
        <div>
          <Link
            to="/teacher/dashboard"
            className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-xl transition"
          >
            <FaArrowLeft /> Quay lại Dashboard
          </Link>
        </div>

        {/* Header Hồ sơ */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 text-center md:text-left">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-indigo-50 shadow-md"
            />
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
                Hồ sơ Giảng viên
              </span>
              <h1 className="text-2xl font-black text-slate-900 mt-2">
                {profile.name}
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                {profile.title}
              </p>
            </div>
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold transition shadow-md shadow-indigo-600/20 flex items-center gap-2"
            >
              <FaUserEdit /> Thay đổi thông tin
            </button>
          )}
        </div>

        {/* Nội dung hiển thị hoặc Form chỉnh sửa */}
        {!isEditing ? (
          /* CHẾ ĐỘ XEM THÔNG TIN */
          <div className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-sm space-y-6">
            <h3 className="text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-3">
              Thông tin chi tiết hiển thị công khai
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-400 font-semibold block">
                  Họ và tên
                </span>
                <p className="font-bold text-slate-900 text-sm">
                  {profile.name}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-400 font-semibold block flex items-center gap-1">
                  <FaEnvelope className="text-indigo-500" /> Email liên hệ
                </span>
                <p className="font-bold text-slate-900 text-sm">
                  {profile.email}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-400 font-semibold block flex items-center gap-1">
                  <FaPhone className="text-indigo-500" /> Số điện thoại
                </span>
                <p className="font-bold text-slate-900 text-sm">
                  {profile.phone || "Chưa cập nhật"}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-400 font-semibold block flex items-center gap-1">
                  <FaAward className="text-indigo-500" /> Chức danh / Học hàm
                </span>
                <p className="font-bold text-slate-900 text-sm">
                  {profile.title}
                </p>
              </div>

              <div className="md:col-span-2 p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-400 font-semibold block flex items-center gap-1">
                  <FaBookOpen className="text-indigo-500" /> Tiểu sử chuyên môn
                  (Bio)
                </span>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {profile.bio}
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* CHẾ ĐỘ CHỈNH SỬA THÔNG TIN */
          <form
            onSubmit={handleSave}
            className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-sm space-y-6 animate-fadeIn"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-extrabold text-slate-900">
                Chỉnh sửa thông tin hồ sơ
              </h3>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition"
              >
                <FaTimes />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Họ và tên hiển thị
                </label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-medium outline-none focus:border-indigo-600 text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email liên hệ (Không thể thay đổi)
                </label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-medium outline-none bg-slate-50 text-slate-400 cursor-not-allowed"
                  disabled
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder="Nhập số điện thoại..."
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-medium outline-none focus:border-indigo-600 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Học hàm / Chức danh
                </label>
                <input
                  type="text"
                  name="title"
                  value={profile.title}
                  onChange={handleChange}
                  placeholder="Ví dụ: Thạc sĩ Ngôn ngữ Anh..."
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-medium outline-none focus:border-indigo-600 text-slate-900"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tiểu sử chuyên môn (Bio)
                </label>
                <textarea
                  name="bio"
                  rows="4"
                  value={profile.bio}
                  onChange={handleChange}
                  placeholder="Giới thiệu kinh nghiệm giảng dạy..."
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-medium outline-none focus:border-indigo-600 resize-none text-slate-900"
                ></textarea>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold transition"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition shadow-lg shadow-indigo-600/20 flex items-center gap-2"
              >
                <FaSave /> Lưu thay đổi
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default TeacherProfile;
