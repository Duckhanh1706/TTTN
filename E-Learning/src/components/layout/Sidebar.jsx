import React from "react";

const Sidebar = () => {
  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-[#eff4ff] border-r border-slate-200 hidden lg:flex flex-col p-6 gap-6 z-50">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#004ac6]">Lumina</h1>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 bg-[#2563eb] text-white rounded-lg p-3 transition-transform translate-x-1 cursor-pointer">
          <span className="material-symbols-outlined">home</span>
          <span className="font-semibold text-sm">Home</span>
        </div>

        {[
          { icon: "library_books", text: "My Library" },
          { icon: "video_camera_front", text: "Live Classes" },
          { icon: "group", text: "Tutors" },
          { icon: "settings", text: "Settings" },
        ].map((item, index) => (
          <a
            key={index}
            className="flex items-center gap-3 text-slate-600 p-3 hover:bg-[#dce9ff] transition-colors rounded-lg"
            href="#"
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="font-semibold text-sm">{item.text}</span>
          </a>
        ))}
      </div>

      <div className="mt-auto">
        <div className="bg-[#004ac6]/5 rounded-xl p-4 border border-[#004ac6]/10">
          <p className="font-semibold text-sm text-[#004ac6] mb-2">
            Next Milestone
          </p>
          <p className="text-xs text-slate-500 mb-3">
            5 days streak! Keep going.
          </p>
          <button className="w-full bg-[#004ac6] text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all duration-200">
            Start Daily Lesson
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
