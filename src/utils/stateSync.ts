// src/utils/stateSync.ts

type ComponentState = Record<string, any>;

interface DiffResult {
  added: Record<string, any>;
  updated: Record<string, any>;
  deleted: string[];
}

/**
 * Compute the diff between two states (local vs remote).
 */
export function diffStates(
  prevState: ComponentState,
  newState: ComponentState
): DiffResult {
  const added: Record<string, any> = {};
  const updated: Record<string, any> = {};
  const deleted: string[] = [];

  const prevKeys = Object.keys(prevState);
  const newKeys = Object.keys(newState);

  // Detect deleted keys
  for (const key of prevKeys) {
    if (!newState.hasOwnProperty(key)) {
      deleted.push(key);
    }
  }

  // Detect added or updated keys
  for (const key of newKeys) {
    if (!prevState.hasOwnProperty(key)) {
      added[key] = newState[key];
    } else if (JSON.stringify(prevState[key]) !== JSON.stringify(newState[key])) {
      updated[key] = newState[key];
    }
  }

  return { added, updated, deleted };
}

/**
 * Merge remote state changes into local state.
 */
export function mergeStates(
  localState: ComponentState,
  incoming: DiffResult
): ComponentState {
  const merged = { ...localState };

  // Apply added and updated
  for (const key in incoming.added) {
    merged[key] = incoming.added[key];
  }

  for (const key in incoming.updated) {
    merged[key] = incoming.updated[key];
  }

  // Remove deleted keys
  for (const key of incoming.deleted) {
    delete merged[key];
  }

  return merged;
}

/**
 * Sync wrapper: compute diff and merge incoming state.
 */
export function syncState(
  localState: ComponentState,
  remoteState: ComponentState
): ComponentState {
  const diff = diffStates(localState, remoteState);
  return mergeStates(localState, diff);
}
