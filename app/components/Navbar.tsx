import React from "react";
import Image from "next/image";

const menuItems = [
  { label: "خانه", href: "#", icon: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"/></svg>
  ) },
  { label: "فیلم ها", href: "#", icon: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M16 3v4M8 3v4"/></svg>
  ) },
  { label: "سریال ها", href: "#", icon: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3v4M8 3v4"/></svg>
  ) },
  { label: "هنرمندان", href: "#", icon: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 8-4 8-4s8 0 8 4"/></svg>
  ) },
  { label: "تماس با ما", href: "#", icon: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10.5V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2v-4.5"/><path d="M16 3v4M8 3v4"/></svg>
  ) },
];

export default function Navbar() {
  return (
    <div className="relative w-full">
      {/* موج بالای نوبار */}
      <svg className="absolute -top-6 right-0 left-0 w-full h-10 z-10" viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="#181C23" d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" />
      </svg>
      <nav className="relative w-full bg-[#181C23] text-white shadow-lg py-2 px-4 md:px-10 flex items-center justify-between rtl z-20">
        {/* Right: Logo */}
        <div className="flex items-center gap-2">
          <Image src="/pics/logo-light.png" alt="لوگو" width={150} height={120} className="" />
        </div>
        {/* Center: Menu */}
        <ul className="hidden md:flex items-center gap-6 text-lg font-bold">
          {menuItems.map((item) => (
            <li key={item.label} className="flex items-center gap-1">
              <span className="text-yellow-400">{item.icon}</span>
              <a href={item.href} className="flex items-center gap-1 hover:text-yellow-400 transition">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        {/* Left: Search Bar */}
        <form className="hidden md:flex items-center bg-[#232733] rounded-full px-3 py-1 w-64">
          <input
            type="text"
            placeholder="جستجو..."
            className="bg-transparent outline-none text-white flex-1 px-2 placeholder:text-gray-400"
          />
          <button type="submit" className="text-yellow-400">
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-3.5-3.5"/></svg>
          </button>
        </form>
      </nav>
    </div>
  );
} 