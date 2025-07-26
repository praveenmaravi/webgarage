// utils/generateCode.ts

import { FlowState } from '../types';

// Helper function to generate a basic CRUD API
const generateCRUDCode = (nodeId: string, nodeType: string) => {
  let code = `
  // ${nodeType} Node: ${nodeId}
  const express = require('express');
  const router = express.Router();
  const db = require('./db'); // Assuming a simple database interaction

  // Create
  router.post('/${nodeId}/create', async (req, res) => {
    try {
      const data = req.body;
      const result = await db.create(data); // Basic create function in db
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Read
  router.get('/${nodeId}/:id', async (req, res) => {
    try {
      const result = await db.read(req.params.id); // Read item by ID
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update
  router.put('/${nodeId}/:id', async (req, res) => {
    try {
      const data = req.body;
      const result = await db.update(req.params.id, data); // Update function in db
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Delete
  router.delete('/${nodeId}/:id', async (req, res) => {
    try {
      const result = await db.delete(req.params.id); // Delete function in db
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  module.exports = router;
  `;
  return code;
};

// Helper function to generate an authentication API
const generateAuthCode = (nodeId: string, nodeType: string) => {
  return `
  // ${nodeType} Node: ${nodeId}
  const express = require('express');
  const bcrypt = require('bcrypt');
  const jwt = require('jsonwebtoken');
  const router = express.Router();
  const db = require('./db'); // Assuming a user model in db

  // Register user
  router.post('/${nodeId}/register', async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await db.create({ username, password: hashedPassword }); // Assuming a simple create function
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Login user
  router.post('/${nodeId}/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await db.read({ username }); // Assuming a simple read function
      if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  module.exports = router;
  `;
};

// Function to generate backend code based on the flow state
export const generateBackendCode = (flowState: FlowState): string => {
  let generatedCode = '';
  
  // Loop through all nodes in the flowState
  flowState.nodes.forEach((node) => {
    switch (node.type) {
      case 'CRUD':
        generatedCode += generateCRUDCode(node.id, node.type);
        break;
      case 'Auth':
        generatedCode += generateAuthCode(node.id, node.type);
        break;
      // Add more cases as necessary for other node types (e.g., DB, API)
      default:
        break;
    }
  });

  return generatedCode;
};
