import React from "react";
import { FaEye, FaBullseye } from "react-icons/fa";
const VisionMission = () => {
  const cards = [
    {
      title: "Vision",
      description:
        "To become India’s leading brand championing North East India its produce, people, and potential across national and global markets.",
      icon: <FaEye className="text-7xl text-white" />,
    },
    {
      title:"Mission",
      description:
        "To empower North East farmers and deliver their unique produce fruits, vegetables, and spices to every home, restaurant, and kitchen.",
      icon: <FaBullseye className="text-7xl text-white" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
      {cards.map((card, idx) => (
        <React.Fragment key={idx}>
          {/* First Card */}
          {idx === 0 && (
            <div className="group relative w-full bg-[#234d20] text-white rounded-lg p-8 shadow-lg overflow-hidden transition-all duration-500 hover:shadow-none" data-aos="fade-right" data-aos-duration="500">
              <div className="absolute left-0 bottom-0 w-[16px] h-full bg-gradient-to-tr from-yellow-500 to-pink-600 z-0 transition-all duration-500 group-hover:w-full"></div>
              <div className="relative z-10 flex flex-col gap-6">
                {card.icon}
                <p className="text-3xl font-bold">{card.title}</p>
                <p className="leading-relaxed text-lg text-white-300">
                  {card.description}
                </p>
              </div>
            </div>
          )}

          {/* Middle Image */}
          
          {idx === 0 && (
            <div className="flex justify-center items-center border bg-gradient-to-b from-green-700 to-[#8EC63F] rounded-xl" data-aos="fade-up" data-aos-duration="1500">
              <img src= " https://api.ecrop.co/assets/acteast/image/visionmission-01.webp" alt="Vision-Mission-Center"  loading="lazy"
               className="rounded-lg shadow-lg w-full h-full object-cover"
              />
            </div>
          )}

          {/* Second Card */}
          {idx === 1 && (
            <div className="group relative w-full bg-[#234d20] text-white rounded-lg p-8 shadow-lg overflow-hidden transition-all duration-500 hover:shadow-none "data-aos="fade-right" data-aos-duration="2000">
              <div className="absolute left-0 bottom-0 w-[16px] h-full bg-gradient-to-tr from-yellow-500 to-pink-600 z-0 transition-all duration-500 group-hover:w-full"></div>
              <div className="relative z-10 flex flex-col gap-6">
                {card.icon}
                <p className="text-3xl font-bold">{card.title}</p>
                <p className="leading-relaxed text-lg text-white-300">
                  {card.description}
                </p>
                {/* <button className="items-center px-4 py-2 font-semibold rounded-md bg-gradient-to-tr from-yellow-500 to-pink-600 text-white shadow-md transition duration-300 group-hover:bg-white group-hover:text-black group-hover:from-transparent group-hover:to-transparent">
                     <Link to='/'>Read more</Link>
                </button> */}
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default VisionMission;


