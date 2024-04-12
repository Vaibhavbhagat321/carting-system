import React, { useContext, useEffect } from "react";
import CartContext from "../context/CartContext";
import CartProductCard from "../components/CartProductCard";
import { Link } from "react-router-dom";

function Cart() {
  const context = useContext(CartContext);
  const { cart, getCart } = context;

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div className="mb-5 flex flex-col justify-center items-center">
      <div className="flex flex-row justify-between items-center w-[80%]">
        <h1 className="text-xl font-bold">Cart</h1>
        {cart.length > 0 && (
          <Link to="/place-order">
            <button className="border bg-slate-800 text-white active:translte-y-[1px] px-2 py-1">
              Place Order
            </button>
          </Link>
        )}
      </div>
      <div className="flex flex-col gap-y-5 items-center w-[80%] min-h-[50vh] py-2">
        {cart.map((ele) => (
          <CartProductCard
            cart={ele}
            type="cart"
            key={ele._id}
          ></CartProductCard>
        ))}
      </div>
    </div>
  );
}

export default Cart;
