


import React, { useEffect, useState } from "react";
import "./Accounts.css";
import PlaidLink from "./PlaidLink";
import { useContextHook } from '../Context'
import { Account, ExchangeRates } from '../../types';


const exchangeRates: ExchangeRates = {
  USD: 1,
  GBP: 0.79, // Updated: Jan 16 @ 17:06
  EUR: 0.92, // Updated: Jan 16 @ 17:06
};

const Accounts: React.FC = () => {
  const {
    loading,
    data,
    currency,
    balances,
    setBalances,
    liabilities,
    setLiabilities
  } = useContextHook();

  useEffect(() => {
    if (!loading && data) {
      const convertCurrency = (dataArray: Account[], targetCurrency: keyof ExchangeRates): Account[] => {
        return dataArray.map(account => {
          const rate = exchangeRates[targetCurrency];
          const balanceType = account.balances.available != null ? 'available' : 'current';
          const balance = account.balances[balanceType] as number;

          return {
            ...account,
            balances: {
              ...account.balances,
              [balanceType]: parseFloat((balance * rate).toFixed(2)),
              iso_currency_code: targetCurrency
            }
          };
        });
      };

      const convertedData = convertCurrency(data, currency as keyof ExchangeRates);

      const filteredBalances = convertedData.filter(account =>
        account.type === "depository" || account.type === "investment"
      );
      const filteredLiabilities = convertedData.filter(account =>
        account.type === "credit" || account.type === "loan"
      );

      setBalances(filteredBalances);
      setLiabilities(filteredLiabilities);
    }
  }, [loading, data, currency, setBalances, setLiabilities]);


  return (
    <>
      <div className='accounts-div'>
        <div className='account-button-div'>
          <PlaidLink flag={'🇪🇸'} country='ES' />
          <PlaidLink flag={'🇺🇸'} country='US' />
          <PlaidLink flag={'🇬🇧'} country='GB' />
        </div>
        <div className='account-boxes'>
          <div className='balances'>
            <p>Balances</p>
            <ul className='balances-list'>
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
          <div className='liabilities'>
            <p>Liabilities</p>
            <ul className='liabilities-list'>
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

export default Accounts;
