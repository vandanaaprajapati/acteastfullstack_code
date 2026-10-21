
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { Helmet } from "react-helmet-async";

Modal.setAppElement("#root");

const ContactUs = () => {
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isOtpRequested, setIsOtpRequested] = useState(false);
  const [isOtpRequesting, setIsOtpRequesting] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpValue, setOtpValue] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    domain: "acteast",
  });

  const allproduct = "https://api.ecrop.co/assets/acteast/image/allproduct-01.webp";

  const [status, setStatus] = useState({ success: false, error: null });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOtpSdkEvent = useCallback((event) => {
    if (event?.responseType === "FAILED") {
      setIsOtpRequested(false);
      setOtpError(
        event.response?.errorMessage ||
          "OTP service could not complete the request. Please try again."
      );
    }
    if (event?.responseType === "OTP_AUTO_READ" && event.response?.otp) {
      setOtpValue(String(event.response.otp));
    }
  }, []);

  // The OTPless SDK loads asynchronously; initialize it when it becomes available.
  useEffect(() => {
    const script = document.getElementById("otpless-sdk");
    let isActive = true;

    const initializeOtpSdk = () => {
      if (typeof window.OTPless !== "function") return false;
      window.OTPlessSignin = new window.OTPless(handleOtpSdkEvent);
      return true;
    };

    const handleLoad = () => {
      if (!initializeOtpSdk() && isActive) {
        setOtpError("OTP verification is unavailable. Please try again later.");
      }
    };
    const handleError = () => {
      if (isActive) {
        setOtpError("Could not load OTP verification. Please try again later.");
      }
    };

    if (!script) {
      setOtpError("OTP verification is unavailable. Please try again later.");
      return () => {
        isActive = false;
      };
    }

    if (!initializeOtpSdk()) {
      script.addEventListener("load", handleLoad);
      script.addEventListener("error", handleError);
    }

    return () => {
      isActive = false;
      script.removeEventListener("load", handleLoad);
      script.removeEventListener("error", handleError);
    };
  }, [handleOtpSdkEvent]);

  const phoneAuth = async () => {
    const phone = formData.phone;
    if (!/^\d{10}$/.test(phone)) {
      setOtpError("Enter a valid 10-digit phone number.");
      return;
    }

    if (!window.OTPlessSignin && typeof window.OTPless === "function") {
      window.OTPlessSignin = new window.OTPless(handleOtpSdkEvent);
    }

    if (!window.OTPlessSignin) {
      setOtpError("OTP service is not available right now. Please try again shortly.");
      return;
    }

    setOtpError("");
    setIsOtpRequesting(true);
    try {
      const response = await window.OTPlessSignin.initiate({
        channel: "PHONE",
        phone: phone,
        countryCode: "+91",
      });
      if (response?.success) {
        setIsOtpRequested(true);
      } else {
        setIsOtpRequested(false);
        setOtpError(
          response?.response?.errorMessage ||
            "OTP could not be sent. Please check the number and try again."
        );
      }
    } catch (error) {
      console.error("Unable to request contact form OTP.", error);
      setOtpError(
        error?.response?.data?.message ||
          error?.message ||
          "Could not send OTP. Check the phone number and try again."
      );
      setIsOtpRequested(false);
    } finally {
      setIsOtpRequesting(false);
    }
  };

  const verifyOTP = async () => {
    if (!window.OTPlessSignin) {
      setOtpError("OTP verification is unavailable. Please try again later.");
      return;
    }
    if (!otpValue.trim()) {
      setOtpError("Enter the OTP sent to your phone.");
      return;
    }

    setOtpError("");
    try {
      const response = await window.OTPlessSignin.verify({
        channel: "PHONE",
        phone: formData.phone,
        otp: otpValue.trim(),
        countryCode: "+91",
      });
      if (response?.success) {
        setIsOtpVerified(true);
      } else {
        setOtpError(
          response?.response?.errorMessage ||
            "Incorrect OTP. Please check it and try again."
        );
        setIsOtpVerified(false);
      }
    } catch (error) {
      console.error("Unable to verify contact form OTP.", error);
      setOtpError("Could not verify OTP. Please try again.");
      setIsOtpVerified(false);
    }
  };

  const handleOtpChange = (e) => {
    setOtpValue(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setIsOtpVerified(false);
      setIsOtpRequested(false);
      setIsOtpRequesting(false);
      setOtpValue("");
      setOtpError("");
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ success: false, error: null });

    if (!isOtpVerified) {
      setOtpError("Please verify the OTP before submitting the form.");
      return;
    }

    try {
      const response = await axios.post(
        "https://api.ecrop.co/api/contact/send",
        { ...formData, domain: formData.domain }
      );

      if (response.status >= 200 && response.status < 300) {
        setStatus({ success: true, error: null });
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          domain: "acteast",
        });
        setOtpValue("");
        setIsOtpVerified(false);
        setIsOtpRequested(false);
        setOtpError("");
        setModalIsOpen(true);
      } else {
        setStatus({
          success: false,
          error: `Unexpected response status: ${response.status}`,
        });
      }
    } catch (error) {
      console.error("Unable to submit contact form.", error);
      setStatus({
        error: "Something went wrong. Please try again later.",
        success: false,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Act East</title>
        <meta name="description" content="Contact Act East" />
      </Helmet>

      <main>
        <section
          id="contact"
          style={{ backgroundImage: `url(${allproduct})` }}
          className="font-merriweather py-24 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat bg-fixed"
          data-aos="fade-right"
          data-aos-duration="2500"
        >
          <div className="max-w-6xl mx-auto bg-white/20 p-6 rounded-lg">
            <div className="text-center mb-2">
              <h1
                className="text-5xl md:text-4xl font-bold mb-4 text-white text-shadow-black"
                data-aos="fade-right"
                data-aos-duration="1500"
              >
                Get in{" "}
                <span className="text-white bg-clip-text text-transparent text-shadow-black">
                  Touch
                </span>
              </h1>
                <p  className="text-white max-w-3xl mx-auto font-bold text-lg mb-4"  style={{ textShadow: "0 2px 4px black" }} data-aos="fade-up" data-aos-duration="1500" >
              Have questions or need assistance? Reach out to our team – we’re here to help you enjoy the best of Northeast produce
            </p>
                        
            </div>

            <div className="py-10">
              <div className="max-w-4xl mx-auto">
                <form
                  onSubmit={handleSubmit}
                  className="shadow-lg bg-gray-300/80 rounded-3xl p-5 md:p-20 border"
                >
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 font-bold text-lg"
                      >
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Your Name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border p-3 rounded focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 font-bold text-lg"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Your Email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border p-3 rounded focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  {/* Phone & OTP */}
                <div className="mt-4" data-aos="fade-right" data-aos-duration="1000">
                  <label htmlFor="phone" className="block mb-2 font-bold text-lg">
                    Phone <span className="text-red-900">*</span>
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="Enter your phone"
                    required
                    maxLength="10"
                    pattern="\d{10}"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border-b border-gray-400 focus:border-[#7d822e] p-2 focus:outline-none"
                  />

                  <button
                    type="button"
                    onClick={phoneAuth}
                    disabled={isOtpRequesting}
                    className="mt-2 rounded border border-green-600 bg-gray-400/40 px-4 py-2 disabled:cursor-wait disabled:opacity-60"
                  >
                    {isOtpRequesting ? "Sending OTP..." : "Request OTP"}
                  </button>

                  {isOtpRequested && (
                    <div id="otp-section" className="mt-2 flex gap-2">
                      <input
                        id="otp-input"
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        placeholder="Enter OTP"
                        value={otpValue}
                        onChange={handleOtpChange}
                        className="border border-green-600 bg-gray-400/40 px-3 py-2 rounded w-full"
                      />
                      <button
                        type="button"
                        onClick={verifyOTP}
                        className="shrink-0 bg-green-700 text-white px-4 py-2 rounded"
                      >
                        Verify OTP
                      </button>
                    </div>
                  )}
                  {otpError && (
                    <p className="mt-2 text-sm font-semibold text-red-700" role="alert">
                      {otpError}
                    </p>
                  )}
                </div>


                  {/* Message */}
                  <div className="mt-4">
                    <label
                      htmlFor="message"
                      className="block mb-2 font-bold text-lg"
                    >
                      Message *
                    </label>
                    <textarea
                      name="message"
                      rows="5"
                      placeholder="Your additional messages..."
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full border p-3 rounded focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div className="my-4">
                    {status.error && (
                      <div className="bg-red-600 text-white p-3 font-semibold rounded">
                        {status.error}
                      </div>
                    )}
                    {status.success && (
                      <div className="bg-green-500 text-white p-3 font-semibold rounded">
                        Your message has been sent. Thank you!
                      </div>
                    )}
                  </div>

                  <div className="text-center mt-6">
                    {isOtpVerified ? (
                      <button
                        type="submit"
                        className="bg-green-800 hover:bg-green-600 text-white px-6 py-3 rounded transition"
                      >
                        Send Message
                      </button>
                    ) : (
                      <p className="text-gray-900">Please verify OTP to submit the form.</p>
                    )}
                  </div>

                </form>
                    
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Success Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Success Message"
        className="bg-white p-6 rounded-lg max-w-lg w-[90%] shadow-lg z-50 mx-auto"
        overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-40"
      >
        <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
        <p>Your message has been sent successfully.</p>
        <button
          onClick={() => setModalIsOpen(false)}
          className="mt-4 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Close
        </button>
      </Modal>
    </>
  );
};

export default ContactUs;
