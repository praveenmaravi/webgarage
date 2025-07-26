import { useState, useRef, useCallback } from "react";
import { animate, AnimationPlaybackControls } from "framer-motion";

interface Keyframe {
  id: string;
  componentId: string;
  property: string;
  from: any;
  to: any;
  duration: number;
  delay?: number;
  easing?: string;
}

export function useAnimationTimeline() {
  const [keyframes, setKeyframes] = useState<Keyframe[]>([]);
  const controlsRef = useRef<Record<string, AnimationPlaybackControls>>({});

  // Add a new keyframe to the timeline
  const addKeyframe = useCallback((kf: Keyframe) => {
    setKeyframes((prev) => [...prev, kf]);
  }, []);

  // Remove a keyframe by ID
  const removeKeyframe = useCallback((id: string) => {
    setKeyframes((prev) => prev.filter((kf) => kf.id !== id));
    delete controlsRef.current[id];
  }, []);

  // Play all animations in sequence
  const playTimeline = useCallback(() => {
    keyframes.forEach((kf) => {
      const { id, from, to, duration, delay = 0, easing = "easeInOut" } = kf;

      const control = animate(from, to, {
        duration,
        delay,
        ease: easing as any,
        onUpdate: (latest) => {
          // You would sync this with the canvas component state
          const event = new CustomEvent(`animate-${kf.componentId}`, {
            detail: { property: kf.property, value: latest },
          });
          window.dispatchEvent(event);
        },
      });

      controlsRef.current[id] = control;
    });
  }, [keyframes]);

  const pauseTimeline = useCallback(() => {
    Object.values(controlsRef.current).forEach((ctrl) => ctrl.pause());
  }, []);

  const resumeTimeline = useCallback(() => {
    Object.values(controlsRef.current).forEach((ctrl) => ctrl.play());
  }, []);

  const stopTimeline = useCallback(() => {
    Object.values(controlsRef.current).forEach((ctrl) => ctrl.stop());
    controlsRef.current = {};
  }, []);

  return {
    keyframes,
    addKeyframe,
    removeKeyframe,
    playTimeline,
    pauseTimeline,
    resumeTimeline,
    stopTimeline,
  };
}
