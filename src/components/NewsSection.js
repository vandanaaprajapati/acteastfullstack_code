import React from "react";
import { Helmet } from 'react-helmet-async';
const newsItems = [
  {
    id: 1,
    image: "https://api.ecrop.co/assets/acteast/image/hindustan-express.webp",
    link: "https://thehindustanexpress.co.in/empowering-farmers-of-the-north-east-with-innovation-and-trust-an-mou-inspired-by-act-east-and-honble-prime-minister-narendra-modis-vision/",
  },
  {
    id: 2,
    image: "https://api.ecrop.co/assets/acteast/image/dgo-news.webp",
    link: "https://dailygossiponline.com/empowering-farmers-of-the-north-east-with-innovation-and-trust-an-mou-inspired-by-act-east-and-honble-prime-minister-narendra-modis-vision/",
  },
  {
    id: 3,
    image: "https://api.ecrop.co/assets/acteast/image/knows-that-all.webp",
    link: "https://knowthatsall.com/empowering-farmers-of-the-north-east-with-innovation-and-trust-an-mou-inspired-by-act-east-and-honble-prime-minister-narendra-modis-vision/",
  },
  {
    id: 4,
    image: "https://api.ecrop.co/assets/acteast/image/news-egal-india.webp",
    link: "https://newseagleindia.in/empowering-farmers-of-the-north-east-with-innovation-and-trust-an-mou-inspired-by-act-east-and-honble-prime-minister-narendra-modis-vision/",
  },
  {
    id: 5,
    image: "https://api.ecrop.co/assets/acteast/image/news-state-news.webp",
    link: "https://indiastatenews.co.in/empowering-farmers-of-the-north-east-with-innovation-and-trust-an-mou-inspired-by-act-east-and-honble-prime-minister-narendra-modis-vision/",
  },
  {
    id: 6,
    image: "https://api.ecrop.co/assets/acteast/image/punjab.webp",
    link: "https://panjabnewsupdate.in/empowering-farmers-of-the-north-east-with-innovation-and-trust-an-mou-inspired-by-act-east-and-honble-prime-minister-narendra-modis-vision/",
  },
];

  const transformStyles = [
  "-rotate-[10deg] translate-x-[-10px] translate-y-[20px]",
  "rotate-[10deg] translate-x-[-20px] translate-y-[70px]",
  "rotate-[13deg] translate-x-[-40px] translate-y-[5px]",
  "rotate-[5deg] translate-x-[-20px] translate-y-[20px]",
  "-rotate-[10deg] translate-x-[-30px] translate-y-[50px]",
  "rotate-[-12deg] translate-x-[-40px]",
];

const NewsSection = () => {
  return (
    <>
             <Helmet>
                <title> Act East ESG Credit Services | Empowering Farmers & Planet</title>
                <meta name="description" content="Boost sustainability with Act East’s ESG Credit Services. Support North East farmers, promote ethical farming, and drive positive environmental impact today."/>
                <link rel="canonical" href="https://acteast.co.in/gallery/latest-news" />
             </Helmet>
    
      <div className="max-w-7xl  mx-auto py-10 px-4 ">
        <h2 className="text-4xl font-bold text-center mb-24 text-red-700 underline">
          Latest News
        </h2>

        {/* ✅ ONLY SHOW ABOVE 1250px (original design) */}
        <ul className="hidden [@media(min-width:1250px)]:grid grid-cols-3 gap-6 justify-center ">
          {newsItems.map((item, index) => (
            <li
              key={item.id}
              className="relative w-full sm:w-[300px] md:w-[350px] lg:w-[400px] m-2 transition-all duration-700 group hover:z-10"
            >
              <div className="relative flex flex-col items-center">
                <div className="relative w-full cursor-pointer group-hover:z-50 transition duration-700">
                  <div
                    className={`relative transition-all duration-700 
                      ${transformStyles[index]} group-hover:rotate-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:scale-150 
                      shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.7)]
                    `}
                  >
                    <img src={item.image} alt={`News ${item.id}`} loading="lazy" className="w-full border" />
                    <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-full font-semibold text-white 
                          bg-gradient-to-r from-yellow-900 via-green-600 to-orange-500
                          hover:from-yellow-800 hover:via-green-700 hover:to-orange-600
                          transition-colors duration-300"
                      >
                   Explore
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* ✅ ONLY SHOW BELOW 1250px (clean grid) */}
        <ul className="grid [@media(min-width:1250px)]:hidden grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
          {newsItems.map((item) => (
            <li
              key={item.id}
              className="w-full overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition"
            >
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={item.image}
                  alt="News"
                  loading="lazy"
                  className="w-full h-auto object-cover"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-center text-2xl my-16">
        Our MoU is already making waves published across more than{" "}
        <strong className="text-red-600">200 media publications</strong> to transform this vision into reality.
      </p>
    </>
  );
};

  

export default NewsSection
