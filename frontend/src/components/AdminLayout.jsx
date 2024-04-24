import React from "react";
import Header from "./Header";
import { Link, Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <>
      <Header />
      <div className="h-[90vh]  w-full flex flex-row border">
        <div className="px-2 pt-2 w-1/4 border-r-slate-300 border-r-2">
          <ul className="flex flex-col gap-4">
            <Link to="product">
              <li className="flex justify-center items-center h-10 btn">
                Product
              </li>
            </Link>
            <Link to="orders">
              <li className="flex justify-center items-center h-10 btn border w-full">
                Orders
              </li>
            </Link>
          </ul>
        </div>
        <div className="px-2 py-2 border w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AdminLayout;
