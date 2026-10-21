
import React from "react";
import ProductScrollApI from "../components/ProductScrollApI.js";
import { Link } from "react-router-dom"; 
import { Helmet } from 'react-helmet-async';


const Product = () => {

  const imageSet1 = ["https://api.ecrop.co/assets/acteast/Products/Lakadong-11.webp","https://api.ecrop.co/assets/acteast/Products/Lakadong-12.webp"];
  const imageSet2 = [" https://api.ecrop.co/assets/acteast/Products/product_ginger-01.webp", "https://api.ecrop.co/assets/acteast/Products/product_ginger-02.webp"];
  const imageSet3 = [ "https://api.ecrop.co/assets/acteast/Products/cardamom-03.webp","https://api.ecrop.co/assets/acteast/Products/cardamom-04.webp"];
  const imageSet4 = ["https://api.ecrop.co/assets/acteast/Products/Lemon-05.webp", "https://api.ecrop.co/assets/acteast/Products/Lemon-06.webp"];
  const imageSet5 = ["https://api.ecrop.co/assets/acteast/Products/Memang-Nareng-09.webp", "https://api.ecrop.co/assets/acteast/Products/Memang-Nareng-10.webp"];
  const imageSet6 = ["https://api.ecrop.co/assets/acteast/Products/Tomato-07.webp", "https://api.ecrop.co/assets/acteast/Products/Tomato-08.webp"];

  return (
    <>
    <Helmet>
       <title> Act East Products – Authentic Agricultural Products</title>
       <meta name="description" content="Shop authentic agricultural products from North East India at Act East. Fresh fruits, vegetables & spices, harvested with care and delivered to your doorstep."/>
       <link rel="canonical" href="https://acteast.co.in/product" />
    </Helmet>


  <div className=" ">
  <ProductScrollApI images={imageSet1} />
  <ProductScrollApI images={imageSet2} />
  <ProductScrollApI images={imageSet3} />
  <ProductScrollApI images={imageSet5} />
  <ProductScrollApI images={imageSet4} />
  <ProductScrollApI images={imageSet6} />

  {/* Centered Gradient Button */}
  <div className="flex justify-center my-8">
    <Link
      to="/shop"
      className="bg-gradient-to-r from-orange-500 to-green-600 text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 transition duration-300"
    >
      Explore All
    </Link>
  </div>
</div>

  </>
  );
};

export default Product;
