import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./Dashboard.css";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";
import Logout from "./Logout";
import Home from "./Home";

export default function Dashboard({ setIsAuthenticated, isAuthenticated }) {
  return (
    <>
      <div className="dashboard">
        <Routes>
          <Route
            path="/register"
            element={<Register setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/logout"
            element={<Logout setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/" element={<Home isAuthenticated={isAuthenticated}/>} />
        </Routes>
      </div>
    </>
  );
}
