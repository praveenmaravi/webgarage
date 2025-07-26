// src/components/marketplace/TemplateCard.tsx
import React, { useState } from 'react';
import MarketplaceItemModal from './MarketplaceItemModal';

interface Template {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
  image: string; // Full-size image or preview for modal
}

interface TemplateCardProps {
  template: Template;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="template-card flex flex-col items-center border p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
      <div className="template-thumbnail">
        <img
          src={template.thumbnail}
          alt={template.name}
          className="w-full h-48 object-cover rounded-lg cursor-pointer"
          onClick={openModal}
        />
      </div>
      <div className="template-details mt-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800">{template.name}</h3>
        <p className="text-sm text-gray-500 mt-2">{template.description}</p>
      </div>

      {modalOpen && (
        <MarketplaceItemModal template={template} onClose={closeModal} />
      )}
    </div>
  );
};

export default TemplateCard;
