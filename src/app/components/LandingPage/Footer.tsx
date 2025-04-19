import Image from "next/image";
import { FC } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import gmailIcon from "../../assets/svgs/landingpage/gmailIcon.svg"; // Adjust the path as needed
import LeadZenLogo from "../../assets/svgs/landingpage/leadzen.svg";
import phoneIcon from "../../assets/svgs/landingpage/phoneIcon.svg";

const Footer: FC = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-12 font-poppins">
      <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-8 lg:space-y-0 lg:p-8">
        <div className="flex flex-col items-center lg:items-start space-y-2">
          <div className="mb-4 mt-4">
            <Image src={LeadZenLogo} className="w-[12rem] sm:w-[15rem]" alt="Logo" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:pl-10 lg:gap-y-6 pt-8 pl-4 2xl:space-x-32">
          <div className="space-y-2 sm:space-y-4 2xl:pl-10">
          <a href="/home" className="block text-black text-xs sm:text-sm lg:text-base font-medium">
              About Us
            </a>
            <a href="/about" className="block text-black text-xs sm:text-sm lg:text-base font-medium">
              About Us
            </a>
            <a href="/dashboard" className="block text-black text-xs sm:text-sm lg:text-base font-medium">
              Dashboard
            </a>
          </div>
          <div className="space-y-2 sm:space-y-4">
          <a href="/demo" className="block text-black text-xs sm:text-sm lg:text-base font-medium">
              Demo
            </a>
            <a href="/blog" className="block text-black text-xs sm:text-sm lg:text-base font-medium">
              Blogs
            </a>
            <a href="/contact" className="block text-black text-xs sm:text-sm lg:text-base font-medium">
              Contact Us
            </a>
          </div>
          <div>
            <div className="flex items-center space-x-2 leading-10 mb-4">
              <Image
                src={gmailIcon}
                alt="Gmail Icon"
                className="w-[1.25rem] h-[1.25rem] sm:w-[1.5rem] sm:h-[1.5rem]"
              />
              <span className="text-black text-sm sm:text-base font-medium">leadzen@gmail.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Image
                src={phoneIcon}
                alt="Phone Icon"
                className="w-[1.25rem] h-[1.25rem] sm:w-[1.5rem] sm:h-[1.5rem]"
              />
              <span className="text-black text-sm sm:text-base font-medium">+1 234 456 678 89</span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center text-black font-semibold border-t border-gray-300 pt-8">
        <div className="flex justify-center space-x-4 mb-4">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-lightblue">
            <FaInstagram className="w-8 h-8" />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-lightblue">
            <FaFacebookF className="w-8 h-8" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-lightblue">
            <FaLinkedinIn className="w-8 h-8" />
          </a>
        </div>
        <p className="text-xs sm:text-sm lg:text-base mt-2">
          Copyright 2024 LeadZen. All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
