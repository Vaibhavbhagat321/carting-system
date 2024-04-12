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
    <div className="flex w-full items-center justify-center h-[80vh]">
      <form
        onSubmit={submitHandler}
        className="w-5/12 rounded-md border-2 bg-white px-10"
      >
        <h1 className="my-3 text-center text-3xl font-[500]">Login</h1>

        <div className="form-group">
          <label htmlFor="email" className="block">
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
          <label htmlFor="pass" className="block">
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
          <button
            type="submit"
            className="bg-slate-800 active:translate-y-[1px] text-white px-2 py-1"
          >
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
