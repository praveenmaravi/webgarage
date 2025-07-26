import React, { useState } from "react";
import ProfileSettings from "../../components/settings/ProfileSettings";
import PreferencesSettings from "../../components/settings/PreferencesSettings";
import AccountSettings from "../../components/settings/AccountSettings";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="flex gap-6">
        {/* Sidebar Tabs */}
        <nav className="flex flex-col w-48 bg-white rounded-lg shadow p-4">
          <button
            className={`mb-2 p-2 rounded ${
              activeTab === "profile" ? "bg-blue-500 text-white" : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={`mb-2 p-2 rounded ${
              activeTab === "preferences" ? "bg-blue-500 text-white" : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("preferences")}
          >
            Preferences
          </button>
          <button
            className={`mb-2 p-2 rounded ${
              activeTab === "account" ? "bg-blue-500 text-white" : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("account")}
          >
            Account
          </button>
        </nav>

        {/* Content Area */}
        <section className="flex-1 bg-white rounded-lg shadow p-6">
          {activeTab === "profile" && <ProfileSettings />}
          {activeTab === "preferences" && <PreferencesSettings />}
          {activeTab === "account" && <AccountSettings />}
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
