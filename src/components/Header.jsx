import React, { useState } from 'react';
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
    console.log(`Til ${targetLang} ga o‘zgardi`);
  };

  return (
    <header className="w-full h-[90px] flex items-center justify-center bg-white shadow-sm sticky top-0 z-50">
      <div className="w-[90%] max-w-[1300px]   flex items-center justify-between h-full relative">

        {/* LOGO */}
        <Link to="/" className="text-[#343C44] text-[32px] font-['Mulish'] tracking-tight shrink-0">
          workify
        </Link>

        {/* NAV */}
        <nav className="hidden lg:flex items-center gap-x-8">
          <NavLink
            to="/talents"
            className={({ isActive }) =>
              `flex items-center gap-2 font-semibold text-[19px] transition-all
              ${isActive ? "text-[#163D5C]" : "text-[#C2C2C2]"} hover:text-[#163D5C]`
            }
          >
            <CiUser className="text-[24px]" />
            Talents
          </NavLink>

          <NavLink
            to="/jobs"
            className={({ isActive }) =>
              `flex items-center gap-2 font-semibold text-[19px] transition-all
              ${isActive ? "text-[#163D5C]" : "text-[#C2C2C2]"} hover:text-[#163D5C]`
            }
          >
            <IoWalletOutline className="text-[24px]" />
            Jobs
          </NavLink>
        </nav>

        {/* RIGHT */}
        <div className="hidden lg:flex items-center gap-8">
          <button className="w-[155px] h-[52px] border-2 border-[#163D5C] rounded-xl font-bold text-[#163D5C]">
            Sign in
          </button>

          <div className="relative">
            <button
              onClick={() => setShowLang(!showLang)}
              className="flex items-center gap-1 font-bold"
            >
              {lang}
              <IoMdArrowDropdown
                className={`transition-transform ${showLang ? 'rotate-180' : ''}`}
              />
            </button>

            {showLang && (
              <div className="absolute top-[45px] right-0 w-[100px] bg-white shadow-lg rounded-lg">
                {['Eng', 'Uzb', 'Rus'].map(item => (
                  <button
                    key={item}
                    onClick={() => handleLangChange(item)}
                    className="block w-full px-4 py-2 hover:bg-gray-100"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* BURGER */}
        <button
          className="lg:hidden text-[35px]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="lg:hidden absolute top-[90px] right-0 w-[260px] bg-white shadow-xl rounded-xl p-6">
            <NavLink to="/talents" onClick={() => setIsOpen(false)}>Talents</NavLink>
            <NavLink to="/jobs" onClick={() => setIsOpen(false)}>Jobs</NavLink>
          </div>
        )}

      </div>
    </header>
  );
}

export default Header;
