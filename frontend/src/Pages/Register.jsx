import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import CartContext from "../context/CartContext";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const context = useContext(CartContext);
  const { register } = context;

  const submitHandler = (e) => {
    e.preventDefault();
    register({ email, password, confirmPassword: cPassword });
    navigate("/login");
  };

  return (
    <>
      <div className="login_form_container">
        <form onSubmit={submitHandler} className="login_form">
          <h1 className="form_heading">Register</h1>
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
              className="input"
              minLength={8}
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
          <div className="form-group">
            <label htmlFor="cpass" className="form_label">
              Confirm Password
            </label>
            <input
              type={`${showPassword ? "text" : "password"}`}
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
              id="cpass"
              className="input"
              minLength={8}
              required
            />
          </div>
          <div className=" text-center">
            <button type="submit" className="btn">
              Register
            </button>
          </div>
          <p className="my-2 text-center">
            Already have account?{" "}
            <Link to="/login" className="text-blue-800 underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Register;
