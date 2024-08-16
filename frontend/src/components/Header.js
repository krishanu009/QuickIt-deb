import { React, useContext, useEffect, useState, useRef } from "react";
import "../styles/header.css";
import { CartContext } from "../context/CartContext";
import { LocationContext } from "../context/LocationContext.js";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import Dropdown from "./Dropdown";
import LocationDropdown from "./LocationDropdown.js";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import Location from "./Location.js";
function Header({ currentUser, setCurrentUser, logOut }) {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);

  const { locationData, setLocationData } = useContext(LocationContext);

  const [selectedLocation, setSelectedLocation] = useState("bangalore");
  const [locationMenu, setLocationMenu] = useState();
  const [selecCurrentLocation, setSelectCurrentLocation] = useState(false);
  const filterMenuRef = useRef(null);
  // const [currentUser,setCurrentUser] = useState({
  //   name:"",
  //   email:"",
  //   phone:""
  // });

  const defaultAddressData = {
    "place_id": 219869732,
    "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
    "osm_type": "way",
    "osm_id": 38773287,
    "lat": "12.97033725",
    "lon": "77.59508413268529",
    "class": "amenity",
    "type": "school",
    "place_rank": 30,
    "importance": 0.3761097783818323,
    "addresstype": "amenity",
    "name": "St. Joseph's Indian High School",
    "display_name": "St. Joseph's Indian High School, Vittal Mallya Road, D'Souza Layout, Shanthala Nagar, Bengaluru, Bangalore North, Bengaluru Urban, Karnataka, 560001, India",
    "address": {
      "amenity": "St. Joseph's Indian High School",
      "road": "Vittal Mallya Road",
      "neighbourhood": "D'Souza Layout",
      "suburb": "Shanthala Nagar",
      "city": "Bengaluru",
      "county": "Bangalore North",
      "state_district": "Bengaluru Urban",
      "state": "Karnataka",
      "ISO3166-2-lvl4": "IN-KA",
      "postcode": "560001",
      "country": "India",
      "country_code": "in"
    },
    "boundingbox": [
      "12.9684987",
      "12.9718082",
      "77.5942657",
      "77.5959810"
    ]
  }
  useEffect(() => {
    let storedCart = localStorage.getItem("cart");
    console.log("storedCart", JSON.parse(storedCart));
    if (storedCart) setCart(JSON.parse(storedCart));

    const token = localStorage.getItem("token");
    console.log("token", token);
      

    setLocationData({
      address: defaultAddressData?.address,
      displayName: defaultAddressData?.display_name,
      lat: defaultAddressData?.lat,
      lon:defaultAddressData?.lon
    });
    // getCurrentUser();
  }, []);

  useEffect(() => {}, [currentUser]);
  useEffect(() => {
    setSelectedLocation(locationData.displayName);

    console.log("locationData.displayName", locationData);
  }, [locationData]);
  // const handleLocationChange = () => {
  //   // setSelectedLocation("");
  //   // navigate("/location");
  //   setSelectCurrentLocation(true);
  // };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target)
      ) {
        setLocationMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* location menu */}
      {locationMenu && (
        <div className="filterMenuBg fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            ref={filterMenuRef}
            className="filterMenu rounded-2xl shadow-lg border-2 border-solid p-4 cursor-pointer"
          >
            <div className="w-full h-[85%]  bg-red-500 relative">
              <Location selecCurrentLocation={selecCurrentLocation} setLocationMenu = {setLocationMenu} setSelectCurrentLocation={setSelectCurrentLocation}></Location>
            </div>

            <div className="p-[8px] font-bold text-gray-700 text-[25px] float-right">
              <button

              onClick={(e) => {
                    setSelectCurrentLocation("clear");
              }}
                type="button"
                class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Clear
              </button>
              <button
                onClick={(e) => {
                 setSelectCurrentLocation("select");
                }}
                type="button"
                class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
              >
                Select
              </button>
            </div>
          </div>
        </div>
      )}

      {/* location menu */}

      <div className="main z-10 bg-white h-[80px] w-full sticky top-0 shadow flex">
        <div className="flex w-[15%] p-1 pl-32">
          <div className="flex">
            <div>
              <Link to={`/`}>
                <img className="logo mt-2" src={logo}></img>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex w-[15%] pt-1">
          <div
            onClick={(e) => {
              setLocationMenu(true);
            }}
            className="pt-4 font-semibold text-gray-500 hover:text-customHoverColor cursor-pointer "
          >
            {/* <LocationDropdown></LocationDropdown> */}

            <div className="flex p-2 ">
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-geo-alt-fill"
                  viewBox="0 0 16 16"
                  className="m-1"
                >
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                </svg>
              </div>
              <div className="w-64 overflow-hidden truncate">
                {selectedLocation}
              </div>
            </div>
          </div>
        </div>

        <div className="w-[70%] p-2 flex items-center space-x-32">
          <div className="ml-[100px] flex items-center font-semibold text-gray-500 hover:text-customHoverColor cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
            &nbsp;&nbsp;&nbsp;<Link to={`/search`}>Search</Link>
          </div>

          <div className="ml-[100px] flex items-center font-semibold text-gray-500 hover:text-customHoverColor cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-fire"
              viewBox="0 0 16 16"
            >
              <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15" />
            </svg>
            &nbsp;&nbsp;Offers
          </div>

          <div className="ml-[100px] flex items-center font-semibold text-gray-500 hover:text-customHoverColor cursor-pointer">
            {currentUser.email ? (
              <Dropdown currentUser={currentUser} logOut={logOut}></Dropdown>
            ) : (
              <Link to={"/register"}>
                <div className="flex items-center font-semibold">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-person"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                  </svg>
                  &nbsp;&nbsp;Sign In
                </div>
              </Link>
            )}
          </div>

          <div className="relative pl-4 flex items-center font-semibold text-gray-500 hover:text-customHoverColor cursor-pointer">
            <Link to={`/cart`}>
              <div className="flex">
                {cart.length ? (
                  <div className="absolute right-[48px] w-[15px] h-[15px] bg-green-500 rounded-full mt-1">
                    <div className="text-[10px] text-white ml-[4px]">
                      {cart.length}
                    </div>
                  </div>
                ) : null}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-basket3 mt-1"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM3.394 15l-1.48-6h-.97l1.525 6.426a.75.75 0 0 0 .729.574h9.606a.75.75 0 0 0 .73-.574L15.056 9h-.972l-1.479 6z" />
                </svg>
                &nbsp;&nbsp;Cart
              </div>
            </Link>
          </div>
        </div>

        {/* <div className="w-[20%] p-2">
      Section 3 Content
    </div> */}
      </div>
    </>
  );
}

export default Header;
