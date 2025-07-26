// src/components/realtimeCollab/LiveComments.tsx
import React, { useState, useEffect } from 'react';
import { useCollabContext } from '../CollaborationProvider';

const LiveComments = () => {
  const { socket } = useCollabContext();  // Using socket from context to communicate
  const [comments, setComments] = useState<string[]>([]);  // State to store comments
  const [newComment, setNewComment] = useState('');  // State to handle new comment input

  const handleAddComment = () => {
    if (newComment.trim()) {
      socket.emit('addComment', newComment);  // Emit the new comment to the server
      setNewComment('');  // Reset the input field
    }
  };

  useEffect(() => {
    // Listen for new comments from the server
    socket.on('newComment', (comment: string) => {
      setComments((prevComments) => [...prevComments, comment]);  // Add the new comment to the list
    });

    return () => {
      socket.off('newComment');  // Clean up the socket listener when the component unmounts
    };
  }, [socket]);

  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', marginTop: '20px', borderRadius: '8px' }}>
      <h3>Live Comments</h3>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {comments.map((comment, index) => (
          <li key={index} style={{ padding: '5px 0', borderBottom: '1px solid #eee' }}>
            {comment}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}  // Update the input state
          placeholder="Add a comment"
          style={{
            padding: '10px',
            width: 'calc(100% - 22px)',
            borderRadius: '4px',
            border: '1px solid #ddd',
            marginBottom: '10px',
          }}
        />
        <button
          onClick={handleAddComment}
          style={{
            padding: '10px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default LiveComments;
