export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface AccountBalances {
  available: number | null;
  current: number | null;
  iso_currency_code: string;
}

export interface Account {
  type: string;
  name: string;
  balances: AccountBalances;
}

export interface ExchangeRates {
  [key: string]: number;
}

export interface ContextType {
  isAuthenticated: boolean | null;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  data: User | null;
  updateData: (newData: User | null) => void;
  updateToken: (token: string | null) => void;
  loading: boolean;
  updateLoading: (newLoading: boolean) => void;
  balances: Account[];
  setBalances: React.Dispatch<React.SetStateAction<Account[]>>;
  liabilities: Account[];
  setLiabilities: React.Dispatch<React.SetStateAction<Account[]>>;
}
