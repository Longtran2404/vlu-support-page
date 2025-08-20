"use client";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { useLang } from "./LanguageProvider";

const LOGO_URL = "/images/vlu-logo.svg";

// N8N API Configuration - TTHTSV Agent
const N8N_CONFIG = {
  baseUrl: "https://n8n-cosari.tino.page",
  workflowId: "TgsOZFTHv41B2SlW", // TTHTSV Agent workflow
  webhookPath: "webhook/4f0cedee-5eea-42d4-bd31-07b76a11ef82", // Production webhook
};

// Enhanced page URLs with categories for better organization
const PAGE_URLS = {
  // Core VLU systems
  library: "http://lib.vlu.edu.vn",
  elearning: "https://elearning.vlu.edu.vn",
  portal: "https://portal.vlu.edu.vn",
  ejob: "https://ejob.vlu.edu.vn",
  
  // Internal pages
  home: "/",
  admissions: "/admissions",
  contact: "/contact",
  about: "/about",
  
  // Additional VLU resources (expandable)
  academic_calendar: "https://vlu.edu.vn/lich-hoc-tap",
  student_services: "https://vlu.edu.vn/dich-vu-sinh-vien",
  research: "https://vlu.edu.vn/nghien-cuu",
  international: "https://vlu.edu.vn/quoc-te",
  
  // External resources
  google_scholar: "https://scholar.google.com",
  research_gate: "https://www.researchgate.net",
  linkedin: "https://www.linkedin.com/school/vietnam-luxembourg-university",
};

// Enhanced function to open pages with better URL validation and handling
const openPage = (pageKey: string, url?: string, title?: string) => {
  let targetUrl = url;
  
  // If no direct URL provided, try to get from PAGE_URLS
  if (!targetUrl) {
    targetUrl = PAGE_URLS[pageKey as keyof typeof PAGE_URLS];
  }
  
  console.log("openPage called with:", { pageKey, url, targetUrl, title });
  
  if (targetUrl) {
    console.log("Opening URL:", targetUrl);
    
    // Validate URL format
    const isValidUrl = (urlString: string) => {
      try {
        new URL(urlString);
        return true;
      } catch {
        return false;
      }
    };
    
    if (!isValidUrl(targetUrl)) {
      console.error("Invalid URL format:", targetUrl);
      return false;
    }
    
    // Open URL based on type
    if (targetUrl.startsWith("http")) {
      // External URL - open in new tab
      try {
        const newWindow = window.open(
          targetUrl,
          "_blank",
          "noopener,noreferrer",
        );
        if (newWindow) {
          console.log("External URL opened successfully");
          return true;
        } else {
          console.error("Failed to open external URL - popup blocked");
          return false;
        }
      } catch (error) {
        console.error("Failed to open external URL:", error);
        return false;
      }
    } else {
      // Internal URL - navigate within app
      try {
        window.location.href = targetUrl;
        console.log("Internal navigation initiated");
        return true;
      } catch (error) {
        console.error("Failed to navigate internally:", error);
        return false;
      }
    }
  } else {
    console.error("No URL found for pageKey:", pageKey);
    return false;
  }
};

// Enhanced function to call N8N workflow with better response handling
const callN8NAgent = async (
  userMessage: string,
  language: string = "vi",
): Promise<{
  response: string;
  action?: string;
  url?: string;
  urls?: Array<{ url: string; title?: string; description?: string }>;
  data?: unknown;
}> => {
  try {
    const response = await fetch(
      `${N8N_CONFIG.baseUrl}/${N8N_CONFIG.webhookPath}`,
      {
        method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: userMessage,
        timestamp: new Date().toISOString(),
          source: "vlu-chatbot",
        availablePages: Object.keys(PAGE_URLS),
        // Add context for better AI understanding
        context: {
          userLanguage: language,
            availableResources: Object.entries(PAGE_URLS).map(([key, url]) => ({
              key,
              url,
            })),
            requestType: "information_retrieval",
          },
        }),
      },
    );

    if (response.ok) {
      const data = await response.json();
      
      // Handle different response formats from n8n
      if (typeof data === "string") {
        return { response: data };
      }
      
      // Enhanced response with multiple URL support
      return {
        response:
          data.response ||
          data.message ||
          "Cảm ơn bạn đã liên hệ! Tôi đang xử lý yêu cầu của bạn.",
        action: data.action,
        url: data.url,
        urls: data.urls || data.links || data.resources, // Support multiple URLs from retrieve data
        data: data.data || data.metadata, // Additional data from workflow
      };
    } else {
      throw new Error(`N8N API error: ${response.status}`);
    }
  } catch (error) {
    console.error("N8N API call failed:", error);
    return { response: "" }; // Return empty to fallback to local responses
  }
};

