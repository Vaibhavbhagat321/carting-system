import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

function AppLayout() {
  return (
    <>
      <Header />
      <main className="w-full px-4 py-2 mt-3">
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;
