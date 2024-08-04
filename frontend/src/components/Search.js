import React, { useState } from "react";

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([
    {
      rating: {
        count: "1234",
        value: "4.2",
      },
      orders: "0",
      _id: "66941d662f249f8392c49f21",
      name: "6 pc Hot & Crispy Chicken",
      image: "https://i.ibb.co/7Nr2fNq/test.jpg",
      price: "691.43",
      sellingPrice: "628.57",
      resturantId: "6692e0a72e16349fc16f3664",
      sellerId: "668a7dc4960c1892de11f5fb",
      tags: ["fastdelivery"],
      __v: 0,
      description: "Flat 10% off on 6pc Hot & Crispy Chicken",
      quantity: "1",
      veg: false,
    },
    {
      rating: {
        count: "13434",
        value: "4.1",
      },
      orders: "0",
      _id: "66941e102f249f8392c49f25",
      name: "8 pc Hot & Crispy Chicken",
      image: "https://i.ibb.co/7Nr2fNq/test.jpg",
      price: "768.57",
      sellingPrice: "768.57",
      resturantId: "6692e0a72e16349fc16f3664",
      sellerId: "668a7dc4960c1892de11f5fb",
      tags: ["fastdelivery"],
      __v: 0,
      description: "Flat 10% off on 8 pc Hot & Crispy Chicken",
      quantity: "1",
      veg: false,
    },
    {
      rating: {
        count: "13434",
        value: "4.0",
      },
      orders: "0",
      _id: "66942019679f822aa8c1b31e",
      name: "All in One Bucket",
      image:
        "https://i.ibb.co/3SBmdQH/1720983574908-y2sxz8hbt6hhwjyx1ngmqc.jpg",
      price: "717",
      sellingPrice: "548",
      resturantId: "6692e0a72e16349fc16f3664",
      sellerId: "668a7dc4960c1892de11f5fb",
      tags: ["fastdelivery"],
      __v: 0,
      description: "All in One Bucket",
      quantity: "1",
      veg: false,
    },
    {
      rating: {
        count: "2344",
        value: "4.7",
      },
      orders: "0",
      _id: "6694208d679f822aa8c1b324",
      name: "Bucket for Two",
      image: "https://i.ibb.co/vckLy1r/test2.jpg",
      price: "548",
      sellingPrice: "548",
      resturantId: "6692e0a72e16349fc16f3664",
      sellerId: "668a7dc4960c1892de11f5fb",
      tags: ["fastdelivery"],
      __v: 0,
      description: "Flat 20% off on Bucket for Two",
      quantity: "1",
      veg: false,
    },
    {
      rating: {
        count: "2678",
        value: "4.3",
      },
      orders: "0",
      _id: "6694210d679f822aa8c1b328",
      name: "Zinger Pro Burger",
      image:
        "https://i.ibb.co/Ry8vK2L/1720983816075-j5srsihxpgh6u34tyg001o.jpg",
      price: "300",
      sellingPrice: "239",
      resturantId: "6692e0a72e16349fc16f3664",
      sellerId: "668a7dc4960c1892de11f5fb",
      tags: ["fastdelivery", "burger"],
      __v: 0,
      description: "Flat 20% off on Zinger Pro Burger",
      quantity: "1",
      veg: false,
    },
    {
      rating: {
        count: "2678",
        value: "4.1",
      },
      orders: "0",
      _id: "6694216e679f822aa8c1b32d",
      name: "Indian Paneer Zinger Burger",
      image: "https://i.ibb.co/2ZfRkD1/1720983915821-vc5wck3ahrjcjc897wr8.jpg",
      price: "250",
      sellingPrice: "208",
      resturantId: "6692e0a72e16349fc16f3664",
      sellerId: "668a7dc4960c1892de11f5fb",
      tags: ["fastdelivery", "burger"],
      __v: 0,
      description: "Indian Paneer Zinger Burger",
      quantity: "1",
      veg: true,
    },
    {
      rating: {
        count: "1905",
        value: "4.5",
      },
      orders: "0",
      _id: "669421ca679f822aa8c1b331",
      name: "Classic Chicken Roll & Pepsi",
      image:
        "https://i.ibb.co/mFnRJ4L/1720984007847-4pj23jd1rm631g34nye30m.jpg",
      price: "200",
      sellingPrice: "176",
      resturantId: "6692e0a72e16349fc16f3664",
      sellerId: "668a7dc4960c1892de11f5fb",
      tags: ["fastdelivery", "rolls"],
      __v: 0,
      description: "Classic Chicken Roll & Pepsi",
      quantity: "1",
      veg: false,
    },
    {
      rating: {
        count: "1905",
        value: "4.5",
      },
      orders: "0",
      _id: "66942226679f822aa8c1b337",
      name: "Classic Chicken Roll",
      image:
        "https://i.ibb.co/1TTkW24/1720984100112-zzncnel4gxmnzb9z7y5xyj.jpg",
      price: "150",
      sellingPrice: "119",
      resturantId: "6692e0a72e16349fc16f3664",
      sellerId: "668a7dc4960c1892de11f5fb",
      tags: ["fastdelivery", "rolls"],
      __v: 0,
      description: "Best Deal on Classic Chicken Roll",
      quantity: "1",
      veg: false,
    },
    {
      rating: {
        count: "2344",
        value: "4.1",
      },
      orders: "0",
      _id: "66942285679f822aa8c1b33b",
      name: "Choclate Lava Cake",
      image:
        "https://i.ibb.co/dDdvYx4/1720984195173-8y6mtuuc2hkpceiwtvayx8.jpg",
      price: "150",
      sellingPrice: "108",
      resturantId: "6692e0a72e16349fc16f3664",
      sellerId: "668a7dc4960c1892de11f5fb",
      tags: ["fastdelivery", "cakes"],
      __v: 0,
      description: "Choclate Lava Cake",
      quantity: "1",
      veg: false,
    },
  ]);

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
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-4 focus:border-transparent"
          placeholder="Search Mockups, Logos..."
          aria-label="Search"
          required
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
        >
          Search
        </button>
      </form>

      <div className="p-4 mt-8 h-[40rem] overflow-y-auto space-y-4">
        {searchResults.map((item) => (
          <div className="flex cursor-pointer">
            <img
              className="resturantImage"
              src={item.image}
              alt="delivery"
            />
            <div className="ml-[30px]">
              <div className="font-bold text-gray-700">{item.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
