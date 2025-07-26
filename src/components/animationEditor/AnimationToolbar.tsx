import React, { useState } from 'react';
import { gsap } from 'gsap';

export const AnimationToolbar = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);

  // Handles Play/Pause button click
  const handlePlayPause = () => {
    setIsPlaying((prevState) => !prevState);
    if (isPlaying) {
      pauseAnimation();
    } else {
      playAnimation();
    }
  };

  // Handles Loop toggle
  const handleLoopToggle = () => {
    setIsLooping((prevState) => !prevState);
  };

  // Handles Reset button click (reset animation to initial state)
  const handleReset = () => {
    gsap.killTweensOf(".anim-target");  // Kill current animations
    gsap.set(".anim-target", { x: 0, opacity: 1 });  // Reset the target to initial state
  };

  // Play animation (can be customized to suit your animations)
  const playAnimation = () => {
    gsap.to(".anim-target", {
      x: 500,
      opacity: 0.5,
      duration: 3,
      ease: "power2.inOut",
      repeat: isLooping ? -1 : 0,  // Loop if isLooping is true
    });
  };

  // Pause animation (pause current timeline)
  const pauseAnimation = () => {
    gsap.globalTimeline.pause();
  };

  return (
    <div className="flex justify-between bg-gray-800 p-4 items-center">
      <div className="flex space-x-4">
        {/* Play/Pause Button */}
        <button
          onClick={handlePlayPause}
          className={`bg-blue-500 text-white px-4 py-2 rounded ${isPlaying ? 'bg-red-500' : ''}`}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>

        {/* Loop Button */}
        <button
          onClick={handleLoopToggle}
          className={`bg-green-500 text-white px-4 py-2 rounded ${isLooping ? 'bg-yellow-500' : ''}`}
        >
          {isLooping ? "Disable Loop" : "Enable Loop"}
        </button>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>

      {/* Display the status */}
      <div className="text-white text-sm">
        {isPlaying ? "Animation Playing" : "Animation Paused"} | {isLooping ? "Looping" : "Not Looping"}
      </div>
    </div>
  );
};
