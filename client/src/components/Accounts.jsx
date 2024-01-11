import "./Accounts.css";

export default function Accounts() {
  return (
    <>
      <div className="accounts-div">
        <div className="account-button-div">
          <button>+</button>
        </div>
        <div className="account-boxes">
          <div className="balances">
            <p>Account Balances</p>
            <ul>
              {/* {items.map(( index) => (
              <li key={index}>{item}</li>
            ))} */}
            </ul>
          </div>
          <div className="liabilities">
            <p>Liabilities</p>
            <ul>
              {/* {items.map(( index) => (
              <li key={index}>{item}</li>
            ))} */}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
