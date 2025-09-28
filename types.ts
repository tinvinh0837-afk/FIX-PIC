
import React from 'react';

export interface EditPreset {
  id: string;
  name: string;
  prompt: string;
  loadingMessage: string;
  icon: React.ReactNode;
}
