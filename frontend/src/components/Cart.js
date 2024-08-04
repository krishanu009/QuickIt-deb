import React, { useEffect, useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Cart.css";
import CartProduct from "./CartProduct";

import { CartContext } from "../context/CartContext";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function Cart({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();

  const city = "bangalore";
  const state = "Karnataka";
  const pin = "12455";
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
  const [userInfo, setUserInfo] = useState({});
  const [total, setTotal] = useState(0);
  const [delivery, setDelivery] = useState(43);
  const [allDeliveryAddress, setAllDeliveryAddress] = useState([]);
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState(null);
  const [contactLessDelivery, setContactLessDelivery] = useState(false);
  const [showNewFormMenu, setShowNewFormMenu] = useState(false);
  const [newName, setNewName] = useState("");
  const [newApartment, setNewApartment] = useState("");
  const [newAddressLine1, setNewAddressLine1] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [errorText, setErrorText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState();
  const [newDeliveryAddress, setNewDeliveryAddress] = useState({
    name: "",
    phone: "",
    apartment: "",
    addressLine1: "",
    city: "",
    state: "",
    pin: "",
    _id: "",
  });
  const newFormRef = useRef(null);
  useEffect(() => {
    getRestaurant();
    getUserById();
  }, []);

  useEffect(() => {
    getUserById();
  }, [currentUser, selectedDeliveryAddress]);

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

  useEffect(() => {
    function handleClickOutside(event) {
      if (newFormRef.current && !newFormRef.current.contains(event.target)) {
        setShowNewFormMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getUserById = async () => {
    let userId = currentUser.id;

    if (!userId) return;
    await axios
      .get(process.env.REACT_APP_USER + "/" + userId)
      .then((res) => {
        console.log("get user by id", res);
        setUserInfo(res.data);
        setAllDeliveryAddress(res.data.address);
        // setAllDeliveryAddress(res.data.address);
      })
      .catch((e) => {
        console.log("err", e);
      });
  };

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

  const handleChnageDeliver = (address) => {
    setSelectedDeliveryAddress(address);
  };

  const addNewAddress = async (e) => {
    console.log("Function addNewAddress called");

    if (isSubmitting) return;

    let payload = {
      userId: currentUser.id,
      newAddress: {
        name: newName,
        phone: newPhone,
        apartment: newApartment,
        addressLine1: newAddressLine1,
        city: city,
        state: state,
        pin: pin,
      },
    };
    // let payload = { "userId":"66a618de20e656b7c0166863",
    //   "newAddress":{
    //         "name": "Krishanu",
    //         "phone": "23455555",
    //         "apartment": "G-tech park",
    //        "addressLine1": "f-colony",
    //         "city": "banglore",
    //         "state": "karnataka",
    //         "pin": "12344"
    //       } };

    if (!newName || !newAddressLine1 || !newApartment || !newPhone) {
      setErrorText("Please add all the fields!");
      console.log("Validation failed: Missing fields");
      return;
    }
    setIsSubmitting(true);
    try {
      await axios
        .post(process.env.REACT_APP_ADD_ADDRESS, payload, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          console.log("addNewAddress response:", res.data);
          setSelectedDeliveryAddress(res.data);
        })
        .catch((e) => {
          console.log("addNewAddress error:", e);
          setErrorText(e.response?.data?.errors || "An error occurred");
        });
    } catch (e) {
      console.log("Unexpected error:", e);
      setErrorText("An unexpected error occurred");
    }

    setIsSubmitting(false);
  };
const handleCheckout = () => {
  navigate('/checkout');
}
  return (
    <>
      {/* new address modal */}
      {showNewFormMenu && (
        <div className="filterMenuBg fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            ref={newFormRef}
            className="w-[500px] h-[330px] p-2 pt-8 bg-white rounded-2xl shadow-lg border-2 border-solid p-4 cursor-pointer"
          >
            <form class="max-w-md mx-auto">
              <div class="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="floating_name"
                  id="floating_name"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={(e) => {
                    setNewName(e.target.value);
                  }}
                  value={newName}
                />
                <label
                  for="floating_name"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Name
                </label>
              </div>
              <div class="grid md:grid-cols-2 md:gap-6">
                <div class="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="floating_apartment"
                    id="floating_apaetment"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    onChange={(e) => {
                      setNewApartment(e.target.value);
                    }}
                    value={newApartment}
                  />
                  <label
                    for="floating_apartment"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Apartment
                  </label>
                </div>
                <div class="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="floating_address"
                    id="floating_address"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    onChange={(e) => {
                      setNewAddressLine1(e.target.value);
                    }}
                    value={newAddressLine1}
                  />
                  <label
                    for="floating_address"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Address Line 1
                  </label>
                </div>
              </div>

              {/* <div class="grid md:grid-cols-2 md:gap-6">
                <div class="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="floating_city"
                    id="floating_city"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    for="floating_city"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    City
                  </label>
                </div>
                <div class="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="floating_state"
                    id="floating_state"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    for="floating_state"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                   State
                  </label>
                </div>
              </div> */}

              {/* <div class="grid md:grid-cols-2 md:gap-6">
                <div class="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="floating_first_name"
                    id="floating_first_name"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    for="floating_first_name"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    First name
                  </label>
                </div>
                <div class="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="floating_last_name"
                    id="floating_last_name"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    for="floating_last_name"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Last name
                  </label>
                </div>
              </div> */}
              <div class="grid md:grid-cols-2 md:gap-6">
                <div class="relative z-0 w-full mb-5 group">
                  <input
                    type="tel"
                    name="floating_phone"
                    id="floating_phone"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    onChange={(e) => {
                      setNewPhone(e.target.value);
                    }}
                    value={newPhone}
                  />
                  <label
                    for="floating_phone"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Phone number (123-456-7890)
                  </label>
                </div>
                {/* <div class="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="floating_company"
                    id="floating_company"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    for="floating_company"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Company (Ex. Google)
                  </label>
                </div> */}
              </div>
              <div className="p-2 text-red-500">{errorText}</div>
              <button
                onClick={(e) => addNewAddress(e)}
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
      {/* new address modal */}
      <div className="flex overflow-y-auto bg-gray-200 h-full w-full px-[10%] py-[2%] space-x-8 pb-[5%]">
        <div className="w-[55%] flex justify-end">
          <div className="w-full max-w-[700px] h-[600px]">
            {/* account */}
            <div className="bg-white w-full  p-4">
              {currentUser.email ? (
                <div>
                  <div className="flex space-x-4 p-4">
                    <div className="font-bold text-gray-700">Logged in</div>
                    <div className="mt-[7px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="rgb(34,197,94)"
                        class="bi bi-check-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex space-x-8 pl-4">
                    <div className="text-[25px]">{currentUser.name}</div>
                    <div className="mt-[7px] ">|</div>
                    <div className="mt-[7px] ">{currentUser.email}</div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="ml-4 mb-4">
                    <div className="font-bold ">Account</div>
                    <div className="text-gray-500">
                      To place your order now, log in to your existing account
                      or sign up.
                    </div>
                  </div>

                  <div class="flex flex-col w-full sm:w-auto sm:flex-row p-4">
                    <a
                      href={"/register"}
                      class="flex flex-row items-center justify-center w-full px-4 py-1 mb-4 text-white text-[12px] font-bold bg-green-500 leading-6 capitalize duration-100 transform rounded-sm shadow cursor-pointer focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none sm:mb-0 sm:w-auto sm:mr-4 md:pl-8 md:pr-6 xl:pl-12 xl:pr-10   hover:shadow-lg hover:-translate-y-1"
                    >
                      New to Quick it?<br></br>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SIGN UP
                    </a>

                    <a
                      href={"/login"}
                      class="flex items-center justify-center w-full px-4 py-2 text-[12px] text-green-500 font-bold leading-6 capitalize duration-100 transform border-2 rounded-sm cursor-pointer border-green-300 focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none sm:w-auto sm:px-6 border-text  hover:shadow-lg hover:-translate-y-1"
                    >
                      Have an account?<br></br>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LOG IN
                    </a>
                  </div>
                </div>
              )}
            </div>
            {/* delivery */}
            <div className="bg-white w-full min-h-[20%] mt-4 p-4">
              {currentUser.email ? (
                <div>
                  {!selectedDeliveryAddress ? (
                    <div>
                      <div className="ml-4 font-bold text-gray-700">
                        Choose a delivery address
                      </div>

                      <div className="p-4 grid grid-cols-2 gap-4 mt-4 h-96 overflow-y-auto">
                        {allDeliveryAddress.map((address) => (
                          <div class="w-[300px] h-[180px] p-4  duration-100 transform border-2 rounded-sm cursor-pointer border-green-300 focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none sm:w-auto sm:px-6 border-text  hover:shadow-lg hover:-translate-y-1">
                            <div className="flex space-x-2 ">
                              <div className="mt-[4px]">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-geo-alt"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                                  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                </svg>
                              </div>
                              <div className="font-semibold">
                                {address.name}
                              </div>
                            </div>
                            <div className="ml-2">
                              {address.addressLine1}, {address.apartment},
                              {address.city}, {address.state}, {address.pin}
                            </div>

                            <button
                              onClick={(e) => {
                                handleChnageDeliver(address);
                              }}
                              class="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold text-[12px] py-2 px-2 border border-green-700 rounded"
                            >
                              DELIVER HERE
                            </button>
                          </div>
                        ))}

                        <div class="w-[300px] h-[180px] p-4  duration-100 transform border-2 rounded-sm cursor-pointer border-green-300 focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none sm:w-auto sm:px-6 border-text  hover:shadow-lg hover:-translate-y-1">
                          <div className="flex space-x-2 ">
                            <div className="mt-[4px]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-geo-alt"
                                viewBox="0 0 16 16"
                              >
                                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                              </svg>
                            </div>
                            <div className="font-semibold">
                              Add a New Address
                            </div>
                          </div>
                          <div className="ml-2"></div>

                          <button
                            onClick={(e) => {
                              setShowNewFormMenu(true);
                            }}
                            class="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold text-[12px] py-2 px-2 border border-green-700 rounded"
                          >
                            ADD NEW
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex space-x-4 p-4">
                        <div className="font-bold text-gray-700">Delivery Address</div>
                        <div className="mt-[7px]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="rgb(34,197,94)"
                            class="bi bi-check-circle-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                          </svg>
                        </div>

                        <div
                          onClick={(e) => {
                            setSelectedDeliveryAddress(null);
                          }}
                          className="pl-[320px] font-bold text-[15px] text-yellow-500 cursor-pointer"
                        >
                          CHANGE
                        </div>
                      </div>
                      <div className=" ml-4 font-semibold">
                        {selectedDeliveryAddress.name}
                      </div>
                      <div className="text-gray-500 ml-4 text-[12px]  pb-4">
                        {selectedDeliveryAddress.addressLine1},{" "}
                        {selectedDeliveryAddress.apartment},
                        {selectedDeliveryAddress.city},{" "}
                        {selectedDeliveryAddress.state},{" "}
                        {selectedDeliveryAddress.pin}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="font-bold text-gray-500 p-4">
                    Delivery Address
                  </div>
                </div>
              )}
            </div>
            {/* payment */}

            {currentUser.email && selectedDeliveryAddress ? (
              <div className="bg-white w-full min-h-[20%] mt-4 p-4">
                <div className=" p-4 font-bold text-gray-700">Select a payment method</div>
                <div className="pl-4 pb-4 space-y-4 ">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="cod"
                      name="payment"
                      value="cod"
                      className="cursor-pointer"
                      checked ={selectedPaymentMethod === 'cod'}
                      onChange={(e)=>{setSelectedPaymentMethod(e.target.value)}}
                    ></input>
                    <label for="html">Cash on delivery</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="payu"
                      name="payment"
                      value="payu"
                      className="cursor-pointer"
                      checked ={selectedPaymentMethod === 'payu'}
                      onChange={(e)=>{setSelectedPaymentMethod(e.target.value)}}
                    ></input>
                    <label for="html">payU</label>
                  </div>

                  <button
                  onClick={(e)=>{handleCheckout()}}
                   disabled = {!selectedPaymentMethod}
                    class="ml-[80%] mt-8 bg-green-500 hover:bg-green-700 text-white font-bold text-[15px] py-2 px-4 border border-green-700 rounded"
                  >
                    CHEKOUT
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white w-full h-[20%] mt-4 p-4">
                <div className=" p-4 font-bold text-gray-500">Payment</div>
              </div>
            )}

            {/* payment */}
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
                <div className="font-bold text-gray-700">{restaurant.name}</div>
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
                    checked={contactLessDelivery}
                    onChange={(e) => {
                      let prev = contactLessDelivery;
                      setContactLessDelivery(!prev);
                    }}
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
                  {contactLessDelivery ? (
                    <div>
                      Our delivery partner will call to confirm. Please ensure
                      that your address has all the required details.
                    </div>
                  ) : (
                    <div>
                      Unwell, or avoiding contact? Please select no-contact
                      delivery. Partner will safely place the order outside your
                      door (not for COD)
                    </div>
                  )}
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
                <div className="w-[90%] font-bold text-gray-700">To Pay</div>
                <div className="w-[10%] font-bold text-gray-700 pr-4">₹{total.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
