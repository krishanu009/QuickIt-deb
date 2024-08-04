import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Resturant from "./components/Resturant";
import Loader from "./components/Loader";
import {CartContext} from './context/CartContext'
import { useEffect, useState } from "react";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom"
import CheckoutForm from "./components/CheckoutForm";
import Search from "./components/Search";

function App() {
  const [cart,setCart] = useState([]);
  const value = {cart,setCart};
  const [currentUser, setCurrentUser] = useState({
    name:"",
    email:""
  })

useEffect(()=>{
  getCurrentUser();
},[])
  const getCurrentUser = async () => {
    // /current
   
    await axios
    .get("/user/current", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },

    })
    .then((res) => {
      console.log("current user", res);
      setCurrentUser(res.data);
    })
    .catch((e) => {
      console.log("err", e);
    });
     
  }

  const logOut = () => {
    localStorage.removeItem('token');
    setCurrentUser({
      name:"",
      email:""
    })
  }
  return (
    // <div>
    //   <Header></Header>
    //   {/* <Home></Home> */}
    //   <Cart></Cart>

    // </div>

    <>
    <CartContext.Provider value={value}>
      
      
      <Router>
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} logOut = {logOut}></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/:id" element={<Resturant />} />
          <Route path="/cart" element={<Cart currentUser = {currentUser} setCurrentUser = {setCurrentUser}/>} />
          <Route path="/login" element={<Login currentUser = {currentUser} setCurrentUser = {setCurrentUser} getCurrentUser={getCurrentUser}></Login>} />
          <Route path="/register" element={<Register currentUser = {currentUser} setCurrentUser = {setCurrentUser} getCurrentUser={getCurrentUser}></Register>} />
          <Route path="/checkout" element={<CheckoutForm></CheckoutForm>} />
          <Route path="/search" element={<Search></Search>} />
        </Routes>
      </Router>
      </CartContext.Provider>
    </>
   
  
  );
}

export default App;
