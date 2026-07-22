import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <MainLayout>
      <div className="contact-page bg-[#F8FAFC] min-h-screen">
        {/* Header Hero */}
        <section className="contact-hero bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 py-16 lg:py-24 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-blue-600/25 rounded-full blur-3xl pointer-events-none"></div>

          <div className="mx-auto max-w-7xl px-6 text-center relative z-10 animate-fade-in-up">
            <span className="inline-block py-1.5 px-4 rounded-full bg-blue-500/25 text-blue-300 font-bold text-xs uppercase tracking-wider mb-4 border border-blue-400/20">
              Kết nối với chúng tôi
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Bạn cần hỗ trợ tư vấn lộ trình?
            </h1>
            <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Hãy để lại thông tin, đội ngũ chuyên viên tư vấn của chúng tôi sẽ
              liên hệ lại với bạn trong thời gian sớm nhất.
            </p>
          </div>
        </section>

        {/* Form & Info Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8 animate-fade-in-up">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    Thông tin liên hệ
                  </span>
                  <h2 className="mt-3 text-3xl font-extrabold text-slate-900 tracking-tight">
                    Chúng tôi luôn sẵn sàng lắng nghe
                  </h2>
                  <p className="mt-4 text-slate-600 text-sm leading-relaxed">
                    Mọi thắc mắc về khóa học, chính sách cam kết hoặc phương
                    thức thanh toán, xin vui lòng liên hệ qua các kênh thông tin
                    bên dưới.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/70 shadow-sm">
                    <span className="text-2xl">📍</span>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Địa chỉ văn phòng
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Số 123, Đường Cầu Giấy, Quận Cầu Giấy, Hà Nội
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/70 shadow-sm">
                    <span className="text-2xl">📞</span>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Hotline hỗ trợ
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        1900 xxxx (8:00 - 22:00 hàng ngày)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/70 shadow-sm">
                    <span className="text-2xl">✉️</span>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Hòm thư điện tử
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        support@elearning.vn
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Input */}
              <div className="bg-white rounded-3xl border border-slate-200/70 p-8 shadow-xl shadow-slate-200/50 animate-fade-in-up delay-100">
                {submitted ? (
                  <div className="py-16 text-center space-y-4">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto">
                      ✓
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Gửi thông tin thành công!
                    </h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Cảm ơn bạn đã liên hệ. Chuyên viên tư vấn sẽ gọi lại cho
                      bạn trong ít phút tới.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
                    >
                      Gửi yêu cầu mới
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      Đăng ký tư vấn miễn phí
                    </h3>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">
                        Họ và tên
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nhập họ và tên của bạn"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="example@gmail.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">
                        Số điện thoại
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0912xxxxxx"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">
                        Nội dung cần hỗ trợ
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Chia sẻ mục tiêu học tập của bạn..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-2xl bg-blue-600 py-4 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-blue-700 shadow-lg shadow-blue-600/25 active:scale-95"
                    >
                      Gửi yêu cầu tư vấn
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export default Contact;
