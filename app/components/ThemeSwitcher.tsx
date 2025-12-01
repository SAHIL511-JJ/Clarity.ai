"use client";

import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

const themes = [
    { name: "nebula", label: "Nebula", color: "bg-gradient-to-br from-[#00f2ff] to-[#7000ff]" },
    { name: "midnight", label: "Midnight", color: "bg-gradient-to-br from-[#38bdf8] to-[#1e293b]" },
    { name: "forest", label: "Forest", color: "bg-gradient-to-br from-[#34d399] to-[#064e3b]" },
    { name: "sunset", label: "Sunset", color: "bg-gradient-to-br from-[#f472b6] to-[#fb923c]" },
    { name: "crimson", label: "Crimson", color: "bg-gradient-to-br from-[#f87171] to-[#7f1d1d]" },
    { name: "royal", label: "Royal", color: "bg-gradient-to-br from-[#fbbf24] to-[#1e3a8a]" },
] as const;

export default function ThemeSwitcher({ className }: { className?: string }) {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const currentTheme = themes.find((t) => t.name === theme) || themes[0];

    return (
        <div className={className || "hidden lg:block fixed top-4 right-4 z-50"}>
            <div className="relative">
                {/* Theme Toggle Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-xl border border-white/60 px-3 py-1.5 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                    aria-label="Change theme"
                >
                    <div className={`w-4 h-4 rounded-full ${currentTheme.color} shadow-sm`} />
                    <span className="text-xs font-medium text-slate-700">
                        {currentTheme.label}
                    </span>
                    <svg
                        className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""
                            }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Menu */}
                        <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/60 shadow-xl z-50 overflow-hidden">
                            {themes.map((t) => (
                                <button
                                    key={t.name}
                                    onClick={() => {
                                        setTheme(t.name as any);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${theme === t.name
                                        ? "bg-primary-500/10 text-primary-600 font-medium"
                                        : "text-slate-700 hover:bg-slate-100/50"
                                        }`}
                                >
                                    <div className={`w-4 h-4 rounded-full ${t.color} shadow-sm`} />
                                    <span>{t.label}</span>
                                    {theme === t.name && (
                                        <svg
                                            className="w-4 h-4 ml-auto text-primary-500"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
