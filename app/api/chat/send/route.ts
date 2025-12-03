// app/api/chat/send/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

// Groq API function with STREAMING support
async function chatWithGroq(messages: Array<{ role: string; content: string }>, stream = false) {
  const apiKey = process.env.GROQ_API_KEY!;
  const model = process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile";

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: messages.map(m => ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: m.content,
        })),
        temperature: 0.7,
        max_tokens: 1024,
        stream, // Enable streaming
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Groq API Error: ${error}`);
  }

  if (stream) {
    return response; // Return the raw response for streaming
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "No response";
}

export async function POST(req: Request) {
  // Check authentication
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { conversationId, message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    let convId = conversationId;

    // Create new conversation if not provided
    if (!convId) {
      const newConversation = await prisma.conversation.create({
        data: {
          title: message.substring(0, 50) + (message.length > 50 ? "..." : ""),
          userId: session.user.id,
        },
      });
      convId = newConversation.id;
    }

    // Save user message to database
    await prisma.message.create({
      data: {
        role: "user",
        content: message,
        conversationId: convId,
        userId: session.user.id,
      },
    });

    // Get conversation history (last 30 messages)
    const history = await prisma.message.findMany({
      where: { conversationId: convId },
      orderBy: { createdAt: "asc" },
      take: 30,
    });

    // Add system message for proper formatting
    const messages = [
      {
        role: "system",
        content: "You are a helpful assistant. Always format code blocks using markdown syntax with triple backticks (```) followed by the language name. For example: ```javascript\\ncode here\\n```",
      },
      ...history.map((m) => ({
        role: (m.role === "assistant" ? "assistant" : "user") as
          | "assistant"
          | "user",
        content: m.content,
      })),
    ];

    // Get streaming response from Groq
    const groqResponse = await chatWithGroq(messages, true);

    // Create a readable stream to forward the response
    const encoder = new TextEncoder();
    let fullText = "";

    const stream = new ReadableStream({
      async start(controller) {
        const reader = groqResponse.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        const decoder = new TextDecoder();

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\\n").filter((line) => line.trim() !== "");

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6);

                if (data === "[DONE]") {
                  break;
                }

                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices?.[0]?.delta?.content;

                  if (content) {
                    fullText += content;
                    controller.enqueue(encoder.encode(content));
                  }
                } catch (e) {
                  // Skip invalid JSON
                }
              }
            }
          }
        } catch (error) {
          console.error("Stream error:", error);
        } finally {
          // Save the complete AI response to database
          await prisma.message.create({
            data: {
              role: "assistant",
              content: fullText,
              conversationId: convId,
              userId: session.user.id,
            },
          });
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (err) {
    console.error("SEND ROUTE ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
