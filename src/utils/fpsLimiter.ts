/**
 * fpsLimiter.ts
 * Limits the frequency of a callback to a desired FPS.
 * Useful for animation loops, state updates, or rendering optimization.
 */

export class FPSLimiter {
    private fps: number;
    private interval: number;
    private then: number;
    private callback: () => void;
    private animationFrameId: number | null = null;
    private running: boolean = false;
  
    constructor(fps: number, callback: () => void) {
      this.fps = fps;
      this.interval = 1000 / fps;
      this.callback = callback;
      this.then = performance.now();
    }
  
    start() {
      this.running = true;
      this.loop();
    }
  
    private loop = () => {
      if (!this.running) return;
  
      this.animationFrameId = requestAnimationFrame(this.loop);
      const now = performance.now();
      const delta = now - this.then;
  
      if (delta > this.interval) {
        this.then = now - (delta % this.interval);
        this.callback();
      }
    };
  
    stop() {
      this.running = false;
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
    }
  
    updateFPS(newFPS: number) {
      this.fps = newFPS;
      this.interval = 1000 / newFPS;
    }
  }
  