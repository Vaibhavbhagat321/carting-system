import React, { useContext, useState } from "react";
import CartContext from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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

    //########## PAYMENT GATEWAY IMPLEMENTATION

    // checkout(
    //   `${redirect_URL}/order?contact=${contact}&address=${address}&carts=${cart.map(
    //     (ele) => ele._id
    //   )}`,
    //   `${redirect_URL}/login`
    // );

    //##########  WITHOUT PAYMENT GATEWAY IMPLEMENTATION
    const data = await createOrder({
      address,
      contact: +contact,
      carts: cart.map((ele) => ele._id),
    });

    toast.success("Order placed");
    navigate(`/order/${data._id}`);
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
    <div className="cart_container">
      <form onSubmit={handleSubmit} className="place_order_box">
        <h1 className="form_heading">Complete your order</h1>

        <div className="form-group">
          <label htmlFor="contact" className="form_label">
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
          <label htmlFor="address" className="form_label">
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
          <h1 className="place_order_subheading">Products in Order:</h1>
          <div className="">
            {cart.map((ele) => (
              <div key={ele._id} className="place_order_prdlist">
                <div>
                  <h2 className="font-medium">Product: {ele.product.name}</h2>
                  <p>Price: {ele.product.price}/-</p>
                  <p>Quantity: {ele.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="place_order_prdlist">
            Total Price :<span className="font-bold"> {totalPrice}/-</span>
          </p>
        </div>

        <div></div>

        <div className="flex flex-col items-center justify-center gap-1 mt-8">
          <button type="submit" className="btn">
            Proceed to payment
          </button>
        </div>
      </form>
    </div>
  );
}

export default PlaceOrder;
