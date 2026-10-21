import React from 'react';


const NewMap = () => {
  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[800px] xl:h-[800px] ">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={"https://api.ecrop.co/assets/acteast/image/map/map-acteast-new.mp4"}  autoPlay  loop  muted  playsInline ></video>
    </div>
  );
};

export default NewMap;
