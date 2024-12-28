import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../src/utils";
import "../src/index.css";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    // Validate inputs
    if (!email || !password) {
      return handleError("Please fill all the fields");
    }

    try {
      const url = "http://localhost:4000/auth/login"; // Correct URL
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      // Handle non-OK responses with detailed error messages
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse?.message || "Failed to log in. Please try again.");
      }

      const result = await response.json();
      const { success, message, jwtToken, name } = result;

      if (success) {
        handleSuccess(message); // Display success message
        localStorage.setItem("token", jwtToken); // Store the JWT token
        localStorage.setItem("loggedInUser", name); // Store the user's name
        setTimeout(() => {
          navigate("/home"); // Redirect to the home page
        }, 1000);
      } else {
        // Handle unexpected scenarios where success is false but no error is thrown
        handleError(message || "Login failed. Please try again.");
      }

      console.log(result);
    } catch (err) {
      // Display detailed error message from the backend, or a fallback message
      handleError(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container"> 
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email : </label>
          <input
          
          className="bg-red-700"
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter email"
            value={loginInfo.email}
            id="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password : </label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter password"
            value={loginInfo.password}
            id="password"
          />
        </div>

        <button type="submit">Login</button>

        <span>
          Create a new account? <Link to="/signup">Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
