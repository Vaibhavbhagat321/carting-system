import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./Pages/Home";
import CartState from "./context/CartState";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Cart from "./Pages/Cart";
import ProtecteRoutes from "./components/ProtecteRoutes";
import PlaceOrder from "./Pages/PlaceOrder";
import AdminLayout from "./components/AdminLayout";
import AdminProduct from "./Pages/AdminProduct";
import AdmintOrders from "./Pages/AdmintOrders";
import Order from "./Pages/Order";
import { Toaster } from "react-hot-toast";
import CreateOrder from "./components/CreateOrder";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "cart",
          element: (
            <ProtecteRoutes>
              <Cart />,
            </ProtecteRoutes>
          ),
        },
        {
          path: "place-order",
          element: (
            <ProtecteRoutes>
              <PlaceOrder />
            </ProtecteRoutes>
          ),
        },
        {
          path: "order",
          element: (
            <ProtecteRoutes>
              <CreateOrder />
            </ProtecteRoutes>
          ),
        },
        {
          path: "order/:orderId",
          element: (
            <ProtecteRoutes>
              <Order />
            </ProtecteRoutes>
          ),
        },
      ],
    },
    {
      path: "/admin",
      element: (
        <ProtecteRoutes>
          <AdminLayout />
        </ProtecteRoutes>
      ),
      children: [
        {
          path: "product",
          element: <AdminProduct />,
        },
        {
          path: "orders",
          element: <AdmintOrders />,
        },
      ],
    },
  ]);

  return (
    <CartState>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "black",
          },
        }}
      />
    </CartState>
  );
}

export default App;
