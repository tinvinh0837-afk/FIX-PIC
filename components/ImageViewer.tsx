
import React, { useState } from 'react';
import { DownloadIcon, RefreshIcon, SparklesIcon } from './icons/Icons';

interface ImageViewerProps {
  originalImageUrl: string;
  editedImage: { url: string; text: string; } | null;
  isLoading: boolean;
  loadingMessage: string;
  error: string | null;
  onClear: () => void;
}

const LoadingSpinner: React.FC = () => (
  <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-400"></div>
);

export const ImageViewer: React.FC<ImageViewerProps> = ({ originalImageUrl, editedImage, isLoading, loadingMessage, error, onClear }) => {
  const [showOriginal, setShowOriginal] = useState(false);

  const displayUrl = editedImage && !showOriginal ? editedImage.url : originalImageUrl;
  const isEditedView = editedImage && !showOriginal;

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-grow relative flex items-center justify-center bg-black bg-opacity-25 overflow-hidden">
        <img
          src={displayUrl}
          alt={isEditedView ? "Edited" : "Original"}
          className="max-h-full max-w-full object-contain"
        />
        {isLoading && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-80 flex flex-col items-center justify-center z-20 space-y-4">
            <LoadingSpinner />
            <p className="text-xl font-semibold text-cyan-300 animate-pulse">{loadingMessage}</p>
          </div>
        )}
        {error && (
            <div className="absolute bottom-4 left-4 right-4 bg-red-800 bg-opacity-90 text-white p-4 rounded-lg shadow-lg z-10">
                <p className="font-bold">Error</p>
                <p>{error}</p>
            </div>
        )}
      </div>
      <div className="flex-shrink-0 bg-gray-900 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-700">
        <div className="flex items-center gap-4">
           {editedImage && (
             <div className="flex items-center space-x-2 bg-gray-800 p-2 rounded-lg">
                <span className={`px-3 py-1 text-sm rounded-md cursor-pointer ${!showOriginal ? 'bg-cyan-500 text-white' : 'text-gray-300'}`} onClick={() => setShowOriginal(false)}>Edited</span>
                <span className={`px-3 py-1 text-sm rounded-md cursor-pointer ${showOriginal ? 'bg-cyan-500 text-white' : 'text-gray-300'}`} onClick={() => setShowOriginal(true)}>Original</span>
             </div>
           )}
           {isEditedView && editedImage.text && (
             <div className="flex items-center gap-2 text-sm text-gray-400">
                <SparklesIcon />
                <p className="hidden md:block">{editedImage.text}</p>
             </div>
           )}
        </div>
        <div className="flex items-center gap-3">
            <button onClick={onClear} className="flex items-center gap-2 text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 font-semibold py-2 px-4 rounded-lg transition-colors">
                <RefreshIcon />
                Start Over
            </button>
            {editedImage && (
                <a
                    href={editedImage.url}
                    download="edited-image.png"
                    className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-transform transform hover:scale-105"
                >
                    <DownloadIcon />
                    Download
                </a>
            )}
        </div>
      </div>
    </div>
  );
};
