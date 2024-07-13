import React from "react";
import "../styles/Product.css";
import kfc from "../assets/kfc.jpg";

function Product() {
   let sd = "data:image/jpeg;base64,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";
 
  return (

    <div className="w-[280px]">

<div className="p-4 mt-[20px] w-[270px] cursor-pointer hover:w-[250px] hover:ml-[10px] parent">
      <div>
        <div className="absolute text-white font-extrabold text1">
          50% OFF UPTO ₹100
        </div>

        <div className="relative rounded-2xl overflow-hidden">
          <img className="w-full h-auto rounded-2xl" src={sd} alt="KFC" />

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(0deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 50%)",
            }}
          ></div>

          <div className="absolute bottom-0 left-0 right-0 p-4 text-white font-extrabold text-center text1">
            50% OFF UPTO ₹100
          </div>
        </div>

        {/* <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
        <img className="rounded-2xl" src={kfc} alt="KFC" /> */}
      </div>
      <div className="w-full h-[120px] p-4">
        <span className="font-bold text-[rgb(65,68,73)] text2">Wow! Momo</span>
        <div className="mt-[1px] flex space-x-1">
          <div className="rounded-full w-[20px] h-[20px] inline-block pl-[2.5px] text-white bg-green-700 pt-[2px] mt-[2px] ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 17 17"
              fill="currentColor"
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
            4.1 | 35 - 40 mins
          </div>
        </div>
        <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[rgb(103,116,122)] text3">
          Healthy Food, ksdfjkasdfjkhasdf, jksdhfkasjdhfjksdhf
        </div>
        <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[rgb(103,116,122)] text3">
          Ashok Nagar
        </div>
      </div>
    </div>

    </div>
    
  );
}

export default Product;
