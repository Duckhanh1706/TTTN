import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaCheck, FaTimes, FaClock, FaSave } from "react-icons/fa";

function TeacherAttendance() {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState("2026-07-24");

  // Danh sách học viên trong lớp cần điểm danh
  const [attendanceList, setAttendanceList] = useState([
    {
      id: 1,
      name: "Nguyễn Đức Khánh",
      email: "khanh.nd@gmail.com",
      status: "PRESENT",
    },
    {
      id: 2,
      name: "Nguyễn Văn Nam",
      email: "nam.nv@gmail.com",
      status: "PRESENT",
    },
    {
      id: 3,
      name: "Trần Minh Thư",
      email: "thu.tm@gmail.com",
      status: "ABSENT",
    },
    {
      id: 4,
      name: "Lê Hoàng Long",
      email: "long.lh@gmail.com",
      status: "LATE",
    },
  ]);

  const handleStatusChange = (studentId, newStatus) => {
    setAttendanceList(
      attendanceList.map((item) =>
        item.id === studentId ? { ...item, status: newStatus } : item,
      ),
    );
  };

  const handleSaveAttendance = () => {
    alert(
      "Đã lưu bảng điểm danh và hệ thống tự động gửi thông báo qua Kafka tới phụ huynh/học viên (nếu vắng mặt)!",
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <Link
            to="/teacher/dashboard"
            className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-xl transition"
          >
            <FaArrowLeft /> Quay lại Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
              Điểm danh chuyên cần
            </span>
            <h1 className="text-2xl font-black text-slate-900 mt-2">
              Quản lý điểm danh lớp học #{id}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Ghi nhận trạng thái tham dự của học sinh trong buổi học trực tuyến
              hoặc trực tiếp.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs font-bold text-slate-700">
              Chọn ngày:
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-indigo-600"
            />
          </div>
        </div>

        {/* Bảng điểm danh */}
        <div className="bg-white rounded-3xl border border-slate-200/70 shadow-sm overflow-hidden p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-sm font-extrabold text-slate-900">
              Sĩ số lớp học: {attendanceList.length} học viên
            </h3>
            <button
              onClick={handleSaveAttendance}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition shadow-lg shadow-indigo-600/20 flex items-center gap-2"
            >
              <FaSave /> Lưu bảng điểm danh
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <th className="py-4 px-6">STT</th>
                  <th className="py-4 px-6">Học viên</th>
                  <th className="py-4 px-6">Email</th>
                  <th className="py-4 px-6 text-center">
                    Trạng thái chuyên cần
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                {attendanceList.map((student, idx) => (
                  <tr
                    key={student.id}
                    className="hover:bg-slate-50/50 transition"
                  >
                    <td className="py-4 px-6 font-bold text-slate-400">
                      {idx + 1}
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900">
                      {student.name}
                    </td>
                    <td className="py-4 px-6 text-slate-500">
                      {student.email}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleStatusChange(student.id, "PRESENT")
                          }
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                            student.status === "PRESENT"
                              ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          <FaCheck /> Có mặt
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusChange(student.id, "LATE")}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                            student.status === "LATE"
                              ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          <FaClock /> Đi muộn
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleStatusChange(student.id, "ABSENT")
                          }
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                            student.status === "ABSENT"
                              ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          <FaTimes /> Vắng mặt
                        </button>
                      </div>
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

export default TeacherAttendance;
