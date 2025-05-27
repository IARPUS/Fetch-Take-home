import React from 'react';

// Props expected by the FavoritesBar component
interface FavoritesBarProps {
  favoriteIds: string[];            // Array of favorited dog IDs
  onGenerateMatch: () => void;      // Callback function to generate a match
}

/**
 * FavoritesBar displays the number of dogs the user has favorited
 * and provides a "Generate Match" button to initiate the match process.
 *
 * - The button is disabled if no dogs are favorited.
 * - The component is kept stateless and is fully driven by props.
 */
const FavoritesBar: React.FC<FavoritesBarProps> = ({ favoriteIds, onGenerateMatch }) => (
  <div className="favorites-bar">
    {/* Text showing count of favorited dogs */}
    <span>{favoriteIds.length} dogs favorited</span>

    {/* Match button; only enabled if there are favorited dogs */}
    <button
      disabled={favoriteIds.length === 0}
      onClick={onGenerateMatch}
    >
      Generate Match
    </button>
  </div>
);

export default FavoritesBar;
