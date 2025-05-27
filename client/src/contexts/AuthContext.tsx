import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import type { User } from '../types/types';

// Defines the shape of the authentication context
interface AuthContextType {
  user: User | null;                 // Currently logged-in user, or null if not logged in
  login: (user: User) => void;      // Function to update user state (login)
  logout: () => void;               // Function to clear user state (logout)
}

// Create the context with undefined default, will enforce proper usage
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props interface for the provider component
interface AuthProviderProps {
  children: ReactNode;              // Components that will consume the Auth context
}

/**
 * AuthProvider wraps the app and supplies user authentication state
 * using React Context API.
 *
 * - Holds user info in state
 * - Provides login and logout functions
 * - Makes auth context accessible to the entire component tree
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // Initial state: no user logged in

  // Login by setting user data
  const login = (user: User) => setUser(user);

  // Logout by clearing user data
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to access the AuthContext
 * 
 * - Ensures it's used within an AuthProvider
 * - Returns the current auth state and methods
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  // Protect against usage outside of provider
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
