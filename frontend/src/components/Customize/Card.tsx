import React from "react";
import type { AppImage } from "./images";


interface ImageCardProps {
  img: AppImage;
  onClick?: () => void;
}

const Card: React.FC<ImageCardProps> = ({ img, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group w-32 h-32 sm:w-36 sm:h-36 rounded-xl
                 bg-linear-to-br from-blue-900 to-black p-0.5
                 cursor-pointer hover:scale-105 transition-all duration-300"
    >
      <div className="w-full h-full rounded-xl bg-black flex items-center justify-center overflow-hidden">
        <img
          src={img.src}
          alt={img.alt}
          className="w-full h-full object-cover group-hover:opacity-90 transition"
        />
      </div>
    </div>
  );
};

export default Card;
