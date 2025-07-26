// src/lib/animation/framerMotionUtils.ts

import { Variants } from "framer-motion";

// Bounce animation variant
export const bounceMotion: Variants = {
  initial: { y: -30, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 400, damping: 25 },
  },
};

// Fade-in animation variant
export const fadeInMotion: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1 } },
};

// Scale-up animation variant
export const scaleUpMotion: Variants = {
  initial: { scale: 0 },
  animate: { scale: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
};

// Slide-in from left animation variant
export const slideInLeftMotion: Variants = {
  initial: { x: -200, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 1, ease: "easeOut" } },
};

// Slide-in from right animation variant
export const slideInRightMotion: Variants = {
  initial: { x: 200, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 1, ease: "easeOut" } },
};

// Rotate animation variant
export const rotateMotion: Variants = {
  initial: { rotate: 0, opacity: 0 },
  animate: { rotate: 360, opacity: 1, transition: { duration: 1 } },
};

// Flip animation variant
export const flipMotion: Variants = {
  initial: { rotateY: 0, opacity: 0 },
  animate: { rotateY: 180, opacity: 1, transition: { duration: 1 } },
};

// Zoom-in animation variant
export const zoomInMotion: Variants = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 1.5, ease: "easeOut" } },
};

// Fade and slide-up animation variant
export const fadeSlideUpMotion: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// Stagger children animation (useful for lists or grids)
export const staggerChildrenMotion = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.2, duration: 1 },
  },
};

// Child stagger animation (for use with staggerChildren)
export const staggerChildMotion: Variants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 25 } },
};
