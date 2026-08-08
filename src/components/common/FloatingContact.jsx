import { useState } from "react";

function FloatingContact() {
  const [isOpenChat, setIsOpenChat] = useState(false);
  const [isOpenPhone, setIsOpenPhone] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3.5">
      {/* Hộp thoại Chat Messenger */}
      {isOpenChat && (
        <div className="w-80 bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden animate-fade-in-up mb-2">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-sm shadow-inner">
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.91 1.455 5.503 3.731 7.21V22l3.411-1.874c.89.247 1.838.38 2.821.38 5.523 0 10-4.145 10-9.243S17.523 2 12 2zm1.091 12.434l-2.585-2.756-5.037 2.756 5.539-5.88 2.637 2.755 4.986-2.755-5.54 5.88z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs font-bold">Hỗ trợ Lumina Learning</h4>
                <p className="text-[10px] text-blue-100">
                  Thường trả lời trong vài phút
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpenChat(false)}
              className="text-white/80 hover:text-white text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            >
              ✕
            </button>
          </div>
          <div className="p-4 bg-slate-50 min-h-[160px] max-h-[220px] overflow-y-auto text-xs text-slate-600 space-y-3">
            <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100 max-w-[85%] leading-relaxed">
              👋 Chào bạn! Bạn cần tư vấn lộ trình học IELTS hay TOEIC nào hôm
              nay?
            </div>
          </div>
          <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              className="w-full bg-slate-100 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            />
            <button className="bg-blue-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors">
              Gửi
            </button>
          </div>
        </div>
      )}

      {/* Hộp thoại Gọi điện nhanh */}
      {isOpenPhone && (
        <div className="w-72 bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden animate-fade-in-up mb-2 p-5 text-center relative">
          <button
            onClick={() => setIsOpenPhone(false)}
            className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
          >
            ✕
          </button>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-xl mx-auto mb-3 shadow-inner border border-emerald-100">
            <svg className="w-6 h-6 fill-emerald-600" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
          </div>
          <h4 className="text-xs font-bold text-slate-900">
            Tổng đài tư vấn miễn phí
          </h4>
          <p className="text-[11px] text-slate-500 mt-1">
            Gọi ngay để nhận ưu đãi khóa học
          </p>
          <a
            href="tel:1900xxxx"
            className="mt-4 block bg-emerald-600 text-white rounded-2xl py-3 text-xs font-bold tracking-wider hover:bg-emerald-700 shadow-lg shadow-emerald-600/25 transition-all"
          >
            1900 xxxx
          </a>
        </div>
      )}

      {/* Các nút bấm nổi cố định */}
      <div className="flex flex-col gap-3">
        {/* Nút Gọi điện */}
        <button
          onClick={() => {
            setIsOpenPhone(!isOpenPhone);
            setIsOpenChat(false);
          }}
          className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-600/30 hover:bg-emerald-700 transition-all duration-300 hover:scale-105 active:scale-95 relative group"
          title="Gọi điện tư vấn"
        >
          <span className="absolute -left-28 bg-slate-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
            Gọi tư vấn ngay
          </span>
          <svg className="w-6 h-6 fill-white animate-pulse" viewBox="0 0 24 24">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
        </button>

        {/* Nút Messenger */}
        <button
          onClick={() => {
            setIsOpenChat(!isOpenChat);
            setIsOpenPhone(false);
          }}
          className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-blue-600/30 hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 relative group"
          title="Chat trực tuyến"
        >
          <span className="absolute -left-28 bg-slate-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
            Chat trực tuyến
          </span>
          <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.91 1.455 5.503 3.731 7.21V22l3.411-1.874c.89.247 1.838.38 2.821.38 5.523 0 10-4.145 10-9.243S17.523 2 12 2zm1.091 12.434l-2.585-2.756-5.037 2.756 5.539-5.88 2.637 2.755 4.986-2.755-5.54 5.88z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default FloatingContact;
