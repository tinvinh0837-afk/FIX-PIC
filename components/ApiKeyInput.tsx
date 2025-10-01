
import React, { useState } from 'react';
import { KeyIcon } from './icons/Icons';

interface ApiKeyInputProps {
  onApiKeySubmit: (apiKey: string) => void;
  error: string | null;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeySubmit, error }) => {
  const [key, setKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key.trim()) {
      onApiKeySubmit(key.trim());
    }
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center p-8 text-center bg-gray-800 rounded-lg h-full">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-2">
            <KeyIcon />
            <h2 className="text-2xl font-bold text-white">Enter Your Gemini API Key</h2>
            <p className="text-gray-400 text-sm">
                To use the editor, please provide your Google Gemini API key. Your key is not stored on any server and is only used in your browser.
            </p>
        </div>
        {error && (
            <div className="bg-red-800 bg-opacity-90 text-white p-3 rounded-lg shadow-lg">
                <p>{error}</p>
            </div>
        )}
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Paste your API key here"
          className="w-full p-3 bg-gray-900 border-2 border-gray-700 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 transition text-center"
          required
          aria-label="Gemini API Key"
        />
        <button
          type="submit"
          disabled={!key.trim()}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed disabled:scale-100"
        >
          Start Editing
        </button>
      </form>
    </div>
  );
};
