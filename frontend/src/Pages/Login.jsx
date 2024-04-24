import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import CartContext from "../context/CartContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const context = useContext(CartContext);
  const { login } = context;

  const submitHandler = (e) => {
    e.preventDefault();
    login({ email, password });
    navigate("/");
  };

  return (
    <div className="login_form_container">
      <form onSubmit={submitHandler} className="login_form">
        <h1 className="form_heading">Login</h1>

        <div className="form-group">
          <label htmlFor="email" className="form_label">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            autoComplete="off"
            required
          />
        </div>

        <div className="form-group relative">
          <label htmlFor="pass" className="form_label">
            Password
          </label>
          <input
            type={`${showPassword ? "text" : "password"}`}
            id="pass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength="8"
            className="input"
            required
          />
          {showPassword ? (
            <HiOutlineEyeSlash
              className="absolute bottom-2 right-2  text-xl"
              onClick={() => setShowPassword((state) => !state)}
            />
          ) : (
            <HiOutlineEye
              className="absolute bottom-2 right-2  text-xl"
              onClick={() => setShowPassword((state) => !state)}
            />
          )}
        </div>

        <div className="flex flex-col items-center justify-center gap-1">
          <button type="submit" className="btn">
            Login
          </button>
        </div>
        <p className="my-2 text-center">
          Do not have Account ?{" "}
          <Link to="/register" className=" underline text-blue-900">
            Sing Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
