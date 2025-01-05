import React, { useState } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { CursorPreview } from './components/CursorPreview';
import './App.css';

const App = () => {
  const [cursors, setCursors] = useState<string[]>([]);
  const [activeCursor, setActiveCursor] = useState<string>('default');

  const handleImageUpload = (imageUrl: string) => {
    setCursors([...cursors, imageUrl]);
  };

  const handleCursorSelect = (cursorUrl: string) => {
    setActiveCursor(cursorUrl);
    // Set cursor for the entire document
    document.documentElement.style.cursor = cursorUrl === 'default' 
      ? 'default'
      : `url(${cursorUrl}) ${getCursorOffset(cursorUrl)}, auto`;
  };

  // Function to determine cursor offset based on image dimensions
  const getCursorOffset = (imageUrl: string): string => {
    const img = new Image();
    img.src = imageUrl;
    // Default to center if image dimensions cannot be determined
    return `${img.width ? img.width/2 : 16} ${img.height ? img.height/2 : 16}`;
  };

  return (
    <div className="min-h-screen bg-pink-50 p-8 cursor-area">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-pink-600 mb-8 text-center">
          Custom Cursor Creator
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <ImageUploader onImageUpload={handleImageUpload} />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-purple-600 mb-4">
            Your Cursors
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <CursorPreview
              label="Default"
              isActive={activeCursor === 'default'}
              onClick={() => handleCursorSelect('default')}
            />
            {cursors.map((cursor, index) => (
              <CursorPreview
                key={index}
                imageUrl={cursor}
                label={`Cursor ${index + 1}`}
                isActive={activeCursor === cursor}
                onClick={() => handleCursorSelect(cursor)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;