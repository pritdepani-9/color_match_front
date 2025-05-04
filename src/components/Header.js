import React, { useContext } from "react";
import { CartContext } from "../cartContext";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { cartItems, getTotalPrice } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white shadow-lg">
      <h1
        className="text-2xl font-bold cursor-pointer hover:scale-105 transition-all duration-300"
        onClick={handleLogoClick}
      >
        Colour Match
      </h1>

      <Link
        to="/cart"
        className="flex items-center gap-2 bg-white text-indigo-600 py-2 px-4 rounded-lg shadow-lg hover:bg-indigo-100 transition-all duration-300"
      >
        🛒 {cartItems.length} | ₹{getTotalPrice()}
      </Link>
    </header>
  );
};

export default Header;
