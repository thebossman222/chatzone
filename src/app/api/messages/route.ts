import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { error: `Failed to authenticate` },
      { status: 401 }
    );
  }
  const channelId = request.nextUrl.searchParams.get("channelId");
  if (!channelId) {
    return NextResponse.json({ error: `Missing ChannelID` }, { status: 401 });
  }

  try {
    const messages = await prisma.post.findMany({
      where: { channelId },
      orderBy: { postedDate: "asc" },
    });

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error
        ? `An error has occured: ${error}`
        : `An unknown error has occured!`;
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { error: `Failed to authenticate` },
      { status: 401 }
    );
  }
  const body = await request.json();
  const { content, channelId } = body;

  if (!content || !channelId) {
    return NextResponse.json({ error: `Missing Fields` }, { status: 400 });
  }

  try {
    const newMessage = await prisma.post.create({
      data: {
        content,
        channelId,
        authorId: session.user.id,
        authorName: session.user.name || "Anonymous",
      },
    });
    return NextResponse.json({ newMessage }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error
        ? `An error has occured: ${error}`
        : `An unknown error has occured!`;
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
