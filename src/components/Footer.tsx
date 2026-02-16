import React from 'react';
import { HelpCircle } from 'lucide-react';

export const Footer = ({ onGuideClick }: { onGuideClick: () => void }) => {
  return (
    <footer className="bg-white border-t border-gray-100 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} Kuple Cover Letter Maker.
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={onGuideClick}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              How to get API Key?
            </button>
            
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
