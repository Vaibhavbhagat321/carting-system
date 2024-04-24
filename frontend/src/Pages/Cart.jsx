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
    <div className="cart_container">
      <div className="cart_box">
        <h1 className="text-base sm:text-xl font-bold">Cart</h1>
        {cart.length > 0 && (
          <Link to="/place-order">
            <button className="btn">Place Order</button>
          </Link>
        )}
      </div>
      <div className="cart_card_container">
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
