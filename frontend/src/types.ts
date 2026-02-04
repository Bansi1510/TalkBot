import type { ReactNode } from "react";

export interface User {
  _id: string;
  name: string;
  email: string;
  assistantName: string,
  assistantImage: string,
  history: string[]
}
export interface UserProviderProps {
  children: ReactNode;
}
export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  loading: boolean
}