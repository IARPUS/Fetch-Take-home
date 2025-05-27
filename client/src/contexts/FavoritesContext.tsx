import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// The shape of the Favorites context
interface FavoritesContextType {
  favorites: string[];               // Array of favorited dog IDs
  toggleFavorite: (id: string) => void; // Add or remove a dog from favorites
  clearFavorites: () => void;          // Clears the entire favorites list
}

// Create the Favorites context with undefined default
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

/**
 * FavoritesProvider wraps the application (or a portion of it)
 * and provides global state management for a user's favorited dogs.
 *
 * - Stores dog IDs in local state
 * - Provides utility functions to toggle or clear favorites
 */
export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]); // Initial state: no favorites

  /**
   * Toggles a dog's favorite status.
   * - If the ID is already in the list, it removes it.
   * - If not, it adds it to the list.
   */
  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  // Clears all favorited dogs
  const clearFavorites = () => setFavorites([]);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

/**
 * Custom hook to access the Favorites context
 * 
 * - Throws an error if used outside of a FavoritesProvider
 * - Provides access to the favorites array and its updater functions
 */
export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
