import React, { useState, useContext } from "react";
import { CartContext } from "../cartContext";
import { useNavigate } from "react-router-dom";
import Toast from "../components/ToastComponent";

const CartPage = () => {
  const { cartItems, getTotalPrice, clearCart } = useContext(CartContext);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    setShowToast(true);
    setTimeout(() => {
      clearCart()
    }, 1500); 
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-200">
      <div className="max-w-4xl mx-auto bg-white/90 p-8 rounded-3xl shadow-xl backdrop-blur-md">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
          Cart Summary 🛒
        </h2>

        <div className="space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center text-lg text-gray-600">
              Your cart is empty!
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-xl mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600">₹{item.price}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 text-xl font-semibold text-gray-800 text-center">
          <h3>Total: ₹{getTotalPrice()}</h3>
        </div>

        <div className="mt-6 text-center">
          <button
            className="bg-indigo-500 text-white py-3 px-8 rounded-xl text-lg font-semibold hover:bg-indigo-600 transition-all duration-300"
            disabled={cartItems.length === 0}
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      {showToast && <Toast message="your order is placed successfully!!" onClose={() => setShowToast(false)} />}
    </div>
  );
};

export default CartPage;
