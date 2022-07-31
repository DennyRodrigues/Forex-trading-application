
export interface User {
  name: string;
  token: string;
  wallet: {
    JPY: number;
    USD: number;
    BTC: number;
    EUR: number;
  };
};

export type UserContext = Omit<User, "token">;
