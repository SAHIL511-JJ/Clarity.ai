"use client";

import { useState, useRef, useEffect } from "react";

export default function ChatInput({ conversationId }: { conversationId?: string }) {
  const [value, setValue] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [value]);

  async function sendMessage() {
    if (!value.trim() || streaming) return;

    setStreaming(true);
    const messageContent = value;
    setValue("");

    // Reset height immediately
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      // Dispatch user message event
      window.dispatchEvent(
        new CustomEvent("chat:message", {
          detail: { role: "user", content: messageContent },
        })
      );

      const res = await fetch("/api/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageContent,
          conversationId,
        }),
      });

      if (!res.ok || !res.body) throw new Error("Failed to send message");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });

        window.dispatchEvent(
          new CustomEvent("chat:stream", {
            detail: { chunk },
          })
        );
      }

      window.dispatchEvent(new CustomEvent("chat:stream:end"));
    } catch (error) {
      console.error(error);
      alert("Failed to send message");
    } finally {
      setStreaming(false);
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 p-2 sm:p-6 flex justify-center pointer-events-none lg:pl-[280px] transition-all duration-300">
      <div
        className={`pointer-events-auto w-full max-w-3xl rounded-[1.5rem] sm:rounded-[2rem] transition-all duration-300 flex items-end gap-2 p-1.5 sm:p-2 backdrop-blur-xl border ${isFocused
          ? "shadow-[0_0_30px_rgba(0,242,255,0.15)] border-[var(--nebula-primary)]/30 bg-[var(--glass-surface)]"
          : "bg-transparent border-white/5"
          }`}
      >
        {/* Attach Button */}
        <button
          type="button"
          className="p-3 rounded-full text-[var(--text-tertiary)] hover:text-white hover:bg-white/10 transition-colors"
          onClick={() => { }}
          aria-label="Attach file"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>

        {/* Input Field */}
        <textarea
          ref={textareaRef}
          className="flex-1 max-h-[200px] bg-transparent border-none focus:ring-0 text-white placeholder-[var(--text-tertiary)] resize-none py-3 px-2 text-base custom-scrollbar"
          placeholder="Ask Clarity anything..."
          value={value}
          rows={1}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              sendMessage();
            }
          }}
        />

        {/* Send Button */}
        <button
          onClick={sendMessage}
          disabled={streaming}
          className={`p-3 rounded-full transition-all duration-300 flex items-center justify-center ${!streaming
            ? "bg-gradient-to-r from-[var(--nebula-secondary)] to-[var(--nebula-primary)] text-white shadow-[0_0_15px_rgba(112,0,255,0.4)] hover:scale-105 hover:shadow-[0_0_25px_rgba(0,242,255,0.5)] cursor-pointer"
            : "bg-white/5 text-[var(--text-tertiary)] cursor-not-allowed"
            }`}
        >
          {streaming ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <svg className="w-5 h-5 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
