import React from "react";
import "../styles/Product.css";
import kfc from "../assets/kfc.jpg";

function Product({ product }) {
  return (
    <div className="w-[280px]">
      <div className="p-4 mt-[20px] w-[270px] cursor-pointer parent">
        <div>
          {/* <div className="absolute text-white font-extrabold text1">
          {product.offer}
        </div> */}

          <div className="relative rounded-2xl overflow-hidden">
            <img
              className="w-full h-auto rounded-2xl productImg"
              src={product.image}
              alt="KFC"
            />

            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(0deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 50%)",
              }}
            ></div>

            <div className="absolute bottom-0 left-0 right-0 p-4 text-white font-extrabold text-center text1">
              {product.offer}
            </div>
          </div>

          {/* <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
        <img className="rounded-2xl" src={kfc} alt="KFC" /> */}
        </div>
        <div className="w-full h-[120px] p-4">
          <span className="font-bold text-[rgb(65,68,73)] text2">
            {product.name}
          </span>
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
              {product.rating.value} | 35 - 40 mins
            </div>
          </div>
          <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[rgb(103,116,122)] text3">
            {/* Healthy Food, ksdfjkasdfjkhasdf, jksdhfkasjdhfjksdhf */}
            {
              product.tags.join(', ')
            }
          </div>
          <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[rgb(103,116,122)] text3">
          {
              product.location
          }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
