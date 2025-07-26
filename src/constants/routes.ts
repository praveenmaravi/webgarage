// src/constants/routes.ts

export const routes = {
    // Frontend Pages
    home: "/",
    dashboard: "/dashboard",                // User's main dashboard
    studio: "/studio",                      // WebGarage Studio (Figma++ editor)
    marketplace: "/marketplace",            // Marketplace for UI templates/components
    settings: "/settings",                  // User and project settings
    auth: {
      login: "/auth/login",                 // Login page
      register: "/auth/register",           // Register page
      forgotPassword: "/auth/forgot-password", // Forgot password page
    },
    about: "/about",                        // About WebGarage page
    contact: "/contact",                    // Contact page
  
    // API Routes
    api: {
      garagebot: "/api/garagebot",          // GarageBot API for AI interaction
      generateCode: "/api/generate",        // Code generation API (UI, backend)
      deploy: "/api/deploy",                // Deploy API (for publishing projects)
      auth: {
        login: "/api/auth/login",           // Login API endpoint
        register: "/api/auth/register",     // Register API endpoint
        forgotPassword: "/api/auth/forgot-password", // Forgot password API
      },
      backend: {
        createFlow: "/api/backend/create-flow", // Backend flow builder API
        fetchFlow: "/api/backend/fetch-flow",   // Fetch existing backend flows
      },
      realTimeCollab: "/api/realtime-collab", // Real-time collaboration API
      templates: "/api/templates",           // Fetch available templates in marketplace
    },
  
    // External Routes (links)
    external: {
      github: "https://github.com/WebGarage", // GitHub repo
      docs: "https://docs.webgarage.com",     // Documentation site
    },
  };
  