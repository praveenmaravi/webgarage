import { deployToVercel } from './vercelDeploy';
import { deployToNetlify } from './netlifyDeploy';
import { deployToGarage } from './garageDeploy';
import { buildProjectFromJSON } from './buildProject';

export type DeployProvider = 'vercel' | 'netlify' | 'garage';

interface DeployOptions {
  provider: DeployProvider;
  projectJson: any; // This should be the builder output: html, css, js
  metadata?: {
    projectName?: string;
    userId?: string;
  };
}

/**
 * Main deploy handler - routes deployment to selected provider
 */
export async function deployProject(options: DeployOptions) {
  const { provider, projectJson, metadata } = options;

  // Build HTML/CSS/JS file map from visual builder JSON
  const projectFiles = buildProjectFromJSON(projectJson);

  switch (provider) {
    case 'vercel':
      return await deployToVercel(projectFiles, metadata);
    case 'netlify':
      return await deployToNetlify(projectFiles, metadata);
    case 'garage':
      return await deployToGarage(projectFiles, metadata);
    default:
      throw new Error(`Unsupported deployment provider: ${provider}`);
  }
}
