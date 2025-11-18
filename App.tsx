
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Chat } from '@google/genai';
import { Message } from './types';
import { createChatSession } from './services/geminiService';
import Header from './components/Header';
import ChatHistory from './components/ChatHistory';
import ChatInput from './components/ChatInput';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);

  useEffect(() => {
    chatRef.current = createChatSession();
    setMessages([
        {
            id: 'init',
            sender: 'model',
            text: "Hello! How can I help you today?",
        }
    ]);
  }, []);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!chatRef.current) return;
    
    const userMessage: Message = { id: Date.now().toString(), text, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    const modelMessageId = (Date.now() + 1).toString();
    const modelMessagePlaceholder: Message = { id: modelMessageId, text: '', sender: 'model' };
    setMessages(prev => [...prev, modelMessagePlaceholder]);

    try {
        const stream = await chatRef.current.sendMessageStream({ message: text });

        let fullResponse = '';
        for await (const chunk of stream) {
            fullResponse += chunk.text;
            setMessages(prev => prev.map(msg => 
                msg.id === modelMessageId ? { ...msg, text: fullResponse } : msg
            ));
        }
    } catch (error) {
        console.error("Error sending message:", error);
        const errorMessage: Message = {
            id: modelMessageId,
            text: "Sorry, I encountered an error. Please try again.",
            sender: 'model'
        };
        setMessages(prev => prev.map(msg => msg.id === modelMessageId ? errorMessage : msg));
    } finally {
        setIsLoading(false);
    }
  }, []);


  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <ChatHistory messages={messages} isLoading={isLoading} />
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;
