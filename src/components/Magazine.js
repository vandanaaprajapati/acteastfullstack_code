
import React, { useState } from "react";
import FormForMagazines from "./FormForMagazines.js";

const Magazine = () => {
  const magazineImg =
    "https://api.ecrop.co/assets/acteast/image/newsletter-seven-sister-25sept.webp";

  const [isModalOpen, setModalOpen] = useState(false);

  // ✅ Scroll to top before opening the form
  const openFormModal = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setModalOpen(true), 400); // small delay to ensure scroll happens first
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section
      className="relative bg-center bg-cover bg-no-repeat bg-fixed w-full flex items-center justify-center py-20 px-4"
      style={{ backgroundImage: `url(${magazineImg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto w-full bg-gradient-to-r from-[#d5f2a2] to-white rounded-lg shadow-lg p-6 md:p-10 flex flex-col lg:flex-row items-center gap-10">
        {/* Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src="https://api.ecrop.co/assets/acteast/image/September%202025%20Cover.webp"
            alt="Magazine-Cover"
            className="shadow-xl w-auto h-auto max-h-[450px] object-contain"
          />
        </div>

        {/* Text and Button */}
        <div className="w-full lg:w-3/2 space-y-6 text-black">
          <p className="lg:text-3xl md:text-4xl font-semibold italic">
            Our Special Edition On Tribute to the Northeast
          </p>

          <h2 className="text-3xl md:text-4xl font-bold leading-snug md:block hidden">
            <span className="text-orange-500">Glorifying </span>
            the Hidden <span className="text-orange-500">Treasures</span> of the{" "}
            Northeast
          </h2>

          <p className="md:text-lg leading-relaxed text-gray-800 md:block hidden">
            <strong className="text-green-700">Product Type :</strong> Magazine{" "}
            <br />
            <strong className="text-green-700">Published By :</strong> Tech Visit
            IT Private Limited <br />
            <strong className="text-green-700">Publication Month :</strong>{" "}
            September 2025 <br />
            <strong className="text-green-700">Mode :</strong> Print & Online
          </p>

          {/* ✅ VIEW PDF BUTTON */}
          <button
            type="button"
            onClick={openFormModal}
            className="group relative flex items-center gap-1 px-9 py-4 border-4 border-green-900 text-black text-lg font-bold rounded-full shadow-[0_0_0_2px_white] cursor-pointer overflow-hidden transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-white hover:bg-gradient-to-r hover:from-green-900 hover:to-orange-400 hover:text-white hover:rounded-xl active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-[-25%] w-6 fill-white z-[9] transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:left-4 group-hover:fill-[#FFFFFF]"
              viewBox="0 0 24 24"
            >
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
            </svg>
            <span className="relative z-[1] -translate-x-3 transition-all duration-[800ms] group-hover:translate-x-3">
              View PDF
            </span>
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full opacity-0 transition-all duration-[800ms] group-hover:w-[220px] group-hover:h-[220px] group-hover:opacity-100"></span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-4 w-6 fill-black z-[9] transition-all duration-[800ms] group-hover:right-[-25%] group-hover:fill-[#212121]"
              viewBox="0 0 24 24"
            >
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
            </svg>
          </button>

          {/* ✅ Modal */}
          <FormForMagazines isOpen={isModalOpen} onClose={closeModal} />
        </div>
      </div>
    </section>
  );
};

export default Magazine;
