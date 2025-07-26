// src/lib/animation/presets/scaleUp.ts

export const scaleUpPreset = {
  initial: {
    scale: 0.8, // Start at 80% of the element's original size
    opacity: 0, // Start with the element being invisible
  },
  animate: {
    scale: 1, // Scale to its original size (100%)
    opacity: 1, // Fade in to full opacity
    transition: {
      duration: 0.8, // Duration of the scale-up effect
      ease: "easeOut", // Easing function to make the scaling smooth
    },
  },
  exit: {
    scale: 0.8, // Scale down when exiting
    opacity: 0, // Fade out when exiting
    transition: {
      duration: 0.5, // Duration for scaling down and fading out
    },
  },
};
