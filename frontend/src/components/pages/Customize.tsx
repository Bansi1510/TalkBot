import React, { useContext } from "react";
import { images } from "../Customize/images";
import Card from "../Customize/Card"
import UploadImageCard from "../Customize/UploadImageCard";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const Customize: React.FC = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("Customize must be used within UserContext");
  }

  const { selectedImage, setSelectedImage } = context;
  return (
    <div className="min-h-screen w-full bg-linear-to-br from-black via-blue-950 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-black/60 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-900 p-8">

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white">
            Customize Your Assistant
          </h1>
          <p className="text-gray-400 mt-2">
            Choose an assistant image to continue
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 place-items-center">
          {images.map((img) => (
            <Card
              key={img.id}
              img={img}
              isSelected={selectedImage === img.src}
              onSelect={() => setSelectedImage(img.src)}
            />

          ))}

          <UploadImageCard
            isSelected={!!selectedImage && selectedImage.startsWith("blob:")}
            onSelect={setSelectedImage}
          />
        </div>
        {selectedImage && (
          <button
            disabled={!selectedImage}
            className={`mt-10 mx-auto block px-10 py-3 rounded-xl text-lg font-semibold tracking-wide transition-all duration-300
            ${selectedImage
                ? "text-white bg-linear-to-r from-blue-600 via-blue-500 to-indigo-600 hover:shadow-[0_15px_40px_rgba(59,130,246,0.55)]"
                : "text-gray-500 bg-gray-800 cursor-not-allowed"
              }`}
            onClick={() => navigate("/ass-name")}
          >
            NEXT →
          </button>
        )}


      </div>
    </div>
  );
};

export default Customize;


