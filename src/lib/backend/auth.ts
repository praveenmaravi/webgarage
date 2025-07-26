import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

// Example user database (replace with real DB integration, like MongoDB, PostgreSQL)
const usersDb: any[] = [];

// Secret key for JWT (this should be stored securely in .env)
const JWT_SECRET = process.env.JWT_SECRET_KEY || 'your-secret-key';

// Utility function to hash password
const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Utility function to compare passwords
const comparePasswords = async (plainText: string, hashed: string) => {
  return bcrypt.compare(plainText, hashed);
};

// Generate JWT token
const generateToken = (user: any) => {
  return jwt.sign(
    { userId: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Register function
export const registerUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = usersDb.find((user) => user.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password and save new user
    const hashedPassword = await hashPassword(password);
    const newUser = { id: Date.now(), username, email, password: hashedPassword };
    usersDb.push(newUser);

    // Generate JWT token
    const token = generateToken(newUser);

    return res.status(201).json({
      message: 'User registered successfully!',
      token,  // Send back the JWT token
      user: { username, email },
    });
  } catch (error) {
    return res.status(500).json({ error: 'Server error during registration' });
  }
};

// Login function
export const loginUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = usersDb.find((user) => user.email === email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Check if password is correct
    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = generateToken(user);

    return res.status(200).json({
      message: 'Login successful',
      token,  // Send the JWT token
      user: { username: user.username, email: user.email },
    });
  } catch (error) {
    return res.status(500).json({ error: 'Server error during login' });
  }
};

// Middleware to protect routes (check if user is authenticated)
export const authenticateUser = (req: NextApiRequest, res: NextApiResponse, next: Function) => {
  const token = req.headers.authorization?.split(' ')[1];  // Get token from 'Authorization: Bearer token'

  if (!token) {
    return res.status(401).json({ error: 'Authentication token is missing' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;  // Attach user info to request object (e.g. req.user)
    next();  // Call next middleware or route handler
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Logout function (optional, client-side deletes token)
export const logoutUser = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ message: 'Logout successful' });
};
