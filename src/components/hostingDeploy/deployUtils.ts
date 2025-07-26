// src/components/hostingDeploy/deployUtils.ts

/**
 * Trigger deployment for a project on Netlify.
 * @param {string} projectId - The Netlify project ID.
 * @returns {Promise<string>} The deployment status message.
 */
const deployToNetlify = async (projectId: string): Promise<string> => {
    const buildHookUrl = process.env.NETLIFY_BUILD_HOOK;  // Set your Netlify build hook URL here
  
    if (!buildHookUrl) {
      throw new Error("Netlify build hook URL is missing in environment variables.");
    }
  
    try {
      const response = await fetch(buildHookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Optional: add authentication headers if needed
          "Authorization": `Bearer ${process.env.NETLIFY_API_KEY}`,
        },
        body: JSON.stringify({ project_id: projectId }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        return `Netlify deployment triggered successfully. Deployment ID: ${result.id}`;
      } else {
        return `Netlify deployment failed: ${result.error}`;
      }
    } catch (error) {
      console.error("Error during Netlify deployment:", error);
      throw new Error("Deployment failed. Please try again.");
    }
  };
  
  /**
   * Trigger deployment for a project on Vercel.
   * @param {string} projectId - The Vercel project ID.
   * @returns {Promise<string>} The deployment status message.
   */
  const deployToVercel = async (projectId: string): Promise<string> => {
    const vercelApiUrl = "https://api.vercel.com/v12/now/deployments";  // Vercel Deployment API URL
    const vercelToken = process.env.VERCEL_API_KEY;  // Set your Vercel API key here
  
    if (!vercelToken) {
      throw new Error("Vercel API key is missing in environment variables.");
    }
  
    try {
      const response = await fetch(vercelApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${vercelToken}`,
        },
        body: JSON.stringify({
          name: projectId,  // You can pass the project ID or the project name here
          target: "production",  // You can use "production" or "staging" depending on your environment
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        return `Vercel deployment triggered successfully. Deployment ID: ${result.uid}`;
      } else {
        return `Vercel deployment failed: ${result.error.message}`;
      }
    } catch (error) {
      console.error("Error during Vercel deployment:", error);
      throw new Error("Deployment failed. Please try again.");
    }
  };
  
  export { deployToNetlify, deployToVercel };
  