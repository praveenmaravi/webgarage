type ProjectInput = {
  html: string;
  css: string;
  js: string;
  meta?: {
    title?: string;
    description?: string;
  };
  dependencies?: string[];
};

export function buildProjectFromJSON(project: ProjectInput): Record<string, string> {
  const {
    html,
    css,
    js,
    meta = {},
    dependencies = [],
  } = project;

  const title = meta.title || "WebGarage Project";
  const description = meta.description || "Built with WebGarage";

  const cdnScripts = getCDNScripts(dependencies);

  const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${description}" />
  <title>${title}</title>
  <link rel="stylesheet" href="style.css" />
  ${cdnScripts.join('\n')}
</head>
<body>
  ${html}
  <script src="script.js"></script>
</body>
</html>`;

  return {
    'index.html': indexHtml.trim(),
    'style.css': css || '',
    'script.js': js || '',
  };
}

function getCDNScripts(deps: string[]): string[] {
  const cdnMap: Record<string, string> = {
    'three': `<script src="https://unpkg.com/three@0.160.0/build/three.min.js"></script>`,
    'gsap': `<script src="https://unpkg.com/gsap@3.12.2/dist/gsap.min.js"></script>`,
    'react': `<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>`,
    'react-dom': `<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>`,
  };

  return deps.map(dep => cdnMap[dep]).filter(Boolean);
}
