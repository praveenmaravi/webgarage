// src/utils/eventBus.ts

type EventCallback = (...args: any[]) => void;

class EventBus {
  private listeners: Map<string, Set<EventCallback>>;

  constructor() {
    this.listeners = new Map();
  }

  /**
   * Subscribe to a custom event
   * @param event - Event name
   * @param callback - Function to call on event trigger
   */
  on(event: string, callback: EventCallback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)?.add(callback);
  }

  /**
   * Remove event listener
   * @param event - Event name
   * @param callback - Function to remove
   */
  off(event: string, callback: EventCallback) {
    this.listeners.get(event)?.delete(callback);
  }

  /**
   * Emit an event to all listeners
   * @param event - Event name
   * @param args - Arguments passed to the callback
   */
  emit(event: string, ...args: any[]) {
    this.listeners.get(event)?.forEach((callback) => {
      try {
        callback(...args);
      } catch (err) {
        console.error(`Error in event callback for "${event}":`, err);
      }
    });
  }

  /**
   * Remove all listeners for an event
   * @param event - Event name
   */
  clear(event: string) {
    this.listeners.delete(event);
  }

  /**
   * Remove all events and listeners
   */
  clearAll() {
    this.listeners.clear();
  }
}

const eventBus = new EventBus();
export default eventBus;
