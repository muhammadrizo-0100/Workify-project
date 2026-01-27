import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CiUser } from "react-icons/ci";
import { IoWalletOutline } from "react-icons/io5";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { IoMdArrowDropdown } from "react-icons/io";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState('Eng');
  const [showLang, setShowLang] = useState(false);

  const handleLangChange = (targetLang) => {
    setLang(targetLang);
    setShowLang(false);
    console.log(`Til ${targetLang}ga o'zgardi`);
  };

  return (
    <header className="w-full h-[90px] flex items-center justify-center bg-white shadow-sm sticky top-0 z-50">
      <div className="w-[90%] max-w-[1300px] flex items-center justify-between h-full relative">

        {/* LOGO */}
        <Link to="/" className="text-[#343C44] font-semibold text-[32px] font-['Mulish'] tracking-tight shrink-0">
          workify
        </Link>

        {/* NAV (CENTER) */}
        <nav className="hidden lg:flex items-center gap-x-8">
          <NavLink to="/talents" className={({ isActive }) => `flex items-center gap-2 font-semibold text-[19px] font-['Mulish'] transition-all duration-300 hover:-translate-y-0.5
          ${isActive ? "text-[#163D5C]" : "text-[#C2C2C2]"} hover:text-[#163D5C]`}>
            <CiUser className="text-[24px]" />
            Talents
          </NavLink>

          <NavLink to="/jobs" className={({ isActive }) => `flex items-center gap-2 font-semibold text-[19px] font-['Mulish'] transition-all duration-300 hover:-translate-y-0.5
          ${isActive ? "text-[#163D5C]" : "text-[#C2C2C2]"} hover:text-[#163D5C]`}>
            <IoWalletOutline className="text-[24px]" />
            Jobs
          </NavLink>
        </nav>

        {/* RIGHT SIDE (DESKTOP TUGMALARIGA HOVER QO'SHILDI) */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-4">
            <button className="w-[155px] h-[52px] border-2 border-[#163D5C] rounded-xl font-bold text-[18px] text-[#163D5C] bg-white transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-[#163D5C] hover:text-white hover:shadow-lg active:scale-95 cursor-pointer">
              Sign in
            </button>
            <button className="w-[155px] h-[52px] bg-[#163D5C] border-2 border-[#163D5C] rounded-xl font-bold text-[18px] text-white transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-[#1d4e75] hover:border-[#1d4e75] hover:shadow-lg active:scale-95 cursor-pointer">
              Join Now
            </button>
          </div>

          {/* TIL DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setShowLang(!showLang)}
              className="flex items-center gap-1 font-bold text-[17px] text-[#343C44] cursor-pointer hover:text-[#163D5C] transition-colors"
            >
              {lang} <IoMdArrowDropdown className={`text-xl transition-transform duration-300 ${showLang ? 'rotate-180' : ''}`} />
            </button>

            {showLang && (
              <div className="absolute top-[45px] right-0 w-[100px] bg-white shadow-xl rounded-lg border border-gray-100 py-2 z-[100] animate-in fade-in zoom-in duration-200">
                {['Eng', 'Uzb', 'Rus'].map((item) => (
                  <button
                    key={item}
                    onClick={() => handleLangChange(item)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 font-semibold text-[15px] text-[#343C44] transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* BURGER ICON */}
        <button className="lg:hidden text-[35px] text-[#163D5C] z-[60] cursor-pointer active:scale-90 transition-transform" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>

        {/* MOBILE MENU */}
        <div className={`lg:hidden absolute top-[90px] right-0 w-[260px] bg-white shadow-2xl rounded-2xl border border-gray-100 transition-all duration-300 z-50 flex flex-col items-center gap-6 py-8 
          ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 pointer-events-none"}`}>
          <NavLink to="/talents" onClick={() => setIsOpen(false)} className="text-[19px] font-bold text-[#163D5C] hover:scale-105 transition-transform">Talents</NavLink>
          <NavLink to="/jobs" onClick={() => setIsOpen(false)} className="text-[19px] font-bold text-[#163D5C] hover:scale-105 transition-transform">Jobs</NavLink>

          <div className="flex gap-4 font-bold text-[#163D5C] border-t pt-4 w-[80%] justify-center">
            {['Eng', 'Uzb', 'Rus'].map(item => (
              <span
                key={item}
                onClick={() => setLang(item)}
                className={`cursor-pointer transition-all ${lang === item ? 'underline scale-110' : 'opacity-50 hover:opacity-100'}`}
              >
                {item}
              </span>
            ))}
          </div>

          <div className="w-[85%] flex flex-col gap-4 mt-2">
            <button className="w-full py-3 border-2 border-[#163D5C] rounded-xl font-bold text-[#163D5C] bg-white cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:bg-[#163D5C] hover:text-white active:scale-95">
              Sign in
            </button>
            <button className="w-full py-3 bg-[#163D5C] text-white rounded-xl font-bold cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:bg-[#1d4e75] active:scale-95">
              Join Now
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;