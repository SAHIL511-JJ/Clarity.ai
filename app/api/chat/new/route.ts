// app/api/chat/new/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const newConversation = await prisma.conversation.create({
    data: {
      title: "New Chat",
      userId: session.user.id,
    },
  });

  return NextResponse.json({ id: newConversation.id });
}
