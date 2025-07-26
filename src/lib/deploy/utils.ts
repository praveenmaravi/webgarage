// src/lib/deploy/utils.ts

import JSZip from 'jszip';

/**
 * Zips project files into a single Blob for deployment.
 * @param files - Object with filename keys and string content values.
 * @returns Promise resolving to a Blob representing the zipped files.
 */
export async function zipProject(
  files: { [filename: string]: string }
): Promise<Blob> {
  const zip = new JSZip();

  for (const filename in files) {
    if (Object.prototype.hasOwnProperty.call(files, filename)) {
      zip.file(filename, files[filename]);
    }
  }

  // Generate the zip file as a Blob
  return await zip.generateAsync({ type: 'blob' });
}

/**
 * Simple logger helper.
 * @param message - Message to log.
 * @param level - 'info' | 'warn' | 'error' (default: 'info')
 */
export function logger(message: string, level: 'info' | 'warn' | 'error' = 'info') {
  const time = new Date().toISOString();
  switch (level) {
    case 'warn':
      console.warn(`[${time}] WARN: ${message}`);
      break;
    case 'error':
      console.error(`[${time}] ERROR: ${message}`);
      break;
    default:
      console.log(`[${time}] INFO: ${message}`);
      break;
  }
}
