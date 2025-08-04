"use client";
import { useState, useRef, useEffect } from "react";
import Image from 'next/image';

const LOGO_URL = "https://insacmau.com/wp-content/uploads/2023/02/logo-van-lang.png";
const DEFAULT_MESSAGE = "Chào bạn, hãy bắt đầu bằng tin nhắn đầu tiên nhé! 👋";

// Emoji shortcuts
const EMOJI_SHORTCUTS = {
  ':)': '😊', ':(': '😞', ':D': '😃', ':P': '😛', ':o': '😮',
  '<3': '❤️', ':heart:': '❤️', ':smile:': '😊', ':sad:': '😞',
  ':laugh:': '😂', ':cry:': '😢', ':wink:': '😉', ':kiss:': '😘',
  ':angry:': '😠', ':cool:': '😎', ':think:': '🤔', ':thumbs:': '👍'
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ 
    role: string; 
    content: string; 
    id: number;
    reactions?: string[];
  }[]>([{ role: "bot", content: DEFAULT_MESSAGE, id: Date.now() }]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [reactionMenu, setReactionMenu] = useState<{ show: boolean; messageId: number | null }>({ show: false, messageId: null });
  const [isMobile, setIsMobile] = useState(false);
  const sendTimes = useRef<number[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close reaction menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (reactionMenu.show && !target.closest('.reaction-menu')) {
        setReactionMenu({ show: false, messageId: null });
      }
      if (showEmojiPicker && !target.closest('.emoji-picker') && !target.closest('.emoji-button')) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [reactionMenu.show, showEmojiPicker]);

  // Auto scroll to bottom khi có tin nhắn mới
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Check if user scrolled up
  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 50;
      setShowScrollToBottom(!isAtBottom);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Convert emoji shortcuts to emojis
  const processEmojis = (text: string) => {
    let processed = text;
    Object.entries(EMOJI_SHORTCUTS).forEach(([shortcut, emoji]) => {
      processed = processed.replace(new RegExp(shortcut.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), emoji);
    });
    return processed;
  };

  // Add emoji to input
  const addEmoji = (emoji: string) => {
    setInput(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  // Add reaction to message
  const addReaction = (messageId: number, emoji: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const reactions = msg.reactions || [];
        const newReactions = reactions.includes(emoji) 
          ? reactions.filter(r => r !== emoji)
          : [...reactions, emoji];
        return { ...msg, reactions: newReactions };
      }
      return msg;
    }));
    setReactionMenu({ show: false, messageId: null });
  };

  // Clear chat
  const clearChat = () => {
    setMessages([{ role: "bot", content: DEFAULT_MESSAGE, id: Date.now() }]);
  };

  // Gửi tin nhắn tới webhook
  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    setInput(""); // Xóa input ngay khi gửi
    setIsLoading(true); // Bắt đầu loading
    setShowEmojiPicker(false); // Đóng emoji picker

    // Kiểm tra spam: 5 lần gửi trong 2 giây
    const now = Date.now();
    sendTimes.current = [...sendTimes.current, now].filter(t => now - t <= 2000);
    if (sendTimes.current.length >= 5) {
      setMessages(prev => [...prev, { role: "bot", content: "Bạn đang spam, vui lòng chờ! 🚫", id: Date.now() }]);
      setIsLoading(false);
      return;
    }

    const processedText = processEmojis(text);
    setMessages(prev => [...prev, { role: "user", content: processedText, id: Date.now() }]);

    try {
      const res = await fetch("https://reindeer-tight-firstly.ngrok-free.app/webhook/4f0cedee-5eea-42d4-bd31-07b76a11ef82", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) {
        setMessages(prev => [...prev, { role: "bot", content: "Webhook lỗi hoặc không phản hồi! ❌", id: Date.now() }]);
        setIsLoading(false);
        return;
      }

      const data = await res.json();
      console.log('Webhook response:', data); // Debug log
      
      let botReply = 'Không nhận được phản hồi từ webhook! 🤖';
      
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
      
      const processedReply = processEmojis(botReply);
      setMessages(prev => [...prev, { role: 'bot', content: processedReply, id: Date.now() }]);
    } catch {
      setMessages(prev => [...prev, { role: "bot", content: "Lỗi hệ thống, vui lòng thử lại sau! ⚠️", id: Date.now() }]);
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
          className={`
            fixed z-50 bg-white border-2 border-red-600 rounded-lg shadow-xl flex flex-col
            ${isMobile 
              ? 'inset-0 w-full h-full rounded-none' 
              : 'bottom-6 right-6 w-96 h-[500px] max-h-[600px]'
            }
          `}
          style={{ fontFamily: 'Maison Neue, sans-serif' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b-2 border-red-600 bg-red-600 text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <Image 
                src={LOGO_URL} 
                alt="Chatbot" 
                width={24} 
                height={24} 
                className="rounded-full" 
                unoptimized
              />
              <span className="font-medium text-sm">Mimi - Nhân viên hỗ trợ</span>
            </div>
            <div className="flex items-center space-x-2">
              {/* Clear chat button */}
              <button
                className="text-white hover:bg-red-700 rounded p-1 transition-colors"
                onClick={clearChat}
                title="Tạo cuộc trò chuyện mới"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
              {/* Close button */}
              <button
                className="text-white hover:bg-red-700 rounded p-1 transition-colors"
                onClick={() => setOpen(false)}
                aria-label="Đóng"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-hidden bg-gray-50 relative">
            <div 
              ref={messagesContainerRef}
              className="h-full overflow-y-auto p-4"
              onScroll={handleScroll}
            >
              <div className="space-y-3">
                {messages.map((msg, idx) => (
                  <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className="group relative" style={{ maxWidth: "85%" }}>
                      <div 
                        className={`
                          px-3 py-2 rounded-lg text-sm leading-relaxed relative
                          ${msg.role === "user" 
                            ? "bg-red-600 text-white rounded-br-none" 
                            : "bg-gray-200 text-gray-800 rounded-bl-none"
                          }
                        `}
                        style={{
                          display: "inline-block",
                          minWidth: "fit-content",
                          maxWidth: "100%",
                          wordWrap: "break-word",
                          overflowWrap: "anywhere",
                          hyphens: "auto"
                        }}
                        onDoubleClick={() => setReactionMenu({ show: true, messageId: msg.id })}
                      >
                        {msg.content.split('\n').map((line, lineIdx) => (
                          <span key={lineIdx}>
                            {line.split(' ').map((word, wordIdx) => {
                              // Check if word is a URL
                              const urlRegex = /(https?:\/\/[^\s]+)/g;
                              if (urlRegex.test(word)) {
                                return (
                                  <a 
                                    key={wordIdx}
                                    href={word} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="underline hover:text-blue-300 break-all"
                                  >
                                    {word}
                                  </a>
                                );
                              }
                              return wordIdx === 0 ? word : ' ' + word;
                            })}
                            {lineIdx < msg.content.split('\n').length - 1 && <br />}
                          </span>
                        ))}
                      </div>

                      {/* Message reactions - moved outside and below message box */}
                      {msg.reactions && msg.reactions.length > 0 && (
                        <div className={`flex flex-wrap gap-1 mt-1 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                          {msg.reactions.map((reaction, rIdx) => (
                            <span 
                              key={rIdx} 
                              className="bg-white border border-gray-300 px-2 py-1 rounded-full text-xs cursor-pointer hover:bg-gray-100 shadow-sm"
                              onClick={() => addReaction(msg.id, reaction)}
                            >
                              {reaction}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Reaction button - visible on hover */}
                      <button
                        className={`
                          absolute top-0 transform -translate-y-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-gray-700
                          ${msg.role === "user" ? "left-0 -translate-x-2" : "right-0 translate-x-2"}
                        `}
                        onClick={() => setReactionMenu({ show: true, messageId: msg.id })}
                      >
                        😊
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-200 text-gray-800 px-3 py-2 rounded-lg rounded-bl-none inline-block">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Scroll anchor */}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Scroll to bottom button */}
            {showScrollToBottom && (
              <button
                onClick={scrollToBottom}
                className="absolute bottom-4 right-4 bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            )}
          </div>

          {/* Reaction menu */}
          {reactionMenu.show && (
            <div className="reaction-menu absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-gray-300 rounded-lg shadow-xl p-3 z-20">
              <div className="flex space-x-2">
                {['❤️', '😂', '😮', '😢', '😠', '👍', '👎'].map(emoji => (
                  <button
                    key={emoji}
                    onClick={() => reactionMenu.messageId && addReaction(reactionMenu.messageId, emoji)}
                    className="text-2xl hover:scale-110 transition-transform hover:bg-gray-100 rounded p-1"
                    title={`React với ${emoji}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Emoji picker */}
          {showEmojiPicker && (
            <div className="emoji-picker absolute bottom-16 left-4 right-4 bg-white border-2 border-gray-300 rounded-lg shadow-xl p-3 max-h-40 overflow-y-auto">
              <div className="text-xs text-gray-500 mb-2">💡 Phím tắt: :) :D <3 :heart: :laugh: :cry:</div>
              <div className="grid grid-cols-8 gap-2">
                {['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓', '🧐'].map(emoji => (
                  <button
                    key={emoji}
                    onClick={() => addEmoji(emoji)}
                    className="text-xl hover:scale-110 transition-transform hover:bg-gray-100 rounded p-1"
                    title={`Thêm ${emoji}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input area */}
          <form onSubmit={sendMessage} className="flex items-end border-t-2 border-red-600 bg-white rounded-b-lg p-2">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                {/* Input field */}
                <input
                  className="flex-1 px-3 py-2 text-sm outline-none bg-transparent placeholder-gray-500 min-w-0"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Nhập tin nhắn..."
                  disabled={isLoading}
                  style={{ fontFamily: 'Maison Neue, sans-serif' }}
                />
                
                {/* Emoji button */}
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="emoji-button text-gray-500 hover:text-red-600 transition-colors p-1 flex-shrink-0"
                  title="Chọn emoji (Phím tắt: :) :D <3)"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Send button */}
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="ml-2 px-3 py-2 bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors rounded-lg flex-shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}