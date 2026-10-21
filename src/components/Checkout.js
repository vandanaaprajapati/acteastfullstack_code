import React, { useState } from "react";
import { FiArrowLeft, FiCreditCard, FiMapPin, FiShield } from "react-icons/fi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import CheckoutProgress from "./CheckoutProgress";
import "./Checkout.css";

const API_BASE_URL = process.env.REACT_APP_API_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://acteast.onrender.com");

const Checkout = () => {

  const {
    cartItems,
    getTotal,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [errors, setErrors] =
    useState({});
  const [paymentNotice, setPaymentNotice] = useState("");
  const [paymentNeedsSupport, setPaymentNeedsSupport] = useState(false);
  const [step, setStep] = useState("delivery");

  const [form, setForm] =
    useState({
      name: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    });

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  /* ================= VALIDATION ================= */

  const validateForm = () => {

    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name =
        "Full name is required";
    }

    if (!form.phone.trim()) {
      newErrors.phone =
        "Phone number is required";
    } else if (
      !/^[6-9]\d{9}$/.test(
        form.phone
      )
    ) {
      newErrors.phone =
        "Enter valid 10 digit number";
    }

    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email =
        "Invalid email";
    }

    if (!form.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!form.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!/^\d{6}$/.test(form.pincode.trim())) {
      newErrors.pincode = "Enter a valid 6-digit PIN code";
    }

    if (!form.address.trim()) {
      newErrors.address =
        "Address is required";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  };

  const handleContinueToPayment = (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= PAYMENT ================= */

  const handlePayment =
    async () => {

      if (
        cartItems.length === 0
      ) {
        alert("Cart is empty ❌");
        return;
      }

      try {

        setLoading(true);

        /* ================= CREATE ORDER ================= */

        const createResponse = await fetch(`${API_BASE_URL}/api/create-order`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: cartItems.map((item) => ({
              productId: item.productId,
              variantId: item.variantId,
              quantity: item.quantity,
            })),
            user: form,
          }),
        });
        const data = await createResponse.json();
        if (!createResponse.ok || !data.success) {
          throw new Error(data.message || "Could not create payment order");
        }

        /* ================= RAZORPAY OPTIONS ================= */

        const options = {

          key: data.keyId,

          amount:
            data.order.amount,

          currency: "INR",

          name:
            "Act-East Store",

          description:
            "Organic Product Purchase",

          image:
            "https://acteast.co.in/logo192.png",

          order_id:
            data.order.id,

          prefill: {
            name:
              form.name,

            email:
              form.email,

            contact:
              form.phone,
          },

          notes: {
            address:
              form.address,
          },

          theme: {
            color:
              "#16a34a",
          },

          modal: {
            ondismiss: () => setLoading(false),
          },

          /* ================= SUCCESS ================= */

          handler:
            async function (
              response
            ) {

              try {
                const verifyResponse = await fetch(`${API_BASE_URL}/api/verify-payment`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                  }),
                });
                const verification = await verifyResponse.json();

                if (verification.pending) {
                            setPaymentNeedsSupport(true);
                            setPaymentNotice(verification.message || "Payment confirmation is pending. Please do not retry yet.");
                            setLoading(false);
                            return;
                }
                          if (verifyResponse.status === 402) {
                            setPaymentNotice(verification.message || "Payment was not completed. You may retry.");
                            setLoading(false);
                            return;
                          }
                if (!verifyResponse.ok || !verification.success || verification.order?.paymentStatus !== "paid") {
                  throw new Error(verification.message || "Payment could not be confirmed");
                }

                clearCart();
                navigate("/order-sucess", {
                  state: {
                    paymentVerified: true,
                    orderId: verification.order.orderId,
                    paymentId: verification.order.paymentId,
                    amount: verification.order.amount,
                    orderStatus: verification.order.orderStatus,
                    user: verification.order.user,
                    items: verification.order.items,
                  },
                });

              } catch (err) {
                setPaymentNeedsSupport(true);
                setPaymentNotice(err.message || "Payment verification failed. Please contact support before retrying.");
                setLoading(false);
              }
            },
        };

        /* ================= ENSURE RAZORPAY SDK LOADED ================= */
        const loadRazorpay = () =>
          new Promise((resolve, reject) => {
            if (window.Razorpay) return resolve(true);
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => reject(new Error("Razorpay SDK failed to load"));
            document.body.appendChild(script);
          });

        await loadRazorpay();

        /* ================= OPEN RAZORPAY ================= */

        const rzp = new window.Razorpay(options);

        rzp.on(
          "payment.failed",
          function (
            response
          ) {
            setPaymentNeedsSupport(false);
            setPaymentNotice(response.error?.description || "Payment failed. Your cart is unchanged.");
            setLoading(false);
          }
        );

        rzp.open();

      } catch (err) {
        setPaymentNotice(err.message || "Payment could not be started. Your cart is unchanged.");
        setLoading(false);
      }
    };

  if (cartItems.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  return (

    <main className="checkout-page">
      <div className="checkout-shell">
        <div className="checkout-breadcrumb">
          <Link to="/cart"><FiArrowLeft aria-hidden="true" /> Back to cart</Link>
          <span aria-hidden="true">/</span>
          <span>Checkout</span>
        </div>
        <CheckoutProgress currentStep={step === "delivery" ? 2 : 3} />

        <header className="checkout-page-heading">
          <div>
            <p className="checkout-eyebrow">ACTEAST STORE</p>
            <h1>{step === "delivery" ? "Delivery details" : "Review & payment"}</h1>
            <p>{step === "delivery" ? "Where should we send your order?" : "Review your delivery details before paying."}</p>
          </div>
          <div className="checkout-secure-note"><FiShield aria-hidden="true" /><span>{step === "delivery" ? "Step 2 of 3" : "Step 3 of 3"}</span></div>
        </header>

        {paymentNotice && <p className="checkout-payment-alert" role="alert">{paymentNotice}</p>}

      <div className="checkout-layout">

        {step === "delivery" ? (
        <form id="checkout-delivery-form" className="checkout-delivery-panel" onSubmit={handleContinueToPayment} noValidate>

          <div className="checkout-section-heading">
            <span className="checkout-section-icon"><FiMapPin aria-hidden="true" /></span>
            <div><h2>Delivery details</h2><p>Required fields are marked with an asterisk.</p></div>
          </div>

          <div className="checkout-fields">

            {/* NAME */}

            <div>
              <label className="checkout-field-label" htmlFor="checkout-name">
                Full Name
              </label>

              <input
                id="checkout-name"
                type="text"
                name="name"
                autoComplete="name"
                maxLength={120}
                required
                value={form.name}
                onChange={
                  handleChange
                }
                placeholder="Enter full name"
                className="checkout-input"
              />

              {errors.name && (
                <p className="checkout-field-error">
                  {errors.name}
                </p>
              )}
            </div>

            {/* PHONE */}

            <div>
              <label className="checkout-field-label" htmlFor="checkout-phone">
                Phone Number
              </label>

              <input
                id="checkout-phone"
                type="tel"
                name="phone"
                autoComplete="tel-national"
                inputMode="numeric"
                maxLength={10}
                required
                value={form.phone}
                onChange={
                  handleChange
                }
                placeholder="9876543210"
                className="checkout-input"
              />

              {errors.phone && (
                <p className="checkout-field-error">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* EMAIL */}

            <div>
              <label className="checkout-field-label" htmlFor="checkout-email">
                Email <span className="checkout-optional">Optional</span>
              </label>

              <input
                id="checkout-email"
                type="email"
                name="email"
                autoComplete="email"
                value={form.email}
                onChange={
                  handleChange
                }
                placeholder="Enter email"
                className="checkout-input"
              />

              {errors.email && (
                <p className="checkout-field-error">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="checkout-field-label" htmlFor="checkout-city">
                City
              </label>

              <input
                id="checkout-city"
                type="text"
                name="city"
                autoComplete="address-level2"
                maxLength={80}
                required
                value={form.city}
                onChange={
                  handleChange
                }
                placeholder="Enter city"
                className="checkout-input"
              />

              {errors.city && (
                <p className="checkout-field-error">
                  {errors.city}
                </p>
              )}
            </div>

            <div>
              <label className="checkout-field-label" htmlFor="checkout-state">State</label>
              <input
                id="checkout-state"
                type="text"
                name="state"
                autoComplete="address-level1"
                maxLength={80}
                required
                value={form.state}
                onChange={handleChange}
                placeholder="Enter state"
                className="checkout-input"
              />
              {errors.state && <p className="checkout-field-error">{errors.state}</p>}
            </div>

            <div>
              <label className="checkout-field-label" htmlFor="checkout-pincode">PIN Code</label>
              <input
                id="checkout-pincode"
                type="text"
                name="pincode"
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={6}
                required
                value={form.pincode}
                onChange={handleChange}
                placeholder="6-digit PIN code"
                className="checkout-input"
              />
              {errors.pincode && <p className="checkout-field-error">{errors.pincode}</p>}
            </div>

          </div>

          {/* ADDRESS */}

          <div className="checkout-address-field">

            <label className="checkout-field-label" htmlFor="checkout-address">
              Full Address
            </label>

            <textarea
              id="checkout-address"
              rows="4"
              name="address"
              autoComplete="street-address"
              maxLength={500}
              required
              value={form.address}
              onChange={
                handleChange
              }
              placeholder="Enter full address"
              className="checkout-input checkout-address-input"
            />

            {errors.address && (
              <p className="checkout-field-error">
                {errors.address}
              </p>
            )}
          </div>

          <p className="checkout-shipping-disclosure">
            Shipping charges are not included in the product total. Our team will confirm delivery availability and any shipping charge before dispatch.
          </p>
        </form>
        ) : (
          <section className="checkout-delivery-panel checkout-delivery-review">
            <div className="checkout-section-heading">
              <span className="checkout-section-icon"><FiMapPin aria-hidden="true" /></span>
              <div><h2>Delivery address</h2><p>Confirm this address before continuing to payment.</p></div>
              <button className="checkout-edit-details" type="button" onClick={() => setStep("delivery")}>Edit</button>
            </div>
            <address className="checkout-address-review">
              <strong>{form.name}</strong>
              <span>{form.phone}{form.email ? ` · ${form.email}` : ""}</span>
              <span>{form.address}</span>
              <span>{form.city}, {form.state} {form.pincode}</span>
            </address>
            <p className="checkout-shipping-disclosure">
              Shipping charges are not included in the product total. Our team will confirm delivery availability and any shipping charge before dispatch.
            </p>
          </section>
        )}

        <aside className="checkout-summary">
          <div className="checkout-summary-heading">
            <div>
              <p>ORDER SUMMARY</p>
              <h2>{step === "delivery" ? "Order summary" : "Review your order"}</h2>
            </div>
            <Link to="/cart">Edit cart</Link>
          </div>

          <div className="checkout-summary-items">
            {cartItems.map((item) => (
              <div className="checkout-summary-item" key={item.id}>
                <img src={item.image} alt="" loading="lazy" />
                <div className="checkout-summary-item-info">
                  <strong>{item.name}</strong>
                  <span>{item.weight} · Qty {item.quantity}</span>
                  <small>₹{item.price} each</small>
                </div>
                <strong className="checkout-summary-line-total">₹{item.price * item.quantity}</strong>
              </div>
            ))}
          </div>

          <div className="checkout-summary-subtotal">
            <span>Product subtotal</span>
            <strong>₹{getTotal()}</strong>
          </div>
          <p className="checkout-summary-shipping">
            Shipping is not included. We will confirm availability and any shipping charge before dispatch.
          </p>
          {step === "delivery" ? (
            <>
              <p className="checkout-payment-method"><FiCreditCard aria-hidden="true" /> Online payment available at the next step</p>
              <button className="checkout-pay-button" type="submit" form="checkout-delivery-form">
                <span>Continue to payment</span>
                <span aria-hidden="true">→</span>
              </button>
            </>
          ) : (
            <>
              <p className="checkout-payment-method"><FiCreditCard aria-hidden="true" /> Online payment via Razorpay</p>
              <button
                className="checkout-pay-button"
                type="button"
                onClick={handlePayment}
                disabled={loading || paymentNeedsSupport || cartItems.length === 0}
              >
                {loading
                  ? "Processing payment..."
                  : paymentNeedsSupport
                    ? "Payment confirmation pending"
                    : `Pay product subtotal ₹${getTotal()}`}
              </button>
              <p className="checkout-secure-caption"><FiShield aria-hidden="true" /> Payment is processed securely by Razorpay.</p>
            </>
          )}
        </aside>
      </div>
      </div>
    </main>
  );
};

export default Checkout;
