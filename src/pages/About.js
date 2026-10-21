import React from "react";
import VisionMission from "../components/VisionMission.js";
import WhatWeDo from "../components/WhatWeDo.js";
import PageBanner from "../components/PageBanner.js";
import { Helmet } from 'react-helmet-async';

function About() {
  return (
    <>
             <Helmet>
                <title>About Act East – Organic Farming Products from North East</title>
                <meta name="description" content="Find out how Act East brings organic farming products from North East India to you. Discover farmer stories, cultural heritage, and fresh produce from Meghalaya to Mizoram."/>
                <link rel="canonical" href="https://acteast.co.in/about" />
             </Helmet>
    <div>
        <PageBanner
        title="About Us"
        subtitle="We offer customized solutions for your needs"
        backgroundImage=" https://api.ecrop.co/assets/acteast/image/aboutus.webp"
      />
<div className="max-w-7xl py-8 mx-auto">
  <h1 className=" md:text-3xl font-semibold px-4 " data-aos="fade-up" data-aos-duration="500">
    <span className="heading-style ">Act East  Unveiling the North‑East’s Hidden Harvest, Powered by eCrop</span>   
  </h1>
  <p className="text-gray-800 text-lg text-justify  mt-4 px-4 " data-aos="fade-up" data-aos-duration="2000">
    Act East is more than just a platform, it’s a celebration of North
    East India’s diverse and rich culture along with its agricultural
    produce. We provide you with the Northeast’s freshest fruits,
    vegetables, and other produce. We are putting North East India at the
    forefront to showcase its diverse culture and its extravagant crops.
    From orchards of Meghalaya to the spices of Mizoram, we share products
    and stories that may be overlooked. We are here to provide you with
    fresh produce from the North East and truly showcase the full
    potential of the region.
  </p>
</div>

     <VisionMission />
     <WhatWeDo />
    </div>
    </>
  );
}

export default About;
