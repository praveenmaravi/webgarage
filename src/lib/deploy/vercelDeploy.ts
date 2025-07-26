import FormData from 'form-data';
import { buildProjectFromJSON } from './buildProject';
import { zipProject } from './utils';

const VERCEL_API_URL = 'https://api.vercel.com/v13/deployments';
const VERCEL_TOKEN = process.env.VERCEL_TOKEN || ''; // Add this in your .env file

export async function deployToVercel(projectData: any) {
  if (!VERCEL_TOKEN) {
    throw new Error('Missing Vercel token. Set VERCEL_TOKEN in your .env file.');
  }

  // 1. Convert builder JSON to HTML/CSS/JS
  const files = buildProjectFromJSON(projectData);

  // 2. Zip the project files
  const zipped = await zipProject(files); // Blob or Buffer

  // 3. Build FormData for Vercel API
  const form = new FormData();
  form.append('name', projectData.name || 'webgarage-project');
  form.append('project', projectData.projectId || '');
  form.append('files', zipped, {
    filename: 'project.zip',
    contentType: 'application/zip',
  });

  // 4. Deploy to Vercel
  const response = await fetch(VERCEL_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${VERCEL_TOKEN}`,
      ...form.getHeaders(),
    },
    body: form,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Vercel Deploy Error: ${error.message || response.statusText}`);
  }

  const result = await response.json();
  return {
    url: result.url,
    readyState: result.readyState,
    deploymentId: result.id,
    inspectorUrl: result.inspectorUrl || '',
  };
}
