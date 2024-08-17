import React from 'react'
import { useState } from 'react';

import  '../styles/Carousel.css'
import { Link,useNavigate } from "react-router-dom";

function Carousel({products}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const nextSlide = () => {
    if (currentIndex < products.length - 7) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const handleClick = (key) => {
    navigate(`/search/${key}`);
  } 

  return (
    <div className="carousel-container cursor-pointer">
      <button className="carousel-button left" onClick={prevSlide}>
        &#8249;
      </button>
      <div className="carousel-wrapper">
        <div
          className="carousel-content"
          style={{ transform: `translateX(-${currentIndex * 14.28}%)` }}
        >
          {products.map((product, index) => (
            // <Link  to={`/search/${product.name.toLowerCase()}`}>
            <div onClick={(e) => {handleClick(product.name.toLowerCase())}}  key={index} className="carousel-item">
              <img src={product.image} alt={product.name} />
              <p className='text-[17px] text-gray-500 font-semibold'>{product.name}</p>
            </div>
           
          ))}
        </div>
      </div>
      <button className="carousel-button right" onClick={nextSlide}>
        &#8250;
      </button>
    </div>
  );
 
}

export default Carousel