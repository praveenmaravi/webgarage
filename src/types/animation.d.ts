// src/types/animation.d.ts

/**
 * Represents a single keyframe in an animation timeline.
 */
export interface Keyframe {
  id: string;                  // Unique identifier for the keyframe
  property: string;            // CSS or 3D transform property (e.g., 'opacity', 'x', 'rotateY')
  value: string | number;      // Value at this keyframe (e.g., 1, '100px', '45deg')
  time: number;                // Time offset in milliseconds from animation start
  easing?: string;             // Optional easing function name (e.g., 'ease-in-out', 'linear')
}

/**
 * Defines a full animation timeline consisting of multiple keyframes.
 */
export interface AnimationTimeline {
  id: string;                 // Unique identifier for the timeline
  name: string;               // Friendly name (e.g., 'BounceIn', 'FadeOut')
  duration: number;           // Total duration in milliseconds
  keyframes: Keyframe[];      // Ordered list of keyframes
  loop: boolean;              // Should the animation loop infinitely?
  autoplay: boolean;          // Should the animation start playing automatically?
  delay?: number;             // Delay before starting animation in ms
  direction?: 'normal' | 'reverse' | 'alternate'; // Playback direction
}

/**
 * An animation attached to a UI component.
 */
export interface ComponentAnimation {
  componentId: string;           // ID of the component this animation applies to
  timelineId: string;            // ID of the AnimationTimeline used
  state?: 'idle' | 'playing' | 'paused' | 'stopped';  // Current playback state
  playbackRate?: number;         // Speed multiplier (1 = normal speed)
  loopCount?: number;            // Number of loops completed (for tracking)
}

/**
 * Animation event triggers for hooking into lifecycle.
 */
export interface AnimationEventCallbacks {
  onStart?: () => void;
  onComplete?: () => void;
  onLoop?: (loopNumber: number) => void;
  onPause?: () => void;
  onStop?: () => void;
}
