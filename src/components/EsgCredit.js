import React from 'react';
import TestoCards from './TestoCards.js';
import { FaLeaf, FaUsers, FaBalanceScale } from 'react-icons/fa';
import PageBanner from '../components/PageBanner.js';
import { Helmet } from 'react-helmet-async';

const EsgCredit = () => {

  const serviceBg ="https://api.ecrop.co/assets/acteast/image/ESG.webp";

    const services = [
  {
    title: 'Environmental',
    icon: <FaLeaf size={48} />,
    description:
      'Focuses on how a company impacts or protects the environment. Examples: Carbon emissions, renewable energy use, pollution, and resource management.',
  },
  {
    title: 'Social',
    icon: <FaUsers size={48} />,
    description:
      'Deals with how a company treats people and society. Examples: Employee welfare, human rights, community engagement, diversity, and inclusion.',
  },
  {
    title: 'Governance',
    icon: <FaBalanceScale size={48} />,
    description:
      'Relates to how a company is run. Examples: Board structure, executive pay, transparency, and ethical behavior.',
  },
];


const benefits = [
  'Investor Attraction',
  'Risk Management',
  'Market Growth',
  'Competitive Edge',
];

const esgItems = [
  'Focus on Sustainability',
  'Enhance Social Impact',
  'Strengthen Governance',
  'Engage with Stakeholders',
  'Track and Report Progress',
];


const esgData = [
  {
    title: "Assess Your Current ESG Performance",
    description:
      "Start by evaluating where your business stands across all three ESG pillars.",
  },
  {
    title: "Define ESG Goals",
    description:
      "Set specific, measurable goals to improve environmental sustainability, social responsibility, and corporate governance.",
  },
  {
    title: "Develop an ESG Strategy",
    description:
      "Tailor your business operations to address these goals while complying with industry standards.",
  },
  {
    title: "Monitor and Report Progress",
    description:
      "Regularly assess and communicate your ESG performance to stakeholders and investors.",
  },
  {
    title: "Engage Stakeholders",
    description:
      "Maintain transparency and engage with employees, customers, and investors on your ESG efforts.",
  },
];
  return (
    <>

             <Helmet>
                <title> Act East ESG Credit Services | Empowering Farmers & Planet</title>
                <meta name="description" content="Boost sustainability with Act East’s ESG Credit Services. Support North East farmers, promote ethical farming, and drive positive environmental impact today."/>
                <link rel="canonical" href="https://acteast.co.in/services/esg-credit" />
             </Helmet>
    
    <div>
        <PageBanner
        title="Esg Credit"
        subtitle="We offer customized solutions for your needs"
        backgroundImage={serviceBg}
      />
   
    </div>
    <section className="px-4 py-10 md:px-10 bg-white text-gray-800 text-left">
      <div className="max-w-7xl mx-auto ">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 text-green-800 heading-style "data-aos="fade-right" data-aos-delay="1500">
          ESG: Empowering Businesses with Sustainable Growth
        </h1><br/>
        <h2 className="text-xl font-bold mb-3 heading-underline text-green-800" >
          What is ESG?
        </h2>
        <p className="text-base md:text-lg text-gray-700" data-aos="fade-up" >
          ESG (Environmental, Social, Governance) measures a company’s sustainability and societal impact.
          It’s the foundation of responsible business, balancing financial success with ethical practices.
        </p>
      </div>

     <div className="max-w-7xl mx-auto mt-16">
        <div className="grid md:grid-cols-3 gap-16">
          {services.map((service, index) => (
            <div
              key={index}  data-aos="fade-up-right" data-aos-delay={index * 600}   data-aos-duration="1000"  
              className="relative group bg-white border-t-4 border-green-700 shadow-lg p-8 flex flex-col items-center text-center overflow-hidden transition-all duration-300 rounded-br-[25%]"
            >
              {/* Anim Layer */}
    
              <div className="absolute top-0 left-0 w-full h-0 group-hover:h-full bg-gradient-to-b from-orange-500 to-green-500 transition-all duration-300 z-0"></div>

              {/* Icon */}
              <div className="relative z-10 bg-white w-20 h-20 rounded-full flex items-center justify-center mb-4 text-green-700">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="relative z-10 text-xl font-semibold mb-2 group-hover:text-white transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="relative z-10 text-sm text-gray-600 group-hover:text-white transition-colors duration-300">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>

{/* // ---------------------------------------------------------------------------section 2----------------------------------------------------------------------- */}


  <section className="max-w-7xl mx-auto text-left px-4">
      <h2 className="text-xl font-semibold mb-4 text-green-800 heading-underline">What is an ESG Score?</h2>
      <p className="text-gray-700 leading-relaxed">
        An ESG score quantifies a company's long-term exposure to environmental, social, and governance risks, which are often overlooked in traditional financial analyses. It reflects how a company manages and addresses factors like board diversity, employee safety, and energy efficiency - all of which can have significant financial implications.
      </p>
     <div className="max-w-7xl mx-auto py-6 ">
      <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4 heading-style" data-aos="fade-right"data-aos-duration="1500"  >
        Why is ESG Important for Your Business?
      </h2>
      <p className="text-gray-700 mb-6">
        By integrating ESG principles into business operations, companies not only contribute to global sustainability efforts but also unlock long-term value, build customer loyalty, and attract investors who are increasingly prioritizing responsible businesses.
      </p>
      <div className="overflow-x-auto">
        <div className="flex min-w-[620px] md:min-w-full gap-4 p-4">
          {benefits.map((benefit, index) => (
            <div
              key={index} data-aos="fade-up-right" data-aos-delay={index * 400}   data-aos-duration="1000" 
              className="
                min-w-[160px] flex-1 rounded-lg
                bg-gradient-to-r from-orange-500 to-green-500 p-[2px]
                transition-all duration-300
                hover:rounded-bl-[25%] hover:rounded-tr-[25%]
                overflow-hidden"
            >
              <div
                className="bg-white rounded-lg py-12 text-center shadow-lg transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                <p className="text-gray-800 text-lg font-semibold">{benefit}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

  </div>
</section>

{/* ---------------------------------------------------------------section 3----------------------------------------------------------------------------- */}

    <section>
        <div className="max-w-7xl mx-auto py-6 text-left px-4">
          <h2 className="text-2xl font-bold text-green-800 mb-4 heading-underline">
            How to Improve Your ESG Score
          </h2>
          <p className="text-gray-700 text-base leading-relaxed mb-4">
            Improving your ESG score requires a dedicated focus on sustainable practices and responsible governance.
            Here are five key ways to boost your ESG ratings and attract reliable investors:
          </p>
          
         <div className="flex flex-col sm:flex-row sm:divide-x sm:divide-gray-200">
            {esgItems.map((item, index) => (
              <div
                key={index} data-aos="fade-up" data-aos-delay={index * 600}   data-aos-duration="1000" 
                className={`
                  flex-1 p-6 text-center hover:border-2
                  border-b sm:border-b-0 
                  ${index !== esgItems.length - 1 ? 'sm:border-r sm:border-gray-200' : ''}
                `}
              >
                <p className="text-gray-800 font-medium hover:text-green-800">{item}</p>
              </div>
            ))}
          </div>
          
          <p className="text-gray-700 text-base leading-relaxed mt-4">
            By doing so, businesses can lower ESG risks, unlock new growth opportunities, and attract investors who want to see both financial sustainability and social responsibility in their investments.
          </p>
        </div>
    </section>

{/* -------------------------------------------------------------section 4----------------------------------------------------------------------------------*/}
<section>
  <div className="max-w-7xl mx-auto py-6 text-left px-4"> 
     <h2 className="text-2xl font-bold text-green-800 mb-4 heading-style
     
     ">Get Started with ESG: The Path to Sustainable Growth</h2>
       <p className="text-gray-700 text-base leading-relaxed mb-4">
          Starting your ESG journey is easier than you think. Here’s how you can begin:
        </p>


      <div className="w-full max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 " >
          {esgData.map((item, index) => (
            <TestoCards
              key={index}  data-aos="fade-right" data-aos-delay={index * 600}   data-aos-duration="1000" 
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
   </div>
</section>

    </>
  );
};

export default EsgCredit; 
