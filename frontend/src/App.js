import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Resturant from "./components/Resturant";
import Loader from "./components/Loader";
import {CartContext} from './context/CartContext'
import { useState } from "react";
import Cart from "./components/Cart";
function App() {
  const [cart,setCart] = useState([]);
  const value = {cart,setCart};
  return (
    // <div>
    //   <Header></Header>
    //   {/* <Home></Home> */}
    //   <Cart></Cart>

    // </div>

    <>
    <CartContext.Provider value={value}>
      
      
      <Router>
      <Header></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/:id" element={<Resturant />} />
          <Route path="/cart" element={<Cart/>} />
        </Routes>
      </Router>
      </CartContext.Provider>
    </>
   
  
  );
}

export default App;
