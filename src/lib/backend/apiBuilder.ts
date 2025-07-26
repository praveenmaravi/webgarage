// src/lib/backend/apiBuilder.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { logError, handleServerError } from './serverUtils';  // Utility for error logging

/**
 * Function to generate API route code dynamically based on user input
 * @param endpoint - The API endpoint path (e.g., '/users')
 * @param methods - Array of allowed methods (e.g., ['GET', 'POST'])
 * @param model - The database model to interact with (optional for DB CRUD)
 * @returns A function to handle API requests
 */
export const buildApi = (endpoint: string, methods: string[], model: any = null) => {
  // The generated API route handler
  const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!methods.includes(req.method as string)) {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
      switch (req.method) {
        case 'GET':
          if (model) {
            // Fetch data for GET request
            const data = await model.find();
            return res.status(200).json(data);
          } else {
            return res.status(200).json({ message: `GET request to ${endpoint}` });
          }

        case 'POST':
          if (model) {
            // Create new record for POST request
            const newRecord = new model(req.body);
            await newRecord.save();
            return res.status(201).json(newRecord);
          } else {
            return res.status(200).json({ message: `POST request to ${endpoint}` });
          }

        case 'PUT':
          if (model) {
            // Update an existing record for PUT request
            const updatedRecord = await model.findByIdAndUpdate(req.body.id, req.body, { new: true });
            return res.status(200).json(updatedRecord);
          } else {
            return res.status(200).json({ message: `PUT request to ${endpoint}` });
          }

        case 'DELETE':
          if (model) {
            // Delete a record for DELETE request
            const deletedRecord = await model.findByIdAndDelete(req.body.id);
            return res.status(200).json({ message: `Deleted record: ${deletedRecord._id}` });
          } else {
            return res.status(200).json({ message: `DELETE request to ${endpoint}` });
          }

        default:
          return res.status(405).json({ error: 'Method Not Allowed' });
      }
    } catch (error) {
      logError(error);  // Log the error for debugging
      return handleServerError(res, error);  // Send error response
    }
  };

  return handler;
};
