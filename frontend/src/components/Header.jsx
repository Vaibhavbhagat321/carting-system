import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { HiShoppingBag } from "react-icons/hi2";
import CartContext from "../context/CartContext";

function Header() {
  const context = useContext(CartContext);
  const { user, logout, isAdmin } = context;
  return (
    <header className="flex justify-between  h-[10vh] items-center sticky left-0 top-0 bg-slate-200 border-b-[1px] border-slate-400 z-10">
      <Link to="/">
        <h1 className="ml-2 text-2xl font-[700]">Cart System</h1>{" "}
      </Link>
      <div>
        <ul className="list-none flex gap-6 mr-2">
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
                <button className="bg-slate-800 text-white active:translate-y-[1px] border px-2 py-1">
                  login
                </button>
              </Link>
            ) : (
              <button
                onClick={() => logout()}
                className="bg-slate-800 text-white border px-2 py-1"
              >
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
