import React, { useEffect, useState, useContext } from "react";
import Carousel from "./Carousel";
import biriyani from "../assets/biriyani.avif";
import burger from "../assets/burger.jpg";
import cake from "../assets/cake.jpg";
import chinese from "../assets/chinese.jpg";
import momos from "../assets/momos.jpg";
import pizza from "../assets/pizza.jpg";
import rolls from "../assets/rolls.jpg";
import samosas from "../assets/samosas.jpg";
import shawrma from "../assets/shawrma.jpg";
import south from "../assets/south.jpg";
import Filter from "./Filter";
import Product from "./Product";
import axios from "axios";
import { Link } from "react-router-dom";
import { LocationContext } from "../context/LocationContext.js";
import Footer from "./Footer.js";

function Home() {
  const products = [
    { id: 1, name: "Biriyani", image: biriyani },
    { id: 2, name: "Burger", image: burger },
    { id: 3, name: "Cake", image: cake },
    { id: 4, name: "Chinese", image: chinese },
    { id: 5, name: "Momos", image: momos },
    { id: 6, name: "Pizza", image: pizza },
    { id: 7, name: "Rolls", image: rolls },
    { id: 8, name: "Samosas", image: samosas },
    { id: 9, name: "Shawrma", image: shawrma },
    { id: 10, name: "South", image: south },
  ];

  const { locationData } = useContext(LocationContext);
  const [allProduct, setAllProduct] = useState([]);
  const [displayProduct, setDisplayProduct] = useState([]);
  const [displayFilters, setDisplayFilters] = useState([]);
  const [radioSelected, setRadioSelected] = useState("relevance");
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const filterElement = document.getElementById("filter-component");
      if (filterElement) {
        const rect = filterElement.getBoundingClientRect();
        setIsSticky(rect.top <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    let latlng = locationData.lat + "," + locationData.lon;
    getProduct(latlng);
  }, [locationData]);

  useEffect(() => {
    applyFilter();
  }, [allProduct, displayFilters, radioSelected]);

  const applyFilter = () => {
    let filteredProducts;
    if (!displayFilters.length) {
      filteredProducts = [...allProduct];
    } else {
      const filterTagValues = displayFilters.map((tag) => tag.value);
      filteredProducts = allProduct.filter((item) =>
        item.tags.some((tag) => filterTagValues.includes(tag))
      );
    }

    sortProduct(filteredProducts);
    setDisplayProduct(filteredProducts);
  };

  const sortByRating = (data) => {
    return data.sort(
      (a, b) => parseFloat(b.rating.value) - parseFloat(a.rating.value)
    );
  };

  const sortByPrice = (data, type) => {
    if (type === "costhightolow")
      return data.sort(
        (a, b) => parseFloat(b.maxPrice) - parseFloat(a.maxPrice)
      );

    if (type === "costlowtohigh")
      return data.sort(
        (a, b) => parseFloat(a.minPrice) - parseFloat(b.minPrice)
      );
  };

  const sortProduct = (filteredProducts) => {
    if (radioSelected === "relevance") return;

    if (radioSelected === "rating") {
      sortByRating(filteredProducts);
    }

    if (
      radioSelected === "costlowtohigh" ||
      radioSelected === "costhightolow"
    ) {
      sortByPrice(filteredProducts, radioSelected);
    }
  };

  const getProduct = async (location) => {
    await axios
      .get(process.env.REACT_APP_GET_RESTURANT + "/" + location)
      .then((res) => {
        setAllProduct(res.data);
      })
      .catch((e) => {
        console.log("err", e);
      });
  };
  return (
    <div className="h-screen">
      <div className="">
        <h1 className="font-bold text-[25px] pl-[50px]">
          What's on your mind?
        </h1>
        <Carousel products={products} />
        <hr className="mt-[50px]" />
        <h1 className="font-bold text-[25px] pl-[50px] mt-[30px]">
          Restaurants with online food delivery in Bangalore
        </h1>
        <div
          id="filter-component"
          className={`flex pl-16 pb-4 transition-all duration-100 ${
            isSticky ? "sticky top-0 bg-white z-50 shadow" : ""
          }`}
          style={{ zIndex: isSticky ? 50 : "auto" }} // Ensure proper stacking context
        >
          <div className=" grid grid-cols-7 gap-2 mt-2">
            <div className="col-span-6">
              <Filter
                displayFilters={displayFilters}
                setDisplayFilters={setDisplayFilters}
                radioSelected={radioSelected}
                setRadioSelected={setRadioSelected}
              />
            </div>
            {isSticky && (
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
                &nbsp;&nbsp;&nbsp;<Link to={`/search/food`}>Search</Link>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 grid grid-cols-5 gap-2 mt-2">
          {displayProduct.map((item) => (
            <Link key={item._id} to={`/restaurant/${item._id}`}>
              <Product product={item} />
            </Link>
          ))}

          {displayProduct.map((item) => (
            <Link key={item._id} to={`/restaurant/${item._id}`}>
              <Product product={item} />
            </Link>
          ))}
        </div>
      </div>
     <Footer></Footer>
      
    </div>
  );
  //   return (
  //     <div className="px-32 md:px-10 lg:px-32 xl:px-20 pt-5 h-auto overflow-x-hidden">
  //       <h1 className="font-bold text-[25px] pl-[50px]">What's on your mind?</h1>
  //       <Carousel products={products} />
  //       <hr className="mt-[50px]" />
  //       <h1 className="font-bold text-[25px] pl-[50px] mt-[30px]">
  //         Restaurants with online food delivery in Bangalore
  //       </h1>
  //       <div
  //         id="filter-component"
  //         className="sticky top-0 bg-white z-50"
  //       >
  //         {/* <Filter
  //           displayFilters={displayFilters}
  //           setDisplayFilters={setDisplayFilters}
  //           radioSelected={radioSelected}
  //           setRadioSelected={setRadioSelected}
  //         /> */}
  //       </div>

  //       <div className="p-4 grid grid-cols-5 gap-2 mt-2">
  //         {displayProduct.map((item) => (
  //           <Link key={item._id} to={`/restaurant/${item._id}`}>
  //             <Product product={item} />
  //           </Link>
  //         ))}

  // {displayProduct.map((item) => (
  //           <Link key={item._id} to={`/restaurant/${item._id}`}>
  //             <Product product={item} />
  //           </Link>
  //         ))}
  //       </div>
  //     </div>
  //   );
}

export default Home;
