export const prompts = {
  /**
   * Animation Prompts
   * Use these to generate animations for UI components with Framer Motion or GSAP.
   */
  animation: (desc: string) => `
    Create a smooth and interactive UI animation for the following component: 
    "${desc}". Use Framer Motion or GSAP (whichever is better suited). 
    The animation should be responsive, include easing, and should look good on all screen sizes. 
    If needed, provide React component code that integrates the animation.`,
    
  /**
   * Backend API Generation Prompts
   * Use these to generate backend code (RESTful or GraphQL) for different functionalities.
   */
  backendAPI: (task: string) => `
    Generate a backend API endpoint (REST or GraphQL) to handle the following task:
    "${task}". 
    The endpoint should follow best practices (authentication, error handling, validation).
    Provide the route and relevant code in Node.js (Express.js or Fastify) or GraphQL (Apollo Server).`,

  /**
   * Frontend UI Component Generation
   * Use these to generate frontend React components with a specific layout or functionality.
   */
  component: (desc: string) => `
    Design a responsive and interactive UI component in React for the following use case:
    "${desc}".
    The component should use TailwindCSS for styling and be mobile-first. 
    Provide React code and CSS classes used. If the component requires state management, suggest the appropriate use of React hooks.`,

  /**
   * Complete Page Layout
   * Use these to generate full-page layouts or dashboards with React and TailwindCSS.
   */
  pageLayout: (desc: string) => `
    Design a full-page layout or dashboard for the following description:
    "${desc}".
    The page should include a header, sidebar, main content area, and footer.
    The layout must be flexible, responsive, and designed using TailwindCSS. Provide a reusable component structure.`,

  /**
   * Form Generation Prompts
   * Use these to create forms with validation and proper handling.
   */
  form: (desc: string) => `
    Generate a form in React with the following fields: "${desc}". 
    Use React Hook Form for form management and Zod for validation. 
    Provide the form structure and validation schema. Make sure the form is user-friendly and responsive.`,

  /**
   * Full-Stack Feature Request Prompts
   * Use these to generate a full-stack feature, from the backend API to the frontend component.
   */
  fullStackFeature: (task: string) => `
    Implement the following full-stack feature: "${task}". 
    Create the backend API for handling data, then build the frontend React component that interacts with the API.
    Include authentication if required, and ensure the system is secure, fast, and scalable.`,

  /**
   * Error Handling and Debugging Prompts
   * Use these to debug specific issues or generate solutions for common errors.
   */
  debug: (error: string) => `
    Diagnose and fix the following error in the code: "${error}". 
    Provide a detailed explanation of the issue and suggest a proper fix. 
    If needed, include code snippets to resolve the problem and explain why this fix works.`,

  /**
   * UI/UX Best Practices and Suggestions
   * Use these to get recommendations on UI/UX best practices for different elements or pages.
   */
  uiUXSuggestions: (task: string) => `
    Provide UI/UX best practices for designing the following interface: "${task}". 
    Include suggestions for layout, typography, color schemes, and user experience improvements. 
    Explain how to make the design accessible, intuitive, and responsive.`,

  /**
   * Hosting/Deployment Configuration
   * Use these to help with deployment configurations, including CI/CD pipelines and hosting setups.
   */
  deploymentConfig: (platform: string) => `
    Provide deployment configuration and setup instructions for hosting a web app on: "${platform}". 
    Include serverless functions, CI/CD pipeline setup, and environment configurations. 
    Explain any platform-specific setup and best practices for deployment.`,

  /**
   * Integration Prompts (APIs, Payment Gateways, etc.)
   * Use these to generate integration code for third-party services such as Stripe, Firebase, etc.
   */
  integration: (service: string, task: string) => `
    Integrate the following service into the app: "${service}". 
    Task: "${task}". 
    Provide the necessary code for connecting the app with this service, including authentication, API calls, and error handling.`,

  /**
   * SEO & Performance Optimization
   * Use these to get suggestions for SEO and performance improvements.
   */
  seoOptimization: (task: string) => `
    Provide SEO and performance optimization tips for the following task: "${task}". 
    Suggest improvements for metadata, image optimization, caching, lazy loading, and other best practices to improve page load speed and SEO score.`
};
