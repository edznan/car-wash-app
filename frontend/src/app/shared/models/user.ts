export interface User {
  id?: number;
  name: string;
  email: string;
  emailVerified?: boolean;
  numberOfWashes: number;
  moneySpent: number;
  isAdmin: boolean;
}
