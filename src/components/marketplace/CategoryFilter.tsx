// src/components/marketplace/CategoryFilter.tsx
import React, { useState } from "react";

// Example categories, you can customize these based on your app's content
const categories = [
  "UI Templates",
  "3D Models",
  "Icons",
  "Components",
  "Illustrations",
  "Animations",
];

interface CategoryFilterProps {
  onCategorySelect: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ onCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    onCategorySelect(category);  // Pass selected category back to parent
  };

  return (
    <div className="category-filter bg-white p-4 rounded-lg shadow-md">
      <h4 className="text-xl font-semibold mb-4">Filter by Category</h4>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`cursor-pointer py-2 px-4 rounded-lg transition-colors duration-200 
              ${selectedCategory === category ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
