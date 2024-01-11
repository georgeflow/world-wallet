import { useState } from "react";
import "./App.css";
import Title from "./components/Title";
import NetWorth from "./components/NetWorth";
import Accounts from "./components/Accounts";
import Graph from "./components/Graph";
import SavingsGoals from "./components/SavingsGoals";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="title-row">
        <Title />
      </div>
      <div className="first-row">
        <NetWorth />
        <Accounts />
      </div>
      <div className="second-row">
        <Graph/>
        <SavingsGoals/>
      </div>
    </>
  );
}

export default App;
