import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";

/**
 *
 * @returns A NextResponse containing the list of servers or an error message
 *
 * Handles GET requests for servers
 */
export async function GET(): Promise<NextResponse> {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { error: `Failed to authenticate` },
      { status: 401 }
    );
  }
  try {
    const servers = await prisma.server.findMany({});
    return NextResponse.json(servers, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error
        ? `An error has occured: ${error}`
        : `An unknown error has occured`;
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
