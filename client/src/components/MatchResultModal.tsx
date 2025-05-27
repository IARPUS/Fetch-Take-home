import React from 'react';
import type { Dog } from '../types/types';

// Props expected by the MatchResultModal component
interface MatchResultModalProps {
  match: Dog | null;       // The matched dog object (null if no match yet)
  onClose: () => void;     // Callback to close the modal
}

/**
 * MatchResultModal displays the details of a single matched dog.
 * 
 * - It is only rendered if `match` is not null.
 * - Intended to appear as an overlay/modal on top of the main page.
 * - Contains a "Close" button to dismiss the modal.
 */
const MatchResultModal: React.FC<MatchResultModalProps> = ({ match, onClose }) => {
  // Do not render anything if no match has been selected yet
  if (!match) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        {/* Dog image and details */}
        <img src={match.img} alt={match.name} />
        <h2>Your Match: {match.name}</h2>
        <p>Breed: {match.breed}</p>
        <p>Age: {match.age}</p>
        <p>Zip Code: {match.zip_code}</p>

        {/* Close button to dismiss the modal */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default MatchResultModal;
