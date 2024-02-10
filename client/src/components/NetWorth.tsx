import React from "react";
import "./NetWorth.css";
import { useContextHook } from '../Context'

const NetWorth: React.FC = () => {
  const { loading, data, currency, balances, liabilities } = useContextHook();

  let totalBalance = 0;
  let totalLiabilities = 0;
  let prettyBalance: number;
  let prettyLiabilities: number;
  let netWorth: number;

  if (!loading && data != null) {
    for (const account of balances as Account[]) {
      if (account.balances.available !== null) {
        totalBalance += account.balances.available;
      } else {
        totalBalance += account.balances.current;
      }
    }

    for (const account of liabilities as Account[]) {
      if (account.balances.current !== null) {
        totalLiabilities += account.balances.current;
      } else {
        totalLiabilities += account.balances.available;
      }
    }

    prettyBalance = Number(parseFloat(totalBalance).toFixed(2));
    prettyLiabilities = Number(parseFloat(totalLiabilities).toFixed(2));
    netWorth = Number(parseFloat(prettyBalance - prettyLiabilities).toFixed(2));
  }

  return (
    <>
      <div className="networth-div">
        <div className="networth-box">
          <div className="networth-text">
            <p className="p1">Total net worth ({currency})</p>
            <p className="p2">{netWorth}</p>
          </div>
        </div>
        <div className="global-breakdown">
          <p className="p3">Global Breakdown</p>
          <p className="p4">Balances: {prettyBalance}</p>
          <p className="p5">Liabilities: {prettyLiabilities}</p>
        </div>
      </div>
    </>
  );
}

export default NetWorth;

// import React from 'react';
// import './NetWorth.css';
// import { useContextHook } from '../Context';

// const NetWorth: React.FC = () => {
//   const { loading, data, currency, balances, liabilities } = useContextHook();

//   let totalBalance = 0;
//   let totalLiabilities = 0;
//   let prettyBalance: string | number;
//   let prettyLiabilities: string | number;
//   let netWorth: string | number;

//   if (!loading && data != null) {
//     for (const account of balances) {
//       totalBalance += account.balances.available !== null ? account.balances.available : account.balances.current;
//     }

//     for (const account of liabilities) {
//       totalLiabilities += account.balances.current !== null ? account.balances.current : account.balances.available;
//     }

//     prettyBalance = Number(parseFloat(totalBalance).toFixed(2));
//     prettyLiabilities = Number(parseFloat(totalLiabilities).toFixed(2));
//     netWorth = Number(parseFloat(prettyBalance - prettyLiabilities).toFixed(2));
//   }

// return (
//   <div className="networth-div">
//     <div className="networth-box">
//       <div className="networth-text">
//         <p className="p1">Total net worth ({currency})</p>
//         <p className="p2">{netWorth}</p>
//       </div>
//     </div>
//     <div className="global-breakdown">
//       <p className="p3">Global Breakdown</p>
//       <p className="p4">Balances: {prettyBalance}</p>
//       <p className="p5">Liabilities: {prettyLiabilities}</p>
//     </div>
//   </div>
// );
// };

// export default NetWorth;
