import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch, products } = useContext(ShopContext);
  const [inputValue, setInputValue] = useState(search || "");
  const navigate = useNavigate();

  // Filter products based on input value
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(inputValue); // update global search
    setShowSearch(false);
    navigate("/collection");
  };

  return showSearch ? (
    <div className="border-t border-b bg-gray-50 text-center relative">
      <form
        onSubmit={handleSearch}
        className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2"
      >
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Search"
        />
        <button type="submit">
          <img className="w-4" src={assets.search_icon} />
        </button>
      </form>
      <img
        onClick={() => setShowSearch(false)}
        className="inline w-3 cursor-pointer absolute top-3 right-10"
        src={assets.cross_icon}
      />

      {/* Show instant search results */}
      {inputValue && filteredProducts.length > 0 && (
        <div className="absolute bg-white border w-3/4 sm:w-1/2 left-1/2 transform -translate-x-1/2 max-h-60 overflow-y-auto z-50">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => {
                setSearch(product.name);
                setShowSearch(false);
                navigate("/collection");
              }}
            >
              {product.name}
            </div>
          ))}
        </div>
      )}

      {inputValue && filteredProducts.length === 0 && (
        <div className="absolute bg-white border w-3/4 sm:w-1/2 left-1/2 transform -translate-x-1/2 p-2 z-50">
          No products found
        </div>
      )}
    </div>
  ) : null;
};

export default SearchBar;
