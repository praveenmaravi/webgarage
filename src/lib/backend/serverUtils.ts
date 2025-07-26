// src/lib/backend/serverUtils.ts

// Utility to log errors in a structured way
export const logError = (error: any, context: string = '') => {
  // Log the error with additional context information (optional)
  console.error(`[${new Date().toISOString()}] Error in ${context}:`, error);
};

// Generic utility to handle server errors
export const handleServerError = (res: any, error: any, context: string = '') => {
  logError(error, context);
  return res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    details: context ? `${context} - ${error.message}` : error.message,
  });
};

// Utility to send successful responses
export const sendSuccessResponse = (res: any, data: any, message: string = 'Success') => {
  return res.status(200).json({
    success: true,
    message,
    data,
  });
};

// Utility to handle validation errors
export const handleValidationError = (res: any, validationErrors: any, context: string = '') => {
  logError(validationErrors, context);
  return res.status(400).json({
    success: false,
    error: 'Validation Error',
    details: validationErrors,
  });
};

// Utility to format the response structure
export const formatResponse = (success: boolean, message: string, data: any = null) => {
  return {
    success,
    message,
    data,
  };
};

// Utility to create a standardized not found response
export const handleNotFoundError = (res: any, context: string = '') => {
  logError('Resource not found', context);
  return res.status(404).json({
    success: false,
    error: 'Resource Not Found',
    details: context ? context : 'The requested resource could not be found.',
  });
};

// Utility to handle permission errors
export const handlePermissionError = (res: any, context: string = '') => {
  logError('Permission denied', context);
  return res.status(403).json({
    success: false,
    error: 'Permission Denied',
    details: context ? context : 'You do not have permission to perform this action.',
  });
};

// Utility to send custom error response
export const handleCustomError = (res: any, statusCode: number, errorMessage: string) => {
  logError(errorMessage);
  return res.status(statusCode).json({
    success: false,
    error: errorMessage,
  });
};
