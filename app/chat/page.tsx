import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";

export default function ChatHome() {
  return (
    <>
      {/* Scrollable chat area */}
      <div className="flex-1 overflow-hidden">
        <ChatWindow />
      </div>

      {/* Fixed input at bottom */}
      <div className="flex-none">
        <ChatInput />
      </div>
    </>
  );
}
