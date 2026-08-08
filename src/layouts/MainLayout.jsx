import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import FloatingContact from "../components/common/FloatingContact";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <FloatingContact />
      <Footer />
    </div>
  );
}

export default MainLayout;
