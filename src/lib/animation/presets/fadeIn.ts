// src/lib/animation/presets/fadeIn.ts

export const fadeInPreset = {
  initial: {
    opacity: 0, // Start with the element being fully transparent
  },
  animate: {
    opacity: 1, // Fade into full opacity
    transition: {
      duration: 1, // Duration of the fade-in effect
      ease: "easeOut", // Easing function for smooth transition
    },
  },
  exit: {
    opacity: 0, // Fade out to fully transparent when exiting
    transition: {
      duration: 0.5, // Duration for fade-out when element is removed
    },
  },
};
