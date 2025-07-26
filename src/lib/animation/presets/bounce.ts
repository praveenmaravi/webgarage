// src/lib/animation/presets/bounce.ts

export const bouncePreset = {
  initial: {
    y: -30, // Start above the element's final position
    opacity: 0, // Start hidden
  },
  animate: {
    y: 0, // Move to its original position
    opacity: 1, // Fade in
    transition: {
      type: "spring", // Spring-like motion for the bounce
      stiffness: 300, // The stiffness of the spring (how tight it is)
      damping: 20, // How fast it slows down (the bounce)
    },
  },
  exit: {
    y: 30, // Move the element down when exiting
    opacity: 0, // Fade out
    transition: {
      duration: 0.5, // Duration of the exit animation
    },
  },
};
