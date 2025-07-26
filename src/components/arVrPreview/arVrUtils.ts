// src/components/arVrPreview/arVrUtils.ts

// Check if WebXR is available and supported
export const initializeXR = async () => {
    try {
      if (navigator.xr) {
        // Check for AR support
        const isARSupported = await navigator.xr.isSessionSupported('immersive-ar');
        // Check for VR support
        const isVRSupported = await navigator.xr.isSessionSupported('immersive-vr');
        
        return {
          isARSupported,
          isVRSupported,
        };
      } else {
        return { isARSupported: false, isVRSupported: false };
      }
    } catch (error) {
      console.error("XR initialization failed:", error);
      return { isARSupported: false, isVRSupported: false };
    }
  };
  
  // Start the AR session
  export const startARSession = () => {
    // Session options for AR (e.g., requires hit-test for placement)
    const sessionOptions = {
      requiredFeatures: ['hit-test'],
    };
  
    navigator.xr.requestSession('immersive-ar', sessionOptions).then((session) => {
      session.addEventListener('end', () => {
        console.log('AR session ended');
      });
      // Setup WebGL layer for AR rendering
      setupXRSession(session);
    }).catch((error) => {
      console.error('Error starting AR session:', error);
    });
  };
  
  // Start the VR session
  export const startVRSession = () => {
    // Session options for VR (e.g., requires local space for immersive VR)
    const sessionOptions = {
      requiredFeatures: ['local'],
    };
  
    navigator.xr.requestSession('immersive-vr', sessionOptions).then((session) => {
      session.addEventListener('end', () => {
        console.log('VR session ended');
      });
      // Setup WebGL layer for VR rendering
      setupXRSession(session);
    }).catch((error) => {
      console.error('Error starting VR session:', error);
    });
  };
  
  // Helper function to set up the WebGL layer for XR session
  const setupXRSession = (session: XRSession) => {
    const canvas = document.getElementById('xrCanvas') as HTMLCanvasElement;
    if (canvas && session) {
      const gl = canvas.getContext('webgl2');
      if (gl) {
        const xrRenderer = new XRWebGLLayer(session, gl);
        session.updateRenderState({ baseLayer: xrRenderer });
  
        session.requestReferenceSpace('local').then((referenceSpace) => {
          const frameOfReference = referenceSpace;
          session.requestAnimationFrame((time, frame) => {
            // Handle rendering each frame here
            const xrViewport = xrRenderer.getViewport(frameOfReference);
            gl.viewport(xrViewport.x, xrViewport.y, xrViewport.width, xrViewport.height);
            // Start rendering loop
            renderXRFrame(session, frameOfReference, gl);
          });
        });
      } else {
        console.error('WebGL2 context is not available');
      }
    }
  };
  
  // Rendering function for XR sessions (AR/VR)
  const renderXRFrame = (session: XRSession, referenceSpace: XRReferenceSpace, gl: WebGLRenderingContext) => {
    // Request the next frame and handle any XR frame-specific rendering here
    session.requestAnimationFrame(() => renderXRFrame(session, referenceSpace, gl));
  
    // Example: Clear the WebGL context
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
    // Additional rendering logic can go here
  };
  
  // Function to check device support and initialize AR/VR
  export const checkAndStartXRSession = async () => {
    const { isARSupported, isVRSupported } = await initializeXR();
    if (isARSupported || isVRSupported) {
      console.log('AR/VR is supported');
      return { isARSupported, isVRSupported };
    } else {
      console.log('AR/VR is not supported on this device');
      return { isARSupported: false, isVRSupported: false };
    }
  };
  