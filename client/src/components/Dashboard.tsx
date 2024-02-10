import React from "react";
import { Routes, Route } from "react-router-dom";
import "./Dashboard.css";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";
import Logout from "./Logout";
import Home from "./Home";

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="dashboard">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default Dashboard;
