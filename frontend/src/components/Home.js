import React, { useEffect, useState } from "react";
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
function Home() {
  const products = [
    { id: 1, name: "Product 1", image: biriyani },
    { id: 2, name: "Product 2", image: burger },
    { id: 3, name: "Product 3", image: cake },
    { id: 4, name: "Product 4", image: chinese },
    { id: 5, name: "Product 5", image: momos },
    { id: 6, name: "Product 6", image: pizza },
    { id: 7, name: "Product 7", image: rolls },
    { id: 8, name: "Product 8", image: samosas },
    { id: 9, name: "Product 9", image: shawrma },
    { id: 10, name: "Product 10", image: south },
  ];

  const [allProduct, setAllProduct] = useState([]);
  const [displayProduct, setDisplayProduct] = useState([]);
  const [displayFilters, setDisplayFilters] = useState([]);
  const [radioSelected, setRadioSelected] = useState("relevance");
  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [allProduct, displayFilters, radioSelected]);

  const applyFilter = () => {
    var filteredProducts;
    if (!displayFilters.length) {
      filteredProducts = [...allProduct];
    } else {
      const filterTagValues = displayFilters.map((tag) => tag.value);
      console.log("filterTagValues", filterTagValues);
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
    console.log("type", type);
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
    if (radioSelected === "relevence") return;

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

  const getProduct = async () => {
    await axios
      .get(process.env.REACT_APP_GET_RESTURANT + "/banglore")
      .then((res) => {
        console.log("res", res);
        setAllProduct(res.data);
      })
      .catch((e) => {
        console.log("err", e);
      });
  };
  return (
    <div className="pl-[10%] pr-[100px] pt-[20px] h-[1000px]">
      {/* <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1> */}
      <h1 className="font-bold text-[25px] pl-[50px]">What's on your mind?</h1>
      <Carousel products={products}></Carousel>
      <hr className="mt-[50px]"></hr>
      <h1 className="font-bold text-[25px] pl-[50px] mt-[30px]">
        Restaurants with online food delivery in Bangalore
      </h1>
      <Filter
        displayFilters={displayFilters}
        setDisplayFilters={setDisplayFilters}
        radioSelected={radioSelected}
        setRadioSelected={setRadioSelected}
      ></Filter>
      <div className="flex">
        {displayProduct.map((item) => (
          <Product product={item}></Product>
        ))}
      </div>
    </div>
  );
}

export default Home;
