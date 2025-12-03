"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

interface Conversation {
  id: string;
  title: string;
  updatedAt: string;
  messages: Array<{ content: string }>;
  _count: { messages: number };
}

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const response = await fetch("/api/chat/conversations");
      if (response.ok) {
        const data = await response.json();
        setConversations(data);
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteConversation = async (id: string) => {
    if (!confirm("Are you sure you want to delete this conversation?")) return;

    try {
      const response = await fetch(`/api/chat/conversations?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setConversations(conversations.filter((c) => c.id !== id));
      }
    } catch (error) {
      console.error("Error deleting conversation:", error);
    }
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <aside className="h-full w-full p-2 sm:p-4 flex flex-col gap-4">
      {/* Glass Panel Container */}
      <div className="glass-panel h-full w-full rounded-3xl flex flex-col overflow-hidden relative">
        {/* Header */}
        <div className="p-5 pb-0">
          <Link href="/" className="flex items-center gap-3 group mb-6">
            <div className="relative w-8 h-8 flex items-center justify-center rounded-xl bg-gradient-to-br from-[var(--nebula-secondary)] to-[var(--nebula-primary)] shadow-[0_0_15px_rgba(0,242,255,0.3)] group-hover:shadow-[0_0_25px_rgba(0,242,255,0.5)] transition-all duration-300">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight text-white group-hover:text-[var(--nebula-primary)] transition-colors">
              CLARITY
            </span>
          </Link>

          {/* Search */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-[var(--text-tertiary)] group-focus-within:text-[var(--nebula-primary)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:border-[var(--nebula-primary)] focus:bg-white/10 transition-all duration-300 placeholder-[var(--text-tertiary)]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 custom-scrollbar">
          {/* New Chat Button */}
          <Link
            href="/chat"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[var(--nebula-secondary)] to-[var(--nebula-primary)] text-white font-medium shadow-lg hover:shadow-[0_0_20px_rgba(112,0,255,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 mx-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>New Chat</span>
          </Link>

          {/* Recent Chats */}
          <div className="space-y-1">
            <h3 className="px-4 text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-2">
              Recent
            </h3>
            {loading ? (
              <div className="px-4 py-8 text-center text-[var(--text-tertiary)] text-sm">
                Loading conversations...
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="px-4 py-8 text-center text-[var(--text-tertiary)] text-sm">
                {searchQuery ? "No conversations found" : "No conversations yet"}
              </div>
            ) : (
              filteredConversations.map((chat) => (
                <div
                  key={chat.id}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-white/5 transition-all duration-200 group border border-transparent hover:border-white/5"
                >
                  <Link
                    href={`/chat/${chat.id}`}
                    className="flex items-center gap-3 flex-1 min-w-0"
                  >
                    <div className="w-2 h-2 rounded-full bg-[var(--nebula-primary)] opacity-0 group-hover:opacity-100 shadow-[0_0_10px_var(--nebula-primary)] transition-all duration-300" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-white truncate transition-colors">
                        {chat.title}
                      </p>
                      <p className="text-xs text-[var(--text-tertiary)] truncate">
                        {formatDate(chat.updatedAt)} · {chat._count.messages} messages
                      </p>
                    </div>
                  </Link>
                  <button
                    onClick={() => deleteConversation(chat.id)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/20 rounded-lg transition-all"
                    title="Delete conversation"
                  >
                    <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-white/5 bg-black/20 backdrop-blur-md">
          <div className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-white/5 transition-colors group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 to-violet-500 p-[2px]">
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="w-full h-full rounded-full"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {session?.user?.name?.charAt(0) || "U"}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-sm font-medium text-white group-hover:text-[var(--nebula-primary)] transition-colors truncate">
                {session?.user?.name || "User"}
              </p>
              <p className="text-xs text-[var(--text-tertiary)] truncate">
                {session?.user?.email}
              </p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Sign out"
            >
              <svg className="w-5 h-5 text-[var(--text-tertiary)] hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
