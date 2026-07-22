import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Tự động đưa màn hình về tọa độ trên cùng mỗi khi đổi đường dẫn (URL thay đổi)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Hoặc "smooth" nếu muốn hiệu ứng cuộn mượt
    });
  }, [pathname]);

  return null;
}

export default ScrollToTop;
