'use client';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { TransformControls } from '@react-three/drei'; // To handle transformations like move, rotate, scale

interface ObjectControlsProps {
  objectRef: React.RefObject<any>; // Reference to the 3D object
  mode: 'translate' | 'rotate' | 'scale'; // Mode for transformation
  onChange?: (value: any) => void; // Optional callback for when transformations happen
}

const ObjectControls: React.FC<ObjectControlsProps> = ({ objectRef, mode, onChange }) => {
  const [active, setActive] = useState<boolean>(false); // Active state for controls (on/off)
  
  // Toggle control mode
  const toggleControls = () => setActive((prev) => !prev);

  // Update the transformations as object changes
  const handleTransformChange = (e: any) => {
    if (onChange) onChange(e);
  };

  return (
    <div className="transform-controls-container">
      <button onClick={toggleControls} className="toggle-btn">
        {active ? 'Disable Controls' : 'Enable Controls'}
      </button>

      {active && objectRef.current && (
        <TransformControls
          object={objectRef.current} // Attach the control to the object
          mode={mode} // Set mode to translate, rotate or scale
          onChange={handleTransformChange} // Trigger on transform change
        />
      )}
    </div>
  );
};

export default ObjectControls;
