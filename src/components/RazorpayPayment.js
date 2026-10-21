// import { useCart } from "../CartContext";

// const RazorpayPayment = () => {
//   const { getTotal } = useCart();

//   const handlePayment = () => {
//     const total = getTotal();

//     if (!total) {
//       alert("Cart is empty ❌");
//       return;
//     }

//     const options = {
//       key: "rzp_live_SjhtzX6WOGfwpA", 
//       amount: total * 100, // paise
//       currency: "INR",
//       name: "Act-East Products",
//       description: "Frontend Only Payment",

//       handler: function (response) {
//         alert("Payment Successful ✅");

//         console.log("Payment ID:", response.razorpay_payment_id);
//         console.log("Order ID:", response.razorpay_order_id);
//       },

//       theme: {
//         color: "#6e2609",
//       },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   return (
//     <button onClick={handlePayment}>
//       Pay ₹{getTotal()}
//     </button>
//   );
// };

// export default RazorpayPayment;

import { useCart } from "../CartContext";

const RazorpayPayment = () => {
  const { getTotal } = useCart();

  const handlePayment = () => {
    const total = getTotal();

    if (!total) {
      alert("Cart is empty ❌");
      return;
    }

    const options = {
      key: "rzp_test_YOUR_TEST_KEY", // USE TEST KEY

      amount: total * 100,

      currency: "INR",

      name: "Act-East Products",

      description: "Frontend Payment",

      handler: function (response) {
        alert("Payment Successful ✅");

        console.log(
          "Payment ID:",
          response.razorpay_payment_id
        );

        console.log(
          "Order ID:",
          response.razorpay_order_id
        );
      },

      modal: {
        ondismiss: function () {
          console.log("Payment popup closed");
        },
      },

      theme: {
        color: "#6e2609",
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.open();
  };

  return (
    <button onClick={handlePayment}>
      Pay ₹{getTotal()}
    </button>
  );
};

export default RazorpayPayment;