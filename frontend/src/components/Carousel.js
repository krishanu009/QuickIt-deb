import React from 'react'
import { useState } from 'react';

import  '../styles/Carousel.css'


function Carousel({products}) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => {
      if (currentIndex < products.length - 7) {
        setCurrentIndex(currentIndex + 1);
      }
    };
  
    const prev = () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    };
  
    return (
      <div className="carousel-container">
        <button onClick={prev} disabled={currentIndex === 0}>
          &#8592;
        </button>
        <div className="carousel">
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${currentIndex * (140 + 10)}px)` }} // Adjust for product width and margin
          >
            {products.map((product) => (
              <div key={product.id} className="product">
                <img src={product.image} alt={product.name} />
                <p>{product.name}</p>
              </div>
            ))}
          </div>
        </div>
        <button onClick={next} disabled={currentIndex >= products.length - 7}>
          &#8594;
        </button>
      </div>
    );
 
}

export default Carousel