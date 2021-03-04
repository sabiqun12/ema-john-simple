import React, { createContext, useState } from 'react';
//import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import Notfound from './NotFound/Notfound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import LogIn from './components/LogIn/LogIn';
import Shipment from './components/Shipment/Shipment';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import SignIn from './components/LogIn/SignIn';


export const UserContext = createContext();

function App() {
  const[loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value = {[loggedInUser, setLoggedInUser]}>
      <h3>Email:{loggedInUser.email}</h3>
      <Router>
      <Header></Header>
        <Switch>
          <Route path="/shop">
          <Shop></Shop>
          </Route>
          <Route path="/review">
          <Review></Review>
          </Route>
          <Route path="/logIn">
            <SignIn></SignIn>
          </Route>
          {/* <Route path="/login">
          <LogIn></LogIn>
          </Route> */}
          {/* <PrivateRoute path="/shipment">
          <Shipment></Shipment>
          </PrivateRoute> */}
          <PrivateRoute path="/shipment">
            <Shipment/>
          </PrivateRoute>
          <PrivateRoute path="/manage">
          <Inventory></Inventory>
          </PrivateRoute>
          <Route exact path="/">
          <Shop></Shop>
          </Route>
          <Route path="/product/:productkey">
          <ProductDetail></ProductDetail>
          </Route>
          <Route path="*">
          <Notfound></Notfound>
          </Route>
       </Switch>
      </Router>  
    </UserContext.Provider>
  );
}

export default App;
