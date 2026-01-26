import { Link, NavLink } from 'react-router-dom';
import { CiUser } from "react-icons/ci";
import { IoWalletOutline } from "react-icons/io5";

function Header() {
  return (
    <header className="w-full h-[88px] flex items-center justify-center bg-white shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
      <div className="w-[1114px] h-[51px] flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="text-[#404040] font-semibold text-[30px] font-['Mulish']">
          workify
        </Link>

        {/* NAV */}
        <nav className="w-[206px] h-[22px] flex items-center justify-between">
          <NavLink to="/talents" className={({ isActive }) => `flex items-center gap-[4px] font-semibold text-[20px] font-['Mulish']
          ${isActive ? "text-[#163D5C]" : "text-[#C2C2C2]"} hover:text-[#163D5C] transition`}>
            <CiUser />
            Talents
          </NavLink>

          <NavLink to="/jobs" className={({ isActive }) => `flex items-center gap-[4px] font-semibold text-[20px] font-['Mulish']
          ${isActive ? "text-[#163D5C]" : "text-[#C2C2C2]"} hover:text-[#163D5C] transition`}>
            <IoWalletOutline />
            Jobs
          </NavLink>
        </nav>

        {/* RIGHT SIDE */}
        <div className="w-[400px] h-[50px] flex items-center justify-between">

          {/* BUTTONS */}
          <div className="w-[320px] h-[50px] flex items-center justify-between">
            <button
              className="w-[150px] h-[50px] border-2 border-[#163D5C] rounded-[10px] font-bold text-[20px] text-[#163D5C] hover:bg-[#163D5C] hover:text-white transition cursor-pointer">
              Sign in
            </button>

            <button className="w-[150px] h-[50px] border-2 border-[#163D5C] rounded-[10px] font-bold text-[20px] bg-[#163D5C] text-white hover:bg-transparent hover:text-[#163D5C] transition cursor-pointer">
              Join Now
            </button>
          </div>

          {/* LANGUAGE */}
          <select className="w-[58px] h-[22px]">
            <option value="EN">Eng</option>
            <option value="UZ">Uzb</option>
            <option value="RU">Rus</option>
          </select>

        </div>
      </div>
    </header>
  )
}

export default Header;