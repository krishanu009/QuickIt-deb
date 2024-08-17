import React, { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import Dish from "./Dish";
import veg from "../assets/veg.png";
import nonVeg from "../assets/non-veg.png";
import "../styles/Resturant.css";
import deliveryIcon from "../assets/delivery.jpg";
import spoon from "../assets/spoon-loader.webm"
import {CartContext} from '../context/CartContext'
import { LocationContext } from "../context/LocationContext";
function Resturant() {
  const { id } = useParams();
  const [resturant, setResturant] = useState({
    "rating": {
      "count": "1586",
      "value": "4.3"
    },
    "_id": "",
    "name": "",
    "location": "",
    "sellerId": "",
    "address": "",
    "timing": [
      {
        "day": "1",
        "open": "9:00",
        "close": "21:00",
        "_id": "6694282655f25efab3999379"
      }
    ],
    "days": [],
    "offer": "Items at ₹199",
    "image": "",
    "__v": 0,
    "tags": [
      "biriyani"
    ],
    "maxPrice": "",
    "minPrice": ""
  });
  const [allDish, setAllDish] = useState([]);
  const [filteredDish, setFilteredDish] = useState([]);
  const [checked, setChecked] = useState(null);
  const [veg, setVeg] = useState(false);
  const [nonVeg, setnonVeg] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState("");
  const [deliveryDistance,setDeliveryDistance] = useState("");
  const [deliveryCharge,setDeliveryCharge] = useState("");
  const { locationData, setLocationData } = useContext(LocationContext);
 
  useEffect(()=>{
    window.scrollTo(0, 0);
    getResturantDetails();
  },[]);
  useEffect(() => {
    getDishes();
    filterDish();
  }, [resturant]);

  useEffect(() => {
    filterDish();
  }, [veg, nonVeg]);

  useEffect(() => {
   getDistance();
  },[resturant,locationData])
  

  const getDistance = async () => {
    const payload = {
      resturantLatLong: resturant.location,
      userLatLong: locationData.lat + "," + locationData.lon
    };
     console.log("locationData",locationData);
     console.log("payload",payload);
    const queryParams = new URLSearchParams(payload).toString();
    const url = `${process.env.REACT_APP_GET_DISTANCE}?${queryParams}`;
    
    try {
      const res = await axios.get(url);
      console.log("distance data", res.data);

      setDeliveryTime(`${parseFloat(res.data.duration).toFixed(0)} min - ${parseFloat(res.data.duration + 10).toFixed(0)} min`)

      setDeliveryDistance(parseFloat(res.data.distance).toFixed(2));

      setDeliveryCharge(parseFloat(parseFloat(res.data.distance) * 10).toFixed(0));
      // setResturant(res.data); // Uncomment if you need to set state
    } catch (e) {
      console.log("distance data err", e);
    }
  };
  
const getResturantDetails = async () => {
  console.log("resturant  data");
await axios.get(process.env.REACT_APP_GET_RESTURANT_BY_ID + "/" + id).then((res) => {
  setResturant(res.data);
  console.log("resturant  data",res.data);
}).catch((e) => {
  console.log("err",e);
})

};
  const getDishes = async () => {
    await axios
      .get(process.env.REACT_APP_GET_PRODUCT + "/" + resturant._id)
      .then((res) => {
        console.log("res", res);
        setAllDish(res.data);
        setFilteredDish(res.data);
      })
      .catch((e) => {
        console.log("err", e);
      });
  };
  const filterDish = () => {
    let tempFilteredDishes = [...allDish];
    console.log("veg", veg);
    console.log("nonveg", nonVeg);
    if (!nonVeg && !veg) {
    
      tempFilteredDishes = allDish;
    } else if (veg) {

      tempFilteredDishes = tempFilteredDishes.filter(
        (item) => item.veg === true
      );
    } else if (nonVeg) {
 
      tempFilteredDishes = tempFilteredDishes.filter(
        (item) => item.veg === false
      );
    }
    setFilteredDish(tempFilteredDishes);
  };
  const handleToggle = (type, e) => {
    // setChecked(checked === id ? null : id);
    if (type === "veg") {
      setVeg(e.target.checked);
      if (e.target.checked) setnonVeg(!e.target.checked);
    } else {
      setnonVeg(e.target.checked);
      if (e.target.checked) setVeg(!e.target.checked);
    }
    console.log("switch", type);
    console.log("e", e.target.checked);
  };

  const formattedCount =
    parseFloat(resturant.rating.count) >= 1000
      ? (parseFloat(resturant.rating.count) / 1000).toFixed(1) + "K"
      : parseFloat(resturant.rating.count);
  return (

   
    <div className="pl-[22%] pr-[22%] pt-[20px] h-full bg-gray-200">

{/* <div className="fixed top-0 left-8 h-full w-1/6 bg-white shadow-lg mt-[100px] rounded-2xl">
        <div className="p-4">
          <h2 className="text-xl font-bold">Left Sidebar</h2>
        
        </div>
      </div> */}

     <div className="bg-white p-8 rounded-2xl min-h-[100dvh] shadow-lg">

     <div className="font-bold p-8 text-[30px]">{resturant.name}</div>
      <div class="rounded-2xl w-full h-[200px] bg-white p-4 border border-gray-300 shadow-lg">
        <div className="mt-[1px] flex space-x-1 pt-2">
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
          <div className="text-[rgb(65,68,73)] font-bold text-black">
            {resturant.rating.value > 0 && (
              <div className="inline-block">
                {" "}
                {resturant.rating.value} | ({formattedCount} ratings) |{" "}
              </div>
            )}{" "}
            {resturant.offer}
          </div>
        </div>

        <div className="text-customHoverColor p-2 font-semibold cursor-pointer">
          {resturant.tags.join(", ")}
        </div>

        <div className="flex pt-2">
          <div className="">
            <div className="rounded-full w-[10px] h-[10px]  pl-[2.5px] text-white bg-customHoverColor pt-[2px] mt-[2px]"></div>
            <div className="w-[3px] h-[20px]  pl-[2.5px] text-white bg-customHoverColor ml-[4px]"></div>
            <div className="rounded-full w-[10px] h-[10px] pl-[2.5px] text-white bg-customHoverColor "></div>
          </div>
          <div>
            <div className="mt-[-6px] pl-[4px] font-bold text-[13px] text-gray-500 w-[90%] overflow-hidden truncate">
              {resturant.address}
            </div>
            <div className="mt-[13px] pl-[4px] font-bold text-[13px] text-gray-500 ">
              {deliveryTime}
            </div>
          </div>
        </div>
        <hr class="border-t-[1px] border-gray-300 mt-[10px] p-1"></hr>
        <div className="text-grey-700  flex">
          <img className="deliveryIcons" src={deliveryIcon} alt="delivery" />
          <div className="ml-[5px] text-[13px] text-gray-500 font-semibold">
            {`${deliveryDistance}Km`} | ₹{deliveryCharge} Delivery fee will apply
          </div>
        </div>
      </div>

      <div className="w-full mt-[50px]">
        {/* <label class="inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" class="sr-only peer"></input>
  <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
  
  </div>
  <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</span>
</label> */}
    
        <div className="rounded-2xl inline-block border pt-4 pl-2">
          <label class="relative inline-block w-16 h-8 mr-4">
            <input
              type="checkbox"
              class="toggle-input opacity-0 w-0 h-0"
              checked={nonVeg}
              onChange={(e) => handleToggle("nonveg", e)}
            ></input>
            <div
              class={`h-[15px] toggle-switch absolute inset-0 bg-gray-300 rounded-full cursor-pointer transition duration-200  ${
                nonVeg ? "bg-red-500" : "bg-gray-300"
              }`}
            >
              <div class=" mt-[-8px] toggle-circle-nonveg absolute top-1 left-1 w-6 h-6 bg-white  shadow-md transition transform duration-200 border border-red-700 "></div>
            </div>
          </label>
        </div>

        <div className="rounded-2xl inline-block border pt-4 pl-2 pr-4 ml-4">
          <label class="relative inline-block w-16 h-8">
            <input
              type="checkbox"
              class="toggle-input opacity-0 w-0 h-0"
              checked={veg}
              onChange={(e) => handleToggle("veg", e)}
            ></input>
            <div
              class={` h-[15px] toggle-switch absolute inset-0 bg-gray-300 rounded-full cursor-pointer transition duration-200 ${
                veg ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <div class=" mt-[-8px] toggle-circle-veg absolute top-1 left-1 w-6 h-6 bg-white  shadow-md transition transform duration-200 border-2 border-green-700"></div>
            </div>
          </label>
        </div>
        <hr class="border-t-[1px] border-gray-300 mt-8"></hr>
        {/* <img className="vegIcons" src={veg} alt="KFC" /> */}
      </div>
      {filteredDish.map((dish) => (
        <Dish dish={dish} ></Dish>
      ))}
      
     </div>
      
    </div>
  );
}

export default Resturant;
