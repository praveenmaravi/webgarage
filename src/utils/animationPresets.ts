// src/utils/animationPresets.ts

import { Variants } from "framer-motion";
import { gsap } from "gsap";

// ==========================
// ✅ FRAMER MOTION PRESETS
// ==========================

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const slideUp: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export const slideLeft: Variants = {
  hidden: { x: 50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: "easeInOut" },
  },
};

export const zoomIn: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const staggerContainer = (delay = 0.15): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: delay,
    },
  },
});

// ==========================
// ✅ GSAP PRESETS (FOR 3D/Custom Animations)
// ==========================

export const gsapPresets = {
  fadeIn: (target: gsap.TweenTarget, duration = 1) =>
    gsap.fromTo(
      target,
      { opacity: 0 },
      { opacity: 1, duration, ease: "power2.out" }
    ),

  slideInY: (target: gsap.TweenTarget, duration = 1, distance = 50) =>
    gsap.fromTo(
      target,
      { y: distance, opacity: 0 },
      { y: 0, opacity: 1, duration, ease: "power2.out" }
    ),

  slideInX: (target: gsap.TweenTarget, duration = 1, distance = 100) =>
    gsap.fromTo(
      target,
      { x: distance, opacity: 0 },
      { x: 0, opacity: 1, duration, ease: "power2.out" }
    ),

  zoomIn: (target: gsap.TweenTarget, duration = 0.8) =>
    gsap.fromTo(
      target,
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration, ease: "back.out(1.7)" }
    ),

  rotateIn: (target: gsap.TweenTarget, duration = 1) =>
    gsap.fromTo(
      target,
      { rotation: -90, opacity: 0 },
      { rotation: 0, opacity: 1, duration, ease: "back.out(1.7)" }
    ),
};

