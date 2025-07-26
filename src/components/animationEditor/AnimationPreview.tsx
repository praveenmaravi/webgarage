import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type AnimationPreviewProps = {
  animations: any[];  // List of animations to be applied to different elements
};

export const AnimationPreview: React.FC<AnimationPreviewProps> = ({ animations }) => {
  const [currentAnimations, setCurrentAnimations] = useState<any[]>([]);

  useEffect(() => {
    // Update the animations when the `animations` prop changes
    if (animations.length > 0) {
      setCurrentAnimations(animations);
    }
  }, [animations]);

  // This function will map the animations array to corresponding motion.divs for preview
  const renderAnimations = () => {
    return currentAnimations.map((animation, index) => (
      <motion.div
        key={index}
        className="relative w-32 h-32 bg-blue-500"
        style={{ margin: '10px' }}
        initial={animation.initial}
        animate={animation.animate}
        exit={animation.exit}
        transition={animation.transition}
      >
        <span className="text-white text-xs absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {animation.name}
        </span>
      </motion.div>
    ));
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-700">
      {/* Render the animations */}
      <div className="flex flex-wrap justify-center">
        {renderAnimations()}
      </div>
    </div>
  );
};
