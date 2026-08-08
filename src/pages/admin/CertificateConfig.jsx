import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaSave,
  FaAward,
  FaImage,
  FaSignature,
} from "react-icons/fa";

function CertificateConfig() {
  const [config, setConfig] = useState({
    academyName: "Hệ thống E-Learning Quốc tế",
    signatoryName: "TS. Nguyễn Đức Khánh",
    signatoryTitle: "Giám đốc Đào tạo",
    templateStyle: "modern",
    bgTheme: "blue",
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig({ ...config, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert("Đã lưu cấu hình mẫu chứng chỉ thành công!");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <Link
            to="/admin/certificates"
            className="inline-flex items-center gap-2 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 border border-red-100 px-4 py-2 rounded-xl transition"
          >
            <FaArrowLeft /> Quay lại Quản lý chứng chỉ
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-sm space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-red-50 text-red-600 px-3 py-1 rounded-full">
            Cấu hình hệ thống
          </span>
          <h1 className="text-2xl font-black text-slate-900">
            Tùy chỉnh mẫu chứng chỉ hoàn thành
          </h1>
          <p className="text-xs text-slate-500">
            Thiết lập thông tin học viện, chữ ký và giao diện mẫu chứng chỉ cấp
            phát tự động cho học viên.
          </p>
        </div>

        <form
          onSubmit={handleSave}
          className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-sm space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <FaAward className="text-red-600" /> Tên đơn vị / Học viện cấp
              </label>
              <input
                type="text"
                name="academyName"
                value={config.academyName}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-xs font-bold text-slate-700 outline-none focus:border-red-600 transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <FaSignature className="text-red-600" /> Người ký xác nhận (Chủ
                tịch / Giám đốc)
              </label>
              <input
                type="text"
                name="signatoryName"
                value={config.signatoryName}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-xs font-bold text-slate-700 outline-none focus:border-red-600 transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Chức vụ người ký
              </label>
              <input
                type="text"
                name="signatoryTitle"
                value={config.signatoryTitle}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-xs font-bold text-slate-700 outline-none focus:border-red-600 transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <FaImage className="text-red-600" /> Phong cách mẫu chứng chỉ
              </label>
              <select
                name="templateStyle"
                value={config.templateStyle}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-xs font-bold text-slate-700 outline-none focus:border-red-600 transition"
              >
                <option value="modern">Hiện đại (Modern Executive)</option>
                <option value="classic">Cổ điển (Classic Academic)</option>
                <option value="minimalist">Tối giản (Minimalist)</option>
              </select>
            </div>
          </div>

          {/* Khu vực xem trước mẫu */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-4">
              Xem trước giao diện chứng chỉ
            </h3>
            <div className="border-4 border-slate-900 rounded-2xl p-8 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white text-center space-y-4 shadow-xl">
              <span className="text-[10px] font-bold tracking-widest uppercase bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
                {config.academyName}
              </span>
              <h2 className="text-xl font-black uppercase tracking-wide">
                Chứng nhận hoàn thành khóa học
              </h2>
              <p className="text-xs text-slate-300">
                Chứng nhận này được trao cho học viên xuất sắc
              </p>
              <p className="text-lg font-bold text-amber-400 font-mono">
                [Tên Học Viên]
              </p>
              <div className="flex justify-between items-end pt-6 text-[11px] text-slate-400 border-t border-white/10 mt-6">
                <div>Ngày cấp: DD/MM/YYYY</div>
                <div className="text-right">
                  <p className="font-bold text-white">{config.signatoryName}</p>
                  <p>{config.signatoryTitle}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <Link
              to="/admin/certificates"
              className="px-5 py-3 rounded-2xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition"
            >
              Hủy
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition shadow-md shadow-red-600/20"
            >
              <FaSave /> {saving ? "Đang lưu..." : "Lưu cấu hình"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CertificateConfig;
