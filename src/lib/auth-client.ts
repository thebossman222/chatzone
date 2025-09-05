import { createAuthClient } from "better-auth/react";

/*
 * Creates and exports authentication client functions
 * Uses better-auth's createAuthClient to generate signIn, signUp, signOut, getSession, and useSession functions
 * These functions can be used throughout the application for handling user authentication
 * @module auth-client
 */
export const { signIn, signUp, signOut, getSession, useSession } =
  createAuthClient();