// Enhanced AI-like responses with context awareness (Fallback only when N8N is unavailable)
const AI_RESPONSES = {
  vi: {
    welcome: [
      "Chào bạn! Tôi là trợ lý ảo TTHTSV của VLU 🎓\n\nTôi có thể giúp bạn:\n📚 Mở trang thư viện\n💻 Truy cập E-Learning\n🎓 Xem cổng thông tin\n💼 Tìm việc làm\n\nChỉ cần nói với tôi bạn muốn gì!",
      "Xin chào! Tôi có thể giúp gì cho bạn hôm nay?\n\nThử hỏi: 'mở thư viện' hoặc 'tôi muốn học trực tuyến'",
      "Chào mừng đến với VLU! Bạn cần hỗ trợ gì không?\n\nTôi có thể mở các trang web VLU cho bạn!",
    ],
    greetings: [
      "Chào bạn! 👋\n\nTôi có thể giúp bạn truy cập các hệ thống VLU nhanh chóng!",
      "Xin chào! 😊\n\nBạn muốn tôi mở trang nào? Thư viện, E-Learning, hay Portal?",
      "Hello! Rất vui được gặp bạn!\n\nHãy nói 'mở [tên trang]' để tôi hỗ trợ!",
    ],
    admissions: [
      "Về tuyển sinh VLU: Chúng tôi có 60+ ngành đào tạo đa dạng. Bạn quan tâm ngành nào?",
      "VLU hiện đang tuyển sinh với nhiều ưu đãi học bổng. Bạn muốn biết thêm chi tiết?",
    ],
    programs: [
      "VLU có các chương trình: Cử nhân, Thạc sĩ, Tiến sĩ trong 7 lĩnh vực chính. Bạn quan tâm lĩnh vực nào?",
      "Tất cả chương trình của VLU đều đạt chuẩn quốc tế. Bạn muốn tìm hiểu ngành cụ thể nào?",
    ],
    facilities: [
      "VLU có cơ sở vật chất hiện đại: thư viện, phòng lab, ký túc xá, sân thể thao...\n\nBạn muốn tôi mở trang thư viện không? 📚",
    ],
    contact: [
      "Bạn có thể liên hệ VLU qua:\n📞 Hotline: 028 7109 9999\n📧 Email: info@vlu.edu.vn\n📍 Địa chỉ: 45 Nguyễn Khắc Nhu, Q1, TP.HCM",
    ],
    default: [
      "Tôi hiểu bạn đang hỏi về {query}.\n\nTôi có thể mở các trang: thư viện 📚, E-Learning 💻, Portal 🎓, E-Job 💼\n\nBạn muốn truy cập trang nào?",
      "Câu hỏi thú vị! Bạn có thể nói rõ hơn để tôi hỗ trợ tốt hơn?\n\nHoặc thử: 'mở thư viện', 'elearning', 'portal'",
      "Tôi đang học hỏi thêm về điều này.\n\nTrong lúc chờ, bạn có muốn tôi mở trang thư viện hoặc E-Learning không?",
    ],
  },
  en: {
    welcome: [
      "Hello! I'm VLU's TTHTSV virtual assistant 🎓\n\nI can help you:\n📚 Open library page\n💻 Access E-Learning\n🎓 View student portal\n💼 Find jobs\n\nJust tell me what you need!",
      "Hi there! How can I help you today?\n\nTry saying: 'open library' or 'I want e-learning'",
      "Welcome to VLU! Need any assistance?\n\nI can open VLU web pages for you!",
    ],
    greetings: [
      "Hello! 👋\n\nI can help you access VLU systems quickly!",
      "Hi there! 😊\n\nWhich page would you like me to open? Library, E-Learning, or Portal?",
      "Hello! Nice to meet you!\n\nSay 'open [page name]' and I'll help!",
    ],
    admissions: [
      "About VLU admissions: We offer 60+ diverse programs. Which field interests you?",
      "VLU is currently accepting applications with scholarship opportunities. Want to know more?",
    ],
    programs: [
      "VLU offers Bachelor's, Master's, and PhD programs across 7 main fields. Which area interests you?",
      "All VLU programs meet international standards. Which specific major would you like to explore?",
    ],
    facilities: [
      "VLU has modern facilities: library, labs, dormitories, sports facilities...\n\nWould you like me to open the library page? 📚",
    ],
    contact: [
      "You can contact VLU via:\n📞 Hotline: 028 7109 9999\n📧 Email: info@vlu.edu.vn\n📍 Address: 45 Nguyen Khac Nhu, Dist 1, HCMC",
    ],
    default: [
      "I understand you're asking about {query}.\n\nI can open pages: library 📚, E-Learning 💻, Portal 🎓, E-Job 💼\n\nWhich page would you like to access?",
      "Interesting question! Could you be more specific so I can assist better?\n\nOr try: 'open library', 'elearning', 'portal'",
      "I'm learning more about this.\n\nMeanwhile, would you like me to open the library or E-Learning page?",
    ],
  },
};

// Quick action buttons with page opening functionality
const QUICK_ACTIONS = {
  vi: [
    { text: "Thư viện 📚", query: "mở thư viện" },
    { text: "E-Learning 💻", query: "elearning" },
    { text: "Portal 🎓", query: "cổng thông tin" },
    { text: "E-Job 💼", query: "tìm việc làm" },
    { text: "Liên hệ 📞", query: "liên hệ" },
    { text: "Tuyển sinh 📝", query: "tuyển sinh" },
  ],
  en: [
    { text: "Library 📚", query: "open library" },
    { text: "E-Learning 💻", query: "elearning" },
    { text: "Portal 🎓", query: "student portal" },
    { text: "E-Job 💼", query: "job search" },
    { text: "Contact 📞", query: "contact" },
    { text: "Admissions 📝", query: "admissions" },
  ],
};

// Typing indicator component with enhanced styling
function TypingIndicator({ language }: { language: string }) {
  return (
    <div className="flex items-center space-x-2 p-3">
      <div className="flex space-x-1">
        <div className="w-2.5 h-2.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
        <div className="w-2.5 h-2.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce animation-delay-100"></div>
        <div className="w-2.5 h-2.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce animation-delay-200"></div>
      </div>
      <span className="text-sm text-gray-600 dark:text-gray-400 ml-2 font-medium">
        {language === "vi" ? "Mimi đang suy nghĩ..." : "Mimi is thinking..."}
      </span>
    </div>
  );
}

