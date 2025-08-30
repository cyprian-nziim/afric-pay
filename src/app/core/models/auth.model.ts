import { FormControl } from '@angular/forms';

/**
 * Authentication related interfaces and types
 */

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  hasPasskey?: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

// Export a type for the auth state that can be used throughout the app
export type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
};
