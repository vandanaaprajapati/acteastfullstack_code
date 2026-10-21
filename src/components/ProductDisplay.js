
// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import productData from "../components/ProductData.js";
// import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// const categories = [
//   "tea", "rice", "cashew", "honey", "chips", "powder", "spices",
//   "refreshment", "amla", "chili", "jam", "pickle", "chutney", "squash", "bhujia"
// ];

// const ProductDisplay = () => {
//   const location = useLocation();
//   const defaultCategory = location.state?.category || "tea";
//   const productbg =  "https://api.ecrop.co/assets/acteast/image/productBg.webp"
//   const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
//   const [isOpen, setIsOpen] = useState(false);

//   const products = productData[selectedCategory] || [];

//   useEffect(() => {
//     if (location.state?.category) {
//       setSelectedCategory(location.state.category);
//     }
//   }, [location.state?.category]);

//   const handleSelect = (cat) => {
//     setSelectedCategory(cat);
//     setIsOpen(false); // close dropdown after selection
//   };

//   return (
// <section   className="relative bg-cover bg-center bg-no-repeat bg-fixed pt-5 pb-10 px-4 sm:px-6 lg:px-8"  style={{ backgroundImage: `url(${productbg})` }}>
//         {/* Overlay with color + opacity */}
//       <div className="absolute inset-0 bg-gray-300/90 z-0"></div>

//       <div className="container mx-auto flex flex-col md:flex-row h-auto md:h-[calc(100vh-96px)] md:overflow-hidden">
        
//         {/* ===== Mobile/Tablet Dropdown ===== */}
//         <div className="block md:hidden w-full mb-6 z-50">
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="flex justify-between items-center w-full px-4 py-3 bg-green-600 text-white font-semibold rounded shadow"
//           >
//             <span>
//               {selectedCategory
//                 ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)
//                 : "Select Category"}
//             </span>
//             {isOpen ? <FaChevronUp /> : <FaChevronDown />}
//           </button>

//           {isOpen && (
//             <ul className="mt-2 bg-white border rounded shadow-md overflow-hidden">
//               {categories.map((cat) => (
//                 <li key={cat}>
//                   <button
//                     onClick={() => handleSelect(cat)}
//                     className={`w-full text-left px-4 py-2 text-lg ${
//                       selectedCategory === cat
//                         ? "bg-orange-400 text-white"
//                         : "hover:bg-green-100 text-gray-800"
//                     }`}
//                   >
//                     {cat.charAt(0).toUpperCase() + cat.slice(1)}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* ===== Desktop Sidebar ===== */}
//         <div className="hidden md:block w-full md:w-1/5 bg-gray-100 p-4 rounded shadow overflow-y-auto md:sticky md:top-24 h-auto md:h-[calc(100vh-96px)] border mb-6 md:mb-0">
//           <h2 className="text-4xl font-bold mb-4 text-green-900">Categories</h2>
//           <ul className="space-y-2">
//             {categories.map((cat) => (
//               <li key={cat}>
//                 <button
//                   onClick={() => setSelectedCategory(cat)}
//                   className={`w-full text-left px-4 py-2 rounded text-lg ${
//                     selectedCategory === cat
//                       ? "bg-orange-400 text-white"
//                       : "hover:bg-green-100 text-gray-800"
//                   }`}
//                 >
//                   {cat.charAt(0).toUpperCase() + cat.slice(1)}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* ===== Product Grid ===== */}
//         <div className="w-full md:w-3/4 px-0 md:px-8 overflow-y-auto h-auto md:h-[calc(100vh-100px)] pb-5">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//             {products.length > 0 ? (
//               products.map((product) => (
//                 <div
//                   key={product.id}
//                   className="group bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl lg:h-[430px] border-2 border-[rgb(142,198,63)]"
//                 >
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                      loading="lazy"
//                     className="w-full h-50 object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-90"
//                   />
//                   <div className="p-4 flex flex-col justify-between h-[calc(277px-200px)]">
//                     <div>
//                       <h3 className="text-2xl font-semibold mb-1 text-center heading-style">
//                         {product.name}
//                       </h3>
//                       <p className="text-base  font-semibold mb-1 text-center">
//                       {product.weight} - {product.price}
//                       </p>
//                        {/* <p className="text-base  font-semibold mb-4 text-center">
//                        {product.price}
//                       </p> */}
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 col-span-3">
//                 No products available in this category.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProductDisplay;


