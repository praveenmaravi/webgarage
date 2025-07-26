// src/utils/componentUtils.ts

import { v4 as uuidv4 } from 'uuid';

/**
 * Generates a unique component ID using UUID.
 */
export function generateComponentId(prefix: string = 'comp'): string {
  return `${prefix}-${uuidv4()}`;
}

/**
 * Deep clones a component object including its nested children.
 */
export function deepCloneComponent<T>(component: T): T {
  return JSON.parse(JSON.stringify(component));
}

/**
 * Traverse component tree and apply a callback to each node.
 */
export function traverseComponents(
  components: any[],
  callback: (comp: any, parent?: any) => void,
  parent: any = null
) {
  components.forEach((comp) => {
    callback(comp, parent);
    if (comp.children && Array.isArray(comp.children)) {
      traverseComponents(comp.children, callback, comp);
    }
  });
}

/**
 * Find a component in the tree by ID.
 */
export function findComponentById(components: any[], id: string): any | null {
  let found: any = null;
  traverseComponents(components, (comp) => {
    if (comp.id === id) found = comp;
  });
  return found;
}

/**
 * Update a component in the tree by ID.
 */
export function updateComponentById(
  components: any[],
  id: string,
  updater: (comp: any) => void
): any[] {
  return components.map((comp) => {
    if (comp.id === id) {
      updater(comp);
      return comp;
    } else if (comp.children) {
      comp.children = updateComponentById(comp.children, id, updater);
    }
    return comp;
  });
}

/**
 * Removes a component from the tree by ID.
 */
export function removeComponentById(components: any[], id: string): any[] {
  return components
    .filter((comp) => comp.id !== id)
    .map((comp) => {
      if (comp.children) {
        comp.children = removeComponentById(comp.children, id);
      }
      return comp;
    });
}

/**
 * Flatten all components from nested tree into a single array.
 */
export function flattenComponentTree(components: any[]): any[] {
  let flat: any[] = [];
  traverseComponents(components, (comp) => {
    flat.push(comp);
  });
  return flat;
}

/**
 * Generate default component object
 */
export function createDefaultComponent(type: string): any {
  return {
    id: generateComponentId(),
    type,
    props: {},
    style: {},
    children: [],
  };
}
