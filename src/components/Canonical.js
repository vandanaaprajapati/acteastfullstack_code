import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Canonical = () => {
  const location = useLocation(); 

  useEffect(() => {

    const canonicalUrl = `https://acteast.co.in${location.pathname}`;
    
    
    let linkElement = document.querySelector("link[rel='canonical']");

    if (linkElement) {
     
      linkElement.href = canonicalUrl;
    } else {
  
      linkElement = document.createElement("link");
      linkElement.rel = "canonical";
      linkElement.href = canonicalUrl;
      document.head.appendChild(linkElement);
    }
  }, [location.pathname]); 

  return null; 
};

export default Canonical;
