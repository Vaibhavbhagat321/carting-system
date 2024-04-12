import React, { useContext, useEffect, useState } from "react";
import CartContext from "../context/CartContext";

function AddProductForm({ type = "new", closeForm }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState({});

  const context = useContext(CartContext);
  const { createProduct, URL, updateProduct } = context;

  useEffect(() => {
    async function fetchProduct() {
      if (type !== "new" && type !== "") {
        const data = await fetch(`${URL}/product/${type}`);
        const product = await data.json();
        resetState(product.data);
      }
    }
    fetchProduct();
  }, [type]);

  const resetState = (product) => {
    setName(product?._id ? product.name : "");
    setDescription(product?._id ? product.description : "");
    setPrice(product?._id ? product.price : "");
    setCategory(product?._id ? product.category : "");
  };

  const addProduct = (e) => {
    e.preventDefault();
    createProduct({ name, description, price, category, file });
    resetState();
    closeForm();
  };

  const editProduct = (e) => {
    e.preventDefault();
    updateProduct({ name, description, price, category }, type);
    resetState();
    closeForm();
  };

  return (
    <div className="border border-slate-300 px-2 py-1">
      <form className="" onSubmit={type === "new" ? addProduct : editProduct}>
        <h1 className="text-xl font-medium capitalize">
          {type === "new" ? "new" : `edit: ${type}`}
        </h1>

        <div className="form-group px-4 py-2">
          <label htmlFor="name" className="block">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            className="input"
            required
          />
        </div>

        <div className="form-group px-4 py-2">
          <label htmlFor="description" className="block">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input"
            rows="3"
          ></textarea>
        </div>

        <div className="form-group px-4 py-2">
          <label htmlFor="Price" className="block">
            Price
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            id="Price"
            className="input"
            required
          />
        </div>

        <div className="form-group px-4 py-2">
          <label htmlFor="category" className="block">
            Category
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id="category"
            className="input"
            required
          />
        </div>

        {/* <div className="form-group px-4 py-2">
          <label htmlFor="file" className="block">
            Product image:
          </label>
          <input
            type="file"
            id="file"
            className="input"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div> */}

        <div className="text-right mx-4">
          <button
            type="submit"
            className="bg-slate-800 active:translate-y-[1px] text-white px-2 py-1"
          >
            {type === "new" ? "Add" : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProductForm;
