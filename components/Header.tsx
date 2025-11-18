
import React from 'react';
import BotIcon from './icons/BotIcon';

const Header: React.FC = () => {
  return (
    <header className="flex items-center p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-10">
      <BotIcon className="h-8 w-8 text-blue-500 mr-3" />
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">Gemini Chat</h1>
    </header>
  );
};

export default Header;
