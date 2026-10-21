
import React, { useEffect, useRef, useState } from "react";

const products = [
  {
    name: "King Chilli",
    image: "https://api.ecrop.co/assets/acteast/Products/Chilli.webp",
    color: "#8A0304",
    textClass: "text-custom-1",
    description:
      "Once crowned the world’s hottest Chilli, this fiery GI tagged gem packs an intense capsaicin punch 3-5% higher than most harvested at peak heat from May to October.",
  },
  {
    name: "Black Rice",
    image: "https://api.ecrop.co/assets/acteast/Products/Rice.webp",
    color: "#232D3F",
    textClass: "text-custom-2",
    description:
      "GI-certified in 2020, this aromatic, deep-purple glutinous rice is prized for its rich taste and packed with essential nutrients like vitamins, minerals, fiber, and protein.",
  },
  {
    name: "Kazi Nemu",
    image: "https://api.ecrop.co/assets/acteast/Products/Lemon.webp",
    color: "#A7CF59",
    textClass: "text-custom-3",
    description:
      "Known for its distinct aroma and superior taste, this slender, long lasting lemon is harvested twice a year and is a staple in Assamese kitchens.",
  },
  {
    name: "Queen Pineapple",
    image: "https://api.ecrop.co/assets/acteast/Products/Pineapplehscroll.webp",
    color: "#E5BA21",
    textClass: "text-custom-4",
    description:
      "GI-tagged since 2015, this golden-yellow pineapple is prized for its rich juice, perfect balance of tang and sweetness, and captivating aroma.",
  },
  {
    name: "Tezpur Litchi",
    image: "https://api.ecrop.co/assets/acteast/Products/Litchi.webp",
    color: "#EC8187",
    textClass: "text-custom-5",
    description:
      "GI-certified in 2020, these vibrant red litchis are loved for their juicy pulp, sweet flavor, and premium quality harvested at their peak in May and June.",
  },
];

export default function ProductScroll() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("up");
  const sectionsRef = useRef([]);
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Detect scroll direction
      if (currentScrollY > prevScrollY.current) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      prevScrollY.current = currentScrollY;

      // Find closest section index
      let closestIndex = 0;
      let closestDistance = Infinity;

      for (let i = 0; i < sectionsRef.current.length; i++) {
        const section = sectionsRef.current[i];
        if (!section) continue;
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(
          rect.top + rect.height / 2 - window.innerHeight / 2
        );
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      }

      setActiveIndex(closestIndex);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLast = activeIndex === products.length - 1;
  const hideHeading = isLast && scrollDirection === "down";

  return (
    <div
      style={{
        backgroundColor: products[activeIndex].color,
        transition: "background-color 0.5s ease",
      }}
      className="relative w-full min-h-screen"
    >
      {/* Sticky Heading */}
      <div
        className={`sticky lg:top-5 md:-top-10 z-30 bg-transparent text-center px-4 py-6 pt-0 md:pt-36 transition-opacity duration-500 ${
          hideHeading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <h4
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold pb-4 text-center px-4 transition-colors duration-300 ${
            products[activeIndex]?.textClass || "text-white"
          }`}
          style={{ textShadow: "0 1px 2px white" }}
        >
          Famous Crops from Various Northeastern States
        </h4>
        <p className="text-lg sm:text-base md:text-lg lg:text-2xl text-white leading-relaxed max-w-4xl mx-auto text-center px-4">
          Take a look at the different crop produce famous in different regions
          from the Northeastern states available at ActEast.
        </p>
      </div>

      {/* Sticky Viewer */}
      <div className="sticky top-[32%] z-20 flex flex-col lg:flex-row justify-between items-center px-4 sm:px-8 lg:px-16 gap-8 lg:gap-12 max-w-7xl mx-auto">
        {/* LEFT: Product Description */}
        <div className="w-full md:w-1/2 relative min-h-[200px] transition-opacity duration-700">
          {products.map((product, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={index}
                className="absolute top-1/2 left-0 -translate-y-1/2 transition-all ease-in-out px-2"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive
                    ? "translateY(-50%) translateX(0)"
                    : "translateY(-50%) translateX(-40px)",
                }}
              >
                <h4
                  className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 transition-colors duration-300 ${
                    product.textClass || "text-white" 
                  }`}
                  style={{ textShadow: "0 2px 2px white" }}
                >
                  {product.name}
                </h4>
                <p className="text-white text-base md:text-xl text-left lg:text-2xl">
                  {product.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* RIGHT: Product Image */}
        <div className="relative w-full h-[300px] sm:h-[400px] md:w-[650px] md:h-[500px]">
          {products.map((product, index) => {
            const isVisible = index <= activeIndex;
            const isActive = index === activeIndex;

            return (
              <div
                key={index}
                className="absolute top-0 left-0 w-full h-full rounded-3xl bg-center bg-contain bg-no-repeat transition-all duration-700 ease-in-out"
                style={{
                  backgroundImage: `url(${product.image})`,
                  opacity: isVisible ? 1 : 0,
                  zIndex: index,
                  transform: isActive
                    ? "translateY(0px) scale(1)"
                    : "translateY(0px) scale(0)",
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Scroll trigger sections */}
      {products.map((_, index) => (
        <div
          key={index}
          ref={(el) => (sectionsRef.current[index] = el)}
          className="h-screen"
        />
      ))}
    </div>
  );
}
