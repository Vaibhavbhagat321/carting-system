import React, { useContext, useState } from "react";
import CartContext from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function PlaceOrder() {
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  const context = useContext(CartContext);
  const { cart, checkout, createOrder, redirect_URL } = context;
  const navigate = useNavigate();

  let totalPrice = 0;

  cart.forEach((ele) => {
    totalPrice = totalPrice + ele.product.price * ele.quantity;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkout(
      `${redirect_URL}/order?contact=${contact}&address=${address}&carts=${cart.map(
        (ele) => ele._id
      )}`,
      `${redirect_URL}/login`
    );

    // const data = await createOrder({
    //   address,
    //   contact: +contact,
    //   carts: cart.map((ele) => ele._id),
    // });

    // console.log("Order Placed");
    // navigate(`/order/${data._id}`);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   createOrder({
  //     address,
  //     contact: +contact,
  //     carts: cart.map((ele) => ele._id),
  //   });
  // };

  return (
    <div className="flex w-full items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-5/12 rounded-md border-2 bg-white px-10 py-5"
      >
        <h1 className="my-3 text-center text-3xl font-[500]">
          Complete your order
        </h1>

        <div className="form-group">
          <label htmlFor="contact" className="block">
            Contact :
          </label>
          <input
            type="number"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="input"
            autoComplete="off"
            required
          />
        </div>

        <div className="form-group relative">
          <label htmlFor="address" className="block">
            Address :
          </label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows="3"
            cols="10"
            className="input"
            required
          />
        </div>

        <div>
          <h1 className="text-xl font-medium">Products in Order:</h1>
          <div className="">
            {cart.map((ele) => (
              <div
                key={ele._id}
                className="flex flex-row gap-3 my-2 border-b-[1px] border-b-slate-200 px-3"
              >
                <div>
                  <h2 className="">Product: {ele.product.name}</h2>
                  <p>Price: {ele.product.price}/-</p>
                  <p>Quantity: {ele.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <h1>
            Total Price :<span className="font-bold"> {totalPrice}/-</span>
          </h1>
        </div>

        <div></div>

        <div className="flex flex-col items-center justify-center gap-1 mt-8">
          <button
            type="submit"
            className="bg-slate-800 active:translate-y-[1px] text-white px-2 py-1"
          >
            Proceed to payment
          </button>
        </div>
      </form>
    </div>
  );
}

export default PlaceOrder;
