// src/lib/backend/deploy.ts
import axios from 'axios';

const VERCEL_API_URL = process.env.VERCEL_API_URL || 'https://api.vercel.com/v12/now/deployments';
const NETLIFY_API_URL = process.env.NETLIFY_API_URL || 'https://api.netlify.com/api/v1/sites/{site_id}/deploys';

export interface DeploymentResponse {
  success: boolean;
  message: string;
  deploymentUrl?: string;
}

export const deployToVercel = async (projectId: string, token: string): Promise<DeploymentResponse> => {
  try {
    const response = await axios.post(
      VERCEL_API_URL,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          name: projectId,
          target: 'production',  // or 'preview' depending on the type of deployment
        },
      }
    );

    if (response.status === 200) {
      return {
        success: true,
        message: 'Deployment to Vercel was successful!',
        deploymentUrl: response.data.url, // Vercel URL where the deployment is live
      };
    } else {
      return { success: false, message: 'Deployment to Vercel failed.' };
    }
  } catch (error) {
    console.error('Vercel deployment error:', error);
    return { success: false, message: error.message };
  }
};

export const deployToNetlify = async (projectId: string, token: string): Promise<DeploymentResponse> => {
  try {
    const response = await axios.post(
      NETLIFY_API_URL.replace('{site_id}', projectId),
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      return {
        success: true,
        message: 'Deployment to Netlify was successful!',
        deploymentUrl: response.data.deploy_url, // Netlify live URL
      };
    } else {
      return { success: false, message: 'Deployment to Netlify failed.' };
    }
  } catch (error) {
    console.error('Netlify deployment error:', error);
    return { success: false, message: error.message };
  }
};

export const deployProject = async (
  projectId: string,
  platform: 'vercel' | 'netlify',
  token: string
): Promise<DeploymentResponse> => {
  if (platform === 'vercel') {
    return await deployToVercel(projectId, token);
  } else if (platform === 'netlify') {
    return await deployToNetlify(projectId, token);
  } else {
    return { success: false, message: 'Unsupported platform' };
  }
};
