import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaCertificate,
  FaAward,
  FaEye,
  FaTrash,
} from "react-icons/fa";

function CertificateManagement() {
  const [certificates, setCertificates] = useState([
    {
      id: "CERT-9821",
      student: "Nguyễn Đức Khánh",
      course: "Lập trình ReactJS Nâng cao",
      issueDate: "15/06/2026",
      status: "Đã cấp",
    },
    {
      id: "CERT-9822",
      student: "Trần Văn Hoàng",
      course: "Spring Boot Microservices",
      issueDate: "18/06/2026",
      status: "Đã cấp",
    },
    {
      id: "CERT-9823",
      student: "Lê Minh Thư",
      course: "Cấu trúc dữ liệu và giải thuật",
      issueDate: "20/06/2026",
      status: "Đã cấp",
    },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn thu hồi chứng chỉ này không?")) {
      setCertificates(certificates.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <Link
            to="/admin/dashboard"
            className="inline-flex items-center gap-2 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 border border-red-100 px-4 py-2 rounded-xl transition"
          >
            <FaArrowLeft /> Quay lại Bảng điều khiển Quản trị
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-red-50 text-red-600 px-3 py-1 rounded-full">
              Hệ thống Quản trị
            </span>
            <h1 className="text-2xl font-black text-slate-900">
              Quản lý chứng chỉ hoàn thành
            </h1>
            <p className="text-xs text-slate-500">
              Giám sát, tra cứu mã định danh và quản lý các chứng chỉ đã cấp cho
              học viên sau khi hoàn thành khóa học.
            </p>
          </div>

          <button
            onClick={() => alert("Mở modal cấu hình mẫu chứng chỉ hệ thống")}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-2xl text-xs font-bold transition shadow-md"
          >
            <FaAward /> Cấu hình mẫu chứng chỉ
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/70 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <th className="py-4 px-6">Mã chứng chỉ</th>
                  <th className="py-4 px-6">Học viên nhận</th>
                  <th className="py-4 px-6">Khóa học</th>
                  <th className="py-4 px-6">Ngày cấp</th>
                  <th className="py-4 px-6">Trạng thái</th>
                  <th className="py-4 px-6 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                {certificates.map((cert) => (
                  <tr
                    key={cert.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 font-bold flex items-center justify-center text-sm shadow-sm">
                          <FaCertificate />
                        </div>
                        <span className="font-mono font-bold text-slate-900">
                          {cert.id}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-800">
                      {cert.student}
                    </td>
                    <td className="py-4 px-6 text-slate-600">{cert.course}</td>
                    <td className="py-4 px-6 text-slate-500">
                      {cert.issueDate}
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600">
                        {cert.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() =>
                          alert(`Xem chi tiết chứng chỉ: ${cert.id}`)
                        }
                        className="p-2.5 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 rounded-xl transition"
                        title="Xem chứng chỉ"
                      >
                        <FaEye className="text-xs" />
                      </button>
                      <button
                        onClick={() => handleDelete(cert.id)}
                        className="p-2.5 bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-xl transition"
                        title="Thu hồi chứng chỉ"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CertificateManagement;
