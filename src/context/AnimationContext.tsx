// src/context/AnimationContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the types of the animation context
interface Keyframe {
  time: number;
  value: string; // This could be a value like opacity, transform, etc.
}

interface AnimationContextProps {
  currentAnimation: string;
  setCurrentAnimation: (animationName: string) => void;
  keyframes: Keyframe[];
  addKeyframe: (keyframe: Keyframe) => void;
  removeKeyframe: (index: number) => void;
  updateKeyframe: (index: number, updatedKeyframe: Keyframe) => void;
}

const AnimationContext = createContext<AnimationContextProps | undefined>(undefined);

// Provide context for animation-related state management
export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const [currentAnimation, setCurrentAnimation] = useState<string>(""); // Current active animation
  const [keyframes, setKeyframes] = useState<Keyframe[]>([]); // Store keyframes

  // Add a new keyframe to the list of keyframes
  const addKeyframe = (keyframe: Keyframe) => {
    setKeyframes((prevKeyframes) => [...prevKeyframes, keyframe]);
  };

  // Remove a keyframe from the list by its index
  const removeKeyframe = (index: number) => {
    setKeyframes((prevKeyframes) => prevKeyframes.filter((_, i) => i !== index));
  };

  // Update an existing keyframe
  const updateKeyframe = (index: number, updatedKeyframe: Keyframe) => {
    const updatedKeyframes = [...keyframes];
    updatedKeyframes[index] = updatedKeyframe;
    setKeyframes(updatedKeyframes);
  };

  return (
    <AnimationContext.Provider
      value={{
        currentAnimation,
        setCurrentAnimation,
        keyframes,
        addKeyframe,
        removeKeyframe,
        updateKeyframe,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};

// Custom hook to use the AnimationContext
export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) throw new Error("useAnimation must be used within an AnimationProvider");
  return context;
};
