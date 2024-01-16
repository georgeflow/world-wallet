import React from "react";
import "./Accounts.css";
import PlaidLinkUS from "./PlaidLinkUS";
import PlaidLinkES from "./PlaidLinkES";
import PlaidLinkGB from "./PlaidLinkGB";

export default function Accounts({
  token,
  updateToken,
  updateData,
  updateLoading,
  loading,
  data,
  isAuthenticated,
}) {
  let balances = 0;
  let liabilities = 0;

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
          <PlaidLinkUS
            token={token}
            updateToken={updateToken}
            updateData={updateData}
            updateLoading={updateLoading}
            isAuthenticated={isAuthenticated}
          />
          <PlaidLinkES
            token={token}
            updateToken={updateToken}
            updateData={updateData}
            updateLoading={updateLoading}
            isAuthenticated={isAuthenticated}
          />
          <PlaidLinkGB
            token={token}
            updateToken={updateToken}
            updateData={updateData}
            updateLoading={updateLoading}
            isAuthenticated={isAuthenticated}
          />
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
