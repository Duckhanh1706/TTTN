import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashAlt, FaArrowRight, FaLock, FaTag } from "react-icons/fa";
import MOCK_COURSES from "../../data/mockCourses.json";

function Cart() {
  const navigate = useNavigate();
  // Giả lập danh sách khóa học trong giỏ hàng (lấy 2 khóa đầu tiên từ MOCK_COURSES)
  const [cartItems, setCartItems] = useState([
    { ...MOCK_COURSES[0], promoCode: "" },
    { ...MOCK_COURSES[1], promoCode: "" },
  ]);

  const [discount, setDiscount] = useState(0);
  const [couponInput, setCouponInput] = useState("");

  // Tính tổng tiền
  const subtotal = cartItems.reduce((sum, item) => {
    // Chuyển đổi giá tiền từ string (ví dụ: "1,200,000 đ") sang số để tính toán
    const priceNum = parseInt(item.price.replace(/\D/g, "")) || 0;
    return sum + priceNum;
  }, 0);

  const total = subtotal - discount;

  // Xử lý xóa khóa học khỏi giỏ hàng
  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Xử lý áp dụng mã giảm giá
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.toUpperCase() === "ELITE100") {
      setDiscount(200000);
      alert("Áp dụng mã giảm giá thành công (-200,000 đ)!");
    } else {
      alert("Mã giảm giá không hợp lệ hoặc đã hết hạn!");
    }
  };

  // Xử lý chuyển hướng đến trang thanh toán VNPay
  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    // Lưu tạm danh sách đơn hàng cần thanh toán vào sessionStorage hoặc localStorage nếu cần
    localStorage.setItem("elearning_checkout_items", JSON.stringify(cartItems));

    // Điều hướng sang trang thanh toán VNPay (/checkout)
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Tiêu đề trang */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
            Thanh toán khóa học
          </span>
          <h1 className="text-3xl font-black text-slate-900 mt-2">
            Giỏ hàng của bạn
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Kiểm tra lại danh sách các khóa học ngoại ngữ trước khi tiến hành
            thanh toán qua cổng VNPay.
          </p>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Cột trái: Danh sách khóa học trong giỏ */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transition-all hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-lg shadow-md shrink-0">
                      📚
                    </div>
                    <div className="space-y-1.5">
                      <span className="inline-block px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-extrabold uppercase">
                        {course.category}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 line-clamp-1">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        Giảng viên:{" "}
                        <span className="text-slate-700 font-bold">
                          {course.instructor.name}
                        </span>
                      </p>
                      <span className="text-xs font-semibold text-emerald-600 block">
                        ✓ {course.level} • Truy cập trọn đời
                      </span>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-end justify-between w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100 gap-3">
                    <div className="text-right">
                      <span className="text-lg font-black text-blue-600 block">
                        {course.price}
                      </span>
                      {course.oldPrice && (
                        <span className="text-xs text-slate-400 line-through">
                          {course.oldPrice}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveItem(course.id)}
                      className="text-slate-400 hover:text-red-600 p-2 rounded-xl hover:bg-red-50 transition-colors"
                      title="Xóa khóa học"
                    >
                      <FaTrashAlt className="text-sm" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cột phải: Tổng quan thanh toán & Mã giảm giá */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-sm space-y-6">
              <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-4">
                Tổng quan đơn hàng
              </h3>

              {/* Form nhập mã giảm giá */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  Mã giảm giá (Gợi ý: ELITE100)
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <FaTag className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                    <input
                      type="text"
                      placeholder="Nhập mã ưu đãi..."
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-10 pr-4 text-xs font-medium text-slate-800 outline-none focus:border-blue-600 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-3 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl text-xs font-bold transition-colors shadow-sm"
                  >
                    Áp dụng
                  </button>
                </div>
              </form>

              {/* Chi tiết giá tiền */}
              <div className="space-y-3 pt-2 text-xs font-semibold text-slate-600">
                <div className="flex justify-between">
                  <span>Tạm tính:</span>
                  <span className="text-slate-900">
                    {subtotal.toLocaleString()} đ
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Giảm giá:</span>
                    <span>-{discount.toLocaleString()} đ</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-slate-100 pt-3 text-sm font-black text-slate-900">
                  <span>Tổng thanh toán:</span>
                  <span className="text-blue-600 text-lg">
                    {total.toLocaleString()} đ
                  </span>
                </div>
              </div>

              {/* Nút thanh toán chuyển sang trang VNPay (/checkout) */}
              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 active:scale-95"
              >
                Tiến hành thanh toán VNPay <FaArrowRight />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium pt-2">
                <FaLock className="text-emerald-500" /> Thanh toán bảo mật và mã
                hóa SSL 100%
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/70 shadow-sm space-y-4">
            <p className="text-sm font-semibold text-slate-500">
              Giỏ hàng của bạn đang trống.
            </p>
            <Link
              to="/courses"
              className="inline-block rounded-2xl bg-blue-600 px-6 py-3.5 text-xs font-bold text-white uppercase tracking-wider shadow-md shadow-blue-600/20"
            >
              Khám phá các khóa học ngay
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
