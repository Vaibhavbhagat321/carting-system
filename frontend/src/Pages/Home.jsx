import React, { useContext, useEffect } from "react";
import CartContext from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

function Home() {
  const context = useContext(CartContext);
  const navigate = useNavigate();
  const { fetchProducts, products, isAdmin } = context;

  useEffect(() => {
    isAdmin && navigate("/admin");
  }, [isAdmin, navigate]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product_container">
      {products.map((ele) => (
        <ProductCard product={ele} key={ele._id} />
      ))}
    </div>
  );
}

export default Home;
