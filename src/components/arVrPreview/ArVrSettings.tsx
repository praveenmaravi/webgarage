// src/components/arVrPreview/ArVrSettings.tsx

import React, { useState, useEffect } from 'react';

interface ArVrSettingsProps {
  onStartSession: (mode: 'ar' | 'vr') => void;
}

export const ArVrSettings: React.FC<ArVrSettingsProps> = ({ onStartSession }) => {
  const [isARAvailable, setIsARAvailable] = useState(false);
  const [isVRAvailable, setIsVRAvailable] = useState(false);
  const [selectedMode, setSelectedMode] = useState<'ar' | 'vr'>('ar');

  // Check WebXR availability on component mount
  useEffect(() => {
    const checkAvailability = async () => {
      if (navigator.xr) {
        const arAvailable = await navigator.xr.isSessionSupported('immersive-ar');
        const vrAvailable = await navigator.xr.isSessionSupported('immersive-vr');
        setIsARAvailable(arAvailable);
        setIsVRAvailable(vrAvailable);
      }
    };

    checkAvailability();
  }, []);

  const handleModeChange = (mode: 'ar' | 'vr') => {
    setSelectedMode(mode);
  };

  const handleStartSession = () => {
    if (selectedMode === 'ar') {
      onStartSession('ar');
    } else {
      onStartSession('vr');
    }
  };

  return (
    <div className="arvr-settings">
      <div className="mode-selector">
        <button
          onClick={() => handleModeChange('ar')}
          disabled={!isARAvailable}
          className={`mode-btn ${selectedMode === 'ar' ? 'active' : ''}`}
        >
          AR Mode
        </button>
        <button
          onClick={() => handleModeChange('vr')}
          disabled={!isVRAvailable}
          className={`mode-btn ${selectedMode === 'vr' ? 'active' : ''}`}
        >
          VR Mode
        </button>
      </div>

      <div className="session-controls">
        {selectedMode === 'ar' && !isARAvailable && <p>AR is not supported on this device.</p>}
        {selectedMode === 'vr' && !isVRAvailable && <p>VR is not supported on this device.</p>}

        <button onClick={handleStartSession} className="start-session-btn" disabled={!(isARAvailable || isVRAvailable)}>
          Start {selectedMode === 'ar' ? 'AR' : 'VR'} Session
        </button>
      </div>
    </div>
  );
};
