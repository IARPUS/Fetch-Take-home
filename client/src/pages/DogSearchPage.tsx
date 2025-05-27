import React, { useEffect, useState } from 'react';
import {
  fetchBreeds,
  searchDogs,
  fetchDogsByIds,
  generateMatch
} from '../apis/dogApi';

import DogCard from '../components/DogCard';
import DogSearchFilters from '../components/DogSearchFilters';
import DogPagination from '../components/DogPagination';
import FavoritesBar from '../components/FavoritesBar';
import MatchResultModal from '../components/MatchResultModal';
import { useFavorites } from '../contexts/FavoritesContext';
import type { Dog } from '../types/types';

/**
 * DogSearchPage is the main page for browsing adoptable dogs.
 *
 * Features:
 * - Filters by breed
 * - Sorts alphabetically by breed (ascending or descending)
 * - Paginates results
 * - Allows users to favorite dogs and generate a match
 */
const DogSearchPage: React.FC = () => {
  // Global favorites state from context
  const { favorites, toggleFavorite, clearFavorites } = useFavorites();

  // Local UI state
  const [breeds, setBreeds] = useState<string[]>([]); // List of breed options
  const [selectedBreed, setSelectedBreed] = useState(''); // Current selected breed filter
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Current sort order
  const [dogs, setDogs] = useState<Dog[]>([]); // Current page's dogs
  const [totalResults, setTotalResults] = useState(0); // Total count of dogs from API
  const [page, setPage] = useState(1); // Current page number
  const [match, setMatch] = useState<Dog | null>(null); // Currently matched dog (if any)

  const pageSize = 10; // Number of dogs per page

  // Fetch all breed options when the component first mounts
  useEffect(() => {
    const loadBreeds = async () => {
      const data = await fetchBreeds();
      setBreeds(data);
    };
    loadBreeds();
  }, []);

  // Fetch dogs based on current filters, sort, and page
  useEffect(() => {
    const fetchData = async () => {
      const from = (page - 1) * pageSize;

      // Construct query for API
      const query = {
        size: pageSize,
        from,
        breeds: selectedBreed ? [selectedBreed] : undefined,
        sort: `breed:${sortOrder}` as 'breed:asc' | 'breed:desc',
      };

      // Fetch dog IDs from search endpoint
      const searchResult = await searchDogs(query);
      setTotalResults(searchResult.total);

      // Fetch actual dog data using the IDs
      const dogDetails = await fetchDogsByIds(searchResult.resultIds);
      setDogs(dogDetails);
    };

    fetchData();
  }, [selectedBreed, sortOrder, page]);

  // Generates a match based on current favorites
  const handleMatch = async () => {
    const result = await generateMatch(favorites);
    const matchData = await fetchDogsByIds([result.match]);
    setMatch(matchData[0]); // Display the matched dog
    clearFavorites();       // Clear favorites after matching
  };

  return (
    <div style={styles.pageWrapper}>
      <h1 style={styles.heading}>🐶 Browse Adoptable Dogs</h1>

      {/* Breed filter and sort controls */}
      <div style={styles.section}>
        <DogSearchFilters
          breedOptions={breeds}
          selectedBreed={selectedBreed}
          sortOrder={sortOrder}
          onFilterChange={setSelectedBreed}
          onSortChange={setSortOrder}
        />
      </div>

      {/* Grid of dog cards */}
      <div style={styles.grid}>
        {dogs.map((dog) => (
          <div key={dog.id} style={styles.gridItem}>
            <DogCard
              dog={dog}
              isFavorite={favorites.includes(dog.id)}
              toggleFavorite={toggleFavorite}
            />
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div style={styles.section}>
        <DogPagination
          page={page}
          totalPages={Math.ceil(totalResults / pageSize)}
          onPageChange={setPage}
        />
      </div>

      {/* Favorites summary and generate match button */}
      <div style={styles.section}>
        <FavoritesBar favoriteIds={favorites} onGenerateMatch={handleMatch} />
      </div>

      {/* Modal showing matched dog */}
      <MatchResultModal match={match} onClose={() => setMatch(null)} />
    </div>
  );
};

// Inline styling for layout and structure
const styles: { [key: string]: React.CSSProperties } = {
  pageWrapper: {
    padding: '2rem 2vw',
    maxWidth: '1600px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '2.25rem',
    marginBottom: '1.5rem',
    textAlign: 'center',
    color: '#333',
  },
  section: {
    marginTop: '2rem',
    marginBottom: '2rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', // Responsive card layout
    gap: '2rem',
  },
  gridItem: {
    width: '100%',
    height: '100%',
  },
};

export default DogSearchPage;
