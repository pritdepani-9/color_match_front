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
  const [searchQuery, setSearchQuery] = useState("");  // <-- new state for search

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

  useEffect(() => {
    let sortedArray = [...filteredProducts];

    // Filter by search query
    if (searchQuery) {
      sortedArray = sortedArray.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort by selected option
    if (sortOption === "price") {
      sortedArray.sort((a, b) => a.price - b.price);
    } else if (sortOption === "popularity") {
      sortedArray.sort((a, b) => b.popularity - a.popularity);
    }

    setSortedProducts(sortedArray);
  }, [filteredProducts, sortOption, searchQuery]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-200">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
        Products {selectedTheme && `for "${selectedTheme}"`}
      </h2>

      {/* Search & Sort */}
      <div className="mb-6 flex flex-wrap justify-center gap-4">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-3 rounded-xl border-2 border-gray-300 text-lg w-72"
        />

        <div>
          <label htmlFor="sort" className="mr-2 text-lg font-semibold text-gray-800">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={handleSortChange}
            className="p-3 rounded-xl border-2 border-gray-300 text-lg"
          >
            <option value="price">Price: Low to High</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.length === 0 ? (
          <div className="text-center text-lg text-gray-600 col-span-full">
            No products found.
          </div>
        ) : (
          sortedProducts.map((item) => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default ProductPage;
