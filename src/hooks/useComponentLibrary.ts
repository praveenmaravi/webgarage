import { useState, useEffect, useCallback } from "react"
import axios from "axios"

export interface ComponentItem {
  id: string
  name: string
  category: string
  tags: string[]
  previewImage: string
  code: string // JSX/HTML/JSON structure
}

export function useComponentLibrary() {
  const [components, setComponents] = useState<ComponentItem[]>([])
  const [filteredComponents, setFilteredComponents] = useState<ComponentItem[]>([])
  const [selectedComponent, setSelectedComponent] = useState<ComponentItem | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Fetch all components from API or local JSON
  const fetchComponents = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await axios.get("/api/library/components") // or use local import
      setComponents(response.data)
      setFilteredComponents(response.data)
    } catch (err) {
      console.error("Failed to load component library", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Apply search and category filter
  useEffect(() => {
    let result = components
    if (searchQuery) {
      result = result.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }
    if (categoryFilter) {
      result = result.filter(c => c.category === categoryFilter)
    }
    setFilteredComponents(result)
  }, [searchQuery, categoryFilter, components])

  const importComponent = useCallback((component: ComponentItem) => {
    setSelectedComponent(component)
    // Optionally dispatch into 2D/3D builder here
    // dispatch(addComponentToBuilder(component.code))
  }, [])

  return {
    components: filteredComponents,
    selectedComponent,
    isLoading,
    fetchComponents,
    setSearchQuery,
    setCategoryFilter,
    importComponent
  }
}
