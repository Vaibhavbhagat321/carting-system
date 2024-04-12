import { useContext, useEffect } from "react";
import CartContext from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function ProtecteRoutes({ children }) {
  const context = useContext(CartContext);
  const navigate = useNavigate();
  const { user } = context;

  useEffect(() => {
    if (!user) return navigate("/login");
  });

  return children;
}

export default ProtecteRoutes;
