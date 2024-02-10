import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Dashboard />
      </Router>
    </>
  );
}

export default App;
