import React from 'react';
import { recipeData } from '../components/ProductOurCoreData.js';
import { Helmet } from 'react-helmet-async';

const RecipeAndInspiration = () => {

  return (
    <>
            <Helmet>
                <title>Act East Recipes | Northeast Superfood-Inspired Cooking</title>
                <meta name="description" content="Embrace Northeast superfood-inspired cooking with Act East Recipes. Nutritious and flavorful dishes that showcase the best of North East India’s ingredients."/>
                <link rel="canonical" href="https://acteast.co.in/recipes" />
             </Helmet>

    <div className="max-w-7xl mx-auto px-8 py-12  min-h-screen">
      <h1 className="text-4xl font-bold text-center text-green-800 mb-12 ">
        Recipe & Inspiration from North-East India
      </h1>

      {recipeData.map((item, index) => (
        <div key={index} className="mb-16">
          {/* Zigzag Layout */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center`}
          >
            {/* If index is even -> Content left, Image right */}
            {index % 2 === 0 ? (
              <>
                {/* Left Content */}
                <div className=" py-6 space-y-3" data-aos="fade-right" data-aos-duration="1000">
                  <h2
                    className={`text-4xl font-bold mb-3 justify-end heading-underline ${item.color}`} data-aos="fade-up" data-aos-duration="1000"
                  >
                    {item.state}
                  </h2>
                  <p> <strong className='text-green-800'>Signature Dish:</strong> {item.signatureDish} </p>
                  <p> <strong className='text-green-800'>Cultural Roots:</strong> {item.roots} </p>
                  <p><strong className='text-green-800'>Specialties:</strong> {item.specialties}</p>
                  <p> <strong className='text-green-800'>Unique Elements:</strong> {item.uniqueElement}</p>
                  <p className=" mt-2"><strong className='text-green-800'>Inspiration:</strong> “{item.inspiration}”</p>
                </div>

                {/* Right Image */}
                <div className="flex justify-center" data-aos="fade-up" data-aos-duration="2000">
                  <img src={item.img} alt={item.state}  loading="lazy" className="w-full h-[430px] object-cover  shadow-md shadow-lg rounded-tr-[25%]  border border-4 border-green-800" />
                </div>
              </>
            ) : (
              <>
                {/* Left Image */}
                <div className="flex justify-center" data-aos="fade-right" data-aos-duration="1500">
                  <img src={item.img} alt={item.state}  loading="lazy" className="w-full h-[430px] object-cover  rounded-bl-[25%] border shadow-md border-4 border-green-800"/>
                </div>

                {/* Right Content */}
                <div className=" py-6 space-y-3" data-aos="fade-up" data-aos-duration="2000">
                   <h2
                    className={`text-4xl font-bold mb-3 text-left heading-underline ${item.color}`} data-aos="fade-right" data-aos-duration="1000"
                  >
                    {item.state}
                  </h2>
                  <p><strong className='text-green-800'>Signature Dish:</strong> {item.signatureDish}</p>
                  <p><strong className='text-green-800'>Cultural Roots:</strong> {item.roots}</p>
                  <p><strong className='text-green-800'>Specialties:</strong> {item.specialties} </p>
                  <p><strong className='text-green-800'>Unique Elements:</strong> {item.uniqueElement}</p>
                  <p className=" mt-2 "><strong className='text-green-800'>Inspiration:</strong> “{item.inspiration}”</p>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default RecipeAndInspiration;
