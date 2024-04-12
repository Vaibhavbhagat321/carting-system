import React, { useContext, useEffect } from "react";
import CartContext from "../context/CartContext";

function AdmintOrders() {
  const context = useContext(CartContext);
  const { getAllOrders, orders } = context;

  useEffect(() => {
    getAllOrders();
  }, []);

  const calcTotal = (order) => {
    let total = 0;

    if (order.carts.length > 0)
      total = order.carts.reduce(
        (acc, cur) => acc + cur.quantity * cur.product.price,
        0
      );

    return total;
  };

  return (
    <div className="w-[70vw] h-[90vh] overflow-y-scroll">
      <h2 className="text-xl font-medium">Order</h2>
      <div className="my-4  flex gap-x-8 gap-y-6 flex-wrap flex-col justify-around items-center">
        {orders.map((order) => (
          <div key={order._id} className="border border-black w-full px-4 py-2">
            <h2 className="text-xl font-medium">{`Order Id : ${order._id}`}</h2>
            <div className="px-3 py-1 flex flex-col gap-1">
              <p>User: {order.user?.email}</p>
              <div>
                Products:{" "}
                <ul className="px-2 flex flex-col flex-wrap gap-1">
                  {order.carts.map((ele) => (
                    <li
                      key={ele._id}
                      className="py-1 border-b-[1px] border-b-slate-200"
                    >
                      <p>Name: {ele.product.name}</p>
                      <p>Quantity: {ele.quantity}</p>
                      <p>Product price: {ele.product.price}</p>
                    </li>
                  ))}
                  <p>Total: {calcTotal(order)}/-</p>
                  <p>Status: {order.status}</p>
                </ul>
              </div>
              <p>Contact: {order.contact}</p>
              <p>Address: {order.address}</p>
              <p>
                CreatedAt:{" "}
                {new Date(order.createdAt).toISOString().split("T")[0]}{" "}
                {
                  new Date(order.createdAt)
                    .toISOString()
                    .split("T")[1]
                    .split(".")[0]
                }
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdmintOrders;
