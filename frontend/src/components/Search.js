import React, { useState,useEffect,useContext } from "react";
import { LocationContext } from "../context/LocationContext.js";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([
    
  ]);
  const { food } = useParams();
  const { locationData } = useContext(LocationContext);
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {

   if(food === 'food') return;

   setSearchInput(food);
   handleSearch(food);
  },[food])


  const handleSearch = async (key) => {
    console.log("handleSearch",searchInput);
  if(!searchInput && !key) return;
  let searchKey = searchInput || key;
  let latlng = locationData.lat + "," + locationData.lon;
   console.log(process.env.REACT_APP_SEARCH_RESTURANT + "/" + latlng + "/" + searchKey);
  await axios
      .get(process.env.REACT_APP_SEARCH_RESTURANT + "/" + latlng + "/" + searchKey) 
      .then((res) => {
        setSearchResults(res.data)
      })
      .catch((e) => {
        setSearchResults([])
        console.log("err", e);
      });
        
  }
  return (
    <div className="overflow-y-auto h-full w-full px-[25%] py-[2%] space-x-8 pb-[5%]">
      <form className="relative w-[100%]">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-4 focus:border-transparent"
          placeholder="Search for restaurants or food near you..."
          aria-label="Search"
          required
        />
        <button
        onClick={(e) => {handleSearch()}}
          type="button"
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
        >
          Search
        </button>
      </form>

      <div className="p-4 mt-8 h-[40rem] overflow-y-auto space-y-4 space-x-2">
        {searchResults.map((item) => (
           <Link key={item._id} to={`/restaurant/${item._id}`}>
          <div className="flex cursor-pointer">
            <img
              className="resturantImage"
              src={item.image}
              alt="delivery"
            />
            <div className="ml-[30px]">
              <div className="font-bold text-gray-700">{item.name}</div>
              <div className="text-[13px] text-gray-500">{item.address}</div>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Search;
