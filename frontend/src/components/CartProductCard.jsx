import React, { useState, useContext } from "react";
import { HiTrash } from "react-icons/hi2";
import CartContext from "../context/CartContext";

function CartProductCard({ cart }) {
  const [count, setCount] = useState(cart.quantity);
  const context = useContext(CartContext);
  const { deleteCart, updateCartQuantity } = context;

  const total = cart.quantity * cart.product.price;

  return (
    <div className="flex flex-row gap-3 justify-start items-center border border-slate-200 px-4 py-2 w-full rounded-lg h-50 relative">
      <div>
        <img src="/product.jpg" alt={cart.product.name} className="h-46 w-40" />
      </div>
      <div className=" w-full h-full flex flex-row justify-between items-center ">
        <div className=" w-[80%] h-full flex flex-col gap-1">
          <h2 className="text-xl font-bold capitalize">{cart.product.name}</h2>
          <p className="w-full capitalize">{cart.product.description}</p>
          <p className="w-full">{cart.quantity} item</p>
          <h2 className="font-bold">{cart.product.price}/-</h2>
        </div>
        <div className="">
          <button
            className="bg-slate-200 px-2 py-1 border border-slate-500 h-8 w-8 active:translate-y-[1px]"
            // onClick={() => setCount((prev) => +prev + 1)}
            onClick={() => {
              updateCartQuantity(cart._id, +count + 1);
              setCount((prev) => +prev + 1);
            }}
          >
            +
          </button>
          <input
            className="border border-slate-500 active:translate-y-[1px] w-10 text-center  h-8"
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
            className="bg-slate-200 px-2 py-1 border border-slate-500 active:translate-y-[1px]  h-8 w-8"
          >
            -
          </button>
          <button
            onClick={() => deleteCart(cart._id)}
            className="border px-2 py-1  h-8 w-8 border-slate-500 active:translate-y-[1px]"
          >
            <HiTrash />
          </button>
        </div>
        <div className="absolute right-2 bottom-2 font-bold">{total} /-</div>
      </div>
    </div>
  );
}

export default CartProductCard;
