import { useCallback, useRef, useState } from "react";

type State<T> = {
  past: T[];
  present: T;
  future: T[];
};

export function useUndoRedo<T>(initialPresent: T) {
  const [state, setState] = useState<State<T>>({
    past: [],
    present: initialPresent,
    future: [],
  });

  const isUndoing = useRef(false);
  const isRedoing = useRef(false);

  const canUndo = state.past.length > 0;
  const canRedo = state.future.length > 0;

  const set = useCallback(
    (newPresent: T) => {
      setState(current => {
        if (isUndoing.current || isRedoing.current) {
          return {
            ...current,
            present: newPresent,
          };
        }

        return {
          past: [...current.past, current.present],
          present: newPresent,
          future: [],
        };
      });
    },
    []
  );

  const undo = useCallback(() => {
    setState(current => {
      if (!canUndo) return current;

      const previous = current.past[current.past.length - 1];
      const newPast = current.past.slice(0, -1);
      const newFuture = [current.present, ...current.future];

      isUndoing.current = true;
      const result = {
        past: newPast,
        present: previous,
        future: newFuture,
      };
      isUndoing.current = false;

      return result;
    });
  }, [canUndo]);

  const redo = useCallback(() => {
    setState(current => {
      if (!canRedo) return current;

      const next = current.future[0];
      const newFuture = current.future.slice(1);
      const newPast = [...current.past, current.present];

      isRedoing.current = true;
      const result = {
        past: newPast,
        present: next,
        future: newFuture,
      };
      isRedoing.current = false;

      return result;
    });
  }, [canRedo]);

  const reset = useCallback((newPresent: T) => {
    setState({
      past: [],
      present: newPresent,
      future: [],
    });
  }, []);

  return {
    state: state.present,
    set,
    undo,
    redo,
    reset,
    canUndo,
    canRedo,
  };
}
