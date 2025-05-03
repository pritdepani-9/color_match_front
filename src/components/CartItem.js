import React from "react";

const CartItem = ({ item }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow flex justify-between items-center mt-2">
      <span>{item.name}</span>
      <span>₹{item.price}</span>
    </div>
  );
};

export default CartItem;
