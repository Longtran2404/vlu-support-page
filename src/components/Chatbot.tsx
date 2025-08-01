"use client";
import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");

  // Gửi tin nhắn tới webhook
  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { role: "user", content: input }]);

    // Gửi tới webhook
    const res = await fetch("https://reindeer-tight-firstly.ngrok-free.app/webhook-test/4f0cedee-5eea-42d4-bd31-07b76a11ef82", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();

    setMessages((prev) => [...prev, { role: "bot", content: data.reply }]);
    setInput("");
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border rounded shadow-lg w-80 z-50">
      <div className="p-2 border-b font-bold">Chatbot</div>
      <div className="p-2 h-64 overflow-y-auto flex flex-col gap-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.role === "user" ? "text-right" : "text-left"}>
            <span className={msg.role === "user" ? "bg-blue-100 px-2 py-1 rounded" : "bg-gray-100 px-2 py-1 rounded"}>
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex border-t">
        <input
          className="flex-1 p-2 outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập tin nhắn..."
        />
        <button type="submit" className="p-2 bg-blue-600 text-white rounded-r">Gửi</button>
      </form>
    </div>
  );
}