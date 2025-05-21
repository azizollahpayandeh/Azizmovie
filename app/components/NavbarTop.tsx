import React from "react";

export default function NavbarTop() {
  return (
    <div className="w-full relative flex items-center justify-end px-4 md:px-10 py-1 gap-2 md:gap-4 overflow-hidden" style={{background: 'linear-gradient(90deg, #232733 70%, #232733cc 100%)'}}>
      {/* موج پایین */}
      <svg className="absolute left-0 right-0 bottom-0 w-full h-4 z-0" viewBox="0 0 1440 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="#232733" d="M0,10 C360,30 1080,0 1440,10 L1440,20 L0,20 Z" />
      </svg>
      <div className="relative z-10 flex items-center gap-2 md:gap-4">
        <button className="bg-[#181C23] p-2 rounded-full hover:bg-[#2c3140] transition">
          <span className="sr-only">Theme</span>
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 0 0 20"/></svg>
        </button>
        <button className="bg-[#181C23] p-2 rounded-full hover:bg-[#2c3140] transition">
          <span className="sr-only">Power</span>
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2v10"/><circle cx="12" cy="12" r="10"/></svg>
        </button>
        <button className="bg-[#181C23] p-2 rounded-full hover:bg-[#2c3140] transition relative">
          <span className="sr-only">Notifications</span>
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full"></span>
        </button>
        <button className="bg-[#181C23] p-2 rounded-full hover:bg-[#2c3140] transition">
          <span className="sr-only">User</span>
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 8-4 8-4s8 0 8 4"/></svg>
        </button>
      </div>
    </div>
  );
} 