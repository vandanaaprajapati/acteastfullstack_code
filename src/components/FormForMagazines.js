

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const FormForMagazines = ({ isOpen, onClose }) => {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [errors, setErrors] = useState({});
//   const [submitted, setSubmitted] = useState(false);
//   const [status, setStatus] = useState(null);

//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "auto";
//     return () => (document.body.style.overflow = "auto");
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const validate = () => {
//     const newErrors = {};
//     if (!fullName.trim()) {
//       newErrors.fullName = "Full name is required";
//     } else if (!/^[a-zA-Z\s]+$/.test(fullName.trim())) {
//       newErrors.fullName = "Full name must contain only letters";
//     }
//     if (!email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = "Invalid email address";
//     }
//     if (!mobile.trim()) {
//       newErrors.mobile = "Mobile number is required";
//     } else if (!/^\d{10}$/.test(mobile)) {
//       newErrors.mobile = "Mobile number must be exactly 10 digits";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validate()) {
//       const formData = { fullName, email, mobile, timestamp: Date.now() };
//       try {
//         const response = await axios.post(
//           "https://api.ecrop.co/api/contact/send",
//           { ...formData, domain: "acteast-magazines" }
//         );

//         if (response.status === 200) {
//           setStatus({ success: true, error: null });
//           setSubmitted(true);
//           setFullName("");
//           setEmail("");
//           setMobile("");

    
//         } else {
//           setStatus({
//             success: false,
//             error: `Unexpected response status: ${response.status}`,
//           });
//         }
//       } catch (error) {
//         setStatus({
//           error: "Something went wrong. Please try again later.",
//           success: false,
//         });
//       }
//     }
//   };

//   return (
   

//     <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm overflow-y-auto">
//   {/* Modal Box */}
//   <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md p-8 font-sans mx-4 my-10">
//     <button
//       onClick={onClose}
//       className="absolute top-4 right-4 text-gray-400 hover:text-red-600 text-3xl font-semibold leading-none"
//       aria-label="Close form"
//     >
//       &times;
//     </button>

//     {!submitted && (
//       <h4 className="text-3xl font-bold mb-6 text-center text-lime-900">
//         Fill the form to view the magazine
//       </h4>
//     )}

//     {!submitted ? (
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label
//             htmlFor="fullName"
//             className="block text-gray-700 font-medium mb-2"
//           >
//             Full Name
//           </label>
//           <input
//             id="fullName"
//             type="text"
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//             placeholder="Enter your full name"
//             className={`w-full border border-gray-300 rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
//               errors.fullName ? "border-red-500" : ""
//             }`}
//           />
//           {errors.fullName && (
//             <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
//           )}
//         </div>

//         <div>
//           <label
//             htmlFor="email"
//             className="block text-gray-700 font-medium mb-2"
//           >
//             Email
//           </label>
//           <input
//             id="email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             className={`w-full border border-gray-300 rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
//               errors.email ? "border-red-500" : ""
//             }`}
//           />
//           {errors.email && (
//             <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//           )}
//         </div>

//         <div>
//           <label
//             htmlFor="mobile"
//             className="block text-gray-700 font-medium mb-2"
//           >
//             Mobile Number
//           </label>
//           <input
//             id="mobile"
//             type="text"
//             value={mobile}
//             onChange={(e) => setMobile(e.target.value)}
//             placeholder="Enter mobile number"
//             maxLength={10}
//             className={`w-full border border-gray-300 rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
//               errors.mobile ? "border-red-500" : ""
//             }`}
//           />
//           {errors.mobile && (
//             <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
//           )}
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-semibold py-3 rounded-lg hover:from-indigo-600 hover:to-indigo-800 transition"
//         >
//           Submit
//         </button>
//       </form>
//     ) : (
//       <div className="text-center bg-gradient-to-b from-white to-indigo-50 rounded-xl p-8 shadow-md border border-indigo-200">
//         <div className="flex justify-center mb-4">
//           <span className="text-5xl">🎉</span>
//         </div>
//         <h2 className="text-2xl font-bold text-green-600 mb-3">
//           ✅ Form Submitted Successfully!
//         </h2>
//         <p className="text-gray-700 text-lg mb-6">
//           Thank you for your interest! Your magazine is ready to download.
//         </p>

//         <a
//           href="https://api.ecrop.co/assets/acteast/magazines/glorifying-the-hidden-treasures-of-the-northeast.pdf"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="inline-block bg-indigo-600 text-white text-lg px-2 py-3 rounded-full shadow-lg hover:bg-indigo-700 hover:scale-105 transform transition-all duration-800"
//         >
//           📥 Download Magazine
//         </a>

//         <p className="mt-4 text-sm text-gray-500 italic">
//           (Click the button above to open your magazine in a new tab)
//         </p>
//       </div>
//     )}

//     {status && status.error && (
//       <p className="text-red-600 mt-4 text-center">{status.error}</p>
//     )}
//   </div>
// </div>



//   );
// };

// export default FormForMagazines;
import React, { useState, useEffect } from "react";
import axios from "axios";

const FormForMagazines = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(fullName.trim())) {
      newErrors.fullName = "Full name must contain only letters";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
    }
    if (!mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(mobile)) {
      newErrors.mobile = "Mobile number must be exactly 10 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Custom timestamp in "DD-MM-YYYY HH:mm:ss (UTC+05:30)" format
  const getCustomTimestamp = () => {
    const now = new Date();
    const options = {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

    const dateTimeString = now.toLocaleString("en-IN", options);
    return `${dateTimeString} (UTC+05:30)`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = {
        fullName,
        email,
        mobile,
        timestamp: getCustomTimestamp(), // ✅ Custom format used here
      };
      try {
        const response = await axios.post(
          "https://api.ecrop.co/api/contact/send",
          { ...formData, domain: "acteast-magazines" }
        );

        if (response.status === 200) {
          setStatus({ success: true, error: null });
          setSubmitted(true);
          setFullName("");
          setEmail("");
          setMobile("");
        } else {
          setStatus({
            success: false,
            error: `Unexpected response status: ${response.status}`,
          });
        }
      } catch (error) {
        setStatus({
          error: "Something went wrong. Please try again later.",
          success: false,
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm overflow-y-auto">
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md p-8 font-sans mx-4 my-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-600 text-3xl font-semibold leading-none"
          aria-label="Close form"
        >
          &times;
        </button>

        {!submitted && (
          <h4 className="text-3xl font-bold mb-6 text-center text-lime-900">
            Fill the form to view the magazine
          </h4>
        )}

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="fullName"
                className="block text-gray-700 font-medium mb-2"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className={`w-full border border-gray-300 rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                  errors.fullName ? "border-red-500" : ""
                }`}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`w-full border border-gray-300 rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="mobile"
                className="block text-gray-700 font-medium mb-2"
              >
                Mobile Number
              </label>
              <input
                id="mobile"
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter mobile number"
                maxLength={10}
                className={`w-full border border-gray-300 rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                  errors.mobile ? "border-red-500" : ""
                }`}
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-semibold py-3 rounded-lg hover:from-indigo-600 hover:to-indigo-800 transition"
            >
              Submit
            </button>
          </form>
        ) : (
          <div className="text-center bg-gradient-to-b from-white to-indigo-50 rounded-xl p-8 shadow-md border border-indigo-200">
            <div className="flex justify-center mb-4">
              <span className="text-5xl">🎉</span>
            </div>
            <h2 className="text-2xl font-bold text-green-600 mb-3">
              ✅ Form Submitted Successfully!
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              Thank you for your interest! Your magazine is ready to download.
            </p>

            <a
              href="https://api.ecrop.co/assets/acteast/magazines/glorifying-the-hidden-treasures-of-the-northeast.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-indigo-600 text-white text-lg px-2 py-3 rounded-full shadow-lg hover:bg-indigo-700 hover:scale-105 transform transition-all duration-800"
            >
              📥 Download Magazine
            </a>

            <p className="mt-4 text-sm text-gray-500 italic">
              (Click the button above to open your magazine in a new tab)
            </p>
          </div>
        )}

        {status && status.error && (
          <p className="text-red-600 mt-4 text-center">{status.error}</p>
        )}
      </div>
    </div>
  );
};

export default FormForMagazines;
