import React from "react";

const clientsData = [
  null,
  { name: "Agriculture and precessed food", image: "https://api.ecrop.co/assets/acteast/gifting-solution/Agriculture-and-precessed-food.webp "},
  null,
  { name: "Indian Oil", image: "https://api.ecrop.co/assets/acteast/gifting-solution/Indian-Oil.webp",},
  { name: "Bank of India", image:" https://api.ecrop.co/assets/acteast/gifting-solution/Bank-of-India.webp" },
  { name: "Kendriya bhandar nigam", image: " https://api.ecrop.co/assets/acteast/gifting-solution/Kendriya-bhandar-nigam.webp"  },
  { name: "National Bank", image: " https://api.ecrop.co/assets/acteast/gifting-solution/National-Bank.webp" },
  { name: "ministry of development", image: " https://api.ecrop.co/assets/acteast/gifting-solution/ministry-of-development.webp"  },
  { name: "North eastern council", image: " https://api.ecrop.co/assets/acteast/gifting-solution/North-eastern-council.webp"  },
   null,
  { name: "PHD Chamber", image: " https://api.ecrop.co/assets/acteast/gifting-solution/PHD-Chamber.webp" },
   null,
];

const Client = () => {
  return (
    <div className=" py-12 px-4 sm:px-8 lg:px-16 text-center">
   <h3 className="text-green-900 relative text-3xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-serif mb-16 inline-block font-semibold">
     Our Clients
     <span className="block absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-brown-600 to-parrotGreen-400 rounded"></span>
     </h3>
{/* 📱 desktop Card Layout */}
<div className="hidden lg:grid md:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
  {clientsData.map((client, index) => {
    const isFirstRow = index < 3;
    const isFirstColumn = index % 3 === 0;
    const isLastColumn = index % 3 === 2;
    const totalItems = clientsData.length;
    const lastRowStart = totalItems - (totalItems % 3 || 3);
    const isLastRow = index >= lastRowStart;

    return (
      <div
        key={index}
        className={`
          flex justify-center items-center p-2 h-40 border border-gray-300
          ${isFirstRow ? 'border-t-0' : ''}
          ${isFirstColumn ? 'border-l-0' : ''}
          ${isLastColumn ? 'border-r-0' : ''}
          ${isLastRow ? 'border-b-0' : ''}
        `}
      >
          {client ? (
          <img
            src={client.image}
            alt={client.name}
            loading="lazy"
            className="h-16 sm:h-20 object-cover"
          />
        ) : null}
      </div>
    );
  })}
</div>

{/* 📱 Mobile Card Layout */}
      <div className="flex flex-wrap lg:hidden gap-4 justify-center mt-6">
        {clientsData.map((client, index) => {
          if (!client) return null;

          return (
            <div key={index} className="w-full sm:w-1/2 px-4 py-6 flex justify-center items-center border border-gray-300 rounded-md shadow-sm bg-white">
              <img src={client.image} alt={client.name} loading="lazy" className="h-16 sm:h-20 object-contain"
              />
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default Client;
