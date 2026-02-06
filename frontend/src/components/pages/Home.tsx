import React, { useContext, useEffect } from "react";
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
  useEffect(() => {
    const SpeechRecognition =
      (window as Window).SpeechRecognition || (window as Window).webkitSpeechRecognition;

  }, []);

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-black via-blue-950 to-black">

      {/* Top Bar */}
      <div className="w-full flex justify-end px-4 pt-4">
        <div className="flex gap-3">
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
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center text-center px-4">

        {/* Assistant Image */}
        <div className="mt-10 mb-8">
          <div
            className="
              w-40 h-60
              sm:w-48 sm:h-72
              md:w-56 md:h-80
              lg:w-64 lg:h-96
              rounded-2xl overflow-hidden
              border border-blue-700/60
              bg-black
              shadow-[0_0_60px_rgba(59,130,246,0.6)]
            "
          >
            <img
              src={user?.assistantImage}
              alt="Assistant"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Assistant Name */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
          {user?.assistantName}
        </h1>

        {/* Subtitle */}
        <p className="text-blue-300 text-sm md:text-base mb-5">
          Your personal AI assistant is ready to help you.
        </p>

        {/* Description */}
        <div className="max-w-md md:max-w-xl text-gray-300 text-sm md:text-base leading-relaxed">
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
