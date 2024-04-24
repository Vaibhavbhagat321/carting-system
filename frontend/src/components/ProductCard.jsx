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
        type === "col" ? "product_card-user" : "product_card-admin"
      } `}
    >
      <div className="flex justify-center items-center">
        <img
          src={`/product.jpg`}
          alt={product.name}
          className={`${
            type === "col" ? "product_image-user" : "product_image-admin"
          } `}
        />
      </div>
      <div
        className={`${
          type !== "col" &&
          "flex flex-col sm:flex-row justify-between w-fit gap-1 pl-3"
        }`}
      >
        <div className="w-[80%] flex flex-col gap sm:gap-1 lg:gap-2 justify-between">
          <h2 className={`product_name`}>{product.name}</h2>
          <p className={`product_desc`}>{product.description}</p>
          <h2 className="product_price">{product.price}/-</h2>
        </div>
        <div
          className={`${
            type !== "col" && "flex justify-center items-center w-fit"
          }`}
        >
          {type === "col" ? (
            <button
              onClick={() => {
                if (!user) return navigate("/login");
                addToCart(product._id);
              }}
              className={`btn product_btn`}
            >
              Add to cart
            </button>
          ) : (
            <div className="admin_operation_container">
              <button>
                <HiPencil
                  onClick={() => setFormOpen(product._id)}
                  className="admin_operation_btn"
                />
              </button>
              <button onClick={() => deleteProduct(product._id)}>
                <HiTrash className="admin_operation_btn" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
