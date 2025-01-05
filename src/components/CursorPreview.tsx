import React from 'react';

interface CursorPreviewProps {
  imageUrl?: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const CursorPreview: React.FC<CursorPreviewProps> = ({
  imageUrl,
  label,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-lg transition-all ${
        isActive 
          ? 'bg-purple-100 border-2 border-purple-400' 
          : 'bg-pink-50 hover:bg-purple-50 border-2 border-transparent'
      }`}
    >
      <div className="aspect-square bg-white rounded-lg mb-2 flex items-center justify-center">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={label}
            className="w-8 h-8 object-contain"
          />
        ) : (
          <div className="w-8 h-8 flex items-center justify-center text-gray-400">
            ↖️
          </div>
        )}
      </div>
      <p className="text-sm text-purple-700 font-medium">{label}</p>
    </button>
  );
};