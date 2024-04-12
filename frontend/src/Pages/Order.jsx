import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CartContext from "../context/CartContext";

function Order() {
  const [order, setOrder] = useState({});

  const { orderId } = useParams();

  const context = useContext(CartContext);
  const { getOrder } = context;

  const total = order?.carts?.reduce(
    (acc, cur) => acc + cur.quantity * cur.product.price,
    0
  );

  useEffect(() => {
    async function fetchOrder() {
      const data = await getOrder(orderId);

      setOrder(data?.data);
    }
    fetchOrder();
  }, [orderId]);

  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-8/12 rounded-md border-2 bg-white px-10 py-5">
        <h1 className="my-3 text-center text-3xl font-[500] border-b-[1px] border-b-slate-200 pb-2">
          Order : {order._id}
        </h1>
        <div className="flex flex-col gap-1">
          <p>
            <span className="capitalize">user:</span> {order?.user?.email}
          </p>
          <p>
            <span className="capitalize">contact:</span> {order?.contact}
          </p>
          <p>
            <span className="capitalize">address:</span> {order?.address}
          </p>
          <p>
            <span className="capitalize">staus:</span> {order?.status}
          </p>
          <p>
            <span className="capitalize">created at:</span> {order.createdAt}
          </p>
          <div className="border border-slate-300 px-2 relative py-1 rounded-md">
            <span className="capitalize font-medium">products:</span>
            <p className="absolute top-1 right-2 font-medium">{total} /-</p>
            {order?.carts?.map((ele) => (
              <div
                key={ele._id}
                className="px-2 border-t-[1px] border-slate-300 relative"
              >
                <p className="capitalize ">
                  <span>product:</span> {ele.product.name}
                </p>
                <p className="capitalize ">
                  <span>quantity:</span> {ele.quantity}
                </p>
                <p className="capitalize ">
                  <span>price:</span> {ele.product.price}
                </p>
                <p className="font-medium absolute right-2 bottom-2">
                  {ele.quantity * ele.product.price} /-
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
