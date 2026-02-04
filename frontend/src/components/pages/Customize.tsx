import React from "react";
import { images } from "../Customize/images";
import Card from "../Customize/Card"

const Customize: React.FC = () => {
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
            <Card key={img.id} img={img} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Customize;
