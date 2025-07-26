// src/utils/deployHelpers.ts
import axios from 'axios';
import JSZip from 'jszip';

export type DeployTarget = 'vercel' | 'netlify' | 'firebase';

interface DeployOptions {
  projectName: string;
  sourceCode: string; // ZIP string or repo link or JSON of component tree
  token: string;
  target: DeployTarget;
  config?: Record<string, any>;
}

export async function deployProject({
  projectName,
  sourceCode,
  token,
  target,
  config = {},
}: DeployOptions): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    if (target === 'vercel') {
      return await deployToVercel(projectName, sourceCode, token, config);
    }

    if (target === 'netlify') {
      return await deployToNetlify(projectName, sourceCode, token, config);
    }

    if (target === 'firebase') {
      return await deployToFirebase(projectName, sourceCode, token, config);
    }

    return { success: false, error: 'Unsupported deploy target' };
  } catch (err: any) {
    return { success: false, error: err.message || 'Deployment failed' };
  }
}

// 🟢 Vercel Deployment
async function deployToVercel(
  projectName: string,
  sourceCode: string,
  token: string,
  config: any
) {
  const res = await axios.post(
    'https://api.vercel.com/v13/deployments',
    {
      name: projectName,
      files: [
        {
          file: 'index.html',
          data: sourceCode,
        },
      ],
      ...config,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return {
    success: true,
    url: res.data?.url ? `https://${res.data.url}` : undefined,
  };
}

// 🟢 Netlify Deployment
async function deployToNetlify(
  projectName: string,
  sourceCode: string,
  token: string,
  config: any
) {
  const zip = await generateZip({ [projectName + '/index.html']: sourceCode });

  const res = await axios.post(
    'https://api.netlify.com/api/v1/sites',
    {
      name: projectName,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const siteId = res.data.id;

  await axios.put(
    `https://api.netlify.com/api/v1/sites/${siteId}/deploys`,
    zip,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/zip',
      },
    }
  );

  return {
    success: true,
    url: `https://${res.data.url}`,
  };
}

// 🟢 Firebase Hosting (CLI triggered alternative)
async function deployToFirebase(
  projectName: string,
  sourceCode: string,
  token: string,
  config: any
) {
  // In actual implementation, you would trigger a server-side script or Firebase CLI
  // Since direct deployment via REST API is not fully supported, this is a placeholder
  console.warn('Firebase deploy must be handled via CLI or server-side hook.');

  return {
    success: false,
    error: 'Firebase deploy requires CLI integration (out of browser scope).',
  };
}

// 📦 Utility: Generate ZIP from source
export async function generateZip(files: Record<string, string>): Promise<Blob> {
  const zip = new JSZip();
  Object.entries(files).forEach(([path, content]) => {
    zip.file(path, content);
  });
  return zip.generateAsync({ type: 'blob' });
}
