// src/components/marketplace/AssetCard.tsx
import React, { useState } from "react";
import MarketplaceItemModal from "./MarketplaceItemModal"; // Detailed view modal for the asset

interface Asset {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  price?: number;
  category: string;
  fileType: string; // e.g., .png, .obj, .glb, etc.
}

interface AssetCardProps {
  asset: Asset;
  onAddToCart: (asset: Asset) => void; // Callback to add asset to cart (if applicable)
}

const AssetCard: React.FC<AssetCardProps> = ({ asset, onAddToCart }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleAddToCart = () => {
    onAddToCart(asset);
  };

  return (
    <div className="asset-card p-4 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition">
      <div className="asset-thumbnail">
        <img
          src={asset.thumbnail}
          alt={asset.name}
          className="w-full h-48 object-cover rounded-lg cursor-pointer"
          onClick={openModal}
        />
      </div>
      <div className="asset-details mt-2">
        <h3 className="text-lg font-semibold">{asset.name}</h3>
        <p className="text-sm text-gray-600">{asset.description}</p>
        {asset.price && <p className="text-xl font-semibold mt-2">${asset.price}</p>}
      </div>
      <div className="asset-actions mt-4 flex justify-between items-center">
        <button
          className="add-to-cart-btn bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={handleAddToCart}
        >
          {asset.price ? "Add to Cart" : "Download"}
        </button>
        <button
          className="view-details-btn text-blue-500 underline"
          onClick={openModal}
        >
          View Details
        </button>
      </div>

      {modalOpen && (
        <MarketplaceItemModal asset={asset} onClose={closeModal} />
      )}
    </div>
  );
};

export default AssetCard;
