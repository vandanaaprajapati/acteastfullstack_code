import React from 'react';
import { Link } from 'react-router-dom';
import {  FaEnvelope,  FaPhoneAlt,  FaFacebook,  FaInstagram,  FaLinkedin,  FaYoutube,} from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';
const Topbar = () => {
  return (
    <div className="bg-[#4D0303] text-white text-sm hidden lg:block">
      <div className="px-4 py-2">
        <div className="flex flex-wrap items-center justify-between">
          {/* Contact Info */}
          <div className="w-full md:w-auto flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-lg">
            <Link to="mailto:mail@acteast.co.in" className="flex items-center gap-2 text-white hover:text-yellow-300"  >
              <FaEnvelope className="text-[#d2ff00]" /> <span>mail@acteast.co.in</span>  </Link>
              <Link to="tel:+918097283444" className="flex items-center gap-2 text-white hover:text-yellow-300" >
              <FaPhoneAlt className="text-[#d2ff00]" /><span>+91 - 8097283444</span>
            </Link>
          </div>

          {/* Social Icons */}
          <div className="hidden md:flex items-center space-x-5 pr-8 text-2xl">
            <a
              href="https://www.facebook.com/profile.php?id=61579275965804"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              <FaFacebook />
            </a>
            <a
              href="https://x.com/ActEast_vision"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <BsTwitterX />
            </a>
            <a
              href="https://www.instagram.com/act.east/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/company/acteast/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.youtube.com/@ActEast"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-600"
            >
              <FaYoutube />
            </a>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
