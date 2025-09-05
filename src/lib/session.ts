import { auth } from "@/lib/auth";
import { headers } from "next/headers";

/*
 * Retrieves the current user session
 * Uses the auth API to get the session based on request headers
 * @returns The current user session or null if not authenticated
 */
export async function getSession() {
  return await auth.api.getSession({
    headers: await headers(),
  });
}
