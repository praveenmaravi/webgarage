import { useState, useCallback } from "react";
import { Vector3, Euler } from "three";

export interface Object3DMeta {
  id: string;
  type: "box" | "sphere" | "model" | "light" | string;
  position: Vector3;
  rotation: Euler;
  scale: Vector3;
  name?: string;
  props?: any; // Material, color, etc.
}

export function useBuilder3D() {
  const [objects, setObjects] = useState<Object3DMeta[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const addObject = useCallback(
    (type: Object3DMeta["type"], initProps = {}) => {
      const newObj: Object3DMeta = {
        id: crypto.randomUUID(),
        type,
        name: `${type}-${Date.now()}`,
        position: new Vector3(0, 0, 0),
        rotation: new Euler(0, 0, 0),
        scale: new Vector3(1, 1, 1),
        props: initProps
      };
      setObjects(prev => [...prev, newObj]);
      setSelectedId(newObj.id);
    },
    []
  );

  const updateObject = useCallback((id: string, updates: Partial<Object3DMeta>) => {
    setObjects(prev =>
      prev.map(obj => (obj.id === id ? { ...obj, ...updates } : obj))
    );
  }, []);

  const removeObject = useCallback((id: string) => {
    setObjects(prev => prev.filter(obj => obj.id !== id));
    if (selectedId === id) setSelectedId(null);
  }, [selectedId]);

  const getSelectedObject = useCallback(() => {
    return objects.find(obj => obj.id === selectedId) || null;
  }, [objects, selectedId]);

  return {
    objects,
    selectedId,
    setSelectedId,
    addObject,
    updateObject,
    removeObject,
    getSelectedObject
  };
}
