import React, { useState } from "react";
import "./App.css";
import Title from "./components/Title";
import NetWorth from "./components/NetWorth";
import Accounts from "./components/Accounts";
import Graph from "./components/Graph";
import SavingsGoals from "./components/SavingsGoals";

export default function App(props) {
  const [token, setToken] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const updateToken = (newToken) => {
    setToken(newToken);
  };

  const updateData = (newData) => {
    setData(newData);
  };

  const updateLoading = (newLoading) => {
    setLoading(newLoading);
  };

  return (
    <>
      <div className="title-row">
        <Title />
      </div>
      <div className="first-row">
        <NetWorth loading={loading} data={data} />
        <Accounts
          token={token}
          updateToken={updateToken}
          updateData={updateData}
          updateLoading={updateLoading}
          loading={loading}
          data={data}
        />
      </div>
      <div className="second-row">
        <Graph />
        <SavingsGoals />
      </div>
    </>
  );
}
