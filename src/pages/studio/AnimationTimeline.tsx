// src/pages/studio/AnimationTimeline.tsx
import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

type Keyframe = {
  id: number;
  time: number; // in seconds
  value: number; // e.g., opacity, x-position, scale, etc.
};

const TIMELINE_LENGTH = 10; // seconds
const TIMELINE_WIDTH = 600; // px, for visual scale

const secondsToPixels = (time: number) => (time / TIMELINE_LENGTH) * TIMELINE_WIDTH;
const pixelsToSeconds = (px: number) => (px / TIMELINE_WIDTH) * TIMELINE_LENGTH;

const AnimationTimeline: React.FC = () => {
  const [keyframes, setKeyframes] = useState<Keyframe[]>([
    { id: 1, time: 0, value: 0 },
    { id: 2, time: 5, value: 50 },
    { id: 3, time: 10, value: 100 },
  ]);

  const [draggingId, setDraggingId] = useState<number | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Handle drag movement
  const handleDrag = (id: number, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    let newX = event.clientX - rect.left;
    if (newX < 0) newX = 0;
    if (newX > TIMELINE_WIDTH) newX = TIMELINE_WIDTH;

    const newTime = pixelsToSeconds(newX);

    setKeyframes((prev) =>
      prev.map((kf) => (kf.id === id ? { ...kf, time: newTime } : kf))
    );
  };

  // Add new keyframe at click position
  const handleAddKeyframe = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const time = pixelsToSeconds(clickX);

    const newKeyframe: Keyframe = {
      id: Date.now(),
      time,
      value: 0,
    };
    setKeyframes((prev) => [...prev, newKeyframe].sort((a, b) => a.time - b.time));
  };

  // Drag handlers
  const handleMouseDown = (id: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setDraggingId(id);
  };

  const handleMouseUp = () => {
    setDraggingId(null);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (draggingId === null) return;
    handleDrag(draggingId, e as any);
  };

  useEffect(() => {
    if (draggingId !== null) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [draggingId]);

  return (
    <div className="p-4 border-t border-gray-300 bg-white select-none">
      <div className="mb-2 font-semibold text-gray-700">Animation Timeline</div>
      <div
        ref={timelineRef}
        className="relative h-24 bg-gray-100 rounded cursor-pointer"
        style={{ width: TIMELINE_WIDTH }}
        onClick={handleAddKeyframe}
      >
        {/* Timeline horizontal base */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-400" />

        {/* Time markers */}
        {[...Array(TIMELINE_LENGTH + 1)].map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 w-px h-4 bg-gray-500"
            style={{ left: (i / TIMELINE_LENGTH) * 100 + "%" }}
          >
            <div className="absolute -bottom-6 -left-1 text-xs text-gray-600">{i}s</div>
          </div>
        ))}

        {/* Keyframes */}
        {keyframes.map(({ id, time }) => (
          <motion.div
            key={id}
            className="absolute -top-2 w-4 h-8 bg-blue-500 rounded cursor-grab"
            style={{ left: secondsToPixels(time) - 8 }}
            onMouseDown={handleMouseDown(id)}
            whileTap={{ cursor: "grabbing" }}
            drag="x"
            dragConstraints={{ left: 0, right: TIMELINE_WIDTH }}
            dragElastic={0}
            dragMomentum={false}
            onDrag={(event, info) => {
              const newTime = pixelsToSeconds(info.point.x);
              setKeyframes((prev) =>
                prev.map((kf) => (kf.id === id ? { ...kf, time: Math.min(Math.max(newTime, 0), TIMELINE_LENGTH) } : kf))
              );
            }}
          />
        ))}

        {/* Easing curve placeholder (optional) */}
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${TIMELINE_WIDTH} 24`}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
        >
          <path d={`M0 20 C${TIMELINE_WIDTH / 3} 0, ${2 * TIMELINE_WIDTH / 3} 24, ${TIMELINE_WIDTH} 4`} />
        </svg>
      </div>
      <div className="mt-2 text-sm text-gray-600">Click timeline to add keyframe, drag blue markers to adjust time.</div>
    </div>
  );
};

export default AnimationTimeline;
