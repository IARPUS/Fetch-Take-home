import React from 'react';
import type { Dog } from '../types/types';

// Props definition for the DogCard component
interface DogCardProps {
  dog: Dog;                         // The dog object to display
  isFavorite: boolean;              // Whether this dog is currently favorited
  toggleFavorite: (id: string) => void; // Function to toggle favorite status
}

/**
 * A presentational card component that displays dog details (image, name, breed, etc.)
 * and allows the user to favorite/unfavorite the dog.
 * It is designed to fit inside a CSS grid layout with consistent size and style.
 */
const DogCard: React.FC<DogCardProps> = ({ dog, isFavorite, toggleFavorite }) => {
  return (
    <div style={styles.card}>
      {/* Dog image with fallback in case of broken link */}
      <img
        src={dog.img}
        alt={`${dog.name} the ${dog.breed}`}
        style={styles.image}
        onError={(e) => (e.currentTarget.src = '/fallback-dog.png')}
      />

      <div style={styles.content}>
        {/* Dog name */}
        <h3 style={styles.name}>{dog.name}</h3>

        {/* Other dog details */}
        <p style={styles.detail}><strong>Breed:</strong> {dog.breed}</p>
        <p style={styles.detail}><strong>Age:</strong> {dog.age}</p>
        <p style={styles.detail}><strong>Zip Code:</strong> {dog.zip_code}</p>

        {/* Favorite/unfavorite button, visually toggled */}
        <button
          onClick={() => toggleFavorite(dog.id)}
          style={{
            ...styles.button,
            backgroundColor: isFavorite ? '#facc15' : '#f3f4f6',  // Yellow if favorited
            color: isFavorite ? '#92400e' : '#1f2937',            // Darker text when active
          }}
        >
          {isFavorite ? '★ Unfavorite' : '☆ Favorite'}
        </button>
      </div>
    </div>
  );
};

// Inline styles for the component
const styles: { [key: string]: React.CSSProperties } = {
  // Outer card container
  card: {
    width: '100%',                    // Ensures it fills the grid cell
    maxWidth: '100%',                // Avoid overflow
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    height: '100%',                  // Forces all cards to be same height
    transition: 'transform 0.2s ease',
  },
  // Dog image
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',              // Maintain aspect ratio and crop excess
  },
  // Card content container
  content: {
    flexGrow: 1,                     // Allows button to align to bottom
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
  },
  // Dog name styling
  name: {
    fontSize: '1.25rem',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
    color: '#111827',
  },
  // Dog detail text styling
  detail: {
    fontSize: '0.95rem',
    color: '#4b5563',
    marginBottom: '0.25rem',
  },
  // Favorite button styling
  button: {
    marginTop: 'auto',               // Pushes button to bottom
    padding: '0.5rem',
    borderRadius: '6px',
    border: 'none',
    fontWeight: 600,
    cursor: 'pointer',
  },
};

export default DogCard;
