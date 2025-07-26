import React, { useState, useEffect } from "react";
import TemplateCard from "./TemplateCard";
import CategoryFilter from "./CategoryFilter";
import SearchBar from "./SearchBar";
import MarketplaceItemModal from "./MarketplaceItemModal";

// Mock Data (can be replaced with an API call)
const mockTemplates = [
  {
    id: 1,
    name: "Modern UI Kit",
    description: "A sleek, modern UI kit for web and mobile apps.",
    thumbnail: "/assets/modern-ui-thumbnail.jpg",
    image: "/assets/modern-ui.jpg",
    category: "UI Templates",
    price: 29.99,
  },
  {
    id: 2,
    name: "3D Web Models Pack",
    description: "A set of 3D models optimized for web usage.",
    thumbnail: "/assets/3d-model-thumbnail.jpg",
    image: "/assets/3d-model.jpg",
    category: "3D Models",
    price: 59.99,
  },
  {
    id: 3,
    name: "Icon Set",
    description: "A comprehensive collection of vector icons.",
    thumbnail: "/assets/icons-thumbnail.jpg",
    image: "/assets/icons.jpg",
    category: "Icons",
    price: 9.99,
  },
];

const Marketplace = () => {
  const [templates, setTemplates] = useState(mockTemplates);
  const [filteredTemplates, setFilteredTemplates] = useState(mockTemplates);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    // Filter templates based on search query and category
    const filtered = templates.filter(
      (template) =>
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedCategory ? template.category === selectedCategory : true)
    );
    setFilteredTemplates(filtered);
  }, [searchQuery, selectedCategory, templates]);

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTemplate(null);
  };

  return (
    <div className="marketplace-container p-4">
      {/* Search and Category Filters */}
      <div className="filters flex flex-col sm:flex-row justify-between mb-8">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      {/* Template Listings */}
      <div className="template-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onClick={() => handleTemplateClick(template)}
            />
          ))
        ) : (
          <div className="no-templates text-center col-span-3">No templates found</div>
        )}
      </div>

      {/* Modal for Template Details */}
      {modalOpen && selectedTemplate && (
        <MarketplaceItemModal
          template={selectedTemplate}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Marketplace;
