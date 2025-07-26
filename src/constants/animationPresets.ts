// src/constants/animationPresets.ts

// GSAP Presets (for animations using GSAP library)
export const gsapPresets = {
    fadeIn: {
      opacity: 0,
      y: 50,
      duration: 1.5,
      ease: "easeOut",
      opacityEnd: 1,
      yEnd: 0,
    },
  
    slideInFromLeft: {
      x: -200,
      opacity: 0,
      duration: 1.5,
      ease: "easeOut",
      xEnd: 0,
      opacityEnd: 1,
    },
  
    scaleUp: {
      scale: 0.5,
      opacity: 0,
      duration: 1,
      ease: "easeOut",
      scaleEnd: 1,
      opacityEnd: 1,
    },
  
    bounce: {
      scale: 1.2,
      opacity: 0,
      duration: 0.8,
      ease: "bounce",
      scaleEnd: 1,
      opacityEnd: 1,
    },
  
    rotateIn: {
      rotate: -90,
      opacity: 0,
      duration: 1.2,
      ease: "easeOut",
      rotateEnd: 0,
      opacityEnd: 1,
    },
  
    pulse: {
      scale: 1,
      opacity: 0.8,
      duration: 1.5,
      ease: "easeInOut",
      scaleEnd: 1.1,
      opacityEnd: 1,
    },
  };
  
  // Framer Motion Presets (for animations using Framer Motion library)
  export const framerMotionPresets = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 1.5, ease: "easeOut" },
    },
  
    slideInFromLeft: {
      initial: { x: "-100vw", opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: "100vw", opacity: 0 },
      transition: { duration: 1.5, ease: "easeOut" },
    },
  
    scaleUp: {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 1.2, opacity: 0 },
      transition: { duration: 1, ease: "easeOut" },
    },
  
    bounce: {
      initial: { scale: 1.1 },
      animate: { scale: 1 },
      exit: { scale: 1.2 },
      transition: { duration: 0.8, type: "spring", stiffness: 500 },
    },
  
    rotateIn: {
      initial: { rotate: -90, opacity: 0 },
      animate: { rotate: 0, opacity: 1 },
      exit: { rotate: 90, opacity: 0 },
      transition: { duration: 1.2, ease: "easeOut" },
    },
  
    pulse: {
      initial: { scale: 1, opacity: 0.8 },
      animate: { scale: 1.1, opacity: 1 },
      exit: { scale: 1, opacity: 0.8 },
      transition: { duration: 1.5, ease: "easeInOut" },
    },
  };
  
  // Export for easy use
  export const animationPresets = {
    gsap: gsapPresets,
    framerMotion: framerMotionPresets,
  };
  