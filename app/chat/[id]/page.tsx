// app/chat/[id]/page.tsx

import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";

type ChatPageParams = Promise<{ id: string }>;

export default async function ChatPage({ params }: { params: ChatPageParams }) {
  const { id } = await params;

  return (
    <>
      {/* Scrollable chat area */}
      <div className="flex-1 overflow-hidden">
        <ChatWindow conversationId={id} />
      </div>

      {/* Fixed input at bottom - separate from scroll */}
      <div className="flex-none">
        <ChatInput conversationId={id} />
      </div>
    </>
  );
}
