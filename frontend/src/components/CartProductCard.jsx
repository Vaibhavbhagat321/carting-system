import React, { useState, useContext } from "react";
import { HiTrash } from "react-icons/hi2";
import CartContext from "../context/CartContext";

function CartProductCard({ cart }) {
  const [count, setCount] = useState(cart.quantity);
  const context = useContext(CartContext);
  const { deleteCart, updateCartQuantity } = context;

  const total = cart.quantity * cart.product.price;

  return (
    <div className="cart_card">
      <div>
        <img
          src="/product.jpg"
          alt={cart.product.name}
          className="cart_image"
        />
      </div>
      <div className="cart_info_operation_container">
        <div className="cart_info_container">
          <h2 className="product_name">{cart.product.name}</h2>
          <p className="product_desc">{cart.product.description}</p>
          <p className="product_desc">{cart.quantity} item</p>
          <h2 className="product_price">{cart.product.price}/-</h2>
        </div>
        <div className="cart_operation_container">
          <button
            className="cart_operation_btn"
            // onClick={() => setCount((prev) => +prev + 1)}
            onClick={() => {
              updateCartQuantity(cart._id, +count + 1);
              setCount((prev) => +prev + 1);
            }}
          >
            +
          </button>
          <input
            className="cart_operation_input"
            type="text"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            onBlur={(e) => {
              updateCartQuantity(cart._id, e.target.value);
              setCount(e.target.value);
            }}
          />
          <button
            onClick={() => {
              updateCartQuantity(cart._id, +count > 1 ? +count - 1 : 1);
              setCount((prev) => (+prev > 1 ? +prev - 1 : 1));
            }}
            className="cart_operation_btn"
          >
            -
          </button>
          <button
            onClick={() => deleteCart(cart._id)}
            className="cart_operation_btn-delete"
          >
            <HiTrash />
          </button>
        </div>
        <div className="absolute right-2 bottom-2 product_price">
          {total} /-
        </div>
      </div>
    </div>
  );
}

export default CartProductCard;
