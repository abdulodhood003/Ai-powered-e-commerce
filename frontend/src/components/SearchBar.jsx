import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [inputValue, setInputValue] = useState(search || '');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(inputValue); // update global search
    setShowSearch(false); // hide search if needed
    navigate('/collection'); // redirect to collection page
  };

  return showSearch ? (
    <div className='border-t border-b bg-gray-50 text-center'>
      <form
        onSubmit={handleSearch}
        className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'
      >
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className='flex-1 outline-none bg-inherit text-sm'
          type='text'
          placeholder='Search'
        />
        <button type="submit">
          <img className='w-4' src={assets.search_icon} />
        </button>
      </form>
      <img
        onClick={() => setShowSearch(false)}
        className='inline w-3 cursor-pointer'
        src={assets.cross_icon}
      />
    </div>
  ) : null;
};

export default SearchBar;
