import { useEffect } from "react";

/**
 * useClickOutside
 * Detects clicks outside the given element and triggers a callback.
 *
 * @param ref - React ref to the target element
 * @param callback - Function to execute when outside click is detected
 */
function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T>,
  callback: () => void
) {
  useEffect(() => {
    function handleClick(event: MouseEvent | TouchEvent) {
      const el = ref?.current;
      if (el && !el.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [ref, callback]);
}

export default useClickOutside;
