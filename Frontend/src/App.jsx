import { Route, Routes } from "react-router-dom";
import Home from "../Components/Home";
import Login from "../Components/Login";
import Signup from "../Components/Signup";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import RefreshHandler from "../Components/refreshHandler";

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  // Private Route wrapper
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  // Login handler

  return (
    <>
      <RefreshHandler setAuthenticated={setAuthenticated} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
