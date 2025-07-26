// src/components/arVrPreview/ArVrPreview.tsx

import React, { useState, useEffect } from 'react';
import { ArVrControls } from './ArVrControls';
import { ArVrSettings } from './ArVrSettings';
import { initializeXR, startARSession, startVRSession } from './arVrUtils';

const ArVrPreview: React.FC = () => {
  const [isXRReady, setIsXRReady] = useState(false);
  const [isAR, setIsAR] = useState(true);  // Default to AR mode

  // Check for WebXR availability when the component mounts
  useEffect(() => {
    const checkXRAvailability = async () => {
      const isAvailable = await initializeXR();
      setIsXRReady(isAvailable);
    };

    checkXRAvailability();
  }, []);

  // Toggle between AR and VR mode
  const toggleARVRMode = () => {
    setIsAR((prevState) => !prevState);  // Toggle between AR and VR
  };

  // Start the AR or VR session based on the current mode
  const handleStartSession = () => {
    if (isAR) {
      startARSession();
    } else {
      startVRSession();
    }
  };

  return (
    <div className="arvr-container">
      {isXRReady ? (
        <>
          <div className="arvr-preview">
            {/* AR/VR Canvas here */}
            <canvas id="xrCanvas" style={{ width: '100%', height: '100%' }}></canvas>
          </div>

          <div className="controls">
            <ArVrControls toggleMode={toggleARVRMode} />
            <ArVrSettings onStart={handleStartSession} />
          </div>
        </>
      ) : (
        <div>WebXR is not available on your device. Please check your browser and device settings.</div>
      )}
    </div>
  );
};

export default ArVrPreview;
