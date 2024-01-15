import React, { useEffect, useState } from "react";
import "./Home.css";
import NetWorth from "./NetWorth";
import Accounts from "./Accounts";
import Graph from "./Graph";
import SavingsGoals from "./SavingsGoals";

export default function Home({ isAuthenticated }) {
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
      <div className="first-row">
        <NetWorth loading={loading} data={data} />
        <Accounts
          token={token}
          updateToken={updateToken}
          updateData={updateData}
          updateLoading={updateLoading}
          loading={loading}
          data={data}
          isAuthenticated={isAuthenticated}
        />
      </div>
      <div className="second-row">
        {/* <Graph />
        <SavingsGoals /> */}
      </div>
    </>
  );
}
