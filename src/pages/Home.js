
import React, { useState } from "react";
// import MapComponent from "../components/MapComponent.js";
// import ProductScroll from "../components/ProductTag.js";
import VerticalScroll from "../components/VerticalScroll.js";
import Hscroll from "../components/Hscroll.js";
import GIProduct from "../components/GIProduct.js";
import { productList } from "../components/ProductOurCoreData.js"; 
import OurCoreProductDetail from "../components/OurCoreProductDetail.js"; 
import { Helmet } from 'react-helmet-async';
import NewMap from "../components/NewMap.js";

function Home() {
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [showForm] = useState(false);

  


  return (
    <>
        <Helmet>
            <title>Act East – Organic Farming Products from North East India</title>
            <meta name="description" content="Taste the purity of organic farming products from North East India. Fresh fruits and spices grown using sustainable methods, delivered across the country."/>
            <link rel="canonical" href="https://acteast.co.in/" />
         </Helmet>
      {/* Main Content */}
      <div>
        <NewMap />
        {/* <MapComponent /> */}

      {/* <Magazine /> */}

  {/* <ProductScroll /> */}
  <VerticalScroll />
        <div className="bg-gradient-to-r from-lime-200 to-rose-300">
          {!selectedSlug ? (
            <section>
              <div className="max-w-8xl mx-auto px-4 py-10">
                <h2 className="text-3xl font-bold text-center mb-10 heading-style">
                  Our Core Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6">
                  {productList.map((p, idx) => (
                    <GIProduct
                      key={idx}
                      title={p.title}
                      img={p.img}
                      loading="lazy"
                      desc={p.desc}
                      slug={p.slug}
                      onReadMore={() => setSelectedSlug(p.slug)} 
                    />
                  ))}
                </div>
              </div>
            </section>
          ) : (
            <OurCoreProductDetail onClose={() => setSelectedSlug(null)} />
          )}
        </div>

        <Hscroll />
      </div>

      {showForm && (
        <section className="bg-gray-50 py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-green-900 mb-6">
              Complete Your Newsletter Subscription
            </h3>
            <p className="text-lg text-gray-700 mb-8">
              We just need a little more information to personalize your experience.
            </p>
            <form className="space-y-4 max-w-lg mx-auto">
              <input
                type="text"
                placeholder="First Name"
                className="w-full border rounded-md px-4 py-2"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full border rounded-md px-4 py-2"
              />
              <input
                type="text"
                placeholder="Company Name"
                className="w-full border rounded-md px-4 py-2"
              />
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-6 py-2 text-white font-semibold hover:bg-indigo-500"
              >
                Submit
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  );
}

export default Home;
