import { auth } from "@/lib/auth"; // path to your auth file
import { toNextJsHandler } from "better-auth/next-js";

/**
 * Handles all authentication-related API routes
 * Utilizes better-auth's toNextJsHandler to manage authentication requests
 * Supports various authentication methods as configured in the auth instance
 * Exports POST and GET methods for handling respective HTTP requests
 */
export const { POST, GET } = toNextJsHandler(auth);
