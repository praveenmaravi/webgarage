import React, { useState } from 'react';

type TimelineTrackProps = {
  animation: any; // This can be the animation object containing properties like ID, name, etc.
  onSelect: () => void;
  onUpdateAnimation: (updatedAnimation: any) => void;
};

export const TimelineTrack: React.FC<TimelineTrackProps> = ({ animation, onSelect, onUpdateAnimation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(animation.name);
  const [updatedDuration, setUpdatedDuration] = useState(animation.duration);
  
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setUpdatedName(animation.name);
    setUpdatedDuration(animation.duration);
  };

  const handleSaveEdit = () => {
    const updatedAnimation = { ...animation, name: updatedName, duration: updatedDuration };
    onUpdateAnimation(updatedAnimation);
    setIsEditing(false);
  };

  return (
    <div
      className="timeline-track bg-gray-800 p-2 rounded mb-2 cursor-pointer"
      onClick={onSelect}
    >
      {isEditing ? (
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            className="bg-gray-700 text-white p-2 rounded"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
          <input
            type="number"
            className="bg-gray-700 text-white p-2 rounded"
            value={updatedDuration}
            onChange={(e) => setUpdatedDuration(Number(e.target.value))}
          />
          <div className="flex justify-between space-x-2">
            <button
              onClick={handleCancelEdit}
              className="bg-red-600 text-white p-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEdit}
              className="bg-green-600 text-white p-2 rounded"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between">
          <span className="text-white">{animation.name}</span>
          <span className="text-gray-400">{animation.duration}s</span>
          <button
            onClick={handleEditClick}
            className="text-yellow-500"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};
