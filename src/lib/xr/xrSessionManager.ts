// src/lib/xr/xrSessionManager.ts

import * as THREE from 'three';

export class XRSessionManager {
  session: XRSession | null = null;
  referenceSpace: XRReferenceSpace | null = null;
  renderer: THREE.WebGLRenderer;

  constructor(renderer: THREE.WebGLRenderer) {
    this.renderer = renderer;
  }

  async startSession(type: 'immersive-vr' | 'immersive-ar') {
    if (!navigator.xr) {
      throw new Error('WebXR not supported');
    }
    this.session = await navigator.xr.requestSession(type, {
      requiredFeatures: ['local-floor'],
      optionalFeatures: ['hand-tracking', 'layers']
    });
    this.renderer.xr.setSession(this.session);
    this.referenceSpace = await this.session.requestReferenceSpace('local-floor');
  }

  endSession() {
    if (this.session) {
      this.session.end();
      this.session = null;
      this.referenceSpace = null;
    }
  }

  getInputSources(): XRInputSource[] {
    if (!this.session) return [];
    return this.session.inputSources;
  }
}
