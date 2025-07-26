import { useState, useCallback } from "react"

export interface Component2D {
  id: string
  type: string
  x: number
  y: number
  width: number
  height: number
  props: Record<string, any>
  style?: React.CSSProperties
  zIndex: number
}

export function useBuilder2D() {
  const [components, setComponents] = useState<Component2D[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [draggingId, setDraggingId] = useState<string | null>(null)

  // Add new component to canvas
  const addComponent = useCallback((type: string) => {
    const newComponent: Component2D = {
      id: crypto.randomUUID(),
      type,
      x: 100,
      y: 100,
      width: 200,
      height: 100,
      props: {},
      style: {},
      zIndex: components.length + 1,
    }
    setComponents(prev => [...prev, newComponent])
  }, [components.length])

  // Select a component
  const selectComponent = useCallback((id: string) => {
    setSelectedId(id)
  }, [])

  // Update any property of a component
  const updateComponent = useCallback((id: string, updates: Partial<Component2D>) => {
    setComponents(prev =>
      prev.map(c => (c.id === id ? { ...c, ...updates } : c))
    )
  }, [])

  // Move component (drag)
  const moveComponent = useCallback((id: string, dx: number, dy: number) => {
    setComponents(prev =>
      prev.map(c =>
        c.id === id
          ? { ...c, x: c.x + dx, y: c.y + dy }
          : c
      )
    )
  }, [])

  // Resize component
  const resizeComponent = useCallback((id: string, width: number, height: number) => {
    setComponents(prev =>
      prev.map(c =>
        c.id === id
          ? { ...c, width, height }
          : c
      )
    )
  }, [])

  // Delete component
  const deleteComponent = useCallback((id: string) => {
    setComponents(prev => prev.filter(c => c.id !== id))
    if (selectedId === id) setSelectedId(null)
  }, [selectedId])

  // Bring to front
  const bringToFront = useCallback((id: string) => {
    const maxZ = Math.max(...components.map(c => c.zIndex), 0)
    updateComponent(id, { zIndex: maxZ + 1 })
  }, [components, updateComponent])

  return {
    components,
    selectedId,
    draggingId,
    setDraggingId,
    addComponent,
    selectComponent,
    updateComponent,
    moveComponent,
    resizeComponent,
    deleteComponent,
    bringToFront,
  }
}
