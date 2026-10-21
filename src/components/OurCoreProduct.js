import React, { useState } from "react";
import GIProduct from "./GIProduct.js";
import OurCoreProductDetail from "./OurCoreProductDetail.js"


const OurCoreProduct = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleReadMore = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productList.map((products, index) => (
          <GIProduct
            key={index}
            title={products.title}
            img={products.img}
            desc={products.desc}
            onReadMore={() => handleReadMore(products)}
          />
        ))}
      </div>

      {/* Modal Section */}
   {selectedProduct && (
    <OurCoreProductDetail
    product={selectedProduct}
    onClose={handleCloseModal}
  />
  )}
  </div>
  );
  };

export default OurCoreProduct;


