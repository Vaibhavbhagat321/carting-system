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
    <div className="w-[70vw] h-[90vh] overflow-y-scroll">
      <h2 className="text-xl font-medium">Products</h2>
      <div className="my-4  flex gap-x-8 gap-y-6 flex-wrap flex-col justify-around items-center">
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
        className="bg-slate-800 active:translate-y-[1px] text-white py-1 px-2 my-4 float-right mx-3"
      >
        {formOpen !== "" ? "Close form" : "Add product"}
      </button>
    </div>
  );
}

export default AdminProduct;
