import React, { useContext, createContext, useEffect, useState } from 'react';
import auth from './utils/auth';
import { ContextType, Account, User } from '../types'


const Context = createContext<ContextType>({} as ContextType);

function ContextProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [currency, setCurrency] = useState<string>('USD');
  const [token, setToken] = useState<string | null>(null);
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [balances, setBalances] = useState<Account[]>([]);
  const [liabilities, setLiabilities] = useState<Account[]>([]);

  const updateData = (newData: User | null) => {
    setData(newData);
  };
  const updateToken = (token: string | null) => {
    setToken(token)
  }

  const updateLoading = (newLoading: boolean) => {
    setLoading(newLoading);
  };

  useEffect(() => {
    auth.isAuthenticated().then(initialState => {
      setIsAuthenticated(!!initialState);
    });
  }, []);

  return (
    <Context.Provider
      value={{
        currency,
        setCurrency,
        isAuthenticated,
        setIsAuthenticated,
        loading,
        data,
        balances,
        token,
        updateToken,
        updateData,
        updateLoading,
        setBalances,
        liabilities,
        setLiabilities,
        setToken,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useContextHook = () => useContext(Context)
export default ContextProvider
