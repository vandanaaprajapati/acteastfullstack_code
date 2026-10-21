import React from "react";
import { FiArrowLeft, FiMinus, FiPlus, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import CheckoutProgress from "./CheckoutProgress";
import "./Cart.css";

const formatPrice = (price) => new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
}).format(price);

const Cart = () => {
  const { cartItems, addToCart, decreaseQty, removeFromCart, getTotal } = useCart();
  const hasUnavailableItems = cartItems.some((item) => (
    Number.isInteger(item.stock) && item.quantity > item.stock
  ));

  if (cartItems.length === 0) {
    return (
      <main className="store-cart-page">
        <CheckoutProgress currentStep={1} />
        <div className="store-cart-empty">
          <span className="store-cart-empty-icon"><FiShoppingBag aria-hidden="true" /></span>
          <h1>Your cart is empty</h1>
          <p>Choose a product and pack size to add it to your cart.</p>
          <Link className="store-cart-continue" to="/shop">
            <FiArrowLeft aria-hidden="true" />
            <span>Continue shopping</span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="store-cart-page">
      <div className="store-cart-breadcrumb">
        <Link to="/shop">Products</Link>
        <span aria-hidden="true">/</span>
        <span>Cart</span>
      </div>
      <CheckoutProgress currentStep={1} />

      <header className="store-cart-heading">
        <div>
          <p className="store-cart-eyebrow">ACTEAST STORE</p>
          <h1>Your cart</h1>
        </div>
        <span className="store-cart-item-count">{cartItems.reduce((total, item) => total + item.quantity, 0)} items</span>
      </header>

      <div className="store-cart-layout">
        <section className="store-cart-items" aria-label="Cart items">
          {cartItems.map((item) => {
            const overStock = Number.isInteger(item.stock) && item.quantity > item.stock;
            return (
              <article className="store-cart-item" key={item.id}>
                <img className="store-cart-item-image" src={item.image} alt={`${item.name} ${item.weight}`} loading="lazy" />
                <div className="store-cart-item-info">
                  <h2>{item.name}</h2>
                  <p className="store-cart-item-variant">Pack size: {item.weight}</p>
                  <p className="store-cart-item-unit">₹{formatPrice(item.price)} each</p>
                  {overStock && <p className="store-cart-stock-warning">Only {item.stock} currently available. Reduce quantity to continue.</p>}
                </div>
                <div className="store-cart-item-actions">
                  <div className="store-cart-quantity" aria-label={`Quantity for ${item.name}`}>
                    <button type="button" onClick={() => decreaseQty(item.id)} aria-label={`Decrease ${item.name} quantity`}>
                      <FiMinus aria-hidden="true" />
                    </button>
                    <span aria-live="polite">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => addToCart({ ...item, quantity: 1 })}
                      disabled={Number.isInteger(item.stock) && item.quantity >= item.stock}
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      <FiPlus aria-hidden="true" />
                    </button>
                  </div>
                  <strong className="store-cart-line-total">₹{formatPrice(item.price * item.quantity)}</strong>
                  <button className="store-cart-remove" type="button" onClick={() => removeFromCart(item.id)}>
                    <FiTrash2 aria-hidden="true" />
                    <span>Remove</span>
                  </button>
                </div>
              </article>
            );
          })}
          <Link className="store-cart-continue-inline" to="/shop">
            <FiArrowLeft aria-hidden="true" />
            <span>Continue shopping</span>
          </Link>
        </section>

        <aside className="store-cart-summary" aria-label="Order summary">
          <h2>Order summary</h2>
          <div className="store-cart-summary-row">
            <span>Product subtotal</span>
            <strong>₹{formatPrice(getTotal())}</strong>
          </div>
          <div className="store-cart-shipping-note">
            Shipping charges are not included. Our team will confirm delivery availability and any shipping charge before dispatch.
          </div>
          {hasUnavailableItems && (
            <p className="store-cart-stock-warning" role="alert">Update quantities to match available stock before checkout.</p>
          )}
          <Link
            className={`store-cart-checkout${hasUnavailableItems ? " is-disabled" : ""}`}
            to={hasUnavailableItems ? "#" : "/checkout"}
            aria-disabled={hasUnavailableItems}
            onClick={(event) => {
              if (hasUnavailableItems) event.preventDefault();
            }}
          >
            <span>Continue to checkout</span>
            <span aria-hidden="true">→</span>
          </Link>
          <p className="store-cart-payment-note">Online payment via Razorpay at checkout.</p>
        </aside>
      </div>
    </main>
  );
};

export default Cart;
