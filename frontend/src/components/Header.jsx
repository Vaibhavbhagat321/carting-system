import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { HiShoppingBag } from "react-icons/hi2";
import CartContext from "../context/CartContext";

function Header() {
  const context = useContext(CartContext);
  const { user, logout, isAdmin } = context;
  return (
    <header className="header">
      <Link to="/">
        <h1 className="header_heading">E-Commerce</h1>{" "}
      </Link>
      <div>
        <ul className="header_list">
          {user && !isAdmin && (
            <Link to="/cart">
              <li className="inline-block">
                <HiShoppingBag className="text-3xl" />
              </li>
            </Link>
          )}
          <li className="inline-block">
            {!user ? (
              <Link to="/login">
                <button className="btn">login</button>
              </Link>
            ) : (
              <button onClick={() => logout()} className="btn">
                logout
              </button>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
