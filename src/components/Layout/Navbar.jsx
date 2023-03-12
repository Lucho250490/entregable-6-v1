import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./styles/Navbar.css";

const Navbar = () => {
  const { products } = useSelector((store) => store.cart);
  const { token } = useSelector((store) => store.userInfo);

  return (
    <nav className="navbar">
      <NavLink className="navbar__name" to={"/"}>
        <h2>e-commerce</h2>
      </NavLink>

      <div className="navbar__containerLinks">
        <NavLink className="navbar__link" to={"/login"}>
          <i className="bx bxs-user-pin"></i>
        </NavLink>

        <NavLink className="navbar__link" to={"/purchases"}>
          <i className="bx bxs-box"></i>
        </NavLink>

        <NavLink className="navbar__link" to={"/cart"}>
          <i className="bx bx-cart-download">
            {" "}
            {token ? <span>{products.length}</span> : ""}
          </i>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
