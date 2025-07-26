// src/hooks/useRealtimeSync.ts

import { useEffect, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { useProjectStore } from "@/store/projectStore";
import { useUserStore } from "@/store/userStore";

let socket: Socket | null = null;

export function useRealtimeSync(projectId: string) {
  const { components, updateComponents } = useProjectStore();
  const { user } = useUserStore();
  const cursorRef = useRef<HTMLDivElement | null>(null);

  // Initialize socket connection
  useEffect(() => {
    if (!projectId || socket) return;

    socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "http://localhost:4000", {
      query: { projectId, userId: user.id },
    });

    socket.on("connect", () => {
      console.log("🔗 Connected to socket:", socket?.id);
    });

    // Sync components from others
    socket.on("remote-update", (remoteComponents: any[]) => {
      updateComponents(remoteComponents);
    });

    // Handle remote cursor positions
    socket.on("cursor-move", ({ userId, x, y }) => {
      const existing = document.getElementById(`cursor-${userId}`);
      if (existing) {
        existing.style.left = `${x}px`;
        existing.style.top = `${y}px`;
      } else {
        const cursor = document.createElement("div");
        cursor.id = `cursor-${userId}`;
        cursor.className = "absolute w-4 h-4 bg-blue-400 rounded-full z-50 pointer-events-none";
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
        document.body.appendChild(cursor);
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from socket");
    });

    return () => {
      socket?.disconnect();
      socket = null;
    };
  }, [projectId, user.id]);

  // Broadcast component changes
  const broadcastChange = useCallback((newComponents: any[]) => {
    if (socket) {
      socket.emit("local-update", {
        projectId,
        components: newComponents,
      });
    }
  }, [projectId]);

  // Broadcast cursor position
  const broadcastCursor = useCallback((x: number, y: number) => {
    if (socket) {
      socket.emit("cursor-move", {
        userId: user.id,
        x,
        y,
      });
    }
  }, [user.id]);

  // Attach mouse move listener
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      broadcastCursor(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [broadcastCursor]);

  return {
    broadcastChange,
  };
}
