"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import TypingIndicator from "./TypingIndicator";
import remarkGfm from "remark-gfm";

type Msg = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function ChatWindow() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Systems online. I am Clarity. Ready to explore the unknown?",
    },
  ]);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle scroll button visibility
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function handleScroll() {
      if (!container) return;
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom);
    }

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function onUser(e: any) {
      const { role, content } = e.detail;

      setMessages((prev) => [
        ...prev,
        { id: String(Date.now()), role, content },
      ]);
    }

    function onStream(e: any) {
      const chunk = e.detail.chunk as string;

      setMessages((prev) => {
        const last = prev[prev.length - 1];

        if (!last || last.role !== "assistant") {
          return [
            ...prev,
            {
              id: String(Date.now()),
              role: "assistant",
              content: chunk,
            },
          ];
        } else {
          return prev.slice(0, -1).concat([
            { ...last, content: last.content + chunk },
          ]);
        }
      });
    }

    function onStreamEnd() { }

    window.addEventListener("chat:message", onUser);
    window.addEventListener("chat:stream", onStream);
    window.addEventListener("chat:stream:end", onStreamEnd);

    return () => {
      window.removeEventListener("chat:message", onUser);
      window.removeEventListener("chat:stream", onStream);
      window.removeEventListener("chat:stream:end", onStreamEnd);
    };
  }, []);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  return (
    <div ref={containerRef} className="relative flex-1 min-h-0 w-full overflow-y-auto overflow-x-hidden custom-scrollbar px-2 sm:px-4 overscroll-y-contain">
      <div className="relative mx-auto flex min-h-full max-w-4xl flex-col justify-start py-16 sm:py-8 pb-24 sm:pb-28">
        <div className="space-y-6 sm:space-y-8">
          {messages.map((message) => {
            const isAssistant = message.role === "assistant";

            return (
              <div
                key={message.id}
                className={`flex gap-4 message-enter ${isAssistant ? "justify-start" : "justify-end"}`}
              >
                {/* Assistant Avatar (Glowing Orb) */}
                {isAssistant && (
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--nebula-secondary)] to-[var(--nebula-primary)] shadow-[0_0_15px_rgba(0,242,255,0.4)] animate-pulse" />
                  </div>
                )}

                <div className={`flex flex-col gap-1 max-w-[85%] sm:max-w-[80%] min-w-0 ${isAssistant ? "items-start" : "items-end"}`}>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)] font-semibold px-1">
                    {isAssistant ? "Clarity AI" : "You"}
                  </span>

                  <div
                    className={`rounded-2xl px-6 py-4 text-sm leading-relaxed backdrop-blur-md transition-all duration-300 ${isAssistant
                      ? "glass-panel text-[var(--text-primary)] rounded-tl-none"
                      : "bg-gradient-to-br from-[var(--nebula-secondary)] to-[var(--nebula-primary)] text-white shadow-[0_0_20px_rgba(112,0,255,0.3)] rounded-tr-none border border-white/10"
                      }`}
                  >
                    {isAssistant ? (
                      <div className="prose prose-sm sm:prose-base max-w-none dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 prose-pre:bg-transparent prose-headings:text-white prose-a:text-[var(--nebula-primary)] prose-strong:text-white">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            code({ node, inline, className, children, ...props }: any) {
                              const match = /language-(\w+)/.exec(className || "");
                              const codeString = String(children).replace(/\n$/, "");

                              return !inline && match ? (
                                <CodeBlock language={match[1]} code={codeString} />
                              ) : (
                                <code
                                  className="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono text-[var(--nebula-primary)]"
                                  {...props}
                                >
                                  {children}
                                </code>
                              );
                            },
                            // Enhanced Markdown Styling
                            h1: ({ children }) => <h1 className="text-2xl font-bold mb-4 mt-6 first:mt-0 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-xl font-bold mb-3 mt-5 text-white/90">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-lg font-bold mb-2 mt-4 text-white/80">{children}</h3>,
                            ul: ({ children }) => <ul className="list-disc pl-5 mb-4 space-y-1 marker:text-[var(--nebula-primary)]">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal pl-5 mb-4 space-y-1 marker:text-[var(--nebula-primary)]">{children}</ol>,
                            li: ({ children }) => <li className="pl-1">{children}</li>,
                            a: ({ href, children }) => (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[var(--nebula-primary)] hover:text-white underline decoration-[var(--nebula-primary)]/30 hover:decoration-[var(--nebula-primary)] transition-all"
                              >
                                {children}
                              </a>
                            ),
                            blockquote: ({ children }) => (
                              <blockquote className="border-l-2 border-[var(--nebula-primary)] pl-4 py-1 my-4 italic bg-white/5 rounded-r-lg">
                                {children}
                              </blockquote>
                            ),
                            table: ({ children }) => (
                              <div className="overflow-x-auto my-4 rounded-lg border border-white/10">
                                <table className="min-w-full divide-y divide-white/10">
                                  {children}
                                </table>
                              </div>
                            ),
                            th: ({ children }) => (
                              <th className="px-4 py-3 bg-white/5 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                                {children}
                              </th>
                            ),
                            td: ({ children }) => (
                              <td className="px-4 py-3 whitespace-nowrap text-sm border-t border-white/10 text-[var(--text-secondary)]">
                                {children}
                              </td>
                            ),
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap font-medium">{message.content}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {messages.length > 0 && messages[messages.length - 1].role === "user" && (
            <div className="flex gap-4 message-enter justify-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--nebula-secondary)] to-[var(--nebula-primary)] shadow-[0_0_15px_rgba(0,242,255,0.4)] animate-pulse" />
              </div>
              <div className="flex flex-col gap-1 items-start">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)] font-semibold px-1">
                  Clarity AI
                </span>
                <div className="glass-panel rounded-2xl rounded-tl-none px-4 py-3">
                  <TypingIndicator />
                </div>
              </div>
            </div>
          )}
        </div>

        <div ref={bottomRef} />
      </div>

      {/* Scroll to bottom button */}
      <button
        onClick={scrollToBottom}
        className={`fixed bottom-28 right-8 z-20 p-3 rounded-full bg-[var(--nebula-secondary)] text-white shadow-[0_0_20px_rgba(112,0,255,0.4)] border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[var(--nebula-primary)] focus:outline-none ${showScrollButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
          }`}
        aria-label="Scroll to bottom"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>
    </div>
  );
}

function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4 rounded-xl overflow-hidden border border-white/10 bg-black group w-full max-w-full shadow-2xl grid min-w-0">
      {/* Header */}
      <div className="flex items-center justify-between bg-[#202123] px-4 py-2 text-xs text-gray-400 select-none border-b border-white/5 relative z-10">
        <span className="font-sans font-medium lowercase">{language || 'code'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/5"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Copy code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="relative overflow-x-auto custom-scrollbar w-full">
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            borderRadius: 0,
            fontSize: "0.875rem",
            lineHeight: "1.6",
            background: "transparent",
            fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
            width: "100%",
          }}
          showLineNumbers={true}
          lineNumberStyle={{
            minWidth: "2.5em",
            paddingRight: "1em",
            color: "#4b5563",
            textAlign: "right",
            userSelect: "none"
          }}
          wrapLines={false}
          wrapLongLines={false}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
