
import React, { useRef, useEffect } from 'react';
import { Message } from '../types';
import MessageComponent from './Message';

interface ChatHistoryProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages, isLoading }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.map((msg) => (
        <MessageComponent key={msg.id} message={msg} />
      ))}
      {isLoading && messages[messages.length - 1]?.sender === 'user' && (
        <div className="flex items-start gap-4 my-4">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center animate-pulse">
            </div>
            <div className="max-w-xs md:max-w-md lg:max-w-2xl rounded-2xl p-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-sm">
                <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default ChatHistory;
