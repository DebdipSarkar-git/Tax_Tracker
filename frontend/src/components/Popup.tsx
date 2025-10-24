import React from 'react';
import './Popup.css';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface PopupProps {
  message: string;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-inner">
        <h2>
          <FontAwesomeIcon icon={faClock} className='mx-2'/>
          Session Expired</h2>
        <p>{message}</p>
        <button onClick={onClose}>Ok</button>
      </div>
    </div>
  );
};

export default Popup;