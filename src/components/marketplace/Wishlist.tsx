// src/components/marketplace/Wishlist.tsx
import React, { useState, useEffect } from "react";
import TemplateCard from "./TemplateCard";

// Sample Wishlist data (in a real-world app, this could be fetched from the backend or stored in a context/store)
const initialWishlist = [
  { id: 1, name: "Modern UI Kit", description: "A sleek and modern UI kit for web apps", thumbnail: "/assets/templates/ui-kit.png" },
  { id: 2, name: "3D Model Pack", description: "A set of high-quality 3D models for game development", thumbnail: "/assets/templates/3d-models.png" }
];

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(initialWishlist);

  const handleRemoveFromWishlist = (id: number) => {
    // Remove item from the wishlist
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <div className="wishlist-container">
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-items">
          {wishlist.map((item) => (
            <div key={item.id} className="wishlist-item">
              <TemplateCard template={item} />
              <button
                className="remove-btn text-red-500"
                onClick={() => handleRemoveFromWishlist(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
