import React from 'react';
import './PopupInfo.css';

export default function PopupInfo({ title, description, onClose }) {
  return (
    <div className="popup-info-overlay">
      <div className="popup-info-card">
        <button className="popup-close" onClick={onClose}>&times;</button>
        <h2>{title}</h2>
        <div className="popup-description">{description}</div>
      </div>
    </div>
  );
} 