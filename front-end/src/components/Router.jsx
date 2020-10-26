import React from "react";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import NavBar from "./NavBar";

import Products from "../pages/Products";
import Cart from "../pages/Cart.jsx";
import Users from "../pages/Users";

import { cartCreated, isLoggedIn } from "../utils";

export const Router = () => {
  return (
    <BrowserRouter>
      <NavBar />
      {isLoggedIn() ? (
        <>
          <Switch>
            {cartCreated() && <Route exact path="/cart" component={Cart} />}
            <Route exact path="/products" component={Products} />
            <Route path="*" component={Products}>
              <Redirect to="/products" />
            </Route>
          </Switch>
        </>
      ) : (
        <>
          <Switch>
            <Route exact path="/users" component={Users} />
            <Route path="*">
              <Redirect to="/users" component={Users} />
            </Route>
          </Switch>
        </>
      )}
    </BrowserRouter>
  );
};
