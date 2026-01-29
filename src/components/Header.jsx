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
          <NavLink to="/talents" className={({ isActive }) => `flex items-center gap-2 font-semibold text-[19px] font-['Mulish'] transition-all duration-300 hover:-translate-y-0.5 ${isActive ? "text-[#163D5C]" : "text-[#C2C2C2]"} hover:text-[#163D5C]`}>
            <CiUser className="text-[24px]" />
            Talents
          </NavLink>

          <NavLink to="/jobs" className={({ isActive }) => `flex items-center gap-2 font-semibold text-[19px] font-['Mulish'] transition-all duration-300 hover:-translate-y-0.5 ${isActive ? "text-[#163D5C]" : "text-[#C2C2C2]"} hover:text-[#163D5C]`}>
            <IoWalletOutline className="text-[24px]" />
            Jobs
          </NavLink>
        </nav>

        {/* RIGHT SIDE (DESKTOP) */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-4">
            {/* O'ZGARTIRILGAN: Sign in tugmasi Link bilan o'ralgan */}
            <Link to="/signin">
              <button className="w-[155px] h-[52px] border-2 border-[#163D5C] rounded-xl font-bold text-[18px] text-[#163D5C] bg-white transition-all duration-300 hover:-translate-y-1 active:scale-95 cursor-pointer">
                Sign in
              </button>
            </Link>

            <Link to="/signup">
              <button className="w-[155px] h-[52px] bg-[#163D5C] border-2 border-[#163D5C] rounded-xl font-bold text-[18px] text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95 cursor-pointer">
                Join Now
              </button>
            </Link>
          </div>

          {/* TIL DROPDOWN */}
          <div className="relative">
            <button onClick={() => setShowLang(!showLang)} className="flex items-center gap-1 font-bold text-[17px] text-[#343C44] cursor-pointer">
              {lang} <IoMdArrowDropdown className={`text-xl transition-transform ${showLang ? 'rotate-180' : ''}`} />
            </button>
            {showLang && (
              <div className="absolute top-[45px] right-0 w-[100px] bg-white shadow-xl rounded-lg py-2 z-[100]">
                {['Eng', 'Uzb', 'Rus'].map((item) => (
                  <button key={item} onClick={() => handleLangChange(item)} className="w-full text-left px-4 py-2 hover:bg-gray-50 font-semibold text-[15px]">
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* BURGER ICON */}
        <button className="lg:hidden text-[35px] text-[#163D5C] z-[60]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
        {/* MOBILE MENU - TO'LIQ EKRAN QILINDI */}
        <div className={`lg:hidden fixed top-[90px] left-0 w-full h-[calc(100vh-90px)] bg-white shadow-2xl transition-all duration-300 z-50 flex flex-col items-center gap-6 py-8 overflow-y-auto ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full pointer-events-none"}`}>
          <NavLink to="/talents" onClick={() => setIsOpen(false)} className="text-[19px] font-bold text-[#163D5C] py-2">Talents</NavLink>
          <NavLink to="/jobs" onClick={() => setIsOpen(false)} className="text-[19px] font-bold text-[#163D5C] py-2">Jobs</NavLink>

          <div className="w-[85%] flex flex-col gap-4 mt-4">
            <Link to="/signin" onClick={() => setIsOpen(false)} className="w-full">
              <button className="w-full py-3 border-2 border-[#163D5C] rounded-xl font-bold text-[#163D5C] 
                  hover:bg-[#163D5C] hover:text-white hover:border-white
                  transition-colors duration-300">
                Sign in
              </button>
            </Link>

            <Link to="/signup" onClick={() => setIsOpen(false)} className="w-full">
              <button className="w-full py-3 bg-[#163D5C] text-white rounded-xl font-bold transition-all active:scale-95 hover:bg-[#0f2d44]">
                Join Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;