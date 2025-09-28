
import React from 'react';
import { CameraIcon } from './icons/Icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-cyan-400">
              <CameraIcon className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <h1 className="text-xl font-bold text-white tracking-wider">AI Photo Editor Pro</h1>
              <p className="text-xs text-gray-400">Powered by Gemini</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
