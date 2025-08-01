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
  const [isLoading, setIsLoading] = useState(false);
  const sendTimes = useRef<number[]>([]);

  // Gửi tin nhắn tới webhook
  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    setInput(""); // Xóa input ngay khi gửi
    setIsLoading(true); // Bắt đầu loading

    // Kiểm tra spam: 5 lần gửi trong 2 giây
    const now = Date.now();
    sendTimes.current = [...sendTimes.current, now].filter(t => now - t <= 2000);
    if (sendTimes.current.length >= 5) {
      setMessages(prev => [...prev, { role: "bot", content: "Bạn đang spam, vui lòng chờ!" }]);
      setIsLoading(false);
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
        setIsLoading(false);
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
    } finally {
      setIsLoading(false); // Kết thúc loading
    }
  }

  return (
    <>
      {/* Font Maison từ Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Maison+Neue:wght@300;400;500;600&display=swap" rel="stylesheet" />
      
      {/* Nút mở chatbot */}
      {!open && (
        <button
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg bg-white flex items-center justify-center z-50 border-2 border-red-600 hover:bg-red-50 transition-colors"
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
        <div 
          className="fixed inset-x-4 bottom-4 md:bottom-6 md:right-6 md:left-auto bg-white border-2 border-red-600 rounded-lg shadow-xl w-auto md:w-96 h-[80vh] md:h-[500px] max-h-[600px] z-50 flex flex-col"
          style={{ fontFamily: 'Maison Neue, sans-serif' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 md:p-4 border-b-2 border-red-600 bg-red-600 text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <Image 
                src={LOGO_URL} 
                alt="Chatbot" 
                width={20} 
                height={20} 
                className="md:w-6 md:h-6 rounded-full" 
                unoptimized
              />
              <span className="font-medium text-xs md:text-sm">Chatbot Văn Lang</span>
            </div>
            <button
              className="text-white hover:bg-red-700 rounded p-1 transition-colors"
              onClick={() => setOpen(false)}
              aria-label="Đóng"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 p-3 md:p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-2 md:space-y-3">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div 
                    className={`
                      max-w-[85%] md:max-w-[75%] px-2 md:px-3 py-2 rounded-lg text-xs md:text-sm leading-relaxed
                      ${msg.role === "user" 
                        ? "bg-red-600 text-white rounded-br-none" 
                        : "bg-gray-200 text-gray-800 rounded-bl-none"
                      }
                    `}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 text-gray-800 px-2 md:px-3 py-2 rounded-lg rounded-bl-none max-w-[85%] md:max-w-[75%]">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input area */}
          <form onSubmit={sendMessage} className="flex border-t-2 border-red-600 bg-white rounded-b-lg">
            <input
              className="flex-1 px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm outline-none bg-transparent placeholder-gray-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập tin nhắn..."
              disabled={isLoading}
              style={{ fontFamily: 'Maison Neue, sans-serif' }}
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="px-3 md:px-4 py-2 md:py-3 bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors rounded-br-lg"
            >
              <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}