import React, { useState } from "react";

const InputName: React.FC = () => {

  const [name, setName] = useState("");
  const [showName, setShowName] = useState(false);

  const handleClick = () => {
    if (!name.trim()) return;
    setShowName(true);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-black via-blue-950 to-black px-4">
      <div className="w-full max-w-md bg-black/60 backdrop-blur-md border border-blue-900 rounded-2xl p-8 shadow-2xl text-center">

        <h2 className="text-2xl font-bold text-white mb-6">
          Enter Your Assistant Name
        </h2>

        <input
          type="text"
          placeholder="eg. Bansi"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setShowName(false);
          }}
          className="
            w-full rounded-xl bg-black border border-gray-700
            px-4 py-3 text-white placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500
            transition-all
          "
        />

        {/* Button shows only when name exists */}
        {name.trim() && (
          <button
            onClick={handleClick}
            className="
              mt-6 w-full py-3 rounded-xl font-semibold text-white
              bg-linear-to-r from-blue-600 via-blue-500 to-indigo-600
              hover:shadow-[0_15px_40px_rgba(59,130,246,0.55)]
              transition-all duration-300
            "
          >
            Continue →
          </button>
        )}

        {/* Show assistant name after button click */}
        {showName && (
          <p className="mt-6 text-lg text-blue-400 font-medium">
            Your assistant name is{" "}
            <span className="text-white font-bold">{name}</span>
          </p>
        )}

      </div>
    </div>
  );
};

export default InputName;
