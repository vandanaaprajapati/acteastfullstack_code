
 import React from "react";
import Client from "./Client.js";
import { Helmet } from 'react-helmet-async';
const giftimg = [
     "https://api.ecrop.co/assets/acteast/gifting-solution/1.webp",
 "https://api.ecrop.co/assets/acteast/gifting-solution/2.webp",
    "https://api.ecrop.co/assets/acteast/gifting-solution/3.webp",
    "https://api.ecrop.co/assets/acteast/gifting-solution/4.webp",
   "https://api.ecrop.co/assets/acteast/gifting-solution/5.webp",
    "https://api.ecrop.co/assets/acteast/gifting-solution/6.webp",
       "https://api.ecrop.co/assets/acteast/gifting-solution/7.webp", 
     "https://api.ecrop.co/assets/acteast/gifting-solution/8.webp",
       "https://api.ecrop.co/assets/acteast/gifting-solution/26.webp",
   "https://api.ecrop.co/assets/acteast/gifting-solution/10.webp",
        "https://api.ecrop.co/assets/acteast/gifting-solution/11.webp",
         "https://api.ecrop.co/assets/acteast/gifting-solution/12.webp",
         "https://api.ecrop.co/assets/acteast/gifting-solution/13.webp",
         "https://api.ecrop.co/assets/acteast/gifting-solution/14.webp", 
          "https://api.ecrop.co/assets/acteast/gifting-solution/21.webp",
        "https://api.ecrop.co/assets/acteast/gifting-solution/17.webp",
            "https://api.ecrop.co/assets/acteast/gifting-solution/16.webp",
        "https://api.ecrop.co/assets/acteast/gifting-solution/18.webp",
          "https://api.ecrop.co/assets/acteast/gifting-solution/19.webp",
          "https://api.ecrop.co/assets/acteast/gifting-solution/20.webp",
        "https://api.ecrop.co/assets/acteast/gifting-solution/15.webp",
            "https://api.ecrop.co/assets/acteast/gifting-solution/22.webp",
           "https://api.ecrop.co/assets/acteast/gifting-solution/23.webp",
           "https://api.ecrop.co/assets/acteast/gifting-solution/24.webp",
              "https://api.ecrop.co/assets/acteast/gifting-solution/25.webp",
           "https://api.ecrop.co/assets/acteast/gifting-solution/9.webp",
           "https://api.ecrop.co/assets/acteast/gifting-solution/27.webp",
        "https://api.ecrop.co/assets/acteast/gifting-solution/28.webp",
          "https://api.ecrop.co/assets/acteast/gifting-solution/29.webp",
];
const bgimg ="https://api.ecrop.co/assets/acteast/gifting-solution/bg-img-gift.webp";
const GiftingSection = () => {
  return (
    <>
               <Helmet>
                    <title> Act East ESG Credit Services | Empowering Farmers & Planet</title>
                    <meta name="description" content="Boost sustainability with Act East’s ESG Credit Services. Support North East farmers, promote ethical farming, and drive positive environmental impact today."/>
                    <link rel="canonical" href="acteast.co.in/gallery/gifting-solutiont" />
                 </Helmet>
        
    
      <section
        className="w-full py-12 relative bg-cover bg-center bg-no-repeat bg-fixed "
        style={{ backgroundImage: `url(${bgimg})`,width:"full",height:"full" }}
      >
        {/* Optional overlay for better text visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-stretch gap-8 px-4 min-h-[400px] relative z-10">
          {/* Left Side Text */}
          <div className="lg:w-1/2 text-left flex flex-col justify-center">
            <h1 className="text-center  text-green-900 relative text-3xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-serif mb-8 inline-block font-semibold">
              Gifting Solutions
              <span className="block absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-brown-600 to-parrotGreen-400 rounded"></span>
            </h1>

            <p className="text-xl italic font-semibold mb-4 text-center">
              “Empowering Indigenous Farmers, Entrepreneurs & Artisans in the North Eastern Region.”
            </p>

            <p className="text-lg mb-8 text-center">
              Your Valuable Contribution Creates Sustainable Livelihoods
            </p>

            <div className="relative w-full overflow-hidden">
              <img
                src="https://api.ecrop.co/assets/acteast/gifting-solution/openersss.gif"
                alt="Gift Box with Red Ribbon"
                loading="lazy"
                className="w-full h-[150px] object-contain"
              />
            </div>
          </div>

          {/* Right Side Image */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <img
              src="https://api.ecrop.co/assets/acteast/gifting-solution/Neramac-back-page.webp"
              alt="Special Gift"
              loading="lazy"
              className="w-full h-96 object-contain hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>
    

      {/* ------------------------------------------------------------------------------GIFTING WITH A CAUSE------------------------------------------------------------ */}
      <section className="my-8 px-4 max-w-7xl mx-auto">
        <h3 className="relative text-3xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-serif text-center text-gray-800 mb-6 font-semibold text-green-900">
          Gifting with a Cause
          <span className="block absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-brown-600 to-parrotGreen-400 rounded"></span>
        </h3>
        <p className="text-lg mx-auto">
          NERAMAC promotes a promising range of exotic spices, herbs, tea, grains, and other value-added products from various Entrepreneurs of the North Eastern Region.
          This initiative benefits farmers who supply the raw material, Self Help Groups and entrepreneur start-ups.
          Corporate gifting which NERAMAC undertakes assists a wide range of beneficiaries including those mentioned above. NERAMAC thus can help esteemed organisations with an avenue to contribute positively to the region's development while aligning with Corporate Social Responsibility goals.
        </p>
      </section>

      {/* ------------------------------------------------------------------------------logo section----------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto py-12 ">
        <h4 className="relative text-3xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-serif text-center font-semibold text-green-900 mb-10">
          We Support
          <span className="block absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-brown-600 to-parrotGreen-400 rounded"></span>
        </h4>

        <div className="flex flex-wrap items-center justify-center gap-12">
          <img src="https://api.ecrop.co/assets/acteast/gifting-solution/logo-01.webp" alt="logo" loading="lazy" className="h-28 hover:scale-110 transition-transform duration-300 z-10" />
          <img src="https://api.ecrop.co/assets/acteast/gifting-solution/logo-02.webp" alt="logo" loading="lazy" className="h-28 hover:scale-110 transition-transform duration-500 z-10" />
          <img src="https://api.ecrop.co/assets/acteast/gifting-solution/logo-03.webp" alt="logo" loading="lazy" className="h-28 hover:scale-110 transition-transform duration-500 z-10" />
          <img src="https://api.ecrop.co/assets/acteast/gifting-solution/logo-04.webp" alt="logo" loading="lazy" className="h-28 hover:scale-110 transition-transform duration-300 z-10" />
          <img src="https://api.ecrop.co/assets/acteast/gifting-solution/logo-05.webp" alt="logo" loading="lazy" className="h-28 hover:scale-110 transition-transform duration-300 z-10" />
          <img src="https://api.ecrop.co/assets/acteast/gifting-solution/logo-06.webp" alt="logo" loading="lazy" className="h-28 hover:scale-110 transition-transform duration-300 z-10" />
          <img src="https://api.ecrop.co/assets/acteast/gifting-solution/logo-07.webp" alt="logo" loading="lazy" className="h-28 hover:scale-110 transition-transform duration-300 z-10" />
        </div>
      </section>
  </section>
      {/* ------------------------------------------------------------------------------gifting product section----------------------------------------------------------- */}
      <section className="p-4 min-h-screen">
        <div className="flex flex-wrap gap-2 md:grid md:grid-cols-5 md:gap-4 md:auto-rows-[280px]">
          {giftimg.map((src, idx) => {
            const rowIndex = Math.floor(idx / 5);
            const positionInRow = idx % 5;

            let colSpanClass = "col-span-1";
            let rowSpanClass = "row-span-1";

            if (rowIndex % 2 === 0) {
              if (positionInRow === 4) {
                rowSpanClass = "row-span-2";
              }
            } else {
              if (positionInRow === 0) {
                rowSpanClass = "row-span-2";
              }
            }

            return (
              <div
                key={idx}
                className={`${colSpanClass} ${rowSpanClass} border-4 border-red-900 rounded-xl overflow-hidden`}
              >
                <img
                  src={src}
                  alt={`Gift ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-md transition-transform duration-300 hover:scale-110"
                  draggable={false}
                />
              </div>
            );
          })}
        </div>
      </section>

             {/* -----------------------------------------------------------------------------our client---------------------------------------------------------- */}

             <Client />
    </>
  );
};

export default GiftingSection;
