

// import { createContext, useContext, useState } from "react";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   // ➕ Add to cart
//   const addToCart = (product) => {
//     setCartItems((prev) => {
//       const existing = prev.find((item) => item.id === product.id);

//       if (existing) {
//         return prev.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }

//       return [...prev, { ...product, quantity: 1 }];
//     });
//   };

//   // ❌ Remove item
//   const removeFromCart = (id) => {
//     setCartItems((prev) => prev.filter((item) => item.id !== id));
//   };

//   // ➖ Decrease quantity
//   const decreaseQty = (id) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === id
//           ? { ...item, quantity: Math.max(1, item.quantity - 1) }
//           : item
//       )
//     );
//   };

//   // 🧹 Clear cart (important after payment)
//   const clearCart = () => setCartItems([]);

//   // 💰 Total price
//   const getTotal = () =>
//     cartItems.reduce(
//       (total, item) => total + item.price * item.quantity,
//       0
//     );

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         decreaseQty,
//         clearCart,
//         getTotal,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// // Hook
// export const useCart = () => useContext(CartContext);

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();
const CART_STORAGE_KEY = "acteast.cart.v1";

const readStoredCart = () => {
  try {
    const savedCart = JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) || "[]");
    if (!Array.isArray(savedCart)) return [];

    return savedCart.filter((item) => (
      item &&
      typeof item.id === "string" &&
      typeof item.name === "string" &&
      Number.isFinite(item.price) &&
      item.price >= 0 &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0
    ));
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(readStoredCart);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Keep the cart usable for this session if browser storage is unavailable.
    }
  }, [cartItems]);

  // ================= ADD TO CART =================
  const addToCart = (product, quantity = 1) => {
    const requestedQuantity = Math.max(1, Math.floor(Number(quantity) || 1));
    const stockLimit = Number.isInteger(product.stock)
      ? product.stock
      : Number.POSITIVE_INFINITY;

    if (stockLimit < 1) return;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(stockLimit, item.quantity + requestedQuantity) }
            : item
        );
      }

      return [...prev, { ...product, quantity: Math.min(stockLimit, requestedQuantity) }];
    });
  };

  // ================= REMOVE ITEM =================
  const removeFromCart = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // ================= DECREASE QTY =================
  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0) // 🔥 auto remove if 0
    );
  };

  // ================= CLEAR CART =================
  const clearCart = () => setCartItems([]);

  // ================= TOTAL PRICE =================
  const getTotal = () =>
    cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

  // ================= TOTAL ITEMS =================
  const getTotalItems = () =>
    cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        decreaseQty,
        clearCart,
        getTotal,
        getTotalItems, // 🔥 extra useful
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook
export const useCart = () => useContext(CartContext);