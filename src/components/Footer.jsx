import React from 'react';
import { Link } from "react-router-dom";

import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaFacebook, FaYoutube, FaTelegram } from "react-icons/fa";

function Footer() {
    return (
        <footer className="w-full h-[497px] flex items-center justify-center bg-[#163D5C]">
            <div className="w-[1113px] h-[357px] flex flex-col justify-between">

                {/* TOP */}
                <div className="w-full h-[252px] flex justify-between">

                    {/* BRAND */}
                    <div className="w-[211px] h-[175px] flex flex-col justify-between">
                        <div>
                            <p className="text-white text-[35px]">workify</p>
                            <p className="text-white text-[20px]">Job posting platform</p>
                        </div>

                        <button className="
              w-[211px] h-[50px] bg-white text-[#163D5C] font-bold text-[20px] rounded-[8px] hover:bg-[#163D5C] hover:text-white hover:border hover:border-white transition cursor-pointer">
                            Contacts
                        </button>
                    </div>

                    {/* GENERAL */}
                    <div className="flex flex-col gap-[20px]">
                        <p className="text-white font-semibold text-[20px]">General</p>
                        <div className="flex flex-col gap-[10px]">
                            <Link to="/signup" className="text-white hover:text-slate-400 transition-colors duration-300 text-[14px] font-medium">Sign Up</Link>
                            <Link to="/contacts" className="text-white hover:text-slate-400 transition-colors duration-300 text-[14px] font-medium">Contacts</Link>
                            <Link to="/about" className="text-white hover:text-slate-400 transition-colors duration-300 text-[14px] font-medium">About</Link>
                            <Link to="/faq" className="text-white hover:text-slate-400 transition-colors duration-300 text-[14px] font-medium">FAQ</Link>
                            <Link to="/partners" className="text-white hover:text-slate-400 transition-colors duration-300 text-[14px] font-medium">Partners</Link>
                        </div>
                    </div>

                    {/* COMPANY */}
                    <div className="flex flex-col gap-[20px]">
                        <p className="text-white font-semibold text-[20px]">Company</p>
                        <div className="flex flex-col gap-[10px]">
                            <Link to="/post-job" className="text-white hover:text-slate-400 transition-colors duration-300 text-[14px] font-medium">Post a job</Link>
                            <Link to="/talents" className="text-white hover:text-slate-400 transition-colors duration-300 text-[14px] font-medium">Search talents</Link>
                            <Link to="/company-login" className="text-white hover:text-slate-400 transition-colors duration-300 text-[14px] font-medium">Company login</Link>
                            <Link to="/company-advice" className="text-white hover:text-slate-400 transition-colors duration-300 text-[14px] font-medium">Company advice</Link>
                        </div>
                    </div>

                    {/* TALENTS */}
                    <div className="flex flex-col gap-[20px]">
                        <p className="text-white font-semibold text-[20px]">Talents</p>
                        <div className="flex flex-col gap-[10px]">
                            <Link to="/jobs" className="text-white hover:text-slate-400 transition-colors duration-300 text-[14px] font-medium">Search jobs</Link>
                            <Link to="/talent-login" className="text-white hover:text-slate-400 transition-colors duration-300 text-[14px] font-medium">Talent login</Link>
                            <Link to="/talent-advice" className="text-white hover:text-slate-400 transition-colors duration-300 text-[14px] font-medium">Talent advice</Link>
                        </div>
                    </div>

                </div>

                {/* BOTTOM */}
                <div className="w-full h-[105px] flex flex-col gap-[15px]">
                    <hr className="border-[#D2A9FF]" />

                    <div className="flex items-center justify-between">
                        <p className="text-[#E1E6F0] text-[20px] font-[300]">
                            All rights reserved 2021
                        </p>

                        <div className="flex gap-[20px] text-white text-[24px]">
                            <a href="https://instagram.com" target="_blank" className="hover:text-slate-300 ">
                                <BiLogoInstagramAlt />
                            </a>
                            <a href="https://facebook.com" target="_blank" className="hover:text-slate-300 ">
                                <FaFacebook />
                            </a>
                            <a href="https://youtube.com" target="_blank" className="hover:text-slate-300 ">
                                <FaYoutube />
                            </a>
                            <a href="https://t.me" target="_blank" className="hover:text-slate-300 ">
                                <FaTelegram />
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;