import React, { useContext, useState, useEffect } from "react";
import products from "../productData";
import { CartContext } from "../cartContext";
import { useLocation } from "react-router-dom";

const ProductPage = () => {
  const { addToCart } = useContext(CartContext);
  const location = useLocation();

  const [selectedTheme, setSelectedTheme] = useState(location.state?.theme || "");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState("price");
  const [sortedProducts, setSortedProducts] = useState([]);

  // Filter products based on selected theme
  useEffect(() => {
    if (selectedTheme) {
      const themeFilteredProducts = products.filter(
        (product) => product.theme === selectedTheme
      );
      setFilteredProducts(themeFilteredProducts);
    } else {
      setFilteredProducts(products);
    }
  }, [selectedTheme]);

  // Whenever filteredProducts or sortOption changes → update sortedProducts
  useEffect(() => {
    let sortedArray = [...filteredProducts];
    if (sortOption === "price") {
      sortedArray.sort((a, b) => a.price - b.price);
    } else if (sortOption === "popularity") {
      sortedArray.sort((a, b) => b.popularity - a.popularity);
    }
    setSortedProducts(sortedArray);
  }, [filteredProducts, sortOption]);

  // Sorting function
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-200">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
        Products for "{selectedTheme}"
      </h2>

      {/* Sort By Section */}
      <div className="mb-6 text-center">
        <label htmlFor="sort" className="mr-2 text-lg font-semibold text-gray-800">
          Sort by:
        </label>
        <select
          id="sort"
          value={sortOption}
          onChange={handleSortChange}
          className="p-2 rounded-xl border-2 border-gray-300 text-lg"
        >
          <option value="price">Price: Low to High</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
              <p className="text-lg text-gray-600 mt-2">₹{item.price}</p>
              <button
                onClick={() => addToCart(item)}
                className="mt-4 w-full bg-indigo-500 text-white py-2 rounded-xl text-lg font-semibold hover:bg-indigo-600 transition-all duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
