// src/utils/visionUtils.ts

import axios from "axios";

interface VisionUIComponent {
  type: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  text?: string;
  style?: Record<string, any>;
}

/**
 * Uploads image to server or base64 for vision analysis
 * @param file - Image file of the sketch or wireframe
 * @returns - base64 string for AI model or image URL
 */
export const getImageBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Sends image to the Vision AI endpoint (OpenAI or custom)
 * Returns UI component layout metadata
 */
export const analyzeSketchWithAI = async (
  base64Image: string
): Promise<VisionUIComponent[]> => {
  try {
    const response = await axios.post("/api/garagebot/vision", {
      image: base64Image,
    });

    return response.data.components as VisionUIComponent[];
  } catch (err) {
    console.error("Vision AI analysis failed:", err);
    return [];
  }
};

/**
 * Maps AI-detected components into WebGarage Studio builder components
 */
export const mapToStudioComponents = (components: VisionUIComponent[]) => {
  return components.map((comp, index) => ({
    id: `component-${index}`,
    type: comp.type,
    props: {
      position: comp.position,
      size: comp.size,
      text: comp.text || "",
      style: comp.style || {},
    },
  }));
};
