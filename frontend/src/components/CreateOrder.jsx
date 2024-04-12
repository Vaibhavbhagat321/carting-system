import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CartContext from "../context/CartContext";

function CreateOrder() {
  const [searchParams, setSerchParams] = useSearchParams();
  const [count, setCount] = useState(0);

  const { createOrder } = useContext(CartContext);
  const navigate = useNavigate();

  const placingOrder = async () => {
    const data = await createOrder({
      contact: searchParams.get("contact"),
      address: searchParams.get("address"),
      carts: searchParams.get("carts").split(","),
    });

    navigate(`/order/${data._id}`);
  };

  useEffect(() => {
    placingOrder();
  }, []);

  return <div></div>;
}

export default CreateOrder;
