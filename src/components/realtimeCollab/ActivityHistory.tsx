// src/components/realtimeCollab/ActivityHistory.tsx
import React, { useState, useEffect } from 'react';
import { useCollabContext } from '../CollaborationProvider';

const ActivityHistory = () => {
  const { socket } = useCollabContext();  // Access socket from context
  const [history, setHistory] = useState<string[]>([]); // Track actions in history

  // Listen to the 'userAction' event from the socket
  useEffect(() => {
    const handleUserAction = (action: string) => {
      setHistory((prevHistory) => [...prevHistory, action]);  // Add new action to history
    };

    socket.on('userAction', handleUserAction);  // Subscribe to user actions from server

    // Cleanup on unmount
    return () => {
      socket.off('userAction', handleUserAction);  // Unsubscribe from user actions when component unmounts
    };
  }, [socket]);

  return (
    <div className="activity-history">
      <h3>Activity History</h3>
      <ul className="history-list">
        {history.map((action, index) => (
          <li key={index} className="history-item">
            {action} {/* Display the action */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityHistory;
