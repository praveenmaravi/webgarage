// src/lib/xr/webxrUtils.ts

export async function isWebXRSupported(): Promise<boolean> {
  if (navigator.xr) {
    return await navigator.xr.isSessionSupported('immersive-vr') ||
           await navigator.xr.isSessionSupported('immersive-ar');
  }
  return false;
}

export async function startXRSession(sessionType: 'immersive-vr' | 'immersive-ar'): Promise<XRSession | null> {
  if (!navigator.xr) {
    console.warn('WebXR not supported by this browser');
    return null;
  }

  const supported = await navigator.xr.isSessionSupported(sessionType);
  if (!supported) {
    console.warn(`${sessionType} not supported on this device.`);
    return null;
  }

  try {
    const session = await navigator.xr.requestSession(sessionType, {
      requiredFeatures: ['local-floor', 'bounded-floor'],
      optionalFeatures: ['hand-tracking', 'layers']
    });
    return session;
  } catch (err) {
    console.error('Failed to start XR session', err);
    return null;
  }
}

export function endXRSession(session: XRSession) {
  session.end();
}
