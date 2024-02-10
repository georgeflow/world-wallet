import React from "react";
import "./Home.css";
import NetWorth from "./NetWorth";
import Accounts from "./Accounts";
import Graph from "./Graph";
import SavingsGoals from "./SavingsGoals";
import { useContextHook } from "../Context";
import { Navigate } from 'react-router-dom';

const Home: React.FC = () => {
  const { isAuthenticated } = useContextHook();

  return (
    <>
      {!isAuthenticated && <Navigate to='/login' />}
      <div className="first-row">
        <NetWorth />
        <Accounts />
      </div>
      <div className="second-row">
        {/* <Graph />
        <SavingsGoals /> */}
      </div>
    </>
  );
}

export default Home;
