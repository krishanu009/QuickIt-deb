import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Resturant from "./components/Resturant";
import Loader from "./components/Loader";
import {CartContext} from './context/CartContext'
import { useState } from "react";
function App() {
  const [cart,setCart] = useState([]);
  const value = {cart,setCart};
  return (
    // <div>
    //   <Header></Header>
    //   {/* <Home></Home> */}
    //    <Resturant></Resturant>

    // </div>

    <>
    <CartContext.Provider value={value}>
      <Header></Header>
      
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/:id" element={<Resturant />} />
        </Routes>
      </Router>
      </CartContext.Provider>
    </>
    // <Loader></Loader>
  );
}

export default App;
