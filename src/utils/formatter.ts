// src/utils/formatter.ts

/**
 * Format bytes to human-readable string
 * Example: 1024 -> 1 KB, 1048576 -> 1 MB
 */
export function formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }
  
  /**
   * Format date to readable string
   * Example: 2025-07-26T14:30:00 -> Jul 26, 2025 - 2:30 PM
   */
  export function formatDate(date: string | Date): string {
    const d = new Date(date);
    return d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }
  
  /**
   * Convert camelCase or snake_case to Title Case
   * Example: projectName -> Project Name, project_name -> Project Name
   */
  export function formatLabel(str: string): string {
    const withSpaces = str
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/_/g, ' ')
      .toLowerCase();
    return withSpaces.replace(/\b\w/g, char => char.toUpperCase());
  }
  
  /**
   * Truncate text to a specific length and add ellipsis
   * Example: "This is a long name" -> "This is a..."
   */
  export function truncate(str: string, maxLength = 20): string {
    if (!str) return '';
    return str.length > maxLength ? str.substring(0, maxLength - 3) + '...' : str;
  }
  
  /**
   * Format number with commas
   * Example: 1000000 -> 1,000,000
   */
  export function formatNumber(num: number): string {
    return num.toLocaleString();
  }
  
  /**
   * Format duration from milliseconds
   * Example: 125000 -> "2 min 5 sec"
   */
  export function formatDuration(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remaining = seconds % 60;
    return `${minutes > 0 ? `${minutes} min ` : ''}${remaining} sec`;
  }
  