import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Items from "./pages/Items";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "antd/dist/antd.min.css";
import Bills from "./pages/Bills";
import Customers from "./pages/Customers";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/items"
            element={
              <ProtectedRoute>
                <Items />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bills"
            element={
              <ProtectedRoute>
                <Bills />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customers"
            element={
              <ProtectedRoute>
                <Customers />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export const ProtectedRoute = ({ children }) => {
  try {
    const userData = JSON.parse(localStorage.getItem('userData'));

    //console.log(userData);

    if (new Date(userData.expiration) > new Date()) {
      return children;
    } else {
      localStorage.removeItem('userData');
      return <Navigate to="/login" />;
    }
  } catch (error) {
    localStorage.removeItem('userData');
    return <Navigate to="/login" />;
  }
};
