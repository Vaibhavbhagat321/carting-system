import React, { useContext } from "react";
import CartContext from "../context/CartContext";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

function ProductCard({ product, type = "col", setFormOpen }) {
  const context = useContext(CartContext);
  const { addToCart, deleteProduct, user } = context;
  const navigate = useNavigate();

  return (
    <div
      className={`${
        type === "col"
          ? "w-[20%] px-1 py-1 flex flex-col gap-3"
          : "px-1 py-1 w-[80%] flex flex-row gap-2"
      } border border-slate-300 rounded-md`}
    >
      <div>
        <img
          src={`/product.jpg`}
          alt={product.name}
          className={`${type === "col" ? "w-full h-[40vh]" : "h-46 w-40"} `}
        />
      </div>
      <div
        className={`${
          type !== "col" && "flex flex-row justify-between  w-full gap-1"
        }`}
      >
        <div className="w-[80%] flex flex-col gap-2 justify-between">
          <h2 className={`text-xl font-bold capitalize`}>{product.name}</h2>
          <p className={`w-full capitalize`}>{product.description}</p>
          <h2 className="font-bold">{product.price}/-</h2>
        </div>
        <div
          className={`${
            type !== "col" && "w-[20%]  flex justify-center items-center"
          }`}
        >
          {type === "col" ? (
            <button
              onClick={() => {
                if (!user) return navigate("/login");
                addToCart(product._id);
              }}
              className={`bg-slate-800 text-white active:translate-y-[1px] px-2 py-1 w-full h-10 font-medium my-2`}
            >
              Add to cart
            </button>
          ) : (
            <div className="flex gap-2">
              <button>
                <HiPencil
                  onClick={() => setFormOpen(product._id)}
                  className="border border-slate-300  text-xl"
                />
              </button>
              <button onClick={() => deleteProduct(product._id)}>
                <HiTrash className="border border-slate-300  text-xl" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
