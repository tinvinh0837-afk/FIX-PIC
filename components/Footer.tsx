
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 mt-auto">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} AI Photo Editor Pro. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
