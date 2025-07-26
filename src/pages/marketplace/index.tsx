import React, { useState, useEffect } from "react";

interface Template {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  category: string;
  author: string;
  price?: number; // Free if undefined
}

const MOCK_TEMPLATES: Template[] = [
  {
    id: "1",
    title: "Modern Landing Page",
    description: "Clean, responsive landing page template.",
    thumbnailUrl: "/marketplace/landing1.png",
    category: "Landing Pages",
    author: "WebGarage Team",
  },
  {
    id: "2",
    title: "E-commerce Card",
    description: "Animated product card with quick view.",
    thumbnailUrl: "/marketplace/ecom-card.png",
    category: "UI Components",
    author: "Jane Doe",
    price: 10,
  },
  {
    id: "3",
    title: "3D Model Viewer",
    description: "Interactive React Three Fiber 3D viewer.",
    thumbnailUrl: "/marketplace/3d-viewer.png",
    category: "3D Components",
    author: "John Smith",
  },
  // Add more templates here
];

const categories = [
  "All",
  "Landing Pages",
  "UI Components",
  "3D Components",
  "Animations",
  "Backend Flows",
];

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredTemplates, setFilteredTemplates] = useState(MOCK_TEMPLATES);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredTemplates(MOCK_TEMPLATES);
    } else {
      setFilteredTemplates(
        MOCK_TEMPLATES.filter((t) => t.category === selectedCategory)
      );
    }
  }, [selectedCategory]);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-4xl font-bold mb-6">Marketplace</h1>

      {/* Category Filter */}
      <div className="mb-6 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border transition-colors ${
              selectedCategory === cat
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
          >
            <img
              src={template.thumbnailUrl}
              alt={template.title}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{template.title}</h2>
              <p className="text-gray-600 mb-4">{template.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>By {template.author}</span>
                <span>{template.price ? `$${template.price}` : "Free"}</span>
              </div>
            </div>
          </div>
        ))}
        {filteredTemplates.length === 0 && (
          <p className="text-gray-500 col-span-full text-center">
            No templates found in this category.
          </p>
        )}
      </div>
    </div>
  );
}
