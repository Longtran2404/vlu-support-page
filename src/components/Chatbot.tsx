"use client";
import { useState } from "react";

const LOGO_URL = "https://insacmau.com/wp-content/uploads/2023/02/logo-van-lang-600x686.png";
const DEFAULT_MESSAGE = "Chào bạn, hãy bắt đầu bằng tin nhắn đầu tiên nhé!";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [{ role: "bot", content: DEFAULT_MESSAGE }]
  );
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

    if (!res.ok) {
      setMessages((prev) => [...prev, { role: "bot", content: "Webhook lỗi hoặc không phản hồi!" }]);
      setInput("");
      return;
    }

    const data = await res.json();
    if (!data.reply) {
      setMessages((prev) => [...prev, { role: "bot", content: "Không nhận được phản hồi từ webhook!" }]);
    } else {
      setMessages((prev) => [...prev, { role: "bot", content: data.reply }]);
    }
    setInput("");
  }

  return (
    <>
      {/* Nút mở chatbot */}
      {!open && (
        <button
          className="fixed bottom-4 right-4 w-16 h-16 rounded-full shadow-lg bg-white flex items-center justify-center z-50 border"
          onClick={() => setOpen(true)}
          aria-label="Mở chatbot"
        >
          <img src={LOGO_URL} alt="Văn Lang Logo" className="w-12 h-12 rounded-full object-cover" />
        </button>
      )}

      {/* Cửa sổ chatbot */}
      {open && (
        <div className="fixed bottom-4 right-4 bg-white border rounded shadow-lg w-80 z-50 flex flex-col">
          <div className="flex items-center justify-between p-2 border-b font-bold bg-blue-700 text-white rounded-t">
            <span>Chatbot Văn Lang</span>
            <button
              className="text-white text-xl px-2"
              onClick={() => setOpen(false)}
              aria-label="Đóng"
            >
              ×
            </button>
          </div>
          <div className="p-2 h-64 overflow-y-auto flex flex-col gap-2">
            {messages.map((msg, idx) => (
              <div key={idx} className={msg.role === "user" ? "text-right" : "text-left"}>
                <span className={msg.role === "user" ? "bg-blue-100 px-2 py-1 rounded inline-block" : "bg-gray-100 px-2 py-1 rounded inline-block"}>
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
      )}
    </>
  );
}