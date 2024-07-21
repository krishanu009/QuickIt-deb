import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Resturant from "./components/Resturant";
function App() {
  return (
    <div>
      <Header></Header>
      {/* <Home></Home> */}
       <Resturant></Resturant>

    </div>
    // <>
      
    //   <Header></Header>
    //   <Router>
    //     <div>
    //       <Switch>
    //         <Route path="/" exact component={Home} />
    //         <Route path="/restaurant/:id" component={RestaurantPage} />
    //       </Switch>
    //     </div>
    //   </Router></>
  );
}

export default App;
