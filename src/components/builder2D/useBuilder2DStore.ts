import { create } from 'zustand'
import { nanoid } from 'nanoid'

export type ElementType = 'text' | 'rectangle' | 'image' | 'button'

export interface CanvasElement {
  id: string
  type: ElementType
  x: number
  y: number
  width: number
  height: number
  rotation?: number
  content?: string // for text
  src?: string     // for image
  style?: Record<string, string> // tailwind or inline styles
  selected?: boolean
}

interface Builder2DStore {
  elements: CanvasElement[]
  selectedElementId: string | null

  addElement: (type: ElementType) => void
  updateElement: (id: string, updates: Partial<CanvasElement>) => void
  deleteElement: (id: string) => void
  selectElement: (id: string | null) => void
  moveElement: (id: string, x: number, y: number) => void
  resizeElement: (id: string, width: number, height: number) => void
  clearCanvas: () => void
}

export const useBuilder2DStore = create<Builder2DStore>((set, get) => ({
  elements: [],
  selectedElementId: null,

  addElement: (type) => {
    const id = nanoid()
    const base: CanvasElement = {
      id,
      type,
      x: 100,
      y: 100,
      width: 150,
      height: 50,
      content: type === 'text' ? 'New Text' : '',
      src: type === 'image' ? '/placeholder.jpg' : '',
      style: {},
      selected: false,
    }
    set(state => ({
      elements: [...state.elements, base],
      selectedElementId: id,
    }))
  },

  updateElement: (id, updates) => {
    set(state => ({
      elements: state.elements.map(el =>
        el.id === id ? { ...el, ...updates } : el
      ),
    }))
  },

  deleteElement: (id) => {
    set(state => ({
      elements: state.elements.filter(el => el.id !== id),
      selectedElementId:
        get().selectedElementId === id ? null : get().selectedElementId,
    }))
  },

  selectElement: (id) => {
    set(state => ({
      selectedElementId: id,
      elements: state.elements.map(el => ({
        ...el,
        selected: el.id === id,
      })),
    }))
  },

  moveElement: (id, x, y) => {
    set(state => ({
      elements: state.elements.map(el =>
        el.id === id ? { ...el, x, y } : el
      ),
    }))
  },

  resizeElement: (id, width, height) => {
    set(state => ({
      elements: state.elements.map(el =>
        el.id === id ? { ...el, width, height } : el
      ),
    }))
  },

  clearCanvas: () => {
    set(() => ({
      elements: [],
      selectedElementId: null,
    }))
  },
}))
