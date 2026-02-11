import React, { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { updateAssistantAPI } from "../../../APIs/user.api";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const InputName: React.FC = () => {
  const [name, setName] = useState("");
  const context = useContext(UserContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("InputName must be used within UserContext");
  }

  const {
    setAssistantName,
    selectedImage,
    uploadedFile,
    setUser,
    user
  } = context;

  const handleContinue = async () => {
    if (!name || !selectedImage) return;
    console.log(user)
    setAssistantName(name);

    const formData = new FormData();
    formData.append("assistantName", name);

    if (uploadedFile) {
      formData.append("assistantImage", uploadedFile);
    } else {
      formData.append("imageUrl", selectedImage);
    }
    const data = await updateAssistantAPI(formData);

    if (!data) return;
    setAssistantName(data.assistantName);
    setUser(data)
    navigate("/")
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-linear-to-br from-black via-blue-950 to-black px-4">

      {/* Back Icon */}
      <button
        onClick={() => navigate("/customize")}
        className="
          absolute top-6 left-6
          p-2 rounded-full
          text-white bg-black/50
          hover:bg-blue-600/30
          hover:scale-110
          transition-all duration-300
        "
        aria-label="Go back"
      >
        <FiArrowLeft size={22} />
      </button>

      <div className="w-full max-w-md bg-black/60 backdrop-blur-md border border-blue-900 rounded-2xl p-8 shadow-2xl text-center">
        <h2 className="text-2xl font-bold text-white mb-6">
          Enter Your Assistant Name
        </h2>

        <input
          type="text"
          placeholder="eg. Bansi"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="
            w-full rounded-xl bg-black border border-gray-700
            px-4 py-3 text-white placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500
            transition-all
          "
        />

        {name.trim() && (
          <button
            onClick={handleContinue}
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
      </div>
    </div>
  );
};

export default InputName;
