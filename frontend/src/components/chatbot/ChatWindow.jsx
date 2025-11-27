import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import { sendChatMessage } from '../../api/authApi';

const TypingIndicator = () => (
  <div className="flex items-center gap-2 p-4">
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V19C3 20.1 3.9 21 5 21H11V19H5V3H13V9H21Z"/>
      </svg>
    </div>
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-4 shadow-md border border-slate-200">
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"></div>
        <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  </div>
);

export default function ChatWindow({ handleChatToggle }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi there! I'm HexaPath SkillUp Bot. How can I help you with your learning path today? 🚀" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { role: 'user', content: inputValue };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await sendChatMessage(newMessages);
      if (response.data.success) {
        const botResponse = { role: 'assistant', content: response.data.data.response };
        setMessages(prev => [...prev, botResponse]);
      }
    } catch (error) {
      console.error("Failed to get chat response:", error);
      const errorResponse = { role: 'assistant', content: "Sorry, I'm having trouble connecting right now. 😔" };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    { icon: "🎯", text: "Career guidance", action: () => setInputValue("I need career guidance") },
    { icon: "📚", text: "Learning path", action: () => setInputValue("Show me learning paths") },
    { icon: "💡", text: "Skill assessment", action: () => setInputValue("I want to assess my skills") }
  ];

  return (
    <div className={`fixed bottom-5 right-5 transition-all duration-500 ease-out ${
      isExpanded ? 'w-96 h-[600px]' : 'w-80 h-[480px]'
    } bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden animate-slideUp flex flex-col`}>
      
      {/* Fixed Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white p-4 relative overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16 6.5 6.5 0 0 1 3 9.5 6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14 14 12 14 9.5 12 5 9.5 5Z"/>
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">SkillUp Assistant</h3>
              <p className="text-xs text-blue-100">Always here to help</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors duration-200"
              aria-label="Expand chat"
            >
              <svg className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8l4-4m0 0l4 4m-4-4v12" />
              </svg>
            </button>
            <button
              onClick={handleChatToggle}
              className="p-1.5 rounded-full hover:bg-white/20 transition-all duration-200 hover:rotate-90"
              aria-label="Close chat"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Messages Area */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-50/50 to-white custom-scrollbar">
        <div className="p-4 pb-6">
          {messages.length === 1 && (
            <div className="mb-4">
              <div className="text-center text-slate-500 text-xs mb-3">Quick actions</div>
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full text-xs transition-colors duration-200"
                  >
                    <span>{action.icon}</span>
                    <span>{action.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} index={index} />
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} className="h-1" />
        </div>
      </div>

      {/* Fixed Input Area */}
      <div className="p-4 bg-white border-t border-slate-200 flex-shrink-0">
        <form onSubmit={handleSendMessage} className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything..."
            className="w-full pl-4 pr-12 py-3 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