import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FiArrowRight, FiChevronDown, FiImage, FiPackage, FiShoppingCart } from "react-icons/fi";
import { useCart } from "../components/CartContext.js"; // ✅ ADD THIS
import "./ProductDisplay.css";

const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://acteast.onrender.com");

const formatPrice = (price) => new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
}).format(price);

const ProductDisplay = () => {
  const location = useLocation();
  const { addToCart } = useCart(); // ✅ ADD THIS

  const defaultCategory = location.state?.category || "tea";
  const productbg = "https://api.ecrop.co/assets/acteast/image/productBg.webp";

  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [openVariantMenu, setOpenVariantMenu] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const visibleProducts = products.filter(
    (product) => product.category === selectedCategory
  );
  const selectedCategoryName = categories.find(
    (category) => category.slug === selectedCategory
  )?.name || "Shop categories";

  useEffect(() => {
    let cancelled = false;

    const loadProducts = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/api/products`),
          fetch(`${API_BASE_URL}/api/categories`),
        ]);
        const [result, categoriesResult] = await Promise.all([
          productsResponse.json(),
          categoriesResponse.json(),
        ]);

        if (
          !productsResponse.ok ||
          !result.success ||
          !categoriesResponse.ok ||
          !categoriesResult.success
        ) {
          throw new Error("Products or categories could not be loaded");
        }

        if (!cancelled) {
          setProducts(result.products);
          setCategories(categoriesResult.categories);
          setError("");
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (location.state?.category) {
      setSelectedCategory(location.state.category);
    }
  }, [location.state?.category]);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!event.target.closest(".catalog-size-control")) {
        setOpenVariantMenu("");
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpenVariantMenu("");
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const handleSelect = (cat) => {
    setSelectedCategory(cat);
    setIsOpen(false);
  };

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat bg-fixed pt-5 pb-10 px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${productbg})` }}
    >
      <div className="absolute inset-0 z-0 bg-gray-300/90 pointer-events-none"></div>

      <div className="container relative z-10 mx-auto flex flex-col gap-5 md:flex-row">

        <div className="catalog-category-mobile block md:hidden w-full">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="catalog-category-mobile-toggle"
            aria-expanded={isOpen}
          >
            <span className="catalog-category-mobile-current">
              <small>Browse category</small>
              <strong>{selectedCategoryName}</strong>
            </span>
            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>

          {isOpen && (
            <ul className="catalog-category-mobile-list">
              {categories.map((category) => (
                <li key={category.slug}>
                  <button
                    type="button"
                    onClick={() => handleSelect(category.slug)}
                    className={`catalog-category-option ${
                      selectedCategory === category.slug
                        ? "is-selected"
                        : ""
                    }`}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <aside className="catalog-category-sidebar hidden md:block w-full md:w-1/5 md:sticky md:top-24 md:self-start">
          <div className="catalog-category-sidebar-heading">
            <span>Browse</span>
            <h2>Categories</h2>
          </div>
          <ul className="catalog-category-list">
            {categories.map((category) => (
              <li key={category.slug}>
                <button
                  type="button"
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`catalog-category-option ${
                    selectedCategory === category.slug
                      ? "is-selected"
                      : ""
                  }`}
                  aria-pressed={selectedCategory === category.slug}
                >
                  {category.name}
                  <span aria-hidden="true">›</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="w-full min-w-0 md:w-3/4 px-0 md:px-4 pb-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-7">

            {loading ? (
              <p className="text-gray-500 col-span-3">Loading products...</p>
            ) : error ? (
              <p className="text-gray-500 col-span-3">{error}</p>
            ) : visibleProducts.length > 0 ? (
              visibleProducts.map((product) => {
                const selectedVariantId = selectedVariants[product._id];
                const selectedVariant = product.variants.find(
                  (variant) => String(variant._id || variant.label) === selectedVariantId
                ) || product.variants[0];

                if (!selectedVariant) return null;

                const cartItem = {
                  id: `${product._id}:${selectedVariant._id || selectedVariant.label}`,
                  productId: product._id,
                  variantId: selectedVariant._id,
                  name: product.name,
                  image: selectedVariant.image || product.image,
                  weight: selectedVariant.label,
                  price: selectedVariant.price,
                  category: product.category,
                  stock: selectedVariant.stock,
                };

                return (
                  <article className={`catalog-product-card${openVariantMenu === product._id ? " has-open-size-menu" : ""}`} key={product._id}>
                    <div className="catalog-product-image">
                      <img
                        src={selectedVariant.image || product.image}
                        alt={`${product.name} ${selectedVariant.label}`}
                        loading="lazy"
                        decoding="async"
                        onError={(event) => {
                          const image = event.currentTarget;
                          if (image.src !== product.image && !image.dataset.mainFallback) {
                            image.dataset.mainFallback = "true";
                            image.src = product.image;
                            return;
                          }
                          image.hidden = true;
                          image.nextElementSibling?.removeAttribute("hidden");
                        }}
                      />
                      <div className="catalog-image-fallback" hidden aria-hidden="true">
                        <FiImage />
                        <span>{product.name}</span>
                      </div>
                      {selectedVariant.stock < 1 ? (
                        <span className="catalog-stock-badge sold-out">Out of stock</span>
                      ) : selectedVariant.stock < 5 ? (
                        <span className="catalog-stock-badge low-stock">Only {selectedVariant.stock} left</span>
                      ) : null}
                    </div>

                    <div className="catalog-product-body">
                      <h3 className="catalog-product-name">{product.name}</h3>
                      <Link className="catalog-view-details" to={`/shop/products/${product._id}`}>
                        <span>View details</span>
                        <FiArrowRight aria-hidden="true" />
                      </Link>
                      <div className="catalog-product-price" aria-live="polite">
                        <strong>₹{formatPrice(selectedVariant.price)}</strong>
                        <span> / {selectedVariant.label}</span>
                      </div>
                      <div
                        className={`catalog-size-control${openVariantMenu === product._id ? " is-open" : ""}`}
                        onMouseLeave={() => setOpenVariantMenu((current) => (
                          current === product._id ? "" : current
                        ))}
                      >
                        <span className="catalog-size-label">Choose pack size</span>
                        <button
                          className="catalog-size-trigger"
                          type="button"
                          aria-haspopup="listbox"
                          aria-expanded={openVariantMenu === product._id}
                          aria-controls={`size-options-${product._id}`}
                          onClick={() => setOpenVariantMenu((current) => (
                            current === product._id ? "" : product._id
                          ))}
                        >
                          <FiPackage className="catalog-size-icon" aria-hidden="true" />
                          <span>{selectedVariant.label}</span>
                          <FiChevronDown className="catalog-size-chevron" aria-hidden="true" />
                        </button>
                        {openVariantMenu === product._id && (
                          <div className="catalog-size-options" id={`size-options-${product._id}`} role="listbox" aria-label={`Pack sizes for ${product.name}`}>
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
                                  className={`catalog-size-option${selected ? " is-selected" : ""}`}
                                  type="button"
                                  role="option"
                                  aria-selected={selected}
                                  onClick={() => {
                                    setSelectedVariants((current) => ({
                                      ...current,
                                      [product._id]: variantId,
                                    }));
                                    setOpenVariantMenu("");
                                  }}
                                >
                                  <span className="catalog-size-option-main">
                                    <strong>{variant.label}</strong>
                                    <span>{availability}</span>
                                  </span>
                                  <span className="catalog-size-option-price">₹{formatPrice(variant.price)}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      <button
                        className="catalog-add-button"
                        type="button"
                        onClick={() => addToCart(cartItem)}
                        disabled={selectedVariant.stock < 1}
                      >
                        <FiShoppingCart aria-hidden="true" />
                        <span>{selectedVariant.stock > 0 ? "Add to cart" : "Out of stock"}</span>
                      </button>
                    </div>
                  </article>
                );
              })
            ) : (
              <p className="text-gray-500 col-span-3">
                No products available in this category.
              </p>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDisplay;