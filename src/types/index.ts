// next & react imports
import { ButtonHTMLAttributes, InputHTMLAttributes } from 'react';

// dependencies imports
import { User as NextAuthUser } from "next-auth";

export interface AuthenticatedUser extends NextAuthUser {
  accessToken?: string,
  refreshToken?: string,
}

export interface User {
  name?: string;
  email?: string;
  image?: string;
}

export interface Session {
  user?: User;
  expires?: string;
  accessToken?: string;
}

export interface Decoded {
  email: string;
}

// context types
export interface SignInType {
  email: string;
  password: string;
};

export interface AuthContextType {
  isAuthenticated: boolean;
  token: string;
  signInLogin: (data: SignInType) => Promise<void>;
};

// components types

// Button
export interface ButtonTypeProps extends ButtonHTMLAttributes<HTMLInputElement> {
  main: string;
  isSubmitting?: boolean;
  outline?: boolean;
}

// Input
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

// SignUpForm
export interface Sign {
  name: string;
  email: string;
  password: string;
};
