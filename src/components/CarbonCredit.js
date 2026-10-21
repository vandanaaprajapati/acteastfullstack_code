import React from 'react';
import { FaTree, FaSolarPanel } from "react-icons/fa";
import PageBanner from '../components/PageBanner.js';
import { Helmet } from 'react-helmet-async';

const CarbonCredit = () => {

 const serviceBg = "https://api.ecrop.co/assets/acteast/image/Acteast_Carbon-credit.webp"
      const steps = [
    {
      title: 'Emission Reduction',
      desc: 'For every ton of CO₂ reduced or captured by eco-projects, 1 carbon credit is issued.',
    },
    {
      title: 'Buying and Selling',
      desc: 'These credits are bought by businesses or individuals who need to offset their emissions.',
    },
    {
      title: 'Trading in Carbon Markets',
      desc: 'Carbon credits are traded in the global carbon market, allowing anyone to invest in environmental change.',
    },
  ];

  const initiatives = [
    "Renewable Energy Projects (Solar, Wind, Hydro)",
    "Reforestation and Afforestation Projects",
    "Sustainable Agricultural Practices",
    "Waste Management and Landfill Gas Capture",
    "Energy Efficiency Initiatives (e.g., switching to energy-saving appliances)",
  ];

const items = [
  "Get Involved - Reduce, Offset, and Earn!",
  "Plant Trees",
  "Use Renewable Energy",
  "Implement Sustainable Practices",
  "Track Your Carbon Offsets",
  "Earn Carbon Credits"
];


const step = [
  {
    title: "Assess Your Emissions",
    description: "Calculate your CO₂ emissions using our emission calculator."
  },
  {
    title: "Select a Project",
    description: "Choose a sustainability project (e.g., tree planting, renewable energy) to support."
  },
  {
    title: "Buy Carbon Credits",
    description: "Purchase carbon credits directly from the market or through trusted platforms."
  },
  {
    title: "Track Your Impact",
    description: "Monitor your credits and see how your actions are contributing to a greener world."
  }
];



  return (
    <>

             <Helmet>
                <title>Act East Carbon Credit Services | Driving Sustainable Impact</title>
                <meta name="description" content="Empower sustainable agriculture with Act East’s Carbon Credit Services. Transform farming into climate action through eco-friendly produce and strong partnerships."/>
                <link rel="canonical" href="https://acteast.co.in/services/carbon-credit" />
             </Helmet>
    <div>
        <PageBanner
        title="Carbon Credit"
        subtitle="We offer customized solutions for your needs"
        backgroundImage={serviceBg}
      />
   
    </div>
    <div className="bg-white py-12 px-4 md:px-8 max-w-7xl mx-auto">

  {/* Main Title */}
  <h1 className="text-xl md:text-2xl font-semibold text-green-900 mb-10 text-left heading-style"data-aos="fade-right" data-aos-duration="1000">
  Carbon Credits: Unlocking Sustainability and Profits for a Greener Future Carbon Credits: Empowering a Greener Future
  </h1>

  {/* Two Column Layout */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

    {/* Left Content */}
    <div>
      {/* Section: What are Carbon Credits? */}
      <div className="mb-8 ">
        <h2 className="font-bold text-start py-1 text-green-800 text-2xl heading-underline "data-aos="fade-up" data-aos-duration="800">
          What is Carbon Credits?
        </h2>
        <p className="mt-4 text-gray-700 leading-relaxed text-sm md:text-base text-justify "data-aos="fade-down" data-aos-duration="1500">
          A carbon credit is a tradable certificate or permit that represents the removal or
          reduction of one metric ton of carbon dioxide (CO₂) or its equivalent greenhouse
          gases from the atmosphere. Carbon credits are part of global efforts to reduce carbon
          emissions and are used as a tool for sustainable environmental practices. These credits
          can be bought and sold in carbon markets, allowing companies or individuals to offset
          their emissions and meet climate goals.
          <br /><br />
          With carbon credits, you can offset your emissions, support eco-friendly projects, and contribute to a greener planet — all while reaping financial benefits through trading in carbon markets.
        </p>
      </div>

      {/* Section: How Do Carbon Credits Work? */}
      <div>
        <h2 className="text-start py-1 text-green-800 text-2xl mb-3 font-bold heading-underline"data-aos="fade-right" data-aos-duration="800">
          How Do Carbon Credits Work?
        </h2>
        <p className="text-gray-700 leading-relaxed text-sm md:text-base text-justify "data-aos="fade-up" data-aos-duration="1500">
          Carbon credits allow businesses to compensate for their emissions by purchasing credits from initiatives that reduce or capture greenhouse gases. These projects can be anything from reforestation to renewable energy systems, which actively help reduce global emissions.
        </p>
      </div>
    </div>

    {/* Right Image */}
    <div>
      <img src="https://api.ecrop.co/assets/acteast/image/carbon-credit.webp"
        alt="Carbon-Credits"  loading="lazy" className="w-full h-auto rounded-lt-[25%] shadow-lg rounded-br-[25%] border" />
    </div>
  </div>
</div>

{/* ---------------------------------------section2----------------------------------------------------- */}
   <div className="max-w-7xl mx-auto px-4 py-12 hover:border hover:border-green-700 rounded-lg transition-all duration-300 hover:shadow-lg">
  <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap w-full ">

    {steps.map((step, index) => (
      <div
        key={index}  data-aos="fade-up-top" data-aos-delay={index * 600}
         className={`w-full sm:w-1/2 lg:w-1/3 py-4 px-0 
          ${index !== steps.length - 1 ? 'border-r border-gray-300' : ''}
          max-[425px]:border-none`}
      >
        <div className="text-center px-4">
          <h3 className="text-green-700 text-lg font-semibold mb-3 ">{step.title}</h3>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            {step.desc}
          </p>
        </div>
      </div>
    ))}

  </div>
</div>
{/*-------------------------------section3------------------------------------------------------- */}
  <div className="max-w-7xl mx-auto px-4 py-4 text-left">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-green-700  mb-4 heading-underline "data-aos="fade-up" data-aos-duration="1500">
        How to Earn Carbon Credits?
      </h2>

      {/* Paragraph */}
      <p className="text-gray-600 mb-8 max-w-7xl mx-auto text-sm md:text-base"data-aos="fade-up" data-aos-duration="2000">
        There are various ways to earn carbon credits, especially through activities
        that reduce or sequester CO₂ emissions. These include:
      </p>

      {/* Cards */}
      <div className="flex flex-wrap justify-between gap-4">
        {initiatives.map((item, index) => (
          <div
            key={index}
            data-aos="fade-up-right"
            data-aos-delay={index * 400}   
            data-aos-duration="1000"       
            className="flex-1 min-w-[200px] md:max-w-[18%] text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg bg-white border-[5px] border-green-600 border-double rounded-[40px] shadow-md p-4 pt-10 hover:shadow-xl transition-all w-full">
            <p className="text-gray-700 text-sm md:text-base">{item}</p>
          </div>
        ))}
      </div>

      <p className=" text-gray-600 max-w-7xl mx-auto text-sm md:text-base mt-8">
        Each of these activities can be quantified in terms of CO₂ reduction, and for every ton of CO₂ reduced, a carbon credit is earned.
      </p>
    </div>
{/* ---------------------------------------------section 4---------------------------------------------------------------- */}
  <section className="bg-white  px-4 md:px-8 lg:px-20 text-left">
      <div className="max-w-7xl mx-auto  p-6 ">
        <h2 className="text-2xl md:text-3xl font-semibold text-green-700 mb-5 heading-style">
           Why Should You Get Involved with Carbon Credits?
        </h2>
      
        <section className="bg-white py-5  max-w-8xl ">


       <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-4 py-10">
     
      <div
        className="relative bg-white border border-green-700 rounded-xl pt-12 px-6 pb-6 
        shadow-[12px_12px_5px_rgba(0,0,0,0.1)] 
        hover:shadow-[-12px_-12px_5px_rgba(0,0,0,0.1)] 
        hover:bg-[radial-gradient(ellipse_at_top,_#b3c4b5,_#ffff_70%)]
        transition-all duration-300 
        flex flex-col items-center text-center 
        border-r-4 
        hover:border-r-0 hover:border-l-4" data-aos="fade-up-top" data-aos-delay="400"
      >
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white border border-green-300 rounded-full p-8 shadow-md z-10 ">
          <FaTree size={28} className="text-green-600" />
        </div>

        <h3 className="text-lg font-semibold mb-2 mt-2 ">Environmental Impact</h3>
        <p className="text-gray-700 text-sm">
          Every carbon credit purchased helps fight climate change by reducing emissions and supporting eco-friendly projects worldwide.
        </p>
      </div>

    
      <div
        className="relative bg-white border border-green-700 rounded-xl pt-12 px-6 pb-6 
        shadow-[12px_12px_5px_rgba(0,0,0,0.1)] 
        hover:shadow-[-12px_-12px_5px_rgba(0,0,0,0.1)] 
        hover:bg-[radial-gradient(ellipse_at_top,_#b3c4b5,_#ffff_70%)]
        transition-all duration-300 
        flex flex-col items-center text-center 
        border-r-4 
        hover:border-r-0 hover:border-l-4"data-aos="fade-up-top" data-aos-delay="600" 
      >
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white border border-green-300 rounded-full p-8 shadow-md z-10">
          <FaTree size={28} className="text-green-600" />
        </div>

        <h3 className="text-lg font-semibold mb-2 mt-2 " >Compliance</h3>
        <p className="text-gray-700 text-sm">
          Businesses can use carbon credits to meet environmental regulations and sustainability goals.
        </p>
      </div>

    
      <div
        className="relative bg-white border border-green-700 rounded-xl pt-12 px-6 pb-6 
        shadow-[12px_12px_5px_rgba(0,0,0,0.1)] 
        hover:shadow-[-12px_-12px_5px_rgba(0,0,0,0.1)] 
        hover:bg-[radial-gradient(ellipse_at_top,_#b3c4b5,_#ffff_70%)]
        transition-all duration-300 
        flex flex-col items-center text-center 
        border-r-4 
        hover:border-r-0 hover:border-l-4 " data-aos="fade-up-top" data-aos-delay="800"
      >
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white border border-green-300 rounded-full p-8 shadow-md z-10">
          <FaSolarPanel size={28} className="text-green-600" />
        </div>

        <h3 className="text-lg font-semibold mb-2 mt-2">Market Growth</h3>
        <p className="text-gray-700 text-sm">
          The global carbon credit market is expanding rapidly, and businesses that adopt sustainable practices will enjoy competitive advantages.
        </p>
      </div>
    </div>


{/* -------------------------------------------------------------------------------------------------------------------------------- */}
    <div className="bg-white  max-w-7xl">
  

      <p className="text-gray-700 my-6">
      Start reducing your carbon footprint and earn carbon credits through sustainable practices. Here's how:
      </p>

     <div className="flex flex-col lg:flex-row">
      {items.map((text, index) => (
        <div
          key={index} 
          className={`
            relative flex-1 min-h-[120px] p-6 pt-10 text-center bg-gray-50 rounded-[2rem]
            border-b lg:border-b-0
            ${index !== items.length - 1 ? 'lg:border-r-2 lg:border-r-green-700' : ''}
           ${index !== 0 ? 'lg:border-l-2 lg:border-l-lime-500' : ''}
               
          `}
        >
          {/* Green Dot (except last card) */}
          {index !== items.length - 1 && (
            <div className="hidden lg:block absolute right-[-16px] top-1/2 transform -translate-y-1/2 z-10">
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-lime-200 to-green-500 border-4 border-white shadow-md"></div>
            </div>
          )}

          <p>{text}</p>
        </div>
      ))}
        </div>
    </div>
       <ul className=" list-decimal list-inside space-y-4 text-gray-800 mt-8">
      {step.map((stepss, index) => (
        <li key={index}  data-aos="fade-up" data-aos-delay={index * 400}>
          <span className="font-bold text-green-800 ">{stepss.title} :</span> {stepss.description}
        </li>
      ))}
    </ul>
    </section>
      </div>
      
    </section>

 

    </>
  );
};

export default CarbonCredit;

