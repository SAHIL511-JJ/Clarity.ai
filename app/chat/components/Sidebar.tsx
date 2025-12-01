"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitcher from "../../components/ThemeSwitcher";

export default function Sidebar() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  const conversations = [
    { id: "1", title: "Project Nebula Design", date: "Today" },
    { id: "2", title: "React Optimization", date: "Yesterday" },
    { id: "3", title: "AI Integration Plan", date: "Nov 28" },
  ];

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
            {conversations.map((chat) => (
              <Link
                key={chat.id}
                href={`/chat/${chat.id}`}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all duration-200 group border border-transparent hover:border-white/5"
              >
                <div className="w-2 h-2 rounded-full bg-[var(--nebula-primary)] opacity-0 group-hover:opacity-100 shadow-[0_0_10px_var(--nebula-primary)] transition-all duration-300" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-white truncate transition-colors">
                    {chat.title}
                  </p>
                  <p className="text-xs text-[var(--text-tertiary)] truncate">
                    {chat.date}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-white/5 bg-black/20 backdrop-blur-md">
          <button className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-white/5 transition-colors group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 to-violet-500 p-[2px]">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <span className="text-xs font-bold text-white">TD</span>
              </div>
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-white group-hover:text-[var(--nebula-primary)] transition-colors">Terry A Davis</p>
              <p className="text-xs text-[var(--text-tertiary)]">Pro Plan</p>
            </div>
            <svg className="w-5 h-5 text-[var(--text-tertiary)] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}
