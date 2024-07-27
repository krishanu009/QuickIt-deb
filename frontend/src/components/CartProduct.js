import React from "react";
import veg from "../assets/veg.png";
import nonVeg from "../assets/non-veg.png";
import "../styles/Cart.css";
function CartProduct({ cartItem, handleDecrement, handleIncrement  }) {
  
  return (
    <div className="flex p-2 w-[100%]">
      <div className="w-[5%]">
        <img
          className="vegIcons "
          src={cartItem.dish.veg ? veg : nonVeg}
          alt="KFC"
        />
      </div>

      <div className="ml-[10px] text-[13px] pt-1 w-[45%]">
        {cartItem.dish.name}
      </div>

      <div className="w-[40%]">
      <div
      className="py-1 px-2 inline-block bg-white border border-gray-200 rounded-md"
      data-hs-input-number=""
    >
      <div className="flex items-center gap-x-1">
        <button
          type="button"
          className="inline-flex justify-center items-center text-xs font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
          tabIndex="-1"
          aria-label="Decrease"
          data-hs-input-number-decrement=""
          onClick={ (e) => {handleDecrement(cartItem)}}
          style={{ width: '20px', height: '20px' }}
        >
          <svg
            className="shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
          </svg>
        </button>
        <input
          className="p-0 w-8 bg-transparent border-0 text-xs text-gray-800 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          style={{ MozAppearance: "textfield" }}
          type="number"
          aria-roledescription="Number field"
          value={cartItem.quantity}
          data-hs-input-number-input=""
        />
        <button
          type="button"
          className="inline-flex justify-center items-center text-xs font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
          tabIndex="-1"
          aria-label="Increase"
          data-hs-input-number-increment=""
          onClick={(e) => {handleIncrement(cartItem)}}
          style={{ width: '20px', height: '20px' }}
        >
          <svg
            className="shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5v14"></path>
          </svg>
        </button>
      </div>
    </div>
      </div>
      <div className="w-[10%] pl-4 text-[13px]  pt-1">₹{Number(cartItem.quantity) * Number(cartItem.dish.sellingPrice)}</div>
    </div>
  );
}

export default CartProduct;
