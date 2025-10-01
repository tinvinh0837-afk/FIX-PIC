
import React, { useState, useCallback } from 'react';
import { ApiKeyInput } from './components/ApiKeyInput';
import { ImageUploader } from './components/ImageUploader';
import { EditorPanel } from './components/EditorPanel';
import { ImageViewer } from './components/ImageViewer';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { editImageWithPrompt } from './services/geminiService';
import { EditPreset } from './types';

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<{ url: string; text: string; } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    setOriginalImage(file);
    setOriginalImageUrl(URL.createObjectURL(file));
    setEditedImage(null);
    setError(null);
  };

  const handleEdit = useCallback(async (prompt: string, message: string) => {
    if (!originalImage) {
      setError("Please upload an image first.");
      return;
    }
    if (!apiKey) {
      setError("API Key is not set. Please provide a valid API key.");
      return;
    }

    setIsLoading(true);
    setLoadingMessage(message);
    setError(null);
    setEditedImage(null);

    try {
      const result = await editImageWithPrompt(originalImage, prompt, apiKey);
      if (result.image) {
        setEditedImage({ url: result.image, text: result.text || 'Edit applied successfully.' });
      } else {
        setError(result.text || "Failed to edit image. The model might not have returned an image.");
      }
    } catch (err: any) {
      // Catch specific API key errors to give better feedback
      if (err.message.includes('API key not valid')) {
        setError("Your API key is not valid. Please enter a valid key to continue.");
        setApiKey(null); // Reset API key to show the input screen again
      } else {
        setError(`An error occurred: ${err.message}`);
      }
      console.error(err);
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [originalImage, apiKey]);

  const handlePresetEdit = (preset: EditPreset) => {
    handleEdit(preset.prompt, preset.loadingMessage);
  };

  const handleCustomEdit = (customPrompt: string) => {
    if (!customPrompt.trim()) {
      setError("Please enter a description of the edit you want to make.");
      return;
    }
    handleEdit(customPrompt, "Applying your custom edit...");
  };

  const resetState = () => {
    setOriginalImage(null);
    setOriginalImageUrl(null);
    setEditedImage(null);
    setError(null);
    setIsLoading(false);
  };

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key);
    setError(null);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3 flex-shrink-0">
          <EditorPanel
            onPresetSelect={handlePresetEdit}
            onCustomSubmit={handleCustomEdit}
            isLoading={isLoading}
            hasImage={!!originalImage}
          />
        </div>
        <div className="w-full lg:flex-1 flex flex-col bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
          {!apiKey ? (
             <ApiKeyInput onApiKeySubmit={handleApiKeySubmit} error={error} />
          ) : originalImageUrl ? (
            <ImageViewer
              originalImageUrl={originalImageUrl}
              editedImage={editedImage}
              isLoading={isLoading}
              loadingMessage={loadingMessage}
              error={error}
              onClear={resetState}
            />
          ) : (
            <ImageUploader onImageUpload={handleImageUpload} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
