import React, { useState } from "react";
import CartContext from "./CartContext";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

function CartState({ children }) {
  const URL = `https://vowelweb-task-api.vercel.app`;
  const redirect_URL = `https://vowelweb-task.vercel.app`;
  // const redirect_URL = `http://localhost:5173`;
  // const URL = `http://localhost:8000`;

  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(() =>
    localStorage.getItem("cartToken") ? localStorage.getItem("cartToken") : ""
  );

  const [cart, setCart] = useState([]);

  const [isAdmin, setIsAdmin] = useState(() => {
    let bool = false;
    async function getUser() {
      const userData = await fetch(`${URL}/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("cartToken")}`,
        },
      });

      const user = await userData.json();
      if (user.data.role === "admin") bool = true;
    }

    if (localStorage.getItem("cartToken")) getUser();
    return bool;
  });
  const [orders, setOrders] = useState([]);

  const fetchProducts = async () => {
    try {
      const data = await fetch(`${URL}/product`);
      const prod = await data.json();
      setProducts(prod.data);
    } catch (err) {
      console.log(err);
    }
  };

  const register = async (user) => {
    try {
      await fetch(`${URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      // const prod = await data.json();
      // console.log(prod);
    } catch (err) {
      console.log(err);
    }
  };

  const login = async (user) => {
    try {
      const data = await fetch(`${URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const prod = await data.json();

      const token = prod.token ? true : false;

      if (token) {
        toast.success("Login Successfull!");
        setUser(prod.token);
        localStorage.setItem("cartToken", prod.token);
        const userData = await fetch(`${URL}/user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${prod.token}`,
          },
        });

        const user = await userData.json();
        user.data.role === "admin" && setIsAdmin(true);
      } else {
        toast.error("Login Failed! Try again.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    setUser("");
    setIsAdmin(false);
    localStorage.removeItem("cartToken");
    toast.success("Logout successfull.");
  };

  const addToCart = async (productId) => {
    try {
      if (!user) throw new Error("You are not logged in! Log in to use cart.");
      const data = await fetch(`${URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
        body: JSON.stringify({ product: productId }),
      });
      const doc = await data.json();
      doc.status === "success" && toast.success(`Added to cart.`);
    } catch (err) {
      console.log(err);
    }
  };

  const getCart = async () => {
    try {
      if (!user) throw new Error("You are not logged in! Log in to use cart.");
      const data = await fetch(`${URL}/cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
      });
      const cart = await data.json();
      setCart(cart.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCart = async (productId) => {
    try {
      if (!user) throw new Error("You are not logged in! Log in to use cart.");
      await fetch(`${URL}/cart/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
      });
      getCart();
    } catch (err) {
      console.log(err);
    }
  };

  const updateCartQuantity = async (productId, productQuantity) => {
    try {
      if (!user) throw new Error("You are not logged in! Log in to use cart.");
      await fetch(`${URL}/cart/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
        body: JSON.stringify({
          quantity: productQuantity,
        }),
      });
      getCart();
    } catch (err) {
      console.log(err);
    }
  };

  const createProduct = async ({
    name,
    description,
    price,
    category,
    file,
  }) => {
    try {
      if (!user)
        throw new Error("You are not logged in! Log in to access this route.");

      // const formData = new FormData();
      // formData.append("name", name);
      // formData.append("description", description);
      // formData.append("price", price);
      // formData.append("category", category);
      // formData.append("image", file);

      // console.log(formData);

      const data = await fetch(`${URL}/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
        body: JSON.stringify({ name, description, price, category }),
      });

      const doc = await data.json();

      doc.status === "success" &&
        toast.success("Product Created Successfully.");

      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  const updateProduct = async (product, productId) => {
    try {
      if (!user)
        throw new Error("You are not logged in! Log in to access this route.");
      const data = await fetch(`${URL}/product/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
        body: JSON.stringify(product),
      });

      const doc = await data.json();

      doc.status === "success" &&
        toast.success("Product Updated Successfully.");

      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      if (!user)
        throw new Error("You are not logged in! Log in to access this route.");
      const data = await fetch(`${URL}/product/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
      });

      const doc = await data.json();

      doc.status === "success" &&
        toast.success("Product Deleted Successfully.");

      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  const createOrder = async (order) => {
    try {
      if (!user)
        throw new Error("You are not logged in! Log in to access this route.");
      const data = await fetch(`${URL}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("cartToken")}`,
        },
        body: JSON.stringify(order),
      });

      const doc = await data.json();

      doc.status === "success" && toast.success("Order Placed Successfully.");

      return doc.data;
    } catch (err) {
      console.log(err);
    }
  };

  const getAllOrders = async () => {
    try {
      if (!user)
        throw new Error("You are not logged in! Log in to access this route.");
      const data = await fetch(`${URL}/AdminOrder`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });

      const order = await data.json();
      setOrders(order.data);
    } catch (err) {
      console.log(err);
    }
  };

  const checkout = async (success_url, cancel_url) => {
    const stripe = await loadStripe(
      "pk_test_51Ozwj3SDxRyNKSCWjT6mXpyFeLDgf5gmOgOCRajFhfhnnxbQfvMrd3qtjmtShG3LNvxLpLTQ75BGnRSDc6H7U7sx00WJI1jIEh"
    );
    const data = await fetch(`${URL}/checkout`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user}`,
      },
      body: JSON.stringify({ cart, success_url, cancel_url }),
    });

    const session = await data.json();
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  const getOrder = async (orderId) => {
    try {
      if (!user)
        throw new Error("You are not logged in! Log in to access this route.");
      const data = await fetch(`${URL}/order/${orderId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
      });
      const order = await data.json();
      return order;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        URL,
        products,
        fetchProducts,
        register,
        login,
        user,
        logout,
        addToCart,
        cart,
        getCart,
        deleteCart,
        updateCartQuantity,
        isAdmin,
        createProduct,
        deleteProduct,
        updateProduct,
        createOrder,
        orders,
        getAllOrders,
        checkout,
        getOrder,
        redirect_URL,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartState;
