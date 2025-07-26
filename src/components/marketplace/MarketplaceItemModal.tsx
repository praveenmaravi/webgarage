// src/components/marketplace/MarketplaceItemModal.tsx
import React, { useState } from "react";

interface Template {
  id: string;
  name: string;
  description: string;
  image: string;
  thumbnail: string;
  price: number;
  tags: string[];
}

interface MarketplaceItemModalProps {
  template: Template;
  onClose: () => void;
}

const MarketplaceItemModal: React.FC<MarketplaceItemModalProps> = ({ template, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = () => {
    setIsLoading(true);
    // Simulate download process
    setTimeout(() => {
      setIsLoading(false);
      alert("Download started!");
    }, 2000);
  };

  const handlePurchase = () => {
    setIsLoading(true);
    // Simulate purchase process (e.g., payment integration)
    setTimeout(() => {
      setIsLoading(false);
      alert(`You purchased ${template.name}!`);
    }, 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content max-w-lg mx-auto bg-white rounded-lg shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn absolute top-4 right-4 text-xl" onClick={onClose}>
          &times;
        </button>
        <div className="flex flex-col items-center">
          <img
            className="w-full h-56 object-cover rounded-lg mb-4"
            src={template.image}
            alt={template.name}
          />
          <h2 className="text-2xl font-semibold text-center">{template.name}</h2>
          <p className="text-sm text-gray-600 mt-2">{template.description}</p>
          <div className="mt-4 flex items-center space-x-2">
            <span className="text-lg font-bold text-green-600">${template.price}</span>
            <div className="flex space-x-2">
              {template.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-xs text-gray-700 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6 flex space-x-4">
            <button
              className={`${
                isLoading ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              } text-white font-semibold py-2 px-4 rounded-lg w-32`}
              onClick={handleDownload}
              disabled={isLoading}
            >
              {isLoading ? "Downloading..." : "Download"}
            </button>
            <button
              className={`${
                isLoading ? "bg-gray-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              } text-white font-semibold py-2 px-4 rounded-lg w-32`}
              onClick={handlePurchase}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Purchase"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceItemModal;
