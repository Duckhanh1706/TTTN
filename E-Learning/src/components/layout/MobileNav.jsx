import React from "react";

const MobileNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 flex lg:hidden justify-around items-center h-16 px-4 z-50">
      <button className="flex flex-col items-center gap-0.5 text-[#004ac6]">
        <span className="material-symbols-outlined">home</span>
        <span className="text-[10px] font-semibold">Home</span>
      </button>
      <button className="flex flex-col items-center gap-0.5 text-slate-500">
        <span className="material-symbols-outlined">library_books</span>
        <span className="text-[10px] font-semibold">Library</span>
      </button>
      <button className="flex flex-col items-center gap-0.5 text-slate-500">
        <span className="material-symbols-outlined">video_camera_front</span>
        <span className="text-[10px] font-semibold">Classes</span>
      </button>
      <button className="flex flex-col items-center gap-0.5 text-slate-500">
        <span className="material-symbols-outlined">person</span>
        <span className="text-[10px] font-semibold">Profile</span>
      </button>
    </nav>
  );
};

export default MobileNav;
