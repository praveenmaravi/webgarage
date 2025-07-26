import React, { useState } from "react";

// Types for the uploaded template (You can adjust these based on your needs)
type UploadData = {
  name: string;
  description: string;
  file: File | null;
  category: string;
};

const UploadModal = ({ onClose }: { onClose: () => void }) => {
  const [uploadData, setUploadData] = useState<UploadData>({
    name: "",
    description: "",
    file: null,
    category: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUploadData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadData((prevState) => ({ ...prevState, file: e.target.files[0] }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadData.file) {
      alert("Please select a file to upload!");
      return;
    }

    setIsSubmitting(true);

    // Simulate file upload (Replace with actual API logic)
    const formData = new FormData();
    formData.append("name", uploadData.name);
    formData.append("description", uploadData.description);
    formData.append("category", uploadData.category);
    formData.append("file", uploadData.file);

    try {
      // Replace the following URL with your actual upload API endpoint
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Template uploaded successfully!");
        onClose(); // Close modal after successful upload
      } else {
        alert("Error uploading template.");
      }
    } catch (error) {
      alert("An error occurred during the upload.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="modal-overlay fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="modal-content bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="close-btn absolute top-2 right-2 text-gray-500"
          onClick={onClose}
        >
          X
        </button>
        <h2 className="text-xl font-semibold mb-4">Upload Template/Asset</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={uploadData.name}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={uploadData.description}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={uploadData.category}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Category</option>
              <option value="UI Templates">UI Templates</option>
              <option value="3D Models">3D Models</option>
              <option value="Icons">Icons</option>
              <option value="Components">Components</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Upload File</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 text-white bg-blue-600 rounded-md ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
