// Gallery.js
import React from "react";
import { galleryData } from "../components/ProductOurCoreData.js"; // adjust the path if necessary
import { Helmet } from 'react-helmet-async';


const Gallery = () => {
  return (
    <>
          <Helmet>
            <title>Act East Gallery | Organic Agriculture in North East India</title>
            <meta name="description" content="Discover Act East’s organic agriculture initiatives in North East India through our gallery. Experience how sustainable farming meets modern technology."/>
            <link rel="canonical" href="https://acteast.co.in/our-gallery" />
         </Helmet>

    <section className="max-w-screen-xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-6 text-red-700 underline">
        Our Gallery
      </h1>
      <h2 className="text-2xl  font-bold  mb-6 text-[#337d7d]">Active installation of eCrop takes place at DIK SAK, Sonapur, Assam </h2>
      <p className="text-lg  mb-10">Precision Grow brings eCrop to the heart of Assam. Our team is on the ground, deploying the innovative eCrop device, developed by ICAR-CTCRI and brought to farmers by us - to bring data-driven insights to Turmeric cultivation. This technology empowers local farmers with real-time monitoring and weather-integrated guidance, helping them adopt smarter practices, reduce risks, and cultivate healthier, higher-yielding crops. </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {galleryData.map(({ id, src, alt }) => (
          <div
            key={id}
            className="overflow-hidden shadow-lg"
          >
            <img src={src} alt={alt}  loading="lazy" className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"/>
          </div>
        ))}
      </div>
      <p className="font-semibold text-xl">Every installation connects tradition with technology, helping the Northeast thrive while protecting our planet.</p>
    </section>



    </>
  );
};

export default Gallery;
