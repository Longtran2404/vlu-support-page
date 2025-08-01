"use client";
import { useState, useRef } from "react";
import Image from 'next/image';

const LOGO_URL = "https://cdn.subiz.net/file/fishhjrnhfgrhvfpwdtv_acqplocmmgvjdlkwfaos/lalala_60.png";
const DEFAULT_MESSAGE = "Chào bạn, hãy bắt đầu bằng tin nhắn đầu tiên nhé!";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [{ role: "bot", content: DEFAULT_MESSAGE }]
  );
  const [input, setInput] = useState("");
  const sendTimes = useRef<number[]>([]);

  // Gửi tin nhắn tới webhook
  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    setInput(""); // Xóa input ngay khi gửi

    // Kiểm tra spam: 5 lần gửi trong 2 giây
    const now = Date.now();
    sendTimes.current = [...sendTimes.current, now].filter(t => now - t <= 2000);
    if (sendTimes.current.length >= 5) {
      setMessages(prev => [...prev, { role: "bot", content: "Bạn đang spam, vui lòng chờ!" }]);
      return;
    }

    setMessages(prev => [...prev, { role: "user", content: text }]);

    try {
      const res = await fetch("https://reindeer-tight-firstly.ngrok-free.app/webhook/4f0cedee-5eea-42d4-bd31-07b76a11ef82", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) {
        setMessages(prev => [...prev, { role: "bot", content: "Webhook lỗi hoặc không phản hồi!" }]);
        return;
      }

      const data = await res.json();
      console.log('Webhook response:', data); // Debug log
      
      let botReply = 'Không nhận được phản hồi từ webhook!';
      
      // Xử lý nhiều format phản hồi có thể có
      if (data) {
        if (typeof data === 'string') {
          botReply = data;
        } else if (data.message || data.reply || data.output) {
          botReply = data.message || data.reply || data.output;
        } else if (Array.isArray(data) && data.length > 0) {
          const first = data[0];
          if (first.json) {
            botReply = first.json.reply || first.json.output || first.json.reply_message || botReply;
          } else if (first.message || first.reply || first.output) {
            botReply = first.message || first.reply || first.output;
          }
        } else if (data.data && data.data.message) {
          botReply = data.data.message;
        }
      }
      
      setMessages(prev => [...prev, { role: 'bot', content: botReply }]);
    } catch {
      setMessages(prev => [...prev, { role: "bot", content: "Lỗi hệ thống, vui lòng thử lại sau!" }]);
    }
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
          <Image 
            src={LOGO_URL} 
            alt="Chatbot" 
            width={48} 
            height={48} 
            className="rounded-full object-cover" 
            unoptimized
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/48x48/C8102E/FFFFFF?text=💬';
            }}
          />
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
              autoFocus
            />
            <button type="submit" className="p-2 bg-blue-600 text-white rounded-r">Gửi</button>
          </form>
        </div>
      )}
    </>
  );
}