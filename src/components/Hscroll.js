
import React, { useEffect, useRef, } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import { useNavigate } from 'react-router-dom';
gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    color: "bg-gradient-to-r from-lime-200 to-rose-400",
    left: {
      state: "Assam",
      products: [
        { name: "Karbi Anglong Ginger", image: "https://api.ecrop.co/assets/acteast/Products/Ginger.webp"},
        { name: "Tezpur Litchi", image: "https://api.ecrop.co/assets/acteast/Products/Litchii.webp" },
      ],
    },
    right: {
      state: "Sikkim",
      products: [
        { name: "Dalle Khursani", image: "https://api.ecrop.co/assets/acteast/Products/Dalle-Khursani.webp" },
        { name: "Large Cardamom", image: "https://api.ecrop.co/assets/acteast/Products/large-cardamom.webp"},
      ],
    },
  },
  {
    color: "bg-gradient-to-r from-rose-400 via-pink-400 to-orange-400",
    left: {
      state: "Manipur",
      products: [
        { name: "Chak Hao Black Rice", image: "https://api.ecrop.co/assets/acteast/Products/chak-hao-black-rice.webp"},
        { name: "Kachai Lemon", image: "https://api.ecrop.co/assets/acteast/Products/kachai-lemon.webp"},
      ],
    },
    center: {
      state: "Mizoram",
      products: [{ name: "Mizo Chilli", image: "https://api.ecrop.co/assets/acteast/Products/mizo-chilli.webp"}],
    },
    right: {
      state: "Tripura",
      products: [{ name: "Queen Pineapple", image: "https://api.ecrop.co/assets/acteast/Products/Pineapple.webp"}],
    },
  },
  {
    color: "bg-gradient-to-r from-orange-400 via-amber-400 to-slate-300",
    left: {
      state: "Nagaland",
      products: [
        { name: "Naga Tree Tomato", image:"https://api.ecrop.co/assets/acteast/Products/naga tree tomato.webp"},
        { name: "Sweet Cucumber", image: "https://api.ecrop.co/assets/acteast/Products/sweet-Cucumber.webp" },
      ],
    },
    right: {
      state: "Meghalaya",
      products: [
        { name: "Memang Nareng", image: "https://api.ecrop.co/assets/acteast/Products/memong-narang.webp" },
        { name: "Khasi Mandarin", image:"https://api.ecrop.co/assets/acteast/Products/khasi-mendarin.webp" },
      ],
    },
  },
  {
    color: "bg-gradient-to-r from-slate-300 to-orange-300",
    left: {
      state: "Assam",
      products: [
        { name: "Karbi Anglong Ginger", image: "https://api.ecrop.co/assets/acteast/Products/Ginger.webp"},
        { name: "Tezpur Litchi", image: "https://api.ecrop.co/assets/acteast/Products/Litchii.webp" },
      ],
    },
    right: {
      state: "Arunachal Pradesh",
      products: [{ name: "Arunachal Orange", image: "https://api.ecrop.co/assets/acteast/Products/Arunachal-orange.webp"}],
      button: true,
    },
  },
];

const HScroll = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
   const navigate = useNavigate();

  useEffect(() => {
    const section = sectionRef.current;
    const trigger = triggerRef.current;

    const pin = gsap.to(section, {
      x: () => -(section.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: trigger,
        start: "top top",
        end: () => `+=${section.scrollWidth - window.innerWidth}`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
      },
    });

    return () => {
      if (pin.scrollTrigger) pin.scrollTrigger.kill();
      pin.kill();
    };
  }, []);

  useEffect(() => {
    gsap.utils.toArray(".product-img").forEach((img) => {
      gsap.fromTo(
        img,
        { scale: 0.6, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: img,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);
  

  return (
    <section
      ref={triggerRef}
      className="relative w-full min-h-screen overflow-hidden"
    >
      <div
        ref={sectionRef}
        className="flex h-full"
        style={{ minWidth: `${slides.length * 100}vw` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className={`panel w-screen min-h-screen flex flex-col md:flex-row items-center justify-center md:justify-between p-4 md:px-10 ${slide.color}`}>
            {/* LEFT BLOCK */}
            {slide.left && (
              <div className="w-full md:w-1/2 flex flex-col items-center space-y-4 md:space-y-6 mb-6 md:mb-0">
                <p className="text-3xl md:text-5xl font-bold  text-center drop-shadow-md">
                  {slide.left.state}
                </p>
                <div className="flex flex-wrap justify-center gap-8">
                  {slide.left.products.map((product, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div className="w-40 h-40 md:w-60 md:h-60 rounded-full border-4 border-white overflow-hidden bg-white shadow">
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          className="product-img w-full h-full object-cover"
                        />
                      </div>
                      <p className="mt-4 lg:text-xl md:text-lg font-medium text-center drop-shadow-md">
                        {product.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CENTER BLOCK */}
            {slide.center && (
              <div className="w-full md:w-1/3 flex flex-col items-center space-y-4 md:space-y-6 mb-6 md:mb-0">
                <p className="text-3xl md:text-5xl font-bold text-center drop-shadow-md">
                  {slide.center.state}
                </p>
                <div className="flex flex-wrap justify-center gap-8">
                  {slide.center.products.map((product, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div className="w-40 h-40 md:w-60 md:h-60 rounded-full border-4 border-white overflow-hidden bg-white shadow">
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          className="product-img w-full h-full object-cover"
                        />
                      </div>
                      <p className="mt-4 lg:text-xl md:text-lg  font-medium text-center drop-shadow-md">
                        {product.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RIGHT BLOCK */}
            {slide.right && (
              <div className="w-full md:w-1/2 flex flex-col items-center space-y-4 md:space-y-6 relative">
                <p className="text-3xl md:text-5xl font-bold  text-center drop-shadow-md">
                  {slide.right.state}
                </p>
                <div className="flex flex-wrap justify-center gap-8">
                  {slide.right.products.map((product, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div className="w-40 h-40 md:w-60 md:h-60 rounded-full border-4 border-white overflow-hidden bg-white shadow">
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          className="product-img w-full h-full object-cover"
                        />
                      </div>
                      <p className="mt-4 text-sm md:text-lg font-medium text-center drop-shadow-md">
                        {product.name}
                      </p>
                    </div>
                  ))}
                </div>
                    {slide?.right?.button && (
                    <button
                      onClick={() => navigate("/product")}
                      className="mt-6 md:absolute md:bottom-6 md:right-6 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
                    >
                      Know More
                    </button>
                  )}
                 </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HScroll;
