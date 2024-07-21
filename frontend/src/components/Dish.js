import React from "react";
import veg from "../assets/veg.png";
import nonVeg from "../assets/non-veg.png";
import "../styles/dish.css";
function Dish({ dish }) {
  const formattedCount =
    parseFloat(dish.rating.count) >= 1000
      ? (parseFloat(dish.rating.count) / 1000).toFixed(1) + "K"
      : parseFloat(dish.rating.count);
  return (
    <>
      <div className="flex h-[200px] mt-[50px]">
        <div className="w-[80%]">
          <div>
            <img className="vegIcons" src={dish.veg ? veg : nonVeg} alt="KFC" />
          </div>
          <div className="text-gray-700 font-bold ">{dish.name}</div>
          <div className="font-semibold">₹ {dish.sellingPrice}</div>
          <div className="mt-[1px] flex space-x-1 pt-2">
            <div className="inline-block pl-[2.5px] text-white  pt-[2px] mt-[2px] ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 17 17"
                fill="green"
                className="size-4"
              >
                <path
                  fillRule="evenodd"
                  d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="font-semibold text-[rgb(65,68,73)] text3">
              {dish.rating.value} ({formattedCount})
            </div>
          </div>
          <div className="w-[80%] h-[80px] pt-2 overflow-hidden text-ellipsis text-gray-500">
            {dish.description}
          </div>
        </div>
        <div className="w-[20%]">
          <div className="relative rounded-2xl overflow-hidden h-[170px]">
            <img
              className=" rounded-2xl productImg"
              src={dish.image}
              alt="KFC"
            />
            <div className="absolute top-50 bottom-0 left-0 right-0 pt-[10px] text-center">
              <button
                type="button"
                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                ADD
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr class="border-t-[2px] border-gray-300"></hr>
    </>
  );
}

export default Dish;
