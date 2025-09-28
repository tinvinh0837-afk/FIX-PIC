
import React, { useState } from 'react';
import type { EditPreset } from '../types';
import { MagicWandIcon, CropIcon, SparklesIcon, FilmIcon, CameraIcon, PaintBrushIcon } from './icons/Icons';

interface EditorPanelProps {
  onPresetSelect: (preset: EditPreset) => void;
  onCustomSubmit: (prompt: string) => void;
  isLoading: boolean;
  hasImage: boolean;
}

const presets: EditPreset[] = [
  { id: 'enhance', name: 'Auto Enhance', prompt: 'Professionally enhance this photo: improve colors, exposure, contrast, and sharpness. Make it look vibrant and clear.', loadingMessage: 'Auto-enhancing image...', icon: <MagicWandIcon /> },
  { id: 'remove-bg', name: 'Remove BG', prompt: 'Remove the background of this image, leaving only the main subject. The new background should be transparent.', loadingMessage: 'Removing background...', icon: <CropIcon /> },
  { id: 'cinematic', name: 'Cinematic', prompt: 'Apply a cinematic color grade to this photo, with moody teal and orange tones. Increase contrast for a dramatic effect.', loadingMessage: 'Applying cinematic filter...', icon: <FilmIcon /> },
  { id: 'vintage', name: 'Vintage', prompt: 'Give this photo a vintage, retro look. Add a slight yellow tint, fade the blacks, and add subtle film grain.', loadingMessage: 'Creating vintage look...', icon: <CameraIcon /> },
  { id: 'style-transfer', name: 'Van Gogh Style', prompt: 'Transform this photo into a painting in the style of Vincent van Gogh\'s "The Starry Night".', loadingMessage: 'Applying artistic style...', icon: <PaintBrushIcon /> },
];

export const EditorPanel: React.FC<EditorPanelProps> = ({ onPresetSelect, onCustomSubmit, isLoading, hasImage }) => {
  const [customPrompt, setCustomPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCustomSubmit(customPrompt);
  };

  const panelDisabled = isLoading || !hasImage;

  return (
    <div className={`bg-gray-800 p-6 rounded-lg shadow-2xl transition-opacity duration-300 ${panelDisabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-cyan-400 mb-4 border-b-2 border-gray-700 pb-2">1-Click Tools</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {presets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => onPresetSelect(preset)}
                disabled={panelDisabled}
                className="flex flex-col items-center justify-center space-y-2 p-3 bg-gray-700 rounded-lg hover:bg-cyan-500 hover:text-white transition-all duration-200 disabled:bg-gray-700 disabled:cursor-not-allowed disabled:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                {preset.icon}
                <span className="text-xs font-medium text-center">{preset.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-cyan-400 mb-4 border-b-2 border-gray-700 pb-2">Creative Edit</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-gray-400">Describe the change you want to make. For example, "add a reflection in the water" or "change the car's color to red".</p>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="A futuristic city skyline at sunset..."
              rows={4}
              disabled={panelDisabled}
              className="w-full p-3 bg-gray-900 border-2 border-gray-700 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 transition disabled:cursor-not-allowed disabled:text-gray-500"
            />
            <button
              type="submit"
              disabled={panelDisabled}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed disabled:scale-100"
            >
              <SparklesIcon />
              Generate Edit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
