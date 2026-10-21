
import React from "react";
import { SlArrowRight } from "react-icons/sl";
import { BsTwitterX } from 'react-icons/bs';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import ScrollToTopButton from "../components/ScrollToTopButton.js";
import { HiLocationMarker } from "react-icons/hi";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const backgroundImage = "https://api.ecrop.co/assets/acteast/image/Footer-bg.webp" 
export default function Footer() {
  const socials = [
    {
      name: "Facebook",
      icon: <FaFacebookF />,
      link: "https://www.facebook.com/profile.php?id=61579275965804",
      color: "text-[#1877f2]",
      hoverColor: "hover:bg-[#1877f2]",
    },
    {
      name: "Twitter",
      icon: <BsTwitterX />,
      link: "https://x.com/ActEast_vision",
      color: "text-[#1da1f2]",
      hoverColor: "hover:bg-[#1da1f2]",
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      link: "https://www.instagram.com/act.east/",
      color: "text-[#e4405f]",
      hoverColor: "hover:bg-[#e4405f]",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn />,
      link: "https://www.linkedin.com/company/acteast/",
      color: "text-[#0077b5]",
      hoverColor: "hover:bg-[#0077b5]",
    },
    {
      name: "YouTube",
      icon: <FaYoutube />,
      link: "https://www.youtube.com/@ActEast",
      color: "text-[#ff0000]",
      hoverColor: "hover:bg-[#ff0000]",
    },
  ];

  return (
    <>
      <footer className="relative overflow-hidden bg-[#f5f7f0] text-[#24352b]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center opacity-[0.07]"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-x-10 gap-y-8 px-5 py-10 sm:grid-cols-2 lg:grid-cols-12 lg:px-8 lg:py-12">
          <section className="lg:col-span-3">
            <img
              src="https://api.ecrop.co/assets/acteast/image/ActEast-Logo.webp"
              alt="Act East"
              loading="lazy"
              className="mb-4 w-48 max-w-full"
            />
            <p className="mb-5 max-w-sm text-sm leading-6 text-[#4a5a4e]">
              We are passionate about delivering the best organic products from North East India.
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="shrink-0 text-[#5b842d]" aria-hidden="true" />
                <a className="transition-colors hover:text-[#5b842d]" href="tel:+918097283444">
                  +91 8097283444
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MdEmail className="shrink-0 text-lg text-[#5b842d]" aria-hidden="true" />
                <a className="break-all transition-colors hover:text-[#5b842d]" href="mailto:mail@acteast.co.in">
                  mail@acteast.co.in
                </a>
              </li>
            </ul>
          </section>

          <section className="lg:col-span-4">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold tracking-[0.14em] text-[#304b31]">
              <HiLocationMarker className="text-xl text-[#6b922e]" aria-hidden="true" />
              CORPORATE OFFICE
            </h3>
            <address className="not-italic text-sm leading-6 text-[#4a5a4e]">
              1st Floor, NERAMAC Complex, Panjabari Road (Near Six Mile Flyover),
              Six Mile, Guwahati, Assam, PIN - 781022.
            </address>
            <p className="mt-4 flex items-center gap-3 text-sm">
              <FaPhoneAlt className="shrink-0 text-[#6b922e]" aria-hidden="true" />
              <span className="font-semibold text-[#304b31]">Customer Care</span>
              <a className="transition-colors hover:text-[#5b842d]" href="tel:+919076222432">
                +91 90762 22432
              </a>
            </p>
            <p className="mt-3 flex items-center gap-3 text-sm">
              <img
                src="https://api.ecrop.co/assets/acteast/logo/telephone-icon.webp"
                alt=""
                loading="lazy"
                className="h-5 w-5 shrink-0 object-contain"
              />
              <span className="font-semibold text-[#304b31]">Landline</span>
              <a className="transition-colors hover:text-[#5b842d]" href="tel:+913614554126">
                0361 455 4126
              </a>
            </p>
          </section>

          <nav className="lg:col-span-2" aria-label="Footer navigation">
            <h3 className="mb-4 text-sm font-bold tracking-[0.14em] text-[#304b31]">EXPLORE</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                ["About", "/about"],
                ["Product", "/product"],
                ["Services", "/services/carbon-credit"],
                ["Gallery", "/gallery/our-gallery"],
                ["Blog", "/blog"],
              ].map(([label, path]) => (
                <li key={label}>
                  <Link
                    to={path}
                    className="group inline-flex items-center gap-2 text-[#4a5a4e] transition-colors hover:text-[#5b842d]"
                  >
                    <SlArrowRight className="text-[10px] transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <section className="lg:col-span-3">
            <h3 className="mb-4 text-sm font-bold tracking-[0.14em] text-[#304b31]">FOLLOW US</h3>
            <ul className="flex flex-wrap gap-3">
              {socials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border border-[#d9e0d4] bg-white ${social.color} shadow-sm transition-all duration-200 hover:-translate-y-1 hover:text-white hover:shadow-md ${social.hoverColor} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#304b31]`}
                  >
                    <span className="text-lg">{social.icon}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="relative z-10 border-t border-[#d9e0d4]">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-4 text-center text-xs text-[#56665a] sm:flex-row sm:px-8 sm:text-left">
            <p>© {new Date().getFullYear()} Act East. All rights reserved.</p>
            <Link to="/policy" className="font-medium transition-colors hover:text-[#5b842d]">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>

      <ScrollToTopButton />
    </>
  );
}
