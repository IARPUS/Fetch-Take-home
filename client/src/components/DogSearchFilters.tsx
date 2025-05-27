import React from 'react';

// Props definition for the DogSearchFilters component
interface DogSearchFiltersProps {
  breedOptions: string[];                         // List of breed names to populate the dropdown
  selectedBreed: string;                          // The currently selected breed filter
  sortOrder: 'asc' | 'desc';                      // Current sort order ('asc' or 'desc')
  onFilterChange: (breed: string) => void;        // Callback when breed filter is changed
  onSortChange: (order: 'asc' | 'desc') => void;  // Callback when sort order is changed
}

/**
 * DogSearchFilters renders two select dropdowns:
 * 1. A breed filter dropdown populated with breedOptions
 * 2. A sort order dropdown (A → Z or Z → A by breed)
 * 
 * Both dropdowns trigger callback functions to update search state in the parent.
 */
const DogSearchFilters: React.FC<DogSearchFiltersProps> = ({
  breedOptions,
  selectedBreed,
  sortOrder,
  onFilterChange,
  onSortChange
}) => (
  <div className="filters">
    {/* Breed selection dropdown */}
    <select value={selectedBreed} onChange={(e) => onFilterChange(e.target.value)}>
      <option value="">All Breeds</option>
      {breedOptions.map(breed => (
        <option key={breed} value={breed}>
          {breed}
        </option>
      ))}
    </select>

    {/* Sort order selection dropdown */}
    <select value={sortOrder} onChange={(e) => onSortChange(e.target.value as 'asc' | 'desc')}>
      <option value="asc">A → Z</option>
      <option value="desc">Z → A</option>
    </select>
  </div>
);

export default DogSearchFilters;
