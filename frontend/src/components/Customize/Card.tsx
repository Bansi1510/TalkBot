import React from "react";
import type { AppImage } from "./images";

interface ImageCardProps {
  img: AppImage;
  isSelected: boolean;
  onSelect: () => void;
}

const Card: React.FC<ImageCardProps> = ({ img, isSelected, onSelect }) => {

  return (
    <div
      onClick={onSelect}
      className={`group
        w-32 h-40 sm:w-36 sm:h-48 md:w-40 md:h-52
        rounded-2xl p-0.5 cursor-pointer transition-all duration-300
        ${isSelected
          ? "bg-blue-500 shadow-[0_0_35px_rgba(59,130,246,0.8)] scale-105"
          : "bg-linear-to-br from-blue-900 to-black hover:scale-105"
        }`}
    >
      <div className="w-full h-full rounded-2xl bg-black overflow-hidden">
        <img
          src={img.src}
          alt={img.alt}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Card;
