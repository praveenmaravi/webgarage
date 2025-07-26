// src/utils/timelineUtils.ts

export type Keyframe = {
    time: number;                // Time in seconds
    value: any;                  // Could be number, position, scale, etc.
    easing?: string;            // E.g., "easeInOut", "linear", "bounce"
  };
  
  export type TimelineTrack = {
    property: string;           // E.g., "opacity", "transform.x"
    keyframes: Keyframe[];
  };
  
  // --- EASING FUNCTIONS MAP ---
  export const easingFunctions: Record<string, (t: number) => number> = {
    linear: t => t,
    easeIn: t => t * t,
    easeOut: t => t * (2 - t),
    easeInOut: t =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    bounce: t =>
      t < 0.5
        ? (1 - Math.cos(t * Math.PI)) / 2
        : Math.pow(2, -10 * (t - 1)) + 1,
  };
  
  // --- INTERPOLATION ---
  export function interpolateValue(
    t: number,
    from: any,
    to: any
  ): any {
    if (typeof from === "number" && typeof to === "number") {
      return from + (to - from) * t;
    }
    // For now, only numbers supported — can expand to vectors/colors
    return to;
  }
  
  // --- INTERPOLATE KEYFRAMES ---
  export function getInterpolatedValue(
    track: TimelineTrack,
    currentTime: number
  ): any {
    const keyframes = track.keyframes.sort((a, b) => a.time - b.time);
  
    if (currentTime <= keyframes[0].time) return keyframes[0].value;
    if (currentTime >= keyframes[keyframes.length - 1].time)
      return keyframes[keyframes.length - 1].value;
  
    for (let i = 0; i < keyframes.length - 1; i++) {
      const a = keyframes[i];
      const b = keyframes[i + 1];
  
      if (currentTime >= a.time && currentTime <= b.time) {
        const duration = b.time - a.time;
        const localT = (currentTime - a.time) / duration;
  
        const easing = b.easing || "linear";
        const easedT = easingFunctions[easing](localT);
  
        return interpolateValue(easedT, a.value, b.value);
      }
    }
  }
  
  // --- SNAP TO NEAREST FRAME ---
  export function snapToFrame(time: number, fps = 60): number {
    const frameDuration = 1 / fps;
    return Math.round(time / frameDuration) * frameDuration;
  }
  
  // --- INSERT KEYFRAME ---
  export function insertKeyframe(
    track: TimelineTrack,
    newKeyframe: Keyframe
  ): TimelineTrack {
    const existing = track.keyframes.find(kf => kf.time === newKeyframe.time);
    if (existing) {
      existing.value = newKeyframe.value;
      existing.easing = newKeyframe.easing;
    } else {
      track.keyframes.push(newKeyframe);
    }
  
    track.keyframes.sort((a, b) => a.time - b.time);
    return track;
  }
  
  // --- REMOVE KEYFRAME ---
  export function removeKeyframe(track: TimelineTrack, time: number): TimelineTrack {
    track.keyframes = track.keyframes.filter(kf => kf.time !== time);
    return track;
  }
  
  // --- FIND CLOSEST KEYFRAME ---
  export function findClosestKeyframe(track: TimelineTrack, time: number): Keyframe | null {
    let closest = null;
    let minDiff = Infinity;
  
    for (const kf of track.keyframes) {
      const diff = Math.abs(kf.time - time);
      if (diff < minDiff) {
        minDiff = diff;
        closest = kf;
      }
    }
  
    return closest;
  }
  