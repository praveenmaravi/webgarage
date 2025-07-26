import { zipProject } from './utils';
import { buildProjectFromJSON } from './buildProject';

/**
 * Deploys project to WebGarage's internal hosting (e.g., S3, DB, or internal CDN).
 * @param project JSON with HTML, CSS, JS content or builder state
 * @returns { url, status }
 */
export async function deployToGarage(project: any) {
  try {
    // Convert builder JSON or raw HTML/CSS/JS into file structure
    const files = buildProjectFromJSON(project);

    // Zip all files
    const zippedBlob = await zipProject(files);

    // Send to internal WebGarage deploy API
    const formData = new FormData();
    formData.append('file', zippedBlob, 'project.zip');
    formData.append('projectName', project.name || 'webgarage-project');
    formData.append('userId', project.userId || 'anonymous');

    const response = await fetch('/api/deploy/garage', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Deployment failed with status ${response.status}`);
    }

    const data = await response.json();

    return {
      url: data.url,
      status: response.status,
    };
  } catch (error) {
    console.error('Garage deploy failed:', error);
    return {
      url: '',
      status: 500,
      error: (error as Error).message,
    };
  }
}
