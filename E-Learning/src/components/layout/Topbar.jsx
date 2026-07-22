import React from "react";

const Topbar = () => {
  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 h-20 flex justify-between items-center w-full px-10 max-w-[1280px] mx-auto shadow-sm">
      <div className="flex items-center gap-8">
        <div className="relative hidden md:block transition-all duration-200">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            search
          </span>
          <input
            className="pl-10 pr-4 py-2 bg-[#eff4ff] border border-slate-200 rounded-full text-sm focus:ring-2 focus:ring-[#004ac6] focus:border-transparent transition-all w-64 lg:w-96 outline-none"
            placeholder="Search courses..."
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-slate-500 hover:text-[#004ac6] transition-colors flex items-center">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="text-slate-500 hover:text-[#004ac6] transition-colors flex items-center">
          <span className="material-symbols-outlined">help</span>
        </button>
        <div className="h-8 w-px bg-slate-200"></div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-semibold text-sm text-slate-900">Minh Nguyen</p>
            <p className="text-xs text-[#004ac6] font-medium">Intermediate</p>
          </div>
          <img
            className="w-10 h-10 rounded-full border-2 border-[#004ac6] object-cover"
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
            alt="User Avatar"
          />
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
