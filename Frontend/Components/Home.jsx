import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../src/utils";
import { ToastContainer } from "react-toastify";

const Home = () => {
  // Add home page content here
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("Logged out successfully");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchProduct = async () => {
    try {
      const url = "http://localhost:4000/products";
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      const data = await response.json();
      console.log(data);
      setProducts(data);
    } catch (err) {
      handleError(err);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <div>
     <h1>Welcome {loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {products &&
          products.map((product) => (
            <div key={product._id}>
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </div>
          ))}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Home;
