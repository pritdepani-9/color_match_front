import React from "react";

const ProductCard = ({ product, onAdd }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="font-semibold">{product.name}</h3>
      <p>Price: ₹{product.price}</p>
      <button
        onClick={() => onAdd(product)}
        className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
