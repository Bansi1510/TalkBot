import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("Home must be used within UserContext");
  }

  const { user, setUser } = context;

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen w-full bg-linear-to-br from-black via-blue-950 to-black px-4">

      {/* Top Right Actions */}
      <div className="absolute top-6 right-6 flex gap-3">
        <button
          onClick={() => navigate("/customize")}
          className="
            px-4 py-2 rounded-lg text-sm font-medium text-white
            bg-blue-600/80 hover:bg-blue-600
            transition-all
          "
        >
          Customize
        </button>

        <button
          onClick={handleLogout}
          className="
            px-4 py-2 rounded-lg text-sm font-medium
            text-red-400 border border-red-500/40
            hover:bg-red-500/10
            transition-all
          "
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="min-h-screen flex flex-col items-center justify-center text-center">

        <div className="mb-10">
          <div
            className="
      w-56 h-80 md:w-64 md:h-96
      rounded-2xl overflow-hidden
      border border-blue-700/60
      bg-black
      shadow-[0_0_70px_rgba(59,130,246,0.65)]
    "
          >
            <img
              src={user?.assistantImage}
              alt="Assistant"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        {/* Assistant Name */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          {user?.assistantName}
        </h1>

        {/* Subtitle */}
        <p className="text-blue-300 text-sm md:text-base mb-6">
          Your personal AI assistant is ready to help you.
        </p>

        {/* Description */}
        <div className="max-w-xl text-gray-300 text-sm md:text-base leading-relaxed">
          <p>
            Chat with your assistant, ask questions, generate ideas,
            summarize documents, and get smart responses instantly.
          </p>
          <p className="mt-2">
            You can customize your assistant’s name and appearance anytime
            to match your style.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
