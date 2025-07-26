import { useState, useCallback } from "react";
import axios from "axios";

interface DeployStatus {
  step: "idle" | "preview" | "building" | "deploying" | "done" | "error";
  message?: string;
  url?: string;
}

export function useDeploy() {
  const [status, setStatus] = useState<DeployStatus>({ step: "idle" });
  const [error, setError] = useState<string | null>(null);

  // Generate local preview (sandbox, iframe, etc.)
  const generatePreview = useCallback(async (projectId: string) => {
    try {
      setStatus({ step: "preview", message: "Generating preview..." });
      const res = await axios.post("/api/deploy/preview", { projectId });
      setStatus({ step: "preview", message: "Preview ready", url: res.data.previewUrl });
    } catch (err: any) {
      setStatus({ step: "error" });
      setError(err.message || "Failed to generate preview.");
    }
  }, []);

  // Trigger build and deploy (e.g., Vercel, Netlify, or static export)
  const deployProject = useCallback(async (projectId: string) => {
    try {
      setStatus({ step: "building", message: "Building project..." });
      const res = await axios.post("/api/deploy/build", { projectId });

      if (res.data.status === "success") {
        setStatus({ step: "deploying", message: "Deploying..." });
        const deployRes = await axios.post("/api/deploy/launch", { buildId: res.data.buildId });

        setStatus({
          step: "done",
          message: "Deployed successfully!",
          url: deployRes.data.deployedUrl,
        });
      } else {
        throw new Error("Build failed");
      }
    } catch (err: any) {
      setStatus({ step: "error" });
      setError(err.message || "Deployment failed.");
    }
  }, []);

  const resetDeploy = useCallback(() => {
    setStatus({ step: "idle" });
    setError(null);
  }, []);

  return {
    status,
    error,
    generatePreview,
    deployProject,
    resetDeploy,
  };
}
