// src/lib/animation/animationUtils.ts

import { gsap } from "gsap";

/**
 * Initialize and trigger an animation on a target element.
 * @param element The target element to animate
 * @param animation A function that defines the animation
 */
export const initAnimation = (element: HTMLElement, animation: () => void) => {
  if (element) {
    animation();
  }
};

/**
 * Create and return a new GSAP timeline.
 * Can be used to chain animations together.
 */
export const createTimeline = () => {
  return gsap.timeline({ paused: false });
};

/**
 * Add a delay to a GSAP timeline.
 * @param timeline The GSAP timeline to which the delay will be added
 * @param delay The duration of the delay (in seconds)
 */
export const addDelay = (timeline: GSAPTimeline, delay: number) => {
  timeline.to({}, { duration: delay }); // Add a delay to the timeline
};

/**
 * Create a fade-in effect using GSAP.
 * @param element The element to animate
 * @param duration Duration of the fade-in (in seconds)
 */
export const fadeIn = (element: HTMLElement, duration: number = 1) => {
  gsap.fromTo(
    element,
    { opacity: 0 },
    { opacity: 1, duration: duration, ease: "power2.out" }
  );
};

/**
 * Create a bounce effect using GSAP.
 * @param element The element to animate
 * @param duration Duration of the bounce (in seconds)
 */
export const bounceIn = (element: HTMLElement, duration: number = 1) => {
  gsap.fromTo(
    element,
    { y: -30, opacity: 0 },
    { y: 0, opacity: 1, duration: duration, ease: "bounce.out" }
  );
};

/**
 * Create a slide-in effect from the left using GSAP.
 * @param element The element to animate
 * @param duration Duration of the slide (in seconds)
 */
export const slideInLeft = (element: HTMLElement, duration: number = 1) => {
  gsap.fromTo(
    element,
    { x: -200, opacity: 0 },
    { x: 0, opacity: 1, duration: duration, ease: "power2.out" }
  );
};

/**
 * Create a scaling effect that enlarges the element.
 * @param element The element to animate
 * @param scaleValue The scale value (default: 1.2)
 * @param duration Duration of the scaling (in seconds)
 */
export const scaleUp = (element: HTMLElement, scaleValue: number = 1.2, duration: number = 1) => {
  gsap.fromTo(
    element,
    { scale: 0 },
    { scale: scaleValue, duration: duration, ease: "power2.out" }
  );
};

/**
 * Create a 3D rotating effect using GSAP.
 * @param element The element to animate
 * @param rotation The rotation angle (in degrees)
 * @param duration Duration of the rotation (in seconds)
 */
export const rotate3D = (element: HTMLElement, rotation: number = 360, duration: number = 1) => {
  gsap.fromTo(
    element,
    { rotationY: 0 },
    { rotationY: rotation, duration: duration, ease: "power2.out" }
  );
};

/**
 * Trigger an animation on multiple elements simultaneously.
 * @param elements Array of elements to animate
 * @param animation A function that defines the animation
 */
export const triggerAnimationOnMultiple = (elements: HTMLElement[], animation: () => void) => {
  elements.forEach((element) => {
    animation(element);
  });
};

/**
 * Example of animating an element with an event trigger.
 * @param element The target element to animate
 * @param event The event type that triggers the animation (e.g., "click", "hover")
 * @param animation The animation function to trigger
 */
export const triggerAnimationOnEvent = (element: HTMLElement, event: string, animation: () => void) => {
  element.addEventListener(event, () => {
    animation(element);
  });
};
