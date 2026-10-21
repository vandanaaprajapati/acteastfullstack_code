import React from "react";

const PageBanner = ({ title, subtitle, backgroundImage }) => {
  return (
<div
  className="w-full h-[200px] sm:h-[300px] md:h-[400px] flex items-center justify-start bg-center bg-cover relative"
  style={{ backgroundImage: `url(${backgroundImage})` }}
>

  <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>


  <div className="relative z-10 w-full px-6 sm:px-10 md:px-16">
    <div className="text-white border-l-4 border-orange-400 pl-4 sm:pl-6">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-md "data-aos="fade-right" data-aos-duration="1500">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 text-base sm:text-lg md:text-xl drop-shadow-sm"data-aos="fade-right" data-aos-duration="2000">
          {subtitle}
        </p>
      )}
    </div>
  </div>
</div>


  );
};

export default PageBanner;
