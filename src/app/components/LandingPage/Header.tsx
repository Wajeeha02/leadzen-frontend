"use client";

import { FC, useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

// Define props with an optional `textColor` prop
interface HeaderProps {
  textColor?: string; // 'text-white' for HeroSection, 'text-blue-500' for other sections
}

const Header: FC<HeaderProps> = ({ textColor = 'text-white' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <div className="h-[1rem] sm:h-[1.5rem] md:h-[2rem] lg:h-[1.2rem] flex items-center justify-between p-8 sm:p-10 md:p-14 lg:p-12 pt-10 scroll-smooth">
      <div className="lg:hidden md:hidden flex items-center">
        <button onClick={toggleMenu} className={`${textColor} focus:outline-none`}>
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      <div className="hidden lg:flex md:flex font-poppins py-4">
        <nav className="flex space-x-2 sm:space-x-4 md:space-x-8 lg:space-x-20 ml-[0.25rem] sm:ml-[1.75rem] md:ml-[2rem] lg:ml-16 2xl:ml-96">
          <a href="/" className={`${textColor} font-medium lg:text-[1rem] sm:text-sm md:text-lg`}>Home</a>
          <a href="/about" className={`${textColor} font-medium lg:text-[1rem] sm:text-sm md:text-lg`}>About</a>
          <a href="/dashboard" className={`${textColor} font-medium lg:text-[1rem] sm:text-sm md:text-lg`}>Dashboard</a>
          <a href="/blog" className={`${textColor} font-medium lg:text-[1rem] sm:text-sm md:text-lg`}>Blogs</a>
          <a href="/demo" className={`${textColor} font-medium lg:text-[1rem] sm:text-sm md:text-lg`}>Demo</a>
          <a href="/contact" className={`${textColor} font-medium lg:text-[1rem] sm:text-sm md:text-lg`}>Contact Us</a>
          <a href="/login" className={`${textColor} font-medium lg:text-[1rem] sm:text-sm md:text-lg bg-lightblue lg:w-[6rem] rounded-full pl-6`}>LogIn</a>
        </nav>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden md:hidden fixed inset-0 top-[4rem] left-0 w-full bg-bluedark bg-opacity-95 text-white z-10 scroll-smooth">
          <nav className="flex flex-col items-center space-y-4 py-4" onClick={closeMenu}>
            <a href="/" className={`${textColor} text-lg font-medium`}>Home</a>
            <a href="/about" className={`${textColor} text-lg font-medium`}>About</a>
            <a href="/dashboard" className={`${textColor} font-medium lg:text-[1rem] sm:text-sm md:text-lg`}>Dashboard</a>
            <a href="/blog" className={`${textColor} text-lg font-medium`}>Blogs</a>
            <a href="/demo" className={`${textColor} text-lg font-medium`}>Demo</a>
            <a href="/contact" className={`${textColor} text-lg font-medium`}>Contact Us</a>
            <a href="/login" className={`${textColor} text-lg font-medium`}>LogIn</a>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Header;
