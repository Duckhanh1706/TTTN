import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaSlidersH,
  FaSave,
  FaGlobe,
  FaLock,
  FaBell,
} from "react-icons/fa";

function SystemSettings() {
  const [settings, setSettings] = useState({
    siteName: "E-Learning Platform",
    supportEmail: "support@elearning.vn",
    allowRegistration: true,
    maintenanceMode: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Đã lưu cấu hình hệ thống thành công!");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <Link
            to="/admin/dashboard"
            className="inline-flex items-center gap-2 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 border border-red-100 px-4 py-2 rounded-xl transition"
          >
            <FaArrowLeft /> Quay lại Bảng điều khiển Quản trị
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-sm flex items-center justify-between">
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-red-50 text-red-600 px-3 py-1 rounded-full">
              Hệ thống Quản trị
            </span>
            <h1 className="text-2xl font-black text-slate-900">
              Cài đặt hệ thống chung
            </h1>
            <p className="text-xs text-slate-500">
              Quản lý các thông số cốt lõi, trạng thái hoạt động và cấu hình nền
              tảng.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSave}
          className="bg-white rounded-3xl border border-slate-200/70 shadow-sm p-8 space-y-6"
        >
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <FaGlobe className="text-red-600" /> Thông tin chung website
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">
                  Tên hệ thống
                </label>
                <input
                  type="text"
                  name="siteName"
                  value={settings.siteName}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-medium text-slate-800 outline-none focus:border-red-600 transition"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">
                  Email hỗ trợ kỹ thuật
                </label>
                <input
                  type="email"
                  name="supportEmail"
                  value={settings.supportEmail}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-medium text-slate-800 outline-none focus:border-red-600 transition"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <FaLock className="text-red-600" /> Trạng thái & Bảo mật
            </h3>

            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100/70 transition">
                <div>
                  <span className="font-bold text-xs text-slate-900 block">
                    Cho phép đăng ký tài khoản mới
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Học viên mới có thể tự tạo tài khoản trên trang chủ.
                  </span>
                </div>
                <input
                  type="checkbox"
                  name="allowRegistration"
                  checked={settings.allowRegistration}
                  onChange={handleChange}
                  className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100/70 transition">
                <div>
                  <span className="font-bold text-xs text-slate-900 block">
                    Chế độ bảo trì hệ thống
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Tạm khóa website đối với học viên và giảng viên để cập nhật
                    phiên bản.
                  </span>
                </div>
                <input
                  type="checkbox"
                  name="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onChange={handleChange}
                  className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                />
              </label>
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-2xl text-xs font-bold transition shadow-md shadow-red-600/25"
            >
              <FaSave /> Lưu cấu hình
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SystemSettings;
