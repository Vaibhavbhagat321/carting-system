import React from "react";
import Header from "./Header";
import { Link, Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <>
      <Header />
      <div className="h-[90vh]  w-full flex flex-row">
        <div className="px-4 py-2 w-1/4 border-r-slate-300 border-r-2">
          <ul className="flex flex-col gap-4">
            <Link to="product">
              <li className=" bg-slate-800 text-white active:translate-y-[1px] flex justify-center items-center h-10">
                Product
              </li>
            </Link>
            <Link to="orders">
              <li className=" bg-slate-800 text-white active:translate-y-[1px] flex justify-center items-center h-10">
                Orders
              </li>
            </Link>
          </ul>
        </div>
        <div className="px-4 py-2">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AdminLayout;
