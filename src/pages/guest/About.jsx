import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

function About() {
  return (
    <MainLayout>
      <div className="about-page bg-[#F8FAFC] min-h-screen">
        {/* Hero Section */}
        <section className="about-hero bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 py-20 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-blue-600/25 rounded-full blur-3xl pointer-events-none"></div>

          <div className="about-hero__container mx-auto max-w-7xl px-6 relative z-10 text-center animate-fade-in-up">
            <span className="inline-block py-1.5 px-4 rounded-full bg-blue-500/25 text-blue-300 font-bold text-xs uppercase tracking-wider mb-4 border border-blue-400/20">
              Về chúng tôi
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Sứ mệnh kiến tạo thế hệ công dân toàn cầu
            </h1>
            <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
              Chúng tôi kết hợp giữa phương pháp giảng dạy sư phạm đỉnh cao và
              công nghệ giáo dục hiện đại, giúp việc học ngoại ngữ trở nên hiệu
              quả, chuẩn hóa và dễ tiếp cận hơn bao giờ hết.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in-up">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  Tầm nhìn & Giá trị cốt lõi
                </span>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  Mang đến giải pháp học tập tối ưu nhất cho học viên Việt Nam
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  Tại nền tảng của chúng tôi, mỗi lộ trình học đều được cá nhân
                  hóa dựa trên năng lực thực tế của từng học viên. Hệ thống bài
                  luyện tập thông minh kết hợp công nghệ AI giúp tối ưu hóa thời
                  gian và gia tăng tốc độ bứt phá band điểm.
                </p>
                <div className="grid grid-cols-2 gap-6 pt-4">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                    <h3 className="text-2xl font-black text-blue-600">50K+</h3>
                    <p className="text-xs font-semibold text-slate-500 mt-1">
                      Học viên tin tưởng
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                    <h3 className="text-2xl font-black text-emerald-600">
                      95%
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 mt-1">
                      Đạt cam kết đầu ra
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative animate-fade-in-up delay-100">
                <div className="h-96 w-full rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-800 shadow-2xl overflow-hidden flex items-center justify-center text-white font-bold text-lg">
                  Hình ảnh đội ngũ sáng lập
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 bg-slate-50/50 border-t border-slate-100">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in-up">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                Điểm khác biệt
              </span>
              <h2 className="mt-3 text-3xl font-extrabold text-slate-900 tracking-tight">
                Tại sao chọn chúng tôi?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Lộ trình chuẩn hóa",
                  desc: "Được nghiên cứu chuyên sâu bởi các chuyên gia đạt chuẩn quốc tế hàng đầu.",
                },
                {
                  title: "Công nghệ AI thông minh",
                  desc: "Hỗ trợ chấm chữa bài chi tiết, nhận diện phát âm và dự đoán band điểm chính xác.",
                },
                {
                  title: "Đồng hành sát sao",
                  desc: "Đội ngũ mentor và giảng viên hỗ trợ giải đáp thắc mắc 24/7 trong suốt khóa học.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-3xl border border-slate-200/70 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl mb-6">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-xs text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export default About;
