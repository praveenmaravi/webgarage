// src/utils/fileHelpers.ts

/**
 * File helpers for WebGarage:
 * - Export project as JSON
 * - Import JSON and convert to project state
 * - Download assets
 * - Create ZIP bundles
 */

import JSZip from "jszip";
import { saveAs } from "file-saver";

// ✅ 1. Export project data as downloadable JSON file
export const exportProjectAsJSON = (project: any, fileName = "webgarage-project") => {
  const json = JSON.stringify(project, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  saveAs(blob, `${fileName}.json`);
};

// ✅ 2. Import JSON and parse project data
export const importProjectFromJSON = (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const project = JSON.parse(content);
        resolve(project);
      } catch (error) {
        reject("Invalid project file format.");
      }
    };

    reader.onerror = () => reject("File reading error.");
    reader.readAsText(file);
  });
};

// ✅ 3. Download asset (image, font, model) by URL
export const downloadAsset = (url: string, filename: string) => {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => saveAs(blob, filename))
    .catch((err) => console.error("Asset download failed:", err));
};

// ✅ 4. Bundle files into ZIP and download
export const downloadProjectAsZip = async (
  files: { path: string; content: string | Blob }[],
  zipName = "webgarage-export"
) => {
  const zip = new JSZip();

  files.forEach(({ path, content }) => {
    zip.file(path, content);
  });

  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, `${zipName}.zip`);
};

