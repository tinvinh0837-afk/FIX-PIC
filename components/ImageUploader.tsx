import React, { useCallback, useState } from 'react';
import { UploadIcon } from './icons/Icons';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onImageUpload(file);
      } else {
        alert('Please upload a valid image file (PNG, JPG, etc.).');
      }
    }
  };

  // Fix: Corrected the event type to `React.DragEvent<HTMLLabelElement>` to match the element it's attached to.
  const handleDragEnter = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  // Fix: Corrected the event type to `React.DragEvent<HTMLLabelElement>` to match the element it's attached to.
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  // Fix: Corrected the event type to `React.DragEvent<HTMLLabelElement>` to match the element it's attached to.
  const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // Fix: Corrected the event type to `React.DragEvent<HTMLLabelElement>` to match the element it's attached to.
  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  }, [onImageUpload]);

  return (
    <div className="flex-grow flex flex-col items-center justify-center p-8 text-center bg-gray-800 rounded-lg h-full">
      <label
        htmlFor="file-upload"
        className={`w-full h-full flex flex-col items-center justify-center p-6 border-4 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ${isDragging ? 'border-cyan-400 bg-gray-700' : 'border-gray-600 hover:border-cyan-500 hover:bg-gray-700'}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4 text-gray-400">
          <UploadIcon />
          <p className="text-2xl font-bold">Drag & Drop Image Here</p>
          <p>or</p>
          <p className="px-6 py-2 bg-gray-600 rounded-md text-white font-semibold">
            Click to Browse
          </p>
          <p className="text-xs text-gray-500 mt-4">Supports: PNG, JPG, WEBP</p>
        </div>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => handleFileChange(e.target.files)}
        />
      </label>
    </div>
  );
};
