import "./NetWorth.css";

export default function NetWorth({ loading, data }) {
  let balances = 0;
  let liabilities = 0;
  let netWorth = 0;

  if (!loading && data != null) {
    for (const account of data) {
      if (account.type === "depository" || account.type === "investment") {
        if (account.balances.available !== null) {
          balances += account.balances.available;
        } else {
          balances += account.balances.current;
        }
      }

      if (account.type === "credit" || account.type === "loan") {
        if (account.balances.current !== null) {
          liabilities += account.balances.current;
        } else {
          liabilities += account.balances.available;
        }
      }
    }

    netWorth = balances - liabilities;
  }

  return (
    <>
      <div className="networth-div">
        <div className="networth-box">
          <div className="networth-text">
            <p className="p1">Total net worth</p>
            <p className="p2">{netWorth}</p>
          </div>
        </div>
        <div className="global-breakdown">
          <p className="p3">Global Breakdown</p>
          <p className="p4">Balances: {balances}</p>
          <p className="p5">Liabilities: {liabilities}</p>
        </div>
      </div>
    </>
  );
}
