import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import auth from './utils/auth';
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

export default function App() {
  const initialState = auth.isAuthenticated();
  const [isAuthenticated, setIsAuthenticated] = useState(initialState);

  return (
    <>
      <Router>
        <Navbar isAuthenticated={isAuthenticated}/>
        <Dashboard setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated}/>
      </Router>
    </>
  );
}
