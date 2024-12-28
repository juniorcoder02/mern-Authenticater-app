import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../src/utils";

const Signup = () => {
  const [signupInfo, setsignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copysignupInfo = { ...signupInfo };
    copysignupInfo[name] = value;
    setsignupInfo(copysignupInfo);
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("Please fill all the fields");
    }
    try {
      const url = "http://localhost:4000/auth/signup"; // Correct API URL
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
  
      // Check if the response status is not OK
      if (!response.ok) {
        const errorResponse = await response.json();
        // Display detailed error from the API, if available
        throw new Error(errorResponse?.message || "Failed to sign up. Please try again.");
      }
  
      const result = await response.json();
      const { success, message } = result;
  
      // If signup is successful
      if (success) {
        handleSuccess(message); // Display success message
        setTimeout(() => {
          navigate("/login"); // Redirect to login page after success
        }, 1000);
      } else {
        // Handle unexpected cases where success is false but no error is thrown
        handleError(message || "Signup failed. Please try again.");
      }
  
    } catch (err) {
      // Display detailed error message or fallback to a generic one
      handleError(err.message || "Something went wrong. Please try again.");
    }
  };
  return (
    <div className="container">
      <h1>SignUp</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="name">Name : </label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            autoFocus
            placeholder="Enter name"
            value={signupInfo.name}
            id="name"
          />
        </div>
        <div>
          <label htmlFor="email">Email : </label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter email"
            value={signupInfo.email}
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
            value={signupInfo.password}
            id="password"
          />
        </div>

        <button type="submit">SignUp</button>

        <span>
          Already have an account ? <Link to="/login">LogIn</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
