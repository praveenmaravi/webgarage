import React, { useState, useEffect } from 'react';
import { AnimationTimeline } from './AnimationTimeline';
import { AnimationPropertiesPanel } from './AnimationPropertiesPanel';
import { AnimationPreview } from './AnimationPreview';
import { AnimationToolbar } from './AnimationToolbar';
import { gsap } from 'gsap';

// Dummy data for demonstration (you can fetch this data dynamically)
const initialAnimations = [
  { id: '1', name: 'Fade In', x: 0, opacity: 0, duration: 2, delay: 0, easing: 'ease-in-out' },
  { id: '2', name: 'Slide Right', x: -100, opacity: 1, duration: 2, delay: 1, easing: 'ease-out' }
];

const AnimationEditor: React.FC = () => {
  const [animations, setAnimations] = useState(initialAnimations);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [previewing, setPreviewing] = useState(false);

  useEffect(() => {
    if (previewing) {
      previewAnimations();
    }
  }, [previewing, animations]);

  const handleElementSelect = (id: string) => {
    setSelectedElement(id);
  };

  const handleAnimationUpdate = (id: string, updatedProps: any) => {
    setAnimations(prevAnimations =>
      prevAnimations.map(anim =>
        anim.id === id ? { ...anim, ...updatedProps } : anim
      )
    );
  };

  const previewAnimations = () => {
    animations.forEach((animation) => {
      gsap.to(`#${animation.id}`, {
        x: animation.x,
        opacity: animation.opacity,
        duration: animation.duration,
        delay: animation.delay,
        ease: animation.easing
      });
    });
  };

  const handlePlay = () => {
    setPreviewing(true);
  };

  const handlePause = () => {
    setPreviewing(false);
  };

  return (
    <div className="flex flex-col w-full h-full bg-gray-900 text-white">
      {/* Toolbar */}
      <AnimationToolbar onPlay={handlePlay} onPause={handlePause} />

      {/* Editor Layout */}
      <div className="flex flex-1">
        {/* Animation Timeline */}
        <div className="w-1/4 bg-gray-800">
          <AnimationTimeline animations={animations} onSelectElement={handleElementSelect} />
        </div>

        {/* Animation Properties Panel */}
        <div className="w-1/4 bg-gray-800">
          {selectedElement && (
            <AnimationPropertiesPanel
              elementId={selectedElement}
              animation={animations.find((anim) => anim.id === selectedElement)}
              onUpdateAnimation={handleAnimationUpdate}
            />
          )}
        </div>

        {/* Animation Preview */}
        <div className="flex-1 bg-gray-700 relative">
          <AnimationPreview animations={animations} />
        </div>
      </div>
    </div>
  );
};

export default AnimationEditor;
