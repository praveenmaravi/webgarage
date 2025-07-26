import React, { useState } from 'react';
import { TimelineTrack } from './TimelineTrack';
import { gsap } from 'gsap'; // Import GSAP for animation handling

// Define types for the animation objects
type Animation = {
  id: string;
  name: string;
  startTime: number;
  duration: number;
  easing: string;
};

type AnimationTimelineProps = {
  animations: Animation[];
  onSelectElement: (id: string) => void;
};

export const AnimationTimeline: React.FC<AnimationTimelineProps> = ({ animations, onSelectElement }) => {
  const [playing, setPlaying] = useState(false);

  // Function to play or pause the animations
  const togglePlay = () => {
    setPlaying(!playing);

    if (!playing) {
      // Start the GSAP timeline if playing
      animations.forEach((animation) => {
        gsap.to(`#${animation.id}`, {
          x: 100, // Example animation change (moving the element on the X axis)
          duration: animation.duration,
          ease: animation.easing,
          delay: animation.startTime,
        });
      });
    } else {
      // If paused, reset the animation (you can add more logic here to pause/resume the timeline)
      gsap.globalTimeline.pause();
    }
  };

  // Handle updating or adding new animations
  const handleAddAnimation = () => {
    const newAnimation: Animation = {
      id: `element-${animations.length + 1}`,
      name: `Element ${animations.length + 1}`,
      startTime: 0,
      duration: 1,
      easing: 'ease-in-out',
    };

    onSelectElement(newAnimation.id); // Automatically select new element after adding it
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Timeline</h3>
      
      {/* Buttons to control animation */}
      <div className="flex mb-4 space-x-2">
        <button
          onClick={togglePlay}
          className={`px-4 py-2 rounded-lg ${playing ? 'bg-red-500' : 'bg-green-500'}`}
        >
          {playing ? 'Pause' : 'Play'}
        </button>
        <button
          onClick={handleAddAnimation}
          className="px-4 py-2 bg-blue-500 rounded-lg"
        >
          Add Animation
        </button>
      </div>
      
      {/* Display animation tracks */}
      <div className="space-y-2">
        {animations.map((animation, index) => (
          <TimelineTrack
            key={index}
            animation={animation}
            onSelect={() => onSelectElement(animation.id)}
          />
        ))}
      </div>
    </div>
  );
};
