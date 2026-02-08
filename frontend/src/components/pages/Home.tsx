import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import type {
  GeminiResponse,
  SpeechRecognition,
  SpeechRecognitionEvent,
} from "../../types";

/* ---------- Browser Speech Types ---------- */

type SpeechRecognitionConstructor = new () => SpeechRecognition;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

/* ---------- Component ---------- */

const Home: React.FC = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("Home must be used within UserContext");
  }

  const { user, setUser, askToAssistant } = context;

  const [transcript, setTranscript] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isProcessingRef = useRef<boolean>(false);

  /* ---------- Logout ---------- */

  const handleLogout = (): void => {
    recognitionRef.current?.stop();
    window.speechSynthesis.cancel();
    setUser(null);
    navigate("/login");
  };

  /* ---------- Speak ---------- */

  const speak = (text: string): Promise<void> => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis) return resolve();

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 1;
      utterance.pitch = 1;

      utterance.onend = () => resolve();

      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 150);
    });
  };

  /* ---------- Handle Commands ---------- */

  const handleCommand = (data: GeminiResponse): void => {
    const query = encodeURIComponent(data.userInput);
    let url = "";

    switch (data.type) {
      case "youtube_open":
        url = "https://www.youtube.com";
        break;

      case "youtube_search":
      case "youtube_play":
        url = `https://www.youtube.com/results?search_query=${query}`;
        break;

      case "calculator_open":
        url = "https://www.google.com/search?q=calculator";
        break;

      case "instagram_open":
        url = "https://www.instagram.com/";
        break;

      case "facebook_open":
        url = "https://www.facebook.com/";
        break;

      case "weather_show":
        url = "https://www.google.com/search?q=weather";
        break;

      default:
        return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  };

  /* ---------- Speech Recognition ---------- */

  useEffect(() => {
    const RecognitionConstructor =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!RecognitionConstructor) {
      console.error("Speech Recognition not supported");
      return;
    }

    const recognition = new RecognitionConstructor();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = async (event: SpeechRecognitionEvent) => {
      let finalText = "";
      let interimText = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const speechResult = event.results[i];
        const text = speechResult[0].transcript;

        if (speechResult.isFinal) {
          finalText += text;
        } else {
          interimText += text;
        }
      }

      setTranscript(finalText || interimText);

      if (!finalText || isProcessingRef.current) return;

      const assistantName = user?.assistantName?.toLowerCase();
      if (!assistantName) return;

      if (!finalText.toLowerCase().includes(assistantName)) return;

      try {
        isProcessingRef.current = true;

        recognition.stop();

        const response: GeminiResponse = await askToAssistant(finalText);

        await speak(response.ans);
        handleCommand(response);
      } catch (error) {
        console.error("Assistant error:", error);
      } finally {
        isProcessingRef.current = false;
        recognition.start();
      }
    };

    recognitionRef.current = recognition;
    recognition.start();

    return () => recognition.stop();
  }, [askToAssistant, user?.assistantName]);

  /* ---------- UI ---------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-black">
      {/* Top Bar */}
      <div className="flex justify-end gap-3 px-4 pt-4">
        <button
          onClick={() => navigate("/customize")}
          className="px-4 py-2 rounded-lg text-white bg-blue-600/80 hover:bg-blue-600"
        >
          Customize
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg text-red-400 border border-red-500/40 hover:bg-red-500/10"
        >
          Logout
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center text-center px-4">
        {/* Assistant Image */}
        <div className="mt-10 mb-8">
          <div className="w-64 h-96 rounded-2xl overflow-hidden border border-blue-700/60 shadow-[0_0_60px_rgba(59,130,246,0.6)]">
            <img
              src={user?.assistantImage}
              alt="Assistant"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white">
          {user?.assistantName}
        </h1>

        <div className="flex items-center gap-2 my-4">
          <span
            className={`w-2 h-2 rounded-full ${isListening ? "bg-green-500 animate-ping" : "bg-gray-500"
              }`}
          />
          <p className="text-blue-300 text-xs uppercase">
            {isListening ? "Listening" : "Mic Off"}
          </p>
        </div>

        <div className="w-full max-w-lg p-6 bg-white/5 border border-white/10 rounded-2xl">
          <p className="text-gray-300 min-h-[1.5em]">
            {transcript || "Say something…"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
