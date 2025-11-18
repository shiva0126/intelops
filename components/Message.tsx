
import React from 'react';
import { Message } from '../types';
import UserIcon from './icons/UserIcon';
import BotIcon from './icons/BotIcon';

interface MessageProps {
  message: Message;
}

const MessageComponent: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex items-start gap-4 my-4 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <BotIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </div>
      )}
      <div
        className={`max-w-xs md:max-w-md lg:max-w-2xl rounded-2xl p-4 text-sm ${
          isUser
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-sm'
        }`}
      >
        <div className="whitespace-pre-wrap">{message.text}</div>
      </div>
      {isUser && (
         <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <UserIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </div>
      )}
    </div>
  );
};

export default MessageComponent;
