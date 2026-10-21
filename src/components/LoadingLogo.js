


import React, { useEffect, useState } from "react";

const LoadingLogo = ({ onComplete }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 1500); 

    return () => clearTimeout(timer);
  }, []);


  const handleTransitionEnd = () => {
    if (animate) {
      onComplete(); 
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <img
        src="https://api.ecrop.co/assets/acteast/image/acteast-outside-logo.gif"
        alt="Loading..."
        className={`transition-all duration-1000 ease-in-out ${
          animate
            ? "translate-x-[-25vw] translate-y-[-40vh] w-52"
            : "scale-100"
        }`}
        onTransitionEnd={handleTransitionEnd}
      />
    </div>
  );
};

export default LoadingLogo;
