// src/pages/studio/index.tsx

import React, { useState } from "react";
import StudioLayout from "./StudioLayout";
import Builder2D from "./Builder2D";
import Builder3D from "./Builder3D";
import AnimationTimeline from "./AnimationTimeline";
import GarageBotPanel from "./GarageBotPanel";
import RealtimeCollabOverlay from "./RealtimeCollabOverlay";

const StudioPage: React.FC = () => {
  const [mode, setMode] = useState<"2d" | "3d">("2d");

  return (
    <StudioLayout mode={mode} onModeChange={setMode}>
      <div className="flex flex-col h-full w-full bg-gray-50">
        {/* Mode switcher */}
        <div className="flex items-center p-3 border-b border-gray-300">
          <button
            className={`px-4 py-2 rounded-l-md font-semibold ${
              mode === "2d" ? "bg-blue-600 text-white" : "bg-white text-gray-700"
            }`}
            onClick={() => setMode("2d")}
          >
            2D Builder
          </button>
          <button
            className={`px-4 py-2 rounded-r-md font-semibold ${
              mode === "3d" ? "bg-blue-600 text-white" : "bg-white text-gray-700"
            }`}
            onClick={() => setMode("3d")}
          >
            3D Builder
          </button>
        </div>

        {/* Canvas + realtime collab */}
        <div className="flex-grow relative overflow-hidden">
          {mode === "2d" ? <Builder2D /> : <Builder3D />}
          <RealtimeCollabOverlay />
        </div>

        {/* Animation timeline */}
        <div className="h-48 border-t border-gray-300 bg-white">
          <AnimationTimeline />
        </div>

        {/* GarageBot assistant panel */}
        <GarageBotPanel />
      </div>
    </StudioLayout>
  );
};

export default StudioPage;
