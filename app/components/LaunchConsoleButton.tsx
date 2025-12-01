"use client";

export default function LaunchConsoleButton() {
    async function handleLaunchConsole() {
        try {
            const res = await fetch("/api/chat/new", { method: "POST" });

            if (res.status === 401) {
                window.location.href = "/login";
                return;
            }

            if (!res.ok) {
                // If can't create chat, just go to chat page
                window.location.href = "/chat";
                return;
            }

            const data = await res.json();
            if (data?.id) {
                window.location.href = `/chat/${data.id}`;
            } else {
                window.location.href = "/chat";
            }
        } catch (error) {
            console.error("Failed to create chat", error);
            // Fallback to chat page
            window.location.href = "/chat";
        }
    }

    return (
        <button
            onClick={handleLaunchConsole}
            className="inline-flex items-center justify-center rounded-xl sm:rounded-2xl bg-primary-500 px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-medium text-white shadow-glass transition hover:-translate-y-0.5 hover:shadow-xl"
        >
            Launch Console
        </button>
    );
}
