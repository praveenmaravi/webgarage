// src/lib/animation/gsapUtils.ts

import { gsap } from "gsap";

// Basic Fade-In animation
export const fadeIn = (element: HTMLElement, duration: number = 1) => {
  gsap.fromTo(
    element,
    { opacity: 0 },
    { opacity: 1, duration, ease: "power2.out" }
  );
};

// Basic Fade-Out animation
export const fadeOut = (element: HTMLElement, duration: number = 1) => {
  gsap.fromTo(
    element,
    { opacity: 1 },
    { opacity: 0, duration, ease: "power2.in" }
  );
};

// Slide-in from left
export const slideInLeft = (element: HTMLElement, duration: number = 1) => {
  gsap.fromTo(
    element,
    { x: -200, opacity: 0 },
    { x: 0, opacity: 1, duration, ease: "power2.out" }
  );
};

// Slide-out to left
export const slideOutLeft = (element: HTMLElement, duration: number = 1) => {
  gsap.fromTo(
    element,
    { x: 0, opacity: 1 },
    { x: -200, opacity: 0, duration, ease: "power2.in" }
  );
};

// Slide-in from right
export const slideInRight = (element: HTMLElement, duration: number = 1) => {
  gsap.fromTo(
    element,
    { x: 200, opacity: 0 },
    { x: 0, opacity: 1, duration, ease: "power2.out" }
  );
};

// Bounce-in animation (from bottom)
export const bounceIn = (element: HTMLElement, duration: number = 1) => {
  gsap.fromTo(
    element,
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration, ease: "bounce.out" }
  );
};

// Scale-up animation
export const scaleUp = (element: HTMLElement, duration: number = 1) => {
  gsap.fromTo(
    element,
    { scale: 0.5, opacity: 0 },
    { scale: 1, opacity: 1, duration, ease: "back.out(1.7)" }
  );
};

// Rotate animation
export const rotateIn = (element: HTMLElement, duration: number = 1) => {
  gsap.fromTo(
    element,
    { rotation: -45, opacity: 0 },
    { rotation: 0, opacity: 1, duration, ease: "power2.out" }
  );
};

// Slide-up animation (from bottom)
export const slideUp = (element: HTMLElement, duration: number = 1) => {
  gsap.fromTo(
    element,
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, duration, ease: "power2.out" }
  );
};

// Slide-down animation (to bottom)
export const slideDown = (element: HTMLElement, duration: number = 1) => {
  gsap.fromTo(
    element,
    { y: 0, opacity: 1 },
    { y: 100, opacity: 0, duration, ease: "power2.in" }
  );
};

// Flip animation
export const flip = (element: HTMLElement, duration: number = 1) => {
  gsap.fromTo(
    element,
    { rotationY: -180, opacity: 0 },
    { rotationY: 0, opacity: 1, duration, ease: "power2.out" }
  );
};

// Stagger animation (multiple elements)
export const staggerFadeIn = (elements: HTMLElement[], duration: number = 1) => {
  gsap.fromTo(
    elements,
    { opacity: 0 },
    { opacity: 1, duration, stagger: 0.2, ease: "power2.out" }
  );
};

// Horizontal Parallax effect (for scroll-based animation)
export const horizontalParallax = (element: HTMLElement, scrollAmount: number) => {
  gsap.to(element, {
    x: `+=${scrollAmount}`,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top center",
      end: "bottom top",
      scrub: true,
    },
  });
};

// Vertical Parallax effect (for scroll-based animation)
export const verticalParallax = (element: HTMLElement, scrollAmount: number) => {
  gsap.to(element, {
    y: `+=${scrollAmount}`,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top center",
      end: "bottom top",
      scrub: true,
    },
  });
};
