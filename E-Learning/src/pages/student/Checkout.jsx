import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaLock,
  FaShieldAlt,
  FaArrowRight,
  FaCreditCard,
  FaQrcode,
} from "react-icons/fa";
import MOCK_COURSES from "../../data/mockCourses.json";

function Checkout() {
  const navigate = useNavigate();
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [paymentGateway, setPaymentGateway] = useState("vnpay");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Lấy thông tin từ giỏ hàng hoặc các khóa học được chọn thanh toán
    // Giả lập lấy 2 khóa đầu tiên làm ví dụ đơn hàng
    const items = [MOCK_COURSES[0], MOCK_COURSES[1]];
    setCheckoutItems(items);
  }, []);

  const subtotal = checkoutItems.reduce((sum, item) => {
    const priceNum = parseInt(item.price.replace(/\D/g, "")) || 0;
    return sum + priceNum;
  }, 0);

  const tax = 0; // Miễn phí VAT khóa học giáo dục
  const totalAmount = subtotal - tax;

  // Xử lý quy trình thanh toán khép kín tích hợp VNPay
  const handleProcessPayment = () => {
    if (checkoutItems.length === 0) return;

    setIsProcessing(true);

    // Mô phỏng gọi API Spring Boot backend tạo giao dịch VNPay
    setTimeout(() => {
      setIsProcessing(false);

      // Mô phỏng cửa sổ cổng thanh toán VNPay Sandbox
      const confirmVNPaySandbox = window.confirm(
        `--- HỆ THỐNG CỔNG THANH TOÁN VNPAY ---\n\n` +
          `Mã đơn hàng: VNPAY_${Date.now()}\n` +
          `Tổng số tiền: ${totalAmount.toLocaleString()} VNĐ\n` +
          `Nội dung: Thanh toán học phí E-Learning\n\n` +
          `[Mô phỏng] Bạn có muốn xác nhận thanh toán THÀNH CÔNG trên VNPay không?`,
      );

      if (confirmVNPaySandbox) {
        // Tự động cập nhật quyền truy cập khóa học cho học viên (Mô hình khép kín tự động)
        const storedUser = JSON.parse(
          localStorage.getItem("elearning_user"),
        ) || { enrolledCourses: [] };
        const purchasedIds = checkoutItems.map((item) => item.id);

        // Gộp ID khóa học mới vào danh sách đã sở hữu, tránh trùng lặp
        const updatedEnrolled = Array.from(
          new Set([...(storedUser.enrolledCourses || []), ...purchasedIds]),
        );

        storedUser.enrolledCourses = updatedEnrolled;
        localStorage.setItem("elearning_user", JSON.stringify(storedUser));

        // Lưu lịch sử giao dịch vào localStorage phục vụ tra cứu
        const transactionHistory =
          JSON.parse(localStorage.getItem("elearning_transactions")) || [];
        const newTransaction = {
          orderId: `VNPAY_${Date.now()}`,
          date: new Date().toLocaleString("vi-VN"),
          amount: totalAmount.toLocaleString() + " đ",
          gateway: "VNPay",
          status: "Thành công",
          courses: checkoutItems.map((c) => c.title),
        };
        localStorage.setItem(
          "elearning_transactions",
          JSON.stringify([newTransaction, ...transactionHistory]),
        );

        alert(
          "Thanh toán VNPay thành công! Hệ thống đã tự động cấp quyền truy cập khóa học vào tài khoản của bạn.",
        );
        navigate("/my-courses");
      } else {
        alert("Giao dịch đã bị hủy bởi người dùng hoặc thanh toán thất bại.");
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
            Cổng thanh toán tự động
          </span>
          <h1 className="text-3xl font-black text-slate-900 mt-2">
            Xác nhận thanh toán học phí
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Giao dịch an toàn, bảo mật tuyệt đối qua cổng thanh toán điện tử
            VNPay. Hệ thống kích hoạt khóa học ngay sau khi hoàn tất.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cột trái: Thông tin đơn hàng & Cổng thanh toán */}
          <div className="lg:col-span-2 space-y-6">
            {/* Danh sách khóa học thanh toán */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-sm space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-3">
                Danh sách khóa học đăng ký ({checkoutItems.length})
              </h3>
              <div className="space-y-3">
                {checkoutItems.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center justify-between py-2 border-b border-slate-50 last:border-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                        📚
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                          {course.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-medium">
                          Truy cập trọn đời • Giảng viên:{" "}
                          {course.instructor.name}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-blue-600">
                      {course.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lựa chọn cổng VNPay */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-sm space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900">
                Chọn phương thức thanh toán trực tuyến
              </h3>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 rounded-2xl border border-blue-600 bg-blue-50/40 cursor-pointer shadow-sm">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      checked
                      readOnly
                      className="accent-blue-600"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">
                          Cổng thanh toán VNPay-QR / Ví VNPay
                        </span>
                        <span className="bg-blue-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full">
                          Khuyên dùng
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Hỗ trợ tất cả Ngân hàng nội địa, Thẻ quốc tế Visa/Master
                        và ứng dụng Mobile Banking.
                      </p>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-md">
                    VN
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Cột phải: Tổng thanh toán & Nút kết nối VNPay */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-sm space-y-6">
            <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-4">
              Hóa đơn học phí
            </h3>

            <div className="space-y-3 text-xs font-semibold text-slate-600">
              <div className="flex justify-between">
                <span>Tổng giá gốc khóa học:</span>
                <span className="text-slate-900">
                  {subtotal.toLocaleString()} đ
                </span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>Ưu đãi học tập (Mã giảm giá):</span>
                <span>0 đ</span>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-4 text-sm font-black text-slate-900">
                <span>Thành tiền thực tế:</span>
                <span className="text-blue-600 text-xl">
                  {totalAmount.toLocaleString()} đ
                </span>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 text-[11px] text-amber-800 space-y-1">
              <span className="font-bold block">
                💡 Mô hình thanh toán khép kín tự động:
              </span>
              <p>
                Hệ thống tự động kích hoạt tài liệu và video ngay sau khi VNPay
                phản hồi kết quả giao dịch thành công.
              </p>
            </div>

            <button
              onClick={handleProcessPayment}
              disabled={isProcessing}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
            >
              {isProcessing
                ? "Đang kết nối cổng VNPay..."
                : "Thanh toán qua VNPay"}{" "}
              <FaArrowRight />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium pt-2">
              <FaShieldAlt className="text-emerald-500" /> Giao dịch mã hóa an
              toàn đạt chuẩn SSL/TLS
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
