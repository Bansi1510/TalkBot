import React, { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";

interface UploadImageCardProps {
  isSelected: boolean;
  onSelect: (image: string) => void;
}

const UploadImageCard: React.FC<UploadImageCardProps> = ({
  isSelected,
  onSelect,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
    onSelect(imageUrl);
  };

  return (
    <>
      <div
        onClick={() => inputRef.current?.click()}
        className={`group
          w-32 h-40 sm:w-36 sm:h-48 md:w-40 md:h-52
          rounded-2xl p-0.5 cursor-pointer transition-all duration-300
          ${isSelected
            ? "bg-blue-500 shadow-[0_0_35px_rgba(59,130,246,0.8)] scale-105"
            : "bg-linear-to-br from-blue-900 to-black hover:scale-105"
          }`}
      >
        <div className="w-full h-full rounded-2xl bg-black flex items-center justify-center overflow-hidden">
          {preview ? (
            <img src={preview} className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center text-gray-400">
              <UploadCloud className="w-7 h-7 mb-2" />
              <span className="text-sm">Upload Image</span>
            </div>
          )}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleChange}
      />
    </>
  );
};

export default UploadImageCard;
