// src/components/realtimeCollab/UserPresence.tsx
import React, { useEffect, useState } from 'react';
import { useCollabContext } from '../CollaborationProvider';

const UserPresence = () => {
  const { activeUsers, socket } = useCollabContext();
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);

  useEffect(() => {
    // Listen for active users from the server
    socket.on('activeUsers', (users: any) => {
      setOnlineUsers(users);
    });

    // Optional: When a user disconnects, remove them from the list
    socket.on('userDisconnected', (user: string) => {
      setOnlineUsers((prev) => prev.filter((u) => u !== user));
    });

    // Cleanup when component unmounts
    return () => {
      socket.off('activeUsers');
      socket.off('userDisconnected');
    };
  }, [socket]);

  return (
    <div className="user-presence-container">
      <h3>Active Users</h3>
      <ul>
        {onlineUsers.length > 0 ? (
          onlineUsers.map((user: string, index: number) => (
            <li key={index}>{user}</li>
          ))
        ) : (
          <p>No users online</p>
        )}
      </ul>
    </div>
  );
};

export default UserPresence;
