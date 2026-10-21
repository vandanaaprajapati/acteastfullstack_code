import React from "react";
// import whatWeDoImage from "../assets/image/business-model.webp"; 

const WhatWeDo = () => {
  return (
    <section className="py-10 bg-gradient-to-b from-gray-100 to-white  heading-style">
      <h2 className="text-6xl text-green-800 font-bold text-center mb-10">Our Process</h2>
      <div className="max-w-7xl mx-auto px-10">
        <img
          src=" https://api.ecrop.co/assets/acteast/image/business-model.webp"
          alt="Whatwedo"  loading="lazy"
          className="w-full h-auto rounded-lg  object-cover"
        />
      </div>
    </section>
  );
};

export default WhatWeDo;
