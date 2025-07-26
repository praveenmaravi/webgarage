// src/components/arVrPreview/ArVrControls.tsx

import React from 'react';

interface ArVrControlsProps {
  toggleMode: () => void;
  startSession: () => void;
  isARMode: boolean;
}

export const ArVrControls: React.FC<ArVrControlsProps> = ({ toggleMode, startSession, isARMode }) => {
  return (
    <div className="arvr-controls">
      <div className="mode-toggle">
        <button
          onClick={toggleMode}
          className={`toggle-btn ${isARMode ? 'active' : ''}`}
        >
          {isARMode ? 'Switch to VR' : 'Switch to AR'}
        </button>
      </div>

      <div className="session-controls">
        <button
          onClick={startSession}
          className="start-session-btn"
        >
          Start {isARMode ? 'AR' : 'VR'} Session
        </button>
      </div>
    </div>
  );
};

