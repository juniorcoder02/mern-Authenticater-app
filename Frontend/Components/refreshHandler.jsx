import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RefreshHandler = ({ setAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if a token exists in localStorage
    if (localStorage.getItem("token")) {
      setAuthenticated(true); // Update the authentication state
      // Redirect to /home if the current path is a login or signup page
      if (
        location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/signup"
      ) {
        navigate("/home", { replace: true }); // Redirect to /home
      }
    }
  }, [location, navigate, setAuthenticated]);

  return null; // This component doesn't render anything
};

export default RefreshHandler;
