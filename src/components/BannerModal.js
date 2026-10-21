
import { useEffect, useState } from "react";
import banner from '../img/Acteast-social.webp';

export default function BannerModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <>
      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-40"></div>
      )}

      {/* Modal Banner */}
      {open && (
        <div
          className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 
          bg-white rounded-lg shadow-xl w-11/12 max-w-lg "
        >
          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute -top-10 -right-2 bg-black text-white font-extrabold z-50 bg-opacity-60 hover:bg-opacity-80 
                       rounded-full w-8 h-8 flex items-center justify-center text-xl"
          >
            ✕
          </button>

          {/* Banner Image wrapped in link */}
          <a href={banner} target="_blank" rel="noopener noreferrer">
            <img
              src={banner}
              alt="Banner"
              loading="lazy"
              className="w-full h-auto object-cover rounded-xl cursor-pointer"
            />
          </a>
        </div>
      )}
    </>
  );
}
