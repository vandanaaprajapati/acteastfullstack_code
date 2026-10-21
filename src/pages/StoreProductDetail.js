import React, { useEffect, useState } from "react";
import { FiArrowLeft, FiCheck, FiCreditCard, FiImage, FiMapPin, FiMinus, FiPlus, FiShoppingBag, FiTruck } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../components/CartContext";
import { ADMIN_API_BASE_URL } from "./admin/adminApi";
import "./StoreProductDetail.css";

const formatPrice = (price) => new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
}).format(price);

const StoreProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedVariantId, setSelectedVariantId] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageFailed, setImageFailed] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");

    fetch(`${ADMIN_API_BASE_URL}/api/products/${id}`)
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok || !result.success) {
          throw new Error(result.message || "Product could not be loaded");
        }
        if (active) {
          setProduct(result.product);
          setSelectedVariantId("");
          setSelectedImage("");
          setQuantity(1);
        }
      })
      .catch((loadError) => {
        if (active) {
          setError(loadError.message === "Failed to fetch"
            ? "Could not reach the store. Please try again."
            : loadError.message);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  const selectedVariant = product?.variants.find(
    (variant) => String(variant._id || variant.label) === selectedVariantId
  ) || product?.variants[0];

  const galleryImages = product
    ? [...new Set([
        selectedVariant?.image,
        ...(product.galleryImages || []),
        product.image,
      ].filter(Boolean))]
    : [];

  const currentImage = galleryImages.includes(selectedImage)
    ? selectedImage
    : galleryImages[0] || "";

  useEffect(() => {
    setImageFailed(false);
  }, [currentImage]);

  const chooseVariant = (variant) => {
    setSelectedVariantId(String(variant._id || variant.label));
    setSelectedImage(variant.image || product.image);
    setQuantity(1);
    setAdded(false);
  };

  const handleAddToCart = () => {
    if (!product || !selectedVariant || selectedVariant.stock < 1) return;

    addToCart({
      id: `${product._id}:${selectedVariant._id || selectedVariant.label}`,
      productId: product._id,
      variantId: selectedVariant._id,
      name: product.name,
      image: selectedVariant.image || currentImage || product.image,
      weight: selectedVariant.label,
      price: selectedVariant.price,
      category: product.category,
      stock: selectedVariant.stock,
    }, quantity);
    setAdded(true);
  };

  if (loading) {
    return <main className="store-detail-state">Loading product...</main>;
  }

  if (error || !product || !selectedVariant) {
    return (
      <main className="store-detail-state">
        <p>{error || "Product not found"}</p>
        <Link to="/shop" className="store-detail-back-link">
          <FiArrowLeft aria-hidden="true" /> Back to products
        </Link>
      </main>
    );
  }

  const isOutOfStock = selectedVariant.stock < 1;
  const isLowStock = selectedVariant.stock > 0 && selectedVariant.stock < 5;

  return (
    <main className="store-detail-page">
      <div className="store-detail-breadcrumb">
        <Link to="/shop" state={{ category: product.category }}>Products</Link>
        <span aria-hidden="true">/</span>
        <span>{product.name}</span>
      </div>

      <div className="store-detail-layout">
        <section className="store-detail-gallery" aria-label={`${product.name} images`}>
          <div className="store-detail-main-image">
            {currentImage && !imageFailed ? (
              <img
                src={currentImage}
                alt={`${product.name} ${selectedVariant.label}`}
                fetchPriority="high"
                onError={() => setImageFailed(true)}
              />
            ) : (
              <div className="store-detail-image-fallback">
                <FiImage aria-hidden="true" />
                <span>{product.name}</span>
              </div>
            )}
            {isLowStock && <span className="store-detail-image-badge">Only {selectedVariant.stock} left</span>}
          </div>

          {galleryImages.length > 1 && (
            <div className="store-detail-thumbnails" aria-label="Choose product image">
              {galleryImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  className={`store-detail-thumbnail${currentImage === image ? " is-selected" : ""}`}
                  onClick={() => setSelectedImage(image)}
                  aria-label={`Show product image ${index + 1}`}
                  aria-pressed={currentImage === image}
                >
                  <img src={image} alt="" loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          )}
          <p className="store-detail-image-count">{galleryImages.length} product {galleryImages.length === 1 ? "image" : "images"}</p>
        </section>

        <section className="store-detail-info">
          <p className="store-detail-category">{product.category.replace(/-/g, " ")}</p>
          <h1>{product.name}</h1>
          <div className="store-detail-price" aria-live="polite">
            <strong>₹{formatPrice(selectedVariant.price)}</strong>
            <span>per {selectedVariant.label}</span>
          </div>

          <div className="store-detail-divider" />

          {product.variants.length > 1 && (
            <fieldset className="store-detail-variants">
              <legend>Choose pack size</legend>
              <div className="store-detail-variant-list">
                {product.variants.map((variant) => {
                  const variantId = String(variant._id || variant.label);
                  const selected = variantId === String(selectedVariant._id || selectedVariant.label);
                  const availability = variant.stock < 1
                    ? "Out of stock"
                    : variant.stock < 5
                      ? `Only ${variant.stock} left`
                      : "Available";

                  return (
                    <button
                      key={variantId}
                      className={`store-detail-variant${selected ? " is-selected" : ""}`}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => chooseVariant(variant)}
                    >
                      <span>{variant.label}</span>
                      <strong>₹{formatPrice(variant.price)}</strong>
                      <small>{availability}</small>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}

          <div className={`store-detail-availability${isOutOfStock ? " is-out" : isLowStock ? " is-low" : ""}`} role="status">
            {isOutOfStock ? "Currently unavailable" : isLowStock ? `Only ${selectedVariant.stock} left in this size` : "In stock"}
          </div>

          {!isOutOfStock && (
            <div className="store-detail-purchase-row">
              <div className="store-detail-quantity" aria-label="Quantity">
                <button type="button" onClick={() => setQuantity((current) => Math.max(1, current - 1))} aria-label="Decrease quantity">
                  <FiMinus aria-hidden="true" />
                </button>
                <span aria-live="polite">{quantity}</span>
                <button type="button" onClick={() => setQuantity((current) => Math.min(selectedVariant.stock, current + 1))} aria-label="Increase quantity" disabled={quantity >= selectedVariant.stock}>
                  <FiPlus aria-hidden="true" />
                </button>
              </div>
              <button className="store-detail-add-button" type="button" onClick={handleAddToCart}>
                {added ? <FiCheck aria-hidden="true" /> : <FiShoppingBag aria-hidden="true" />}
                <span>{added ? "Added to cart" : "Add to cart"}</span>
              </button>
            </div>
          )}

          <section className="store-detail-trust" aria-label="Payment, shipping and support information">
            <div className="store-detail-trust-item">
              <span className="store-detail-trust-icon"><FiCreditCard aria-hidden="true" /></span>
              <div>
                <strong>Online payment</strong>
                <p>Checkout is processed through Razorpay. Online payment only.</p>
              </div>
            </div>
            <div className="store-detail-trust-item">
              <span className="store-detail-trust-icon"><FiMapPin aria-hidden="true" /></span>
              <div>
                <strong>Delivery from Guwahati</strong>
                <p>We dispatch from Guwahati, Assam. Delivery availability, charges and estimated timing depend on your address. Contact us before ordering to confirm.</p>
              </div>
            </div>
            <div className="store-detail-trust-item store-detail-trust-support">
              <span className="store-detail-trust-icon"><FiTruck aria-hidden="true" /></span>
              <div>
                <strong>Order updates &amp; returns</strong>
                <p>We will share dispatch updates and tracking details once the courier is booked. Our return policy is not published yet; contact us before purchasing to confirm return eligibility.</p>
                <div className="store-detail-contact-links">
                  <a href="tel:+918097283444">+91 8097283444</a>
                  <a href="mailto:mail@acteast.co.in">mail@acteast.co.in</a>
                </div>
              </div>
            </div>
          </section>

          {product.description && (
            <div className="store-detail-description">
              <h2>About this product</h2>
              <p>{product.description}</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default StoreProductDetail;
