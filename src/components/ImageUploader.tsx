import React, { useCallback } from 'react';

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          // Create an image to check dimensions
          const img = new Image();
          img.onload = () => {
            // Create a canvas to resize the image if needed
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;
            
            // Resize if the image is too large
            if (width > 32 || height > 32) {
              const ratio = Math.min(32 / width, 32 / height);
              width *= ratio;
              height *= ratio;
            }
            
            canvas.width = width;
            canvas.height = height;
            
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              const resizedImageUrl = canvas.toDataURL('image/png');
              onImageUpload(resizedImageUrl);
            }
          };
          img.src = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  return (
    <div className="text-center">
      <label className="block">
        <span className="text-lg text-purple-600 mb-2 block">Upload a new cursor image</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="block w-full text-sm text-purple-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-purple-50 file:text-purple-700
            hover:file:bg-purple-100
            cursor-pointer"
        />
      </label>
      <p className="mt-2 text-sm text-gray-500">
        Recommended: Small PNG images (32x32 pixels) with transparent backgrounds
      </p>
    </div>
  );
};