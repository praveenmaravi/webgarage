import { zipProject } from './utils';

const NETLIFY_API_URL = 'https://api.netlify.com/api/v1';

export async function deployToNetlify(project: { files: { [key: string]: string }, siteId?: string }) {
  const token = process.env.NETLIFY_TOKEN;
  if (!token) throw new Error('Missing NETLIFY_TOKEN in environment variables.');

  const zipped = await zipProject(project.files);

  // Optional: You can use an existing site ID or leave it blank to create a new one
  const deployUrl = project.siteId
    ? `${NETLIFY_API_URL}/sites/${project.siteId}/deploys`
    : `${NETLIFY_API_URL}/sites`;

  const res = await fetch(deployUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: zipped,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Netlify Deploy Failed: ${res.status} - ${errorText}`);
  }

  const data = await res.json();

  return {
    siteId: data.site_id,
    deployId: data.id,
    deployUrl: data.deploy_url,
    logs: data.logs,
    sslUrl: data.ssl_url,
    state: data.state,
  };
}
