import React from 'react';
import './BreathingBox.css'; // Import CSS file for styling

export default function BreathingBox({ text }) {
  return (
    <div className="breathing-box-container">
      <div className="breathing-box-content">
        <div className="breathing-box-inner">{text}</div>
      </div>
    </div>
  );
}