import React from "react";
import "./Accounts.css";
import PlaidLink from "./PlaidLink";

export default function Accounts({
  token,
  updateToken,
  updateData,
  updateLoading,
  loading,
  data,
}) {
  let balances = 0;
  let liabilities = 0;
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleButtonClick = () => {
  //   setIsModalOpen(!isModalOpen);
  // };

  if (!loading && data != null) {
    // Filter depository and investment accounts
    balances = data.filter(
      (account) =>
        account.type === "depository" || account.type === "investment"
    );

    // Filter credit and loan accounts
    liabilities = data.filter(
      (account) => account.type === "credit" || account.type === "loan"
    );
  }

  return (
    <>
      <div className="accounts-div">
        <div className="account-button-div">
          <PlaidLink
            token={token}
            updateToken={updateToken}
            updateData={updateData}
            updateLoading={updateLoading}
          />
          <button>+</button>
        </div>
        <div className="account-boxes">
          <div className="balances">
            <p>Balances</p>
            <ul className="balances-list">
              {!loading &&
                data != null &&
                balances.map((account, index) => (
                  <div key={index}>
                    <p>
                      {account.balances.available !== null
                        ? `${account.balances.available} ${account.balances.iso_currency_code}`
                        : `${account.balances.current} ${account.balances.iso_currency_code}`}
                    </p>
                    <p> {account.name} </p>
                  </div>
                ))}
            </ul>
          </div>
          <div className="liabilities">
            <p>Liabilities</p>
            <ul className="liabilities-list">
              {!loading &&
                data != null &&
                liabilities.map((account, index) => (
                  <div key={index}>
                    <p>
                      {account.balances.current !== null
                        ? `${account.balances.current} ${account.balances.iso_currency_code}`
                        : `${account.balances.available} ${account.balances.iso_currency_code}`}
                    </p>
                    <p> {account.name} </p>
                  </div>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
