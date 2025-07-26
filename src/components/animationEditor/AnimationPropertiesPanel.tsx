import React, { useState, useEffect } from 'react';

type AnimationPropertiesPanelProps = {
  elementId: string;  // The ID of the selected element to apply properties to
  onUpdate: (id: string, newProps: AnimationProps) => void;  // Callback to send updated properties back to parent component
};

// Define the animation properties type
type AnimationProps = {
  duration: number;
  delay: number;
  easing: string;
};

export const AnimationPropertiesPanel: React.FC<AnimationPropertiesPanelProps> = ({ elementId, onUpdate }) => {
  const [duration, setDuration] = useState<number>(1);   // Default duration
  const [delay, setDelay] = useState<number>(0);         // Default delay
  const [easing, setEasing] = useState<string>('ease-in-out');  // Default easing

  // Update the properties when the user changes them
  useEffect(() => {
    onUpdate(elementId, { duration, delay, easing });
  }, [duration, delay, easing, elementId, onUpdate]);

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(parseFloat(e.target.value));
  };

  const handleDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDelay(parseFloat(e.target.value));
  };

  const handleEasingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEasing(e.target.value);
  };

  return (
    <div className="space-y-4 p-4 bg-gray-800 rounded-lg">
      <h3 className="text-lg text-white">Properties for Element: {elementId}</h3>

      {/* Duration */}
      <div>
        <label className="block text-white">Duration (seconds)</label>
        <input
          type="number"
          step="0.1"
          value={duration}
          onChange={handleDurationChange}
          min="0"
          className="w-full mt-2 p-2 bg-gray-700 text-white rounded"
        />
      </div>

      {/* Delay */}
      <div>
        <label className="block text-white">Delay (seconds)</label>
        <input
          type="number"
          step="0.1"
          value={delay}
          onChange={handleDelayChange}
          min="0"
          className="w-full mt-2 p-2 bg-gray-700 text-white rounded"
        />
      </div>

      {/* Easing */}
      <div>
        <label className="block text-white">Easing</label>
        <select
          value={easing}
          onChange={handleEasingChange}
          className="w-full mt-2 p-2 bg-gray-700 text-white rounded"
        >
          <option value="ease-in-out">Ease In Out</option>
          <option value="ease-in">Ease In</option>
          <option value="ease-out">Ease Out</option>
          <option value="linear">Linear</option>
        </select>
      </div>
    </div>
  );
};