// URL Links component for displaying retrieved URLs
function URLLinks({
  urls,
  language,
}: {
  urls: Array<{ url: string; title?: string; description?: string }>;
  language: string;
}) {
  return (
    <div className="mt-3 space-y-2">
      <p className="text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center">
        <svg
          className="w-3 h-3 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
        {language === "vi" ? "Tài liệu liên quan:" : "Related resources:"}
      </p>
      <div className="space-y-2">
        {urls.map((urlData, index) => {
          const url = typeof urlData === "string" ? urlData : urlData.url;
          const title = typeof urlData === "object" ? urlData.title : undefined;
          const description =
            typeof urlData === "object" ? urlData.description : undefined;
          
          return (
            <div
              key={index}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-700/50"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  {title && (
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-100 truncate">
                      {title}
                    </p>
                  )}
                  {description && (
                    <p className="text-xs text-blue-700 dark:text-blue-300 mt-1 line-clamp-2">
                      {description}
                    </p>
                  )}
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 truncate">
                    {url}
                  </p>
                </div>
                <button
                  onClick={() => {
                    const success = openPage("", url);
                    if (success) {
                      console.log("Opened retrieved URL:", url);
                    }
                  }}
                  className="ml-2 p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-200 hover:scale-110 flex-shrink-0"
                  title={language === "vi" ? "Mở trang" : "Open page"}
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Settings Panel Component
function SettingsPanel({
  settings,
  setSettings,
  language,
  onClose,
  onExport,
  onImport,
}: {
  settings: {
    autoScroll: boolean;
    soundEnabled: boolean;
    compactMode: boolean;
    darkMode: boolean;
    notificationSound: boolean;
    fontSize: "small" | "medium" | "large";
    language: "vi" | "en" | "zh" | "ja" | "ko";
  };
  setSettings: React.Dispatch<React.SetStateAction<typeof settings>>;
  language: "vi" | "en" | "zh" | "ja" | "ko";
  onClose: () => void;
  onExport: () => void;
  onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="absolute inset-0 bg-white dark:bg-gray-900 z-50 rounded-3xl flex flex-col">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 flex items-center justify-between rounded-t-3xl">
        <h3 className="font-bold flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
          </svg>
          {language === "vi" ? "Cài đặt" : "Settings"}
        </h3>
        <button
          onClick={onClose}
          className="hover:bg-white/20 p-1.5 rounded-full"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Auto Scroll */}
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <div>
            <p className="font-medium text-sm">
              {language === "vi" ? "Tự động cuộn" : "Auto Scroll"}
            </p>
            <p className="text-xs text-gray-500">
              {language === "vi"
                ? "Cuộn xuống khi có tin mới"
                : "Scroll down on new messages"}
            </p>
          </div>
          <button
            onClick={() =>
              setSettings({ ...settings, autoScroll: !settings.autoScroll })
            }
            className={`w-12 h-6 rounded-full transition-colors duration-200 ${
              settings.autoScroll ? "bg-red-600" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                settings.autoScroll ? "translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        {/* Sound */}
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <div>
            <p className="font-medium text-sm">
              {language === "vi" ? "Âm thanh" : "Sound"}
            </p>
            <p className="text-xs text-gray-500">
              {language === "vi" ? "Âm thanh thông báo" : "Notification sounds"}
            </p>
          </div>
          <button
            onClick={() =>
              setSettings({ ...settings, soundEnabled: !settings.soundEnabled })
            }
            className={`w-12 h-6 rounded-full transition-colors duration-200 ${
              settings.soundEnabled ? "bg-red-600" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                settings.soundEnabled ? "translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        {/* Compact Mode */}
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <div>
            <p className="font-medium text-sm">
              {language === "vi" ? "Chế độ gọn" : "Compact Mode"}
            </p>
            <p className="text-xs text-gray-500">
              {language === "vi"
                ? "Giảm khoảng cách tin nhắn"
                : "Reduce message spacing"}
            </p>
          </div>
          <button
            onClick={() =>
              setSettings({ ...settings, compactMode: !settings.compactMode })
            }
            className={`w-12 h-6 rounded-full transition-colors duration-200 ${
              settings.compactMode ? "bg-red-600" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                settings.compactMode ? "translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        {/* Font Size */}
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <p className="font-medium text-sm mb-2">
            {language === "vi" ? "Cỡ chữ" : "Font Size"}
          </p>
          <div className="flex space-x-2">
            {(["small", "medium", "large"] as const).map((size) => (
              <button
                key={size}
                onClick={() => setSettings({ ...settings, fontSize: size })}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all duration-200 ${
                  settings.fontSize === size
                    ? "bg-red-600 text-white"
                    : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                }`}
              >
                {size === "small"
                  ? language === "vi"
                    ? "Nhỏ"
                    : "Small"
                  : size === "medium"
                    ? language === "vi"
                      ? "Vừa"
                      : "Medium"
                    : language === "vi"
                      ? "Lớn"
                      : "Large"}
              </button>
            ))}
          </div>
        </div>

        {/* Export/Import Section */}
        <div className="space-y-2">
          <p className="font-medium text-sm text-gray-700 dark:text-gray-300">
            {language === "vi" ? "Dữ liệu chat" : "Chat Data"}
          </p>

          {/* Export Chat */}
          <button
            onClick={onExport}
            className="w-full p-3 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl font-medium text-sm transition-colors duration-200 flex items-center justify-center"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            {language === "vi" ? "Xuất lịch sử chat" : "Export Chat History"}
          </button>

          {/* Import Chat */}
          <label className="w-full p-3 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl font-medium text-sm transition-colors duration-200 flex items-center justify-center cursor-pointer">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            {language === "vi" ? "Nhập lịch sử chat" : "Import Chat History"}
            <input
              type="file"
              accept=".json"
              className="hidden"
              onChange={onImport}
              title={
                language === "vi"
                  ? "Chọn file JSON để nhập lịch sử chat"
                  : "Choose JSON file to import chat history"
              }
              aria-label={
                language === "vi"
                  ? "Chọn file JSON để nhập lịch sử chat"
                  : "Choose JSON file to import chat history"
              }
            />
          </label>
        </div>

        {/* Clear Chat */}
        <button
          onClick={() => {
            if (
              window.confirm(
                language === "vi"
                  ? "Xóa toàn bộ lịch sử chat?"
                  : "Clear all chat history?",
              )
            ) {
              window.location.reload();
            }
          }}
          className="w-full p-3 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl font-medium text-sm transition-colors duration-200"
        >
          {language === "vi" ? "Xóa lịch sử chat" : "Clear Chat History"}
        </button>
      </div>
    </div>
  );
}

// Enhanced emoji shortcuts
const EMOJI_SHORTCUTS = {
  ":)": "😊",
  ":(": "😞",
  ":D": "😃",
  ":P": "😛",
  ":o": "😮",
  "<3": "❤️",
  ":heart:": "❤️",
  ":smile:": "😊",
  ":sad:": "😞",
  ":laugh:": "😂",
  ":cry:": "😢",
  ":wink:": "😉",
  ":kiss:": "😘",
  ":angry:": "😠",
  ":cool:": "😎",
  ":think:": "🤔",
  ":thumbs:": "👍",
  ":fire:": "🔥",
  ":star:": "⭐",
  ":book:": "📚",
  ":grad:": "🎓",
};

export default function Chatbot() {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<
    {
    role: string; 
    content: string; 
    id: number;
    timestamp?: Date;
      reactions?: Record<string, number>; // Changed to track reaction counts
    typing?: boolean;
      replyTo?: number; // Track which message this is replying to
      edited?: boolean; // Track if message was edited
      editedAt?: Date;
    }[]
  >([
    {
    role: "bot", 
      content: AI_RESPONSES[lang as "vi" | "en"]
        ? AI_RESPONSES[lang as "vi" | "en"].welcome[0]
        : AI_RESPONSES.vi.welcome[0],
    id: Date.now(),
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [editingMessage, setEditingMessage] = useState<number | null>(null);
  const [editInput, setEditInput] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userMood, setUserMood] = useState<"happy" | "neutral" | "frustrated">(
    "neutral",
  );
  const [conversationStage, setConversationStage] = useState<
    "greeting" | "inquiry" | "detailed"
  >("greeting");
  const [retrievedUrls, setRetrievedUrls] = useState<
    Array<{ url: string; title?: string; description?: string }>
  >([]);
  const [settings, setSettings] = useState({
    autoScroll: true,
    soundEnabled: true,
    compactMode: false,
    darkMode: false,
    notificationSound: true,
    fontSize: "medium" as "small" | "medium" | "large",
    language: lang,
  });

  // Apply settings effects
  useEffect(() => {
    // Apply dark mode
    if (settings.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settings.darkMode]);

  // Apply font size
  useEffect(() => {
    const root = document.documentElement;
    switch (settings.fontSize) {
      case "small":
        root.style.setProperty("--chat-font-size", "0.875rem");
        break;
      case "large":
        root.style.setProperty("--chat-font-size", "1.125rem");
        break;
      default:
        root.style.setProperty("--chat-font-size", "1rem");
    }
  }, [settings.fontSize]);
  
  const sendTimes = useRef<number[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    if (settings.autoScroll) {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [settings.autoScroll]);

  useEffect(() => {
    if (settings.autoScroll) {
    scrollToBottom();
    }
  }, [messages, settings.autoScroll, scrollToBottom]);

  // Play notification sound
  const playNotificationSound = useCallback(() => {
    if (settings.notificationSound && settings.soundEnabled) {
      const audio = new Audio(
        "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvnkfBTGH0fPTgjMGHm7A7+OZURE",
      );
      audio.volume = 0.3;
      audio.play().catch(() => {});
    }
  }, [settings.notificationSound, settings.soundEnabled]);

  // Handle message reactions
  const handleReaction = (messageId: number, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId) {
          const reactions = msg.reactions || {};
          if (reactions[emoji]) {
            if (reactions[emoji] === 1) {
              const { [emoji]: removed, ...rest } = reactions;
              return {
                ...msg,
                reactions: Object.keys(rest).length > 0 ? rest : undefined,
              };
            }
            return {
              ...msg,
              reactions: { ...reactions, [emoji]: reactions[emoji] - 1 },
            };
          } else {
            return { ...msg, reactions: { ...reactions, [emoji]: 1 } };
          }
        }
        return msg;
      }),
    );
  };

  // Handle message edit
  const handleEdit = (messageId: number) => {
    const message = messages.find((m) => m.id === messageId);
    if (message && message.role === "user") {
      setEditingMessage(messageId);
      setEditInput(message.content);
    }
  };

  // Save edited message
  const saveEdit = () => {
    if (editingMessage !== null && editInput.trim()) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === editingMessage
            ? { ...msg, content: editInput, edited: true, editedAt: new Date() }
            : msg,
        ),
      );
      setEditingMessage(null);
      setEditInput("");
    }
  };

  // Handle message delete
  const handleDelete = (messageId: number) => {
    if (
      window.confirm(
        lang === "vi"
          ? "Bạn có chắc muốn xóa tin nhắn này?"
          : "Are you sure you want to delete this message?",
      )
    ) {
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    }
  };

  // Get reply message content
  const getReplyMessage = (replyToId: number) => {
    return messages.find((m) => m.id === replyToId);
  };

  // Filter messages based on search (optimized with useMemo)
  const filteredMessages = useMemo(() =>
    showSearch && searchQuery
      ? messages.filter((msg) =>
          msg.content.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : messages,
    [messages, showSearch, searchQuery]
  );

  // Export chat history
  const exportChatHistory = useCallback(() => {
    const chatData = {
      version: "1.0",
      exportDate: new Date().toISOString(),
      messages: messages.filter((m) => !m.typing),
      settings: settings,
    };

    const blob = new Blob([JSON.stringify(chatData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vlu-chat-history-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [messages, settings]);

  // Import chat history
  const importChatHistory = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.version === "1.0" && Array.isArray(data.messages)) {
          setMessages(data.messages);
          if (data.settings) {
            setSettings((prev) => ({ ...prev, ...data.settings }));
          }
          playNotificationSound();
        } else {
          alert(lang === "vi" ? "File không hợp lệ!" : "Invalid file format!");
        }
      } catch (error) {
        alert(lang === "vi" ? "Lỗi khi đọc file!" : "Error reading file!");
        console.warn('Import error:', error);
      }
    };
    reader.readAsText(file);
  }, [lang, setMessages, setSettings, playNotificationSound]);

  // Add functions to window for Settings Panel access
  useEffect(() => {
    (
      window as {
        exportChatHistory?: typeof exportChatHistory;
        importChatHistory?: typeof importChatHistory;
      }
    ).exportChatHistory = exportChatHistory;
    (
      window as {
        exportChatHistory?: typeof exportChatHistory;
        importChatHistory?: typeof importChatHistory;
      }
    ).importChatHistory = importChatHistory;

    return () => {
      delete (
        window as {
          exportChatHistory?: typeof exportChatHistory;
          importChatHistory?: typeof importChatHistory;
        }
      ).exportChatHistory;
      delete (
        window as {
          exportChatHistory?: typeof exportChatHistory;
          importChatHistory?: typeof importChatHistory;
        }
      ).importChatHistory;
    };
  }, [exportChatHistory, importChatHistory]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      // Ctrl/Cmd + K: Focus input
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        const textarea = document.querySelector("textarea");
        if (textarea) textarea.focus();
      }

      // Ctrl/Cmd + F: Toggle search
      if ((e.ctrlKey || e.metaKey) && e.key === "f") {
        e.preventDefault();
        setShowSearch(!showSearch);
      }

      // Ctrl/Cmd + ,: Toggle settings
      if ((e.ctrlKey || e.metaKey) && e.key === ",") {
        e.preventDefault();
        setShowSettings(!showSettings);
      }

      // Escape: Close modals
      if (e.key === "Escape") {
        if (showSettings) setShowSettings(false);
        if (showSearch) setShowSearch(false);
        if (showEmojiPicker) setShowEmojiPicker(false);
        if (replyingTo) setReplyingTo(null);
        if (editingMessage) setEditingMessage(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    open,
    showSettings,
    showSearch,
    showEmojiPicker,
    replyingTo,
    editingMessage,
  ]);

  // Check scroll position for scroll-to-bottom button
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      setShowScrollToBottom(scrollHeight - scrollTop - clientHeight > 100);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Analyze user mood based on message content
  const analyzeMood = (message: string) => {
    const frustrationWords = [
      "khó",
      "không hiểu",
      "difficult",
      "confused",
      "help",
      "problem",
    ];
    const happyWords = [
      "tuyệt",
      "cảm ơn",
      "thanks",
      "great",
      "perfect",
      "good",
    ];

    if (frustrationWords.some((word) => message.toLowerCase().includes(word))) {
      setUserMood("frustrated");
    } else if (
      happyWords.some((word) => message.toLowerCase().includes(word))
    ) {
      setUserMood("happy");
    } else {
      setUserMood("neutral");
    }
  };

  // Enhanced AI response generation with N8N integration and dynamic page opening
  const generateAIResponse = async (
    userMessage: string,
    contextMessage?: string,
  ): Promise<string> => {
    const message = userMessage.toLowerCase();
    const responses = AI_RESPONSES[lang as "vi" | "en"] || AI_RESPONSES.vi;
    
    // Try N8N agent first - PRIORITY OVER LOCAL RESPONSES
    try {
      const n8nResult = await callN8NAgent(contextMessage || userMessage, lang);
      if (n8nResult.response && n8nResult.response.trim()) {
        // Enhanced URL handling from N8N workflow
        const openedUrls: string[] = [];
        
        // Handle single URL from action
        if (n8nResult.action === "open_page" && n8nResult.url) {
          setTimeout(() => {
            const success = openPage("", n8nResult.url);
            if (success) openedUrls.push(n8nResult.url!);
          }, 1000);
        } else if (n8nResult.action === "open_library") {
          setTimeout(() => {
            const success = openPage("library");
            if (success) openedUrls.push(PAGE_URLS.library);
          }, 1000);
        } else if (
          n8nResult.action &&
          PAGE_URLS[n8nResult.action as keyof typeof PAGE_URLS]
        ) {
          setTimeout(() => {
            const success = openPage(n8nResult.action!);
            if (success)
              openedUrls.push(
                PAGE_URLS[n8nResult.action as keyof typeof PAGE_URLS],
              );
          }, 1000);
        }
        
        // Handle multiple URLs from retrieve data (NEW FEATURE)
        if (
          n8nResult.urls &&
          Array.isArray(n8nResult.urls) &&
          n8nResult.urls.length > 0
        ) {
          console.log("Multiple URLs received from N8N:", n8nResult.urls);
          
          // Store retrieved URLs for display
          setRetrievedUrls(n8nResult.urls);
          
          // Open URLs with staggered timing to avoid overwhelming the user
          n8nResult.urls.forEach((urlData, index) => {
            setTimeout(
              () => {
                const url = typeof urlData === "string" ? urlData : urlData.url;
                const title =
                  typeof urlData === "object" ? urlData.title : undefined;
              
              if (url) {
                  const success = openPage("", url, title);
                if (success) {
                  openedUrls.push(url);
                    console.log(
                      `Opened URL ${index + 1}:`,
                      url,
                      title ? `(${title})` : "",
                    );
                  }
                }
              },
              1500 + index * 500,
            ); // Stagger opening by 500ms each
          });
        }
        
        // Handle direct URL from response
        if (n8nResult.url && !openedUrls.includes(n8nResult.url)) {
          setTimeout(() => {
            const success = openPage("", n8nResult.url);
            if (success) openedUrls.push(n8nResult.url!);
          }, 1000);
        }
        
        // Enhance response with opened URLs information
        let enhancedResponse = n8nResult.response;
        if (openedUrls.length > 0) {
          const urlInfo = openedUrls
            .map((url) => {
            const urlObj = new URL(url);
            return `🔗 ${urlObj.hostname}${urlObj.pathname}`;
            })
            .join("\n");
          
          enhancedResponse += `\n\n${lang === "vi" ? "Đã mở các trang:" : "Opened pages:"}\n${urlInfo}`;
        }
        
        return enhancedResponse;
      }
    } catch (error) {
      console.warn(
        "N8N agent unavailable, falling back to local responses",
        error,
      );
    }
    
    // Fallback to local pattern matching ONLY if N8N fails or returns empty
    // Enhanced local patterns with page opening for common requests
    
    // Patterns for "không biết ở đâu" / "where is" type questions  
    const locationQuestions = [
      "không biết",
      "ở đâu",
      "where",
      "tìm không thấy",
      "không tìm được",
      "đường link",
      "trang web",
      "website",
      "link",
    ];

    const hasLocationQuestion = locationQuestions.some((keyword) =>
      message.includes(keyword),
    );
    
    // Library patterns
    const libraryKeywords = ["thư viện", "library", "lib"];
    const hasLibraryKeyword = libraryKeywords.some((keyword) =>
      message.includes(keyword),
    );
    
    if (hasLibraryKeyword) {
      console.log("Library pattern detected, opening library page");
      setTimeout(() => openPage("library"), 1000);
      return lang === "vi"
        ? "Tôi đang mở trang thư viện VLU cho bạn! 📚\n\nBạn có thể tìm kiếm sách, tài liệu, và các dịch vụ thư viện tại đây.\n\n🔗 " +
            PAGE_URLS.library
        : "I'm opening the VLU library page for you! 📚\n\nYou can search for books, documents, and library services here.\n\n🔗 " +
            PAGE_URLS.library;
    }
    
    // E-Learning patterns  
    const elearningKeywords = [
      "elearning",
      "e-learning",
      "học trực tuyến",
      "lms",
      "learning",
    ];
    const hasElearningKeyword = elearningKeywords.some((keyword) =>
      message.includes(keyword),
    );
    
    if (hasElearningKeyword) {
      console.log("E-Learning pattern detected, opening e-learning page");
      setTimeout(() => openPage("elearning"), 1000);
      return lang === "vi"
        ? "Đang mở hệ thống E-Learning VLU! 💻\n\nBạn có thể truy cập các khóa học trực tuyến và tài liệu học tập.\n\n🔗 " +
            PAGE_URLS.elearning
        : "Opening VLU E-Learning system! 💻\n\nYou can access online courses and learning materials.\n\n🔗 " +
            PAGE_URLS.elearning;
    }
    
    // Portal patterns
    const portalKeywords = [
      "portal",
      "cổng thông tin",
      "sinh viên",
      "student portal",
      "điểm",
      "lịch học",
    ];
    const hasPortalKeyword = portalKeywords.some((keyword) =>
      message.includes(keyword),
    );
    
    if (hasPortalKeyword) {
      console.log("Portal pattern detected, opening portal page");
      setTimeout(() => openPage("portal"), 1000);
      return lang === "vi"
        ? "Mở cổng thông tin sinh viên VLU! 🎓\n\nBạn có thể xem điểm, lịch học và thông tin cá nhân.\n\n🔗 " +
            PAGE_URLS.portal
        : "Opening VLU student portal! 🎓\n\nYou can view grades, schedules and personal information.\n\n🔗 " +
            PAGE_URLS.portal;
    }
    
    // E-Job patterns
    const ejobKeywords = [
      "ejob",
      "e-job",
      "việc làm",
      "job",
      "thực tập",
      "internship",
    ];
    const hasEjobKeyword = ejobKeywords.some((keyword) =>
      message.includes(keyword),
    );
    
    if (hasEjobKeyword) {
      console.log("E-Job pattern detected, opening e-job page");
      setTimeout(() => openPage("ejob"), 1000);
      return lang === "vi"
        ? "Đang mở hệ thống E-Job VLU! 💼\n\nTìm kiếm cơ hội việc làm và thực tập dành cho sinh viên.\n\n🔗 " +
            PAGE_URLS.ejob
        : "Opening VLU E-Job system! 💼\n\nFind job opportunities and internships for students.\n\n🔗 " +
            PAGE_URLS.ejob;
    }
    
    // General location questions - these should be sent to N8N for processing
    if (
      hasLocationQuestion &&
      !hasLibraryKeyword &&
      !hasElearningKeyword &&
      !hasPortalKeyword &&
      !hasEjobKeyword
    ) {
      // If this is reached, it means N8N didn't respond, so provide helpful local response
      return lang === "vi"
        ? "Tôi có thể giúp bạn mở các trang web VLU:\n\n📚 Thư viện: lib.vlu.edu.vn\n💻 E-Learning: elearning.vlu.edu.vn\n🎓 Portal sinh viên: portal.vlu.edu.vn\n💼 E-Job: ejob.vlu.edu.vn\n\nBạn muốn mở trang nào?"
        : "I can help you access VLU web pages:\n\n📚 Library: lib.vlu.edu.vn\n💻 E-Learning: elearning.vlu.edu.vn\n🎓 Student Portal: portal.vlu.edu.vn\n💼 E-Job: ejob.vlu.edu.vn\n\nWhich page would you like to open?";
    }
    
    // Standard conversation patterns
    if (
      message.includes("chào") ||
      message.includes("hello") ||
      message.includes("hi")
    ) {
      setConversationStage("greeting");
      return responses.greetings[
        Math.floor(Math.random() * responses.greetings.length)
      ];
    }

    if (
      message.includes("tuyển sinh") ||
      message.includes("admission") ||
      message.includes("đăng ký")
    ) {
      setConversationStage("inquiry");
      return responses.admissions[
        Math.floor(Math.random() * responses.admissions.length)
      ];
    }

    if (
      message.includes("ngành") ||
      message.includes("chương trình") ||
      message.includes("program") ||
      message.includes("major")
    ) {
      setConversationStage("detailed");
      return responses.programs[
        Math.floor(Math.random() * responses.programs.length)
      ];
    }

    if (message.includes("cơ sở") || message.includes("facilities")) {
      return responses.facilities[0];
    }
    
    if (
      message.includes("liên hệ") ||
      message.includes("contact") ||
      message.includes("phone") ||
      message.includes("email")
    ) {
      return responses.contact[0];
    }
    
    // Contextual responses based on conversation stage
    if (conversationStage === "greeting") {
      return "Tôi có thể giúp bạn tìm hiểu về VLU! Bạn quan tâm điều gì nhất: tuyển sinh, chương trình học, hay cơ sở vật chất?";
    }
    
    // Default with context
    const defaultResponse =
      responses.default[Math.floor(Math.random() * responses.default.length)];
    return defaultResponse.replace("{query}", userMessage);
  };

  // Enhanced send message with AI simulation
  const sendMessage = async () => {
    if (!input.trim()) return;

    const now = Date.now();
    sendTimes.current.push(now);
    sendTimes.current = sendTimes.current.filter((time) => now - time < 10000);

    // Rate limiting
    if (sendTimes.current.length > 5) {
      alert(
        lang === "vi"
          ? "Vui lòng gửi tin nhắn chậm hơn!"
          : "Please slow down your messages!",
      );
      return;
    }

    const processedInput = Object.entries(EMOJI_SHORTCUTS).reduce(
      (text, [shortcut, emoji]) =>
        text.replace(
          new RegExp(shortcut.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
          emoji,
        ),
      input,
    );

    // Add user message with reply context
    const userMessage = {
      role: "user",
      content: processedInput,
      id: Date.now(),
      timestamp: new Date(),
      replyTo: replyingTo || undefined,
    };
    
    // Include reply context in webhook data if replying
    let contextMessage = processedInput;
    if (replyingTo) {
      const repliedMessage = messages.find((m) => m.id === replyingTo);
      if (repliedMessage) {
        contextMessage = `Replying to: "${repliedMessage.content}"

New message: ${processedInput}`;
      }
    }

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setShowQuickActions(false);
    setRetrievedUrls([]); // Reset retrieved URLs for new conversation
    setReplyingTo(null); // Clear reply state
    
    // Analyze user mood
    analyzeMood(processedInput);

    // Add typing indicator
    const typingMessage = {
      role: "bot",
      content: "",
      id: Date.now() + 1,
      typing: true,
    };
    setMessages((prev) => [...prev, typingMessage]);

    // Simulate AI thinking time with async response
    setTimeout(
      async () => {
      try {
          const response = await generateAIResponse(
            processedInput,
            contextMessage,
          );
        
          const botMessage = {
          role: "bot",
          content: response,
          id: Date.now() + 2,
            timestamp: new Date(),
          };

          setMessages((prev) =>
            prev.filter((msg) => !msg.typing).concat([botMessage]),
          );

          // Play notification sound for bot response
          playNotificationSound();

          // Show quick actions after bot response
          setTimeout(() => setShowQuickActions(true), 500);
      } catch (error) {
          console.error("Error generating AI response:", error);
        // Fallback response
          setMessages((prev) =>
            prev
              .filter((msg) => !msg.typing)
              .concat([
                {
          role: "bot",
                  content:
                    "Xin lỗi, tôi đang gặp sự cố kỹ thuật. Vui lòng thử lại sau!",
          id: Date.now() + 2,
                  timestamp: new Date(),
                },
              ]),
          );
      } finally {
        setIsLoading(false);
      }
      },
      1000 + Math.random() * 2000,
    ); // Random delay for realism
  };

  // Future feature: typing indicator for user
  // const [isUserTyping, setIsUserTyping] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // setIsUserTyping(true); // Future feature
  };

  const handleQuickAction = (query: string) => {
    setInput(query);
    setTimeout(() => sendMessage(), 100);
  };

  const formatTimestamp = (timestamp?: Date) => {
    if (!timestamp) return "";
    return timestamp.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getBotPersonality = () => {
    switch (userMood) {
      case "frustrated":
        return { avatar: "🤗", mood: "supportive" };
      case "happy":
        return { avatar: "😊", mood: "cheerful" };
      default:
        return { avatar: "🎓", mood: "professional" };
    }
  };

  const botPersonality = getBotPersonality();

  return (
    <>
      {/* Enhanced Chat Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`
          fixed bottom-6 right-6 z-40 
          ${
            open
              ? "bg-red-600 hover:bg-red-700 scale-95"
              : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 scale-100 animate-pulse"
          }
          text-white w-16 h-16 rounded-full shadow-2xl 
          transition-all duration-300 transform hover:scale-110
          flex items-center justify-center border-4 border-white
        `}
      >
        {open ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <div className="relative">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            {/* Notification dot */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-xs">!</span>
            </div>
          </div>
        )}
      </button>

      {/* Enhanced Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[600px] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-600 flex flex-col overflow-hidden backdrop-blur-lg animate-in slide-in-from-bottom-4 duration-300">
          {/* Enhanced Header */}
          <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white p-4 flex items-center justify-between rounded-t-3xl">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center ring-2 ring-white/30">
                  <span className="text-lg">{botPersonality.avatar}</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h3 className="font-bold text-base">VLU TTHTSV Assistant</h3>
                <p className="text-xs text-white/90 flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  {isLoading
                    ? lang === "vi"
                      ? "Đang trả lời..."
                      : "Typing..."
                    : lang === "vi"
                      ? "Trực tuyến • Hỗ trợ AI"
                      : "Online • AI Powered"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {/* Language indicator with improved styling */}
              <div className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full border border-white/30">
                <span className="text-xs font-medium">
                  {lang.toUpperCase()}
                </span>
              </div>
              {/* Search button */}
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="hover:bg-white/20 p-1.5 rounded-full transition-all duration-200 hover:scale-110"
                title={`${lang === "vi" ? "Tìm kiếm" : "Search"} (Ctrl+F)`}
                aria-label={lang === "vi" ? "Tìm kiếm" : "Search"}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              {/* Settings button */}
              <button 
                onClick={() => setShowSettings(!showSettings)}
                className="hover:bg-white/20 p-1.5 rounded-full transition-all duration-200 hover:scale-110"
                title={`${lang === "vi" ? "Cài đặt" : "Settings"} (Ctrl+,)`}
                aria-label={lang === "vi" ? "Cài đặt" : "Settings"}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
              <button
                onClick={() => setOpen(false)}
                className="hover:bg-white/20 p-1.5 rounded-full transition-all duration-200 hover:scale-110 hover:rotate-90"
                title={lang === "vi" ? "Đóng" : "Close"}
                aria-label={lang === "vi" ? "Đóng" : "Close"}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Container with improved styling */}
          <div 
            ref={messagesContainerRef}
            className={`flex-1 overflow-y-auto p-4 ${settings.compactMode ? "space-y-2" : "space-y-3"} bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800`}
          >
            {/* Search Bar */}
            {showSearch && (
              <div className="sticky top-0 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-2 rounded-xl mb-3">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      lang === "vi"
                        ? "Tìm kiếm tin nhắn..."
                        : "Search messages..."
                    }
                    className="w-full px-4 py-2 pr-10 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <button
                    onClick={() => {
                      setShowSearch(false);
                      setSearchQuery("");
                    }}
                    className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {filteredMessages.map((message, index) => {
              const repliedMessage = message.replyTo
                ? getReplyMessage(message.replyTo)
                : null;
              const isEditing = editingMessage === message.id;
              const fontSize =
                settings.fontSize === "small"
                  ? "text-xs"
                  : settings.fontSize === "large"
                    ? "text-base"
                    : "text-sm";

              return (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} group animate-in fade-in-0 slide-in-from-bottom-2 duration-300`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {message.role === "bot" && (
                  <div className="w-8 h-8 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/50 dark:to-red-800/50 rounded-full flex items-center justify-center mr-2 flex-shrink-0 ring-2 ring-red-100 dark:ring-red-800/30">
                      <Image
                        src={LOGO_URL}
                        alt="VLU"
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                  </div>
                )}
                
                  <div className={`max-w-[80%] relative`}>
                    {/* Reply Context */}
                    {repliedMessage && (
                      <div
                        className={`mb-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs ${
                          message.role === "user"
                            ? "bg-red-500/20 text-white"
                            : "text-gray-600 dark:text-gray-300"
                        }`}
                      >
                        <p className="font-medium">
                          {repliedMessage.role === "user"
                            ? lang === "vi"
                              ? "Bạn"
                              : "You"
                            : "VLU Assistant"}
                        </p>
                        <p className="truncate">{repliedMessage.content}</p>
                      </div>
                    )}

                    <div
                      className={`relative ${
                        message.role === "user"
                          ? "bg-gradient-to-br from-red-600 to-red-700 text-white shadow-lg"
                          : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 dark:text-white shadow-md"
                      } rounded-2xl px-4 py-3 transition-all duration-200 hover:shadow-lg`}
                    >
                  {message.typing ? (
                    <TypingIndicator language={lang} />
                      ) : isEditing ? (
                        <div className="space-y-2">
                          <textarea
                            value={editInput}
                            onChange={(e) => setEditInput(e.target.value)}
                            className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white text-sm"
                            rows={3}
                            placeholder={
                              lang === "vi"
                                ? "Nhập nội dung mới..."
                                : "Enter new content..."
                            }
                            title={
                              lang === "vi"
                                ? "Chỉnh sửa tin nhắn"
                                : "Edit message"
                            }
                            aria-label={
                              lang === "vi"
                                ? "Chỉnh sửa tin nhắn"
                                : "Edit message"
                            }
                          />
                          <div className="flex space-x-2">
                            <button
                              onClick={saveEdit}
                              className="px-3 py-1 bg-green-500 text-white rounded-lg text-xs hover:bg-green-600"
                            >
                              {lang === "vi" ? "Lưu" : "Save"}
                            </button>
                            <button
                              onClick={() => {
                                setEditingMessage(null);
                                setEditInput("");
                              }}
                              className="px-3 py-1 bg-gray-500 text-white rounded-lg text-xs hover:bg-gray-600"
                            >
                              {lang === "vi" ? "Hủy" : "Cancel"}
                            </button>
                          </div>
                        </div>
                  ) : (
                    <>
                          <p
                            className={`${fontSize} leading-relaxed whitespace-pre-wrap break-words overflow-hidden`}
                          >
                            {message.content}
                          </p>
                      
                      {/* Display retrieved URLs if available */}
                          {message.role === "bot" &&
                            retrievedUrls.length > 0 && (
                        <URLLinks urls={retrievedUrls} language={lang} />
                      )}
                      
                          {/* Reactions Display */}
                          {message.reactions &&
                            Object.keys(message.reactions).length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {Object.entries(message.reactions).map(
                                  ([emoji, count]) => (
                                    <button
                                      key={emoji}
                                      onClick={() =>
                                        handleReaction(message.id, emoji)
                                      }
                                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs flex items-center space-x-1 hover:bg-gray-200 dark:hover:bg-gray-600"
                                    >
                                      <span>{emoji}</span>
                                      <span>{count}</span>
                                    </button>
                                  ),
                                )}
                          </div>
                            )}

                          <div
                            className={`text-xs mt-2 ${
                              message.role === "user"
                                ? "text-red-100"
                                : "text-gray-500 dark:text-gray-400"
                            } flex items-center justify-between`}
                          >
                            <span className="flex items-center">
                              {formatTimestamp(message.timestamp)}
                              {message.edited && (
                                <span className="ml-2 italic">
                                  ({lang === "vi" ? "đã sửa" : "edited"})
                                </span>
                              )}
                              {message.role === "user" && (
                                <span className="ml-2 text-green-400">✓</span>
                              )}
                            </span>

                            {/* Message Actions */}
                            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              {/* Reply Button */}
                              <button
                                onClick={() => setReplyingTo(message.id)}
                                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                                title={lang === "vi" ? "Trả lời" : "Reply"}
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                                  />
                                </svg>
                              </button>

                              {/* Edit Button (user messages only) */}
                              {message.role === "user" && (
                                <button
                                  onClick={() => handleEdit(message.id)}
                                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                                  title={lang === "vi" ? "Sửa" : "Edit"}
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    />
                                  </svg>
                                </button>
                              )}

                              {/* Delete Button */}
                              <button
                                onClick={() => handleDelete(message.id)}
                                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-red-500"
                                title={lang === "vi" ? "Xóa" : "Delete"}
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>

                              {/* Reaction Picker */}
                              <div className="relative group/reactions">
                                <button
                                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                                  title={
                                    lang === "vi"
                                      ? "Thêm phản ứng"
                                      : "Add reaction"
                                  }
                                  aria-label={
                                    lang === "vi"
                                      ? "Thêm phản ứng"
                                      : "Add reaction"
                                  }
                                >
                                  <span className="text-sm">😊</span>
                                </button>
                                <div className="absolute bottom-full right-0 mb-1 hidden group-hover/reactions:flex bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 space-x-1">
                                  {["👍", "❤️", "😂", "😮", "😢", "🔥"].map(
                                    (emoji) => (
                                      <button
                                        key={emoji}
                                        onClick={() =>
                                          handleReaction(message.id, emoji)
                                        }
                                        className="hover:scale-125 transition-transform"
                                        title={`${lang === "vi" ? "Thêm phản ứng" : "Add reaction"}: ${emoji}`}
                                        aria-label={`${lang === "vi" ? "Thêm phản ứng" : "Add reaction"}: ${emoji}`}
                                      >
                                        {emoji}
                                      </button>
                                    ),
                                  )}
                                </div>
                              </div>
                            </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
                </div>
              );
            })}
            
            {/* Quick Actions with improved styling */}
            {showQuickActions && (
              <div className="space-y-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-3 border border-gray-200 dark:border-gray-600">
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center flex items-center justify-center">
                  <svg
                    className="w-3 h-3 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  {lang === "vi" ? "Gợi ý nhanh:" : "Quick suggestions:"}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {(QUICK_ACTIONS[lang as "vi" | "en"] || QUICK_ACTIONS.vi).map(
                    (action, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickAction(action.query)}
                      className="text-xs bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 hover:from-red-100 hover:to-red-200 dark:hover:from-red-800/40 dark:hover:to-red-700/40 text-red-700 dark:text-red-300 p-3 rounded-xl border border-red-200 dark:border-red-700/50 transition-all duration-200 hover:scale-105 hover:shadow-md font-medium"
                    >
                      {action.text}
                    </button>
                    ),
                  )}
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Scroll to bottom button */}
          {showScrollToBottom && (
            <button
              onClick={scrollToBottom}
              className="absolute bottom-20 right-3 bg-red-600 text-white p-1.5 rounded-full shadow-lg hover:bg-red-700 transition-colors duration-200 z-10"
              title={lang === "vi" ? "Cuộn xuống dưới" : "Scroll to bottom"}
              aria-label={
                lang === "vi" ? "Cuộn xuống dưới" : "Scroll to bottom"
              }
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
          )}

          {/* Enhanced Input Area with improved sizing */}
          <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-600 rounded-b-3xl">
            {/* Reply Indicator */}
            {replyingTo && (
              <div className="mb-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                    />
                  </svg>
                  <div className="text-sm">
                    <p className="font-medium text-gray-700 dark:text-gray-300">
                      {lang === "vi" ? "Đang trả lời" : "Replying to"}{" "}
                      {getReplyMessage(replyingTo)?.role === "user"
                        ? lang === "vi"
                          ? "bạn"
                          : "you"
                        : "VLU Assistant"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[200px]">
                      {getReplyMessage(replyingTo)?.content}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setReplyingTo(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  title={lang === "vi" ? "Hủy trả lời" : "Cancel reply"}
                  aria-label={lang === "vi" ? "Hủy trả lời" : "Cancel reply"}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}

            <div className="flex items-end space-x-2">
              {/* Emoji button with improved styling */}
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 hover:scale-110 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
                title={lang === "vi" ? "Chọn emoji" : "Choose emoji"}
                aria-label={lang === "vi" ? "Chọn emoji" : "Choose emoji"}
              >
                <span className="text-lg">😊</span>
              </button>

              <div className="flex-1 relative">
                <textarea
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder={
                    replyingTo
                      ? lang === "vi"
                        ? "Nhập câu trả lời..."
                        : "Type your reply..."
                      : lang === "vi"
                        ? "Nhập tin nhắn của bạn..."
                        : "Type your message..."
                  }
                  className={`w-full p-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-2xl resize-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm leading-relaxed ${
                    input.split("\n").length > 1 ? "h-auto" : "h-12"
                  }`}
                  rows={1}
                  title={`${lang === "vi" ? "Nhấn Enter để gửi, Shift+Enter để xuống dòng" : "Press Enter to send, Shift+Enter for new line"} (Ctrl+K to focus)`}
                />
              </div>

              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className={`p-3 rounded-2xl transition-all duration-200 ${
                  input.trim() && !isLoading
                    ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white transform hover:scale-105 shadow-lg hover:shadow-xl"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                }`}
                title={lang === "vi" ? "Gửi tin nhắn" : "Send message"}
                aria-label={lang === "vi" ? "Gửi tin nhắn" : "Send message"}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Enhanced emoji panel */}
            {showEmojiPicker && (
              <div className="mt-3 p-3 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl border border-gray-200 dark:border-gray-600 animate-in fade-in-0 slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    {lang === "vi" ? "Chọn emoji" : "Choose emoji"}
                  </span>
                  <button
                    onClick={() => setShowEmojiPicker(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="grid grid-cols-8 gap-1">
                  {Object.values(EMOJI_SHORTCUTS)
                    .slice(0, 32)
                    .map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => {
                          setInput((prev) => prev + emoji);
                        setShowEmojiPicker(false);
                      }}
                        className="p-2 hover:bg-white dark:hover:bg-gray-600 rounded-xl text-lg transition-all duration-200 hover:scale-125 hover:shadow-md"
                        title={emoji}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex flex-wrap gap-1">
                    {["😊", "😂", "❤️", "👍", "🎉", "🔥", "💯", "✨"].map(
                      (emoji, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setInput((prev) => prev + emoji);
                            setShowEmojiPicker(false);
                          }}
                          className="p-1.5 hover:bg-white dark:hover:bg-gray-600 rounded-lg text-sm transition-all duration-200 hover:scale-110"
                          title={emoji}
                        >
                          {emoji}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <SettingsPanel
              settings={settings}
              setSettings={setSettings}
              language={lang}
              onClose={() => setShowSettings(false)}
              onExport={exportChatHistory}
              onImport={importChatHistory}
            />
          )}
        </div>
      )}
    </>
  );
}
