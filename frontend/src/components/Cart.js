import React, { useEffect, useState, useContext } from "react";
import "../styles/Cart.css";
import CartProduct from "./CartProduct";
import { CartContext } from "../context/CartContext";
import axios from "axios";
function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const [restaurant, setRestaurant] = useState({
    rating: {
      count: "1586",
      value: "4.3",
    },
    _id: "6694282655f25efab3999378",
    name: "Biriyani Spot",
    location: "banglore",
    sellerId: "668a7dc4960c1892de11f5fb",
    address: "banglore",
    timing: [
      {
        day: "1",
        open: "9:00",
        close: "21:00",
        _id: "6694282655f25efab3999379",
      },
    ],
    days: [],
    offer: "Items at ₹199",
    image: "https://i.ibb.co/rbVct82/1720985636146-adktghqnlzmsq6rcgg2msr.jpg",
    __v: 0,
    tags: ["biriyani"],
    maxPrice: "600",
    minPrice: "299",
  });
  const [cartProducts, setCartProducts] = useState([{}]);

  const [total, setTotal] = useState(0);
  const [delivery, setDelivery] = useState(43);
  const [contactLessDelivery, setContactLessDelivery] = useState(false);
  useEffect(() => {
    getRestaurant();
  }, []);

  useEffect(() => {
    getRestaurant();
    let total = 0;

    cart.forEach((item) => {
      total = total + Number(item.dish.sellingPrice) * Number(item.quantity);
    });
    total += Number(delivery);
    total += 6;
    setTotal(total);
  }, [cart]);

  const getRestaurant = async () => {
    if (!cart.length) return;

    let resturantId = cart[0].dish.resturantId;

    await axios
      .get(process.env.REACT_APP_GET_RESTURANT_BY_ID + "/" + resturantId)
      .then((res) => {
        console.log("res", res);
        setRestaurant(res.data);
      })
      .catch((e) => {
        console.log("err", e);
      });
  };

  const handleDecrement = (cartItem) => {
    let prevCart = [...cart];
    console.log("prevCart", prevCart);
    console.log("cartItem", cartItem);
    let findObj = prevCart.find((item) => item.dish._id === cartItem.dish._id);

    findObj.quantity--;
    if (Number(findObj.quantity) <= 0) {
      prevCart = prevCart.filter((item) => item.dish._id !== cartItem.dish._id);
    }

    setCart(prevCart);
    localStorage.setItem("cart", JSON.stringify(prevCart));
  };
  const handleIncrement = (cartItem) => {
    let prevCart = [...cart];
    console.log("prevCart", prevCart);
    console.log("cartItem", cartItem);
    let findObj = prevCart.find((item) => item.dish._id === cartItem.dish._id);

    findObj.quantity++;

    setCart(prevCart);
    localStorage.setItem("cart", JSON.stringify(prevCart));
  };

  return (
    <div className="flex bg-gray-200 h-full w-full px-[10%] py-[2%] space-x-8">
      <div className="w-[55%] flex justify-end">
         
        <div className="w-full max-w-[700px] h-[600px] bg-white p-4">
{/* form */}



        </div>
      </div>
      <div className="w-[45%] flex justify-start">
        <div className="w-full max-w-[500px] h-[600px] bg-white p-4">
          {/* resturant section */}
          <div className="flex">
            <img
              className="resturantImage"
              src={restaurant.image}
              alt="delivery"
            />
            <div className="ml-[30px]">
              <div className="font-bold">{restaurant.name}</div>
              <div className="">{restaurant.address}</div>
            </div>
          </div>

          <hr className="mt-[10px]"></hr>
          {/* cart product section */}
          <div className="p-8 h-80 overflow-y-auto bg-gray-100 border border-gray-300 rounded">
            {cart.map((item) => (
              <CartProduct
                cartItem={item}
                handleDecrement={handleDecrement}
                handleIncrement={handleIncrement}
              ></CartProduct>
            ))}

            {/* no contact delivery */}
            <div className="border border-2 p-4 mt-4">
            <div class="flex items-center me-4">
              <input
                id="green-checkbox"
                type="checkbox"
                checked ={contactLessDelivery}
                onChange={(e)=>
                  {
                      let prev = contactLessDelivery;
                      setContactLessDelivery(!prev);
                  } }
                class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="green-checkbox"
                class="ms-2 text-sm font-medium text-gray-900 font-bold dark:text-gray-600"
              >
                Opt in for No-contact Delivery
              </label>
              
            </div>
            <div className="text-sm mt-[10px]  text-gray-700">
              {contactLessDelivery? (<div>Our delivery partner will call to confirm. Please ensure that your address has all the required details.</div>) : (<div>Unwell, or avoiding contact? Please select no-contact delivery. Partner will safely place the order outside your door (not for COD)</div>)}
              </div>
          </div>
            </div>

            

          {/* total section */}

          <div className="p-4">
            <div className="flex w-full">
              <div className="w-[90%] text-[13px]">Platform Fees</div>
              <div className="w-[10%] text-[13px]">₹6</div>
            </div>
            <div className="flex w-full mt-2">
              <div className="w-[90%] text-[13px]">Delivery Charges</div>
              <div className="w-[10%] text-[13px]">₹{delivery}</div>
            </div>
            <div className="flex w-full mt-2">
              <div className="w-[90%] font-bold">To Pay</div>
              <div className="w-[10%] font-bold">₹{total}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
