import React, { useContext, useEffect, useState } from "react";
import CartContext from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import AddProductForm from "../components/AddProductForm";

function AdminProduct() {
  const [formOpen, setFormOpen] = useState("");

  const context = useContext(CartContext);
  const { fetchProducts, products } = context;

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full h-full overflow-y-scroll">
      <h2 className="form_heading">Products</h2>
      <div className="admin_product_container">
        {products.map((ele) => (
          <ProductCard
            product={ele}
            key={ele._id}
            type="row"
            setFormOpen={setFormOpen}
          />
        ))}
      </div>

      {/* FORM WINDOW */}

      {formOpen === "new" && (
        <AddProductForm closeForm={() => setFormOpen("")} />
      )}

      {formOpen !== "" && formOpen !== "new" && (
        <AddProductForm type={formOpen} closeForm={() => setFormOpen("")} />
      )}

      <button
        onClick={() => {
          formOpen === "" ? setFormOpen("new") : setFormOpen("");
        }}
        className="btn float-right mx-2 my-2"
      >
        {formOpen !== "" ? "Close form" : "Add product"}
      </button>
    </div>
  );
}

export default AdminProduct;
