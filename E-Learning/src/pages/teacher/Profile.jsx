import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaUser, FaLock, FaSave } from "react-icons/fa";

function TeacherProfile() {
  const [profile, setProfile] = useState({
    name: "Thầy Nguyễn Văn A",
    email: "teacher.a@englishlearning.com",
    phone: "0987654321",
    title: "Thạc sĩ Ngôn ngữ Anh - Giuyên gia luyện thi IELTS 8.5",
    bio: "Hơn 8 năm kinh nghiệm giảng dạy và luyện thi chứng chỉ quốc tế với hàng nghìn học viên đạt điểm số cao.",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Đã cập nhật thông tin hồ sơ giảng viên thành công!");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <Link
            to="/teacher/dashboard"
            className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-xl transition"
          >
            <FaArrowLeft /> Quay lại Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-sm space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
            Hồ sơ cá nhân
          </span>
          <h1 className="text-2xl font-black text-slate-900">
            Thông tin Giảng viên 👨‍🏫
          </h1>
          <p className="text-xs text-slate-500">
            Quản lý thông tin hiển thị công khai trên các khóa học và thông tin
            bảo mật tài khoản.
          </p>
        </div>

        <form
          onSubmit={handleSave}
          className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-sm space-y-6"
        >
          <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <FaUser className="text-indigo-600 text-sm" /> Thông tin cơ bản
          </h3>

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
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-medium outline-none focus:border-indigo-600"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email liên hệ
              </label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-medium outline-none focus:border-indigo-600 bg-slate-50"
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
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-medium outline-none focus:border-indigo-600"
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
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-medium outline-none focus:border-indigo-600"
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
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-medium outline-none focus:border-indigo-600 resize-none"
              ></textarea>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition shadow-lg shadow-indigo-600/20 flex items-center gap-2"
            >
              <FaSave /> Lưu thay đổi hồ sơ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TeacherProfile;
