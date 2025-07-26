// src/lib/animation/timelineUtils.ts

import { gsap } from "gsap";

/**
 * Create a new GSAP timeline for sequential animations
 * @returns GSAP Timeline instance
 */
export const createTimeline = () => {
  const timeline = gsap.timeline({ paused: false });
  return timeline;
};

/**
 * Create a fade-in effect animation
 * @param {HTMLElement} element - The DOM element to animate
 * @param {number} duration - Duration of the fade-in animation
 */
export const fadeIn = (element: HTMLElement, duration: number = 1) => {
  return gsap.to(element, { opacity: 1, duration: duration });
};

/**
 * Create a slide-in effect from the left
 * @param {HTMLElement} element - The DOM element to animate
 * @param {number} duration - Duration of the slide-in animation
 * @param {number} distance - The distance to slide (in px)
 */
export const slideInLeft = (element: HTMLElement, duration: number = 1, distance: number = 200) => {
  return gsap.fromTo(
    element,
    { x: -distance, opacity: 0 },
    { x: 0, opacity: 1, duration: duration, ease: "power2.out" }
  );
};

/**
 * Create a bounce-in animation
 * @param {HTMLElement} element - The DOM element to animate
 * @param {number} duration - Duration of the bounce animation
 */
export const bounceIn = (element: HTMLElement, duration: number = 1) => {
  return gsap.fromTo(
    element,
    { y: -30, opacity: 0 },
    { y: 0, opacity: 1, duration: duration, ease: "bounce.out" }
  );
};

/**
 * Chain multiple animations in a timeline
 * @param {GSAPTimeline} timeline - The GSAP timeline instance
 * @param {HTMLElement} element - The DOM element to animate
 */
export const addSlideAndFadeIn = (timeline: GSAPTimeline, element: HTMLElement) => {
  timeline
    .add(slideInLeft(element)) // Slide-in effect
    .add(fadeIn(element), "-=0.5"); // Fade-in effect with overlap
};

/**
 * Adds a delay to a timeline
 * @param {GSAPTimeline} timeline - The GSAP timeline instance
 * @param {number} delay - The delay in seconds
 * @returns GSAPTimeline - The timeline with added delay
 */
export const addDelay = (timeline: GSAPTimeline, delay: number) => {
  timeline.to({}, { duration: delay });
  return timeline;
};

/**
 * Example of creating a timeline with multiple steps
 * @param {HTMLElement} element - The DOM element to animate
 */
export const createExampleTimeline = (element: HTMLElement) => {
  const timeline = createTimeline();

  // Add multiple animation steps to the timeline
  timeline
    .add(slideInLeft(element, 1, 300)) // Slide-in from left
    .add(bounceIn(element, 1)) // Bounce-in effect
    .add(fadeIn(element, 1)); // Fade-in effect
  
  return timeline;
};

/**
 * Create a custom timeline animation that sequences multiple actions
 * @param {HTMLElement} element - The DOM element to animate
 */
export const createCustomTimeline = (element: HTMLElement) => {
  const timeline = createTimeline();

  // Sequence animations
  timeline
    .to(element, { opacity: 0, duration: 0.5 }) // Fade-out effect
    .to(element, { x: 100, duration: 1 }) // Move to right
    .to(element, { opacity: 1, duration: 0.5 }) // Fade-in again
    .to(element, { y: 50, duration: 1 }); // Move down
  
  return timeline;
};
