// src/components/realtimeCollab/CursorSync.tsx
import React, { useEffect } from 'react';
import { useCollabContext } from '../CollaborationProvider';

const CursorSync = () => {
  const { socket, activeUsers } = useCollabContext();

  useEffect(() => {
    // Send cursor position when mouse moves
    const handleCursorMove = (e: MouseEvent) => {
      // Send the cursor position to the server
      socket.emit('cursorMove', { x: e.clientX, y: e.clientY });
    };

    // Listen for other users' cursor movements
    socket.on('cursorMove', (data: { x: number, y: number, userId: string }) => {
      // Find the cursor element for that user or create a new one
      let cursor = document.getElementById(data.userId);
      if (!cursor) {
        cursor = document.createElement('div');
        cursor.style.position = 'absolute';
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        cursor.style.backgroundColor = 'blue';
        cursor.style.borderRadius = '50%';
        cursor.style.zIndex = '9999';
        cursor.id = data.userId;
        document.body.appendChild(cursor);
      }

      // Update the cursor's position
      cursor.style.left = `${data.x}px`;
      cursor.style.top = `${data.y}px`;
    });

    // Attach the event listener to track mouse movement
    window.addEventListener('mousemove', handleCursorMove);

    return () => {
      // Cleanup: remove event listener and socket listeners
      window.removeEventListener('mousemove', handleCursorMove);
      socket.off('cursorMove');
    };
  }, [socket]);

  return null;
};

export default CursorSync;
