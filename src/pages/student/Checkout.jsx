import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaShieldAlt, FaArrowRight } from "react-icons/fa";
import { enrollmentService } from "../../services/enrollmentService";

function Checkout() {
  const navigate = useNavigate();
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchCheckoutData = () => {
      try {
        setLoading(true);
        const savedCheckout = localStorage.getItem("elearning_checkout_items");
        if (savedCheckout) {
          setCheckoutItems(JSON.parse(savedCheckout));
        } else {
          setCheckoutItems([]);
        }
      } catch (err) {
        console.error("Lỗi tải thông tin thanh toán:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCheckoutData();
  }, []);

  const subtotal = checkoutItems.reduce((sum, item) => {
    const priceNum = Number(item.price || 0);
    return sum + priceNum;
  }, 0);

  const totalAmount = subtotal;

  // Xử lý thanh toán VNPay và gọi API ghi danh thực tế vào Database
  const handleProcessPayment = async () => {
    if (checkoutItems.length === 0) return;

    setIsProcessing(true);

    try {
      const confirmVNPaySandbox = window.confirm(
        `--- HỆ THỐNG CỔNG THANH TOÁN VNPAY ---\n\n` +
          `Mã đơn hàng: VNPAY_${Date.now()}\n` +
          `Tổng số tiền: ${totalAmount.toLocaleString("vi-VN")} VNĐ\n` +
          `Nội dung: Thanh toán học phí E-Learning\n\n` +
          `[Mô phỏng] Bạn có muốn xác nhận thanh toán THÀNH CÔNG trên VNPay không?`,
      );

      if (confirmVNPaySandbox) {
        // Ghi danh từng khóa học vào MySQL thông qua API backend
        for (const item of checkoutItems) {
          await enrollmentService.enrollCourse(item.id);
        }

        // Xóa giỏ hàng và dữ liệu checkout tạm sau khi thanh toán thành công
        localStorage.removeItem("elearning_cart_items");
        localStorage.removeItem("elearning_checkout_items");
        window.dispatchEvent(new Event("cartUpdated"));

        // Lưu lịch sử giao dịch
        const transactionHistory =
          JSON.parse(localStorage.getItem("elearning_transactions")) || [];
        const newTransaction = {
          orderId: `VNPAY_${Date.now()}`,
          date: new Date().toLocaleString("vi-VN"),
          amount: totalAmount.toLocaleString("vi-VN") + " VNĐ",
          gateway: "VNPay",
          status: "Thành công",
          courses: checkoutItems.map((c) => c.title),
        };
        localStorage.setItem(
          "elearning_transactions",
          JSON.stringify([newTransaction, ...transactionHistory]),
        );

        alert(
          "Thanh toán VNPay thành công! Hệ thống đã tự động kích hoạt quyền học tập vào tài khoản của bạn.",
        );
        navigate("/my-courses");
      } else {
        alert("Giao dịch đã bị hủy bởi người dùng.");
      }
    } catch (err) {
      console.error("Lỗi thanh toán:", err);
      alert(
        err.response?.data?.message ||
          "Có lỗi xảy ra trong quá trình ghi danh khóa học. Vui lòng kiểm tra lại đăng nhập!",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <p className="text-slate-500 font-medium text-xs">
          Đang chuẩn bị thông tin thanh toán từ máy chủ...
        </p>
      </div>
    );
  }

  if (checkoutItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center space-y-4 px-6">
        <p className="text-sm font-semibold text-slate-600">
          Không có khóa học nào được chọn để thanh toán.
        </p>
        <Link
          to="/cart"
          className="rounded-2xl bg-blue-600 px-6 py-3.5 text-xs font-bold text-white uppercase tracking-wider shadow-md shadow-blue-600/20"
        >
          Quay lại giỏ hàng
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
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
          <div className="lg:col-span-2 space-y-6">
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
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm overflow-hidden shrink-0">
                        {course.thumbnail ? (
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          "📚"
                        )}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                          {course.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-medium">
                          Truy cập trọn đời • Giảng viên:{" "}
                          {course.teacher_name || "Chuyên gia đào tạo"}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-blue-600">
                      {Number(course.price || 0).toLocaleString("vi-VN")} VNĐ
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-sm space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900">
                Chọn phương thức thanh toán trực tuyến
              </h3>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 rounded-2xl border border-blue-600 bg-blue-50/40 cursor-pointer shadow-sm">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      defaultChecked
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

          <div className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-sm space-y-6">
            <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-4">
              Hóa đơn học phí
            </h3>

            <div className="space-y-3 text-xs font-semibold text-slate-600">
              <div className="flex justify-between">
                <span>Tổng giá gốc khóa học:</span>
                <span className="text-slate-900">
                  {subtotal.toLocaleString("vi-VN")} VNĐ
                </span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>Ưu đãi học tập (Mã giảm giá):</span>
                <span>0 VNĐ</span>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-4 text-sm font-black text-slate-900">
                <span>Thành tiền thực tế:</span>
                <span className="text-blue-600 text-xl">
                  {totalAmount.toLocaleString("vi-VN")} VNĐ
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
              disabled={isProcessing || checkoutItems.length === 0}
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
