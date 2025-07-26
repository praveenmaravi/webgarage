import { useEffect, useState, useCallback } from "react";

type XRMode = "none" | "ar" | "vr";

export function useARVRPreview() {
  const [xrSupported, setXrSupported] = useState(false);
  const [mode, setMode] = useState<XRMode>("none");

  // Check for WebXR support
  useEffect(() => {
    if (navigator.xr) {
      navigator.xr.isSessionSupported("immersive-vr").then((supported) => {
        if (supported) setXrSupported(true);
      });
    }
  }, []);

  // Start XR session
  const enterXR = useCallback(async (type: XRMode) => {
    if (!navigator.xr) {
      alert("WebXR not supported on this browser.");
      return;
    }

    try {
      const sessionType = type === "vr" ? "immersive-vr" : "immersive-ar";

      const session = await navigator.xr.requestSession(sessionType, {
        requiredFeatures: ["local-floor"],
        optionalFeatures: ["bounded-floor", "hand-tracking"],
      });

      (document as any).xrSession = session;
      setMode(type);

      // Handle session end
      session.addEventListener("end", () => {
        setMode("none");
        (document as any).xrSession = null;
      });
    } catch (err) {
      console.error("Failed to enter XR session:", err);
      alert("Failed to enter XR session. Make sure your device supports it.");
    }
  }, []);

  const exitXR = useCallback(() => {
    const session = (document as any).xrSession;
    if (session) {
      session.end();
    }
  }, []);

  return {
    xrSupported,
    mode,
    enterVR: () => enterXR("vr"),
    enterAR: () => enterXR("ar"),
    exitXR,
  };
}
