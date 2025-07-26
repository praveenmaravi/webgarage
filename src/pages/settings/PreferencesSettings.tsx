import React, { useState } from "react";

const PreferencesSettings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");

  const handleSave = () => {
    // TODO: save preferences logic here
    alert("Preferences saved!");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Preferences</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className="space-y-4 max-w-md"
      >
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span>Enable Dark Mode</span>
        </label>

        <label className="block">
          <span className="text-gray-700">Language</span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="zh">Chinese</option>
            {/* Add more languages */}
          </select>
        </label>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Preferences
        </button>
      </form>
    </div>
  );
};

export default PreferencesSettings;
