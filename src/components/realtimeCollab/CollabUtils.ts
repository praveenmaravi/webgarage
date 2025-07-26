// src/components/realtimeCollab/CollabUtils.ts

/**
 * Emit the cursor move event to all connected users.
 * @param socket - The socket instance used for communication
 * @param x - The X-coordinate of the cursor position
 * @param y - The Y-coordinate of the cursor position
 */
export const emitCursorMove = (socket: any, x: number, y: number) => {
    socket.emit('cursorMove', { x, y });
  };
  
  /**
   * Emit a new comment event to all connected users.
   * @param socket - The socket instance used for communication
   * @param comment - The comment content
   */
  export const emitComment = (socket: any, comment: string) => {
    socket.emit('addComment', comment);
  };
  
  /**
   * Log a user action (e.g., clicking, editing) to notify all collaborators.
   * @param socket - The socket instance used for communication
   * @param action - The action performed by the user (e.g., "clicked on button", "edited text")
   */
  export const logActivity = (socket: any, action: string) => {
    socket.emit('userAction', action);
  };
  
  /**
   * Emit a user joining event, so that other users are aware of the new user.
   * @param socket - The socket instance used for communication
   * @param username - The name of the user who just joined
   */
  export const emitUserJoin = (socket: any, username: string) => {
    socket.emit('userJoin', { username });
  };
  
  /**
   * Emit a user leaving event, so that others are notified when a user disconnects.
   * @param socket - The socket instance used for communication
   * @param username - The name of the user who left
   */
  export const emitUserLeave = (socket: any, username: string) => {
    socket.emit('userLeave', { username });
  };
  