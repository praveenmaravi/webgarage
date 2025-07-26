// src/components/realtimeCollab/CollaborationProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

// TypeScript interface for the context values
interface CollabContextType {
  socket: any;
  activeUsers: string[];
  addUser: (userName: string) => void;
  removeUser: (userName: string) => void;
}

const CollabContext = createContext<CollabContextType | undefined>(undefined);

const CollaborationProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<any>(null);
  const [activeUsers, setActiveUsers] = useState<string[]>([]);

  // Establish socket connection when component mounts
  useEffect(() => {
    const socketInstance = io('http://localhost:5000'); // Replace with your server URL

    setSocket(socketInstance);

    // Listen for active users from the server
    socketInstance.on('activeUsers', (users: string[]) => {
      setActiveUsers(users);
    });

    // Listen for when a user joins or leaves
    socketInstance.on('userJoined', (userName: string) => {
      setActiveUsers((prevUsers) => [...prevUsers, userName]);
    });

    socketInstance.on('userLeft', (userName: string) => {
      setActiveUsers((prevUsers) => prevUsers.filter((user) => user !== userName));
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // Add a new user to the active users list
  const addUser = (userName: string) => {
    socket.emit('join', userName);
  };

  // Remove a user from the active users list
  const removeUser = (userName: string) => {
    socket.emit('leave', userName);
  };

  return (
    <CollabContext.Provider value={{ socket, activeUsers, addUser, removeUser }}>
      {children}
    </CollabContext.Provider>
  );
};

// Custom hook to access the collaboration context
export const useCollabContext = (): CollabContextType => {
  const context = useContext(CollabContext);
  if (!context) {
    throw new Error('useCollabContext must be used within a CollaborationProvider');
  }
  return context;
};

export default CollaborationProvider;
