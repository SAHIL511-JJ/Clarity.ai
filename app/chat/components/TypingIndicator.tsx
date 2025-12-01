"use client";

export default function TypingIndicator() {
    return (
        <div className="flex items-center gap-1 p-2">
            <div className="h-2 w-2 rounded-full bg-primary-400 animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-2 w-2 rounded-full bg-primary-400 animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-2 w-2 rounded-full bg-primary-400 animate-bounce"></div>
        </div>
    );
}
