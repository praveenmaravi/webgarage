// src/context/CollabContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

// Define types for cursor data and live editing updates
interface UserCursor {
  x: number;
  y: number;
}

interface CollabContextProps {
  userCursors: { [userId: string]: UserCursor };
  updateCursor: (userId: string, position: { x: number; y: number }) => void;
  syncLiveEdit: (userId: string, changes: any) => void; // Example: changes could be editor content updates
}

let socket: Socket;

const CollabContext = createContext<CollabContextProps | undefined>(undefined);

export const CollabProvider = ({ children }: { children: ReactNode }) => {
  const [userCursors, setUserCursors] = useState<{ [userId: string]: UserCursor }>({});

  useEffect(() => {
    // Connect to WebSocket server (assumes the server is running on localhost:3000)
    socket = io('http://localhost:3000'); 

    // Listen for real-time cursor updates from other users
    socket.on('updateCursor', (userId: string, position: UserCursor) => {
      setUserCursors((prev) => ({ ...prev, [userId]: position }));
    });

    // Listen for live editing changes
    socket.on('syncLiveEdit', (userId: string, changes: any) => {
      // Handle live editing sync here (for example, applying changes to the editor)
      console.log(`${userId} made a change: `, changes);
    });

    return () => {
      // Clean up the socket connection when the component unmounts
      socket.disconnect();
    };
  }, []);

  const updateCursor = (userId: string, position: { x: number; y: number }) => {
    // Update the cursor position locally and broadcast it to all other clients
    setUserCursors((prev) => ({ ...prev, [userId]: position }));
    socket.emit('updateCursor', userId, position);
  };

  const syncLiveEdit = (userId: string, changes: any) => {
    // Send live edit changes to the server and broadcast to other users
    socket.emit('syncLiveEdit', userId, changes);
  };

  return (
    <CollabContext.Provider value={{ userCursors, updateCursor, syncLiveEdit }}>
      {children}
    </CollabContext.Provider>
  );
};

export const useCollab = () => {
  const context = useContext(CollabContext);
  if (!context) throw new Error('useCollab must be used within a CollabProvider');
  return context;
};
