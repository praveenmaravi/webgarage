import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Session } from "next-auth";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret"; // Replace in production

/**
 * Get current user session on server side (API / SSR)
 */
export async function getUserSession(): Promise<Session | null> {
  try {
    const session = await getServerSession(authOptions);
    return session;
  } catch (error) {
    console.error("Error fetching session:", error);
    return null;
  }
}

/**
 * Check if the user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getUserSession();
  return !!session;
}

/**
 * Generate a custom JWT for API requests
 */
export function generateToken(payload: Record<string, any>): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

/**
 * Verify JWT (used in API routes or backend logic)
 */
export function verifyToken(token: string): any | null {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.warn("Invalid JWT:", error);
    return null;
  }
}

/**
 * Role-based route access guard
 */
export async function requireRole(roles: string[] = []): Promise<boolean> {
  const session = await getUserSession();
  const userRole = session?.user?.role || "guest";
  return roles.includes(userRole);
}

/**
 * Get user ID from session or token
 */
export async function getUserId(): Promise<string | null> {
  const session = await getUserSession();
  return session?.user?.id || null;
}
