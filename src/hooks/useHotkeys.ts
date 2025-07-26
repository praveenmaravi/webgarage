import { useEffect } from "react";

type HotkeyHandler = (event: KeyboardEvent) => void;

interface HotkeyMap {
  [key: string]: HotkeyHandler;
}

function normalizeKey(event: KeyboardEvent): string {
  const keys = [];

  if (event.ctrlKey) keys.push("ctrl");
  if (event.metaKey) keys.push("meta"); // for macOS cmd key
  if (event.altKey) keys.push("alt");
  if (event.shiftKey) keys.push("shift");

  keys.push(event.key.toLowerCase());

  return keys.join("+");
}

export function useHotkeys(hotkeys: HotkeyMap, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = normalizeKey(event);
      const handler = hotkeys[key];
      if (handler) {
        event.preventDefault();
        handler(event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hotkeys, enabled]);
}
