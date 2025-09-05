import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

/*
 * @param request - The incoming NextRequest object
 * @returns A NextResponse containing messages or an error message
 *
 * Handles GET requests for channels
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { error: `Failed to authenticate` },
      { status: 401 }
    );
  }
  const serverId = req.nextUrl.searchParams.get("serverId");
  if (!serverId) {
    return NextResponse.json(
      { error: `Failed to get Server Id` },
      { status: 400 }
    );
  }

  try {
    const channels = await prisma.channel.findMany({
      where: { serverId },
      orderBy: { name: "desc" },
    });
    return NextResponse.json(channels, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error
        ? `An error has occured: ${error}`
        : `An unknown error has occured!`;
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
