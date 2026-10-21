// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const OrderSuccess = () => {
//   const navigate = useNavigate();
//   const { state } = useLocation();

//   return (
//     <div className="flex flex-col items-center justify-center h-screen text-center">
      
//       <h1 className="text-3xl font-bold text-green-600">
//         🎉 Order Placed Successfully!
//       </h1>

//       <p className="mt-3 text-gray-600">
//         Your payment has been completed.
//       </p>

//       <p className="mt-2 text-sm text-gray-500">
//         Order ID: {state?.orderId || "N/A"}
//       </p>

//       <button
//         onClick={() => navigate("/")}
//         className="mt-5 bg-green-600 text-white px-5 py-2 rounded"
//       >
//         Go to Home
//       </button>
//     </div>
//   );
// };

// export default OrderSuccess;

import React, { useEffect, useRef, useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Link } from "react-router-dom";

import {
  FaCheckCircle,
  FaShoppingBag,
  FaHome,
} from "react-icons/fa";
import CheckoutProgress from "./CheckoutProgress";
import { FiChevronDown, FiPlay } from "react-icons/fi";
import "./OrderSuccess.css";

const SUCCESS_VIDEO_URL = "https://api.ecrop.co/assets/acteast/acteast_products/Packaging%20png/successpay.mp4";
const formatPrice = (price) => new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
}).format(Number(price) || 0);

const OrderSuccess = () => {

  const navigate =
    useNavigate();

  const { state } =
    useLocation();
  const successVideoRef = useRef(null);
  const [showSoundButton, setShowSoundButton] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const paymentVerified = Boolean(state?.paymentVerified && state?.orderId);
  const needsReview = state?.orderStatus === "needs_review";

  useEffect(() => {
    const video = successVideoRef.current;
    if (!paymentVerified || !video) return undefined;

    const attemptPlayback = () => {
      video.play()
        .then(() => setShowSoundButton(false))
        .catch(() => setShowSoundButton(true));
    };

    video.addEventListener("canplay", attemptPlayback, { once: true });
    if (video.readyState >= 3) attemptPlayback();

    return () => video.removeEventListener("canplay", attemptPlayback);
  }, [paymentVerified]);

  const playWithSound = () => {
    successVideoRef.current?.play()
      .then(() => {
        setShowSoundButton(false);
        setVideoEnded(false);
      })
      .catch(() => setShowSoundButton(true));
  };

  if (!paymentVerified) {
    return (
      <main className="order-success-unverified">
        <h1>No confirmed order found</h1>
        <p>Order confirmation appears here after verified payment.</p>
        <Link to="/cart">Return to cart</Link>
      </main>
    );
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col items-center justify-center px-4 py-10">

      <div className="w-full max-w-2xl mb-6">
        <CheckoutProgress currentStep={3} />
      </div>

      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* TOP SECTION */}

        <div className="bg-green-600 py-10 px-6 text-center relative overflow-hidden">

          <div className="absolute inset-0 opacity-10">

            <div className="absolute w-40 h-40 bg-white rounded-full -top-10 -left-10"></div>

            <div className="absolute w-52 h-52 bg-white rounded-full -bottom-20 -right-16"></div>

          </div>

          <div className="relative z-10 flex flex-col items-center">
            {!videoFailed ? (
              <div className="order-success-video-wrap">
                <video
                  ref={successVideoRef}
                  className="order-success-video"
                  src={SUCCESS_VIDEO_URL}
                  autoPlay
                  playsInline
                  preload="metadata"
                  onError={() => setVideoFailed(true)}
                  onEnded={() => {
                    setVideoEnded(true);
                    setShowSoundButton(true);
                  }}
                  aria-label="ActEast order confirmation animation"
                />
                {showSoundButton && (
                  <button className="order-success-video-play" type="button" onClick={playWithSound}>
                    <FiPlay aria-hidden="true" />
                    <span>{videoEnded ? "Replay celebration" : "Play celebration with sound"}</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-full p-4 shadow-lg">
                <FaCheckCircle size={70} className="text-green-600" />
              </div>
            )}

            <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-6">
              {needsReview ? "Payment received" : "Payment successful"}
            </h1>

            <p className="text-green-100 mt-3 text-lg">
              {needsReview
                ? "Our team is confirming stock and will contact you with the order update."
                : "Your order has been placed successfully."}
            </p>

          </div>

        </div>

        {/* CONTENT */}

        <div className="p-8 md:p-10">
          <div className="order-success-details-toggle">
            <div>
              <strong>Payment confirmed</strong>
              <span>Order ID: {state.orderId}</span>
            </div>
            <button
              type="button"
              aria-expanded={showOrderDetails}
              onClick={() => setShowOrderDetails((visible) => !visible)}
            >
              <span>{showOrderDetails ? "Hide order details" : "View order details"}</span>
              <FiChevronDown className={showOrderDetails ? "is-open" : ""} aria-hidden="true" />
            </button>
          </div>

          {showOrderDetails && (
            <section className="order-success-details" aria-label="Verified order details">
              <div className="order-success-details-heading">
                <FaShoppingBag aria-hidden="true" />
                <h2>Order details</h2>
              </div>

              <dl className="order-success-detail-list">
                <div><dt>Order ID</dt><dd>{state.orderId}</dd></div>
                <div><dt>Payment ID</dt><dd>{state.paymentId || "Confirmed"}</dd></div>
                <div><dt>Payment status</dt><dd><span className="order-success-paid">Paid</span></dd></div>
                <div><dt>Order status</dt><dd>{needsReview ? "Needs stock confirmation" : "Placed"}</dd></div>
                <div><dt>Product subtotal</dt><dd>₹{formatPrice(state.amount)}</dd></div>
              </dl>

              {state.items?.length > 0 && (
                <div className="order-success-purchased-items">
                  <h3>Items</h3>
                  {state.items.map((item, index) => (
                    <div key={`${item.id || item.productId || item.name}-${index}`}>
                      <span>{item.name} · {item.weight || item.label} × {item.quantity}</span>
                      <strong>₹{formatPrice(Number(item.price) * Number(item.quantity))}</strong>
                    </div>
                  ))}
                </div>
              )}

              {state.user && (
                <div className="order-success-delivery-details">
                  <h3>Delivery address</h3>
                  <p>{state.user.name}</p>
                  <p>{state.user.address}</p>
                  <p>{[state.user.city || state.user.place, state.user.state, state.user.pincode].filter(Boolean).join(", ")}</p>
                  <p>{state.user.phone}</p>
                </div>
              )}
              <p className="order-success-tracking-note">We will share delivery updates after dispatch.</p>
            </section>
          )}

          {/* MESSAGE */}

          <div className="mt-8 text-center">

            <p className="text-gray-600 text-lg leading-relaxed">

              Thank you for shopping with{" "}

              <span className="font-bold text-green-700">

                Act-East

              </span>

              . We are preparing your fresh organic products with care 🌿

            </p>

          </div>

          {/* BUTTONS */}

          <div className="mt-10 flex flex-col sm:flex-row gap-4">

            <button
              onClick={() =>
                navigate("/")
              }
              className="flex-1 bg-green-600 hover:bg-green-700 transition-all duration-300 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg flex items-center justify-center gap-2"
            >

              <FaHome size={22} />

              Back to Home

            </button>

            <button
              onClick={() =>
                navigate("/shop")
              }
              className="flex-1 border-2 border-green-600 text-green-700 hover:bg-green-50 transition-all duration-300 py-4 rounded-2xl font-semibold text-lg"
            >

              Continue Shopping

            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default OrderSuccess;