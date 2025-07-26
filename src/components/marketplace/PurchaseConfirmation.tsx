// src/components/marketplace/PurchaseConfirmation.tsx
import React from 'react';

interface PurchaseConfirmationProps {
  item: {
    name: string;
    price: number;
    orderId: string;
    downloadLink: string;
  };
  onClose: () => void;
}

const PurchaseConfirmation: React.FC<PurchaseConfirmationProps> = ({ item, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <h2>Purchase Confirmed!</h2>
        <div className="purchase-details">
          <p className="font-semibold text-xl">Thank you for your purchase!</p>
          <p className="text-lg">You have successfully purchased the template:</p>
          <div className="purchase-item">
            <h3 className="text-lg font-bold">{item.name}</h3>
            <p className="text-md text-gray-600">Price: ${item.price}</p>
            <p className="text-sm text-gray-500">Order ID: {item.orderId}</p>
          </div>
          <div className="purchase-actions">
            <p className="mt-4">Click below to download your purchase:</p>
            <a
              href={item.downloadLink}
              className="download-btn bg-blue-500 text-white py-2 px-4 rounded-lg mt-2"
              download
            >
              Download Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseConfirmation;
