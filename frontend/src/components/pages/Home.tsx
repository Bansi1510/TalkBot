import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import type {
  GeminiResponse,
  SpeechRecognition,
  SpeechRecognitionEvent,
} from "../../types";

/* ---------- Types ---------- */
type SpeechRecognitionConstructor = new () => SpeechRecognition;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

type SupportedLang = "en-US" | "hi-IN" | "gu-IN";

/* ---------- Language Detection ---------- */
const detectLanguage = (text: string): SupportedLang => {
  if (/[\u0A80-\u0AFF]/.test(text)) return "gu-IN";
  if (/[\u0900-\u097F]/.test(text)) return "hi-IN";
  return "en-US";
};

const Home: React.FC = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("Home must be used within UserContext");
  }

  const { user, setUser, askToAssistant } = context;

  const [transcript, setTranscript] = useState<string>("");
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isProcessingRef = useRef<boolean>(false);
  const isSpeakingRef = useRef<boolean>(false);

  /* ---------- Logout ---------- */
  const handleLogout = (): void => {
    recognitionRef.current?.stop();
    window.speechSynthesis.cancel();
    setUser(null);
    navigate("/login");
  };

  /* ---------- Speak ---------- */
  const speak = (text: string, lang: SupportedLang): Promise<void> => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis) return resolve();

      window.speechSynthesis.cancel();
      isSpeakingRef.current = true;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;

      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find((v) =>
        v.lang.startsWith(lang.split("-")[0])
      );
      if (voice) utterance.voice = voice;

      utterance.onend = () => {
        isSpeakingRef.current = false;
        recognitionRef.current?.start(); // restart after speaking
        resolve();
      };

      window.speechSynthesis.speak(utterance);
    });
  };

  /* ---------- Handle Commands ---------- */
  const handleCommand = (data: GeminiResponse): void => {
    const query = encodeURIComponent(data.userInput);

    const urls: Record<string, string> = {
      youtube_open: "https://www.youtube.com",
      youtube_search: `https://www.youtube.com/results?search_query=${query}`,
      youtube_play: `https://www.youtube.com/results?search_query=${query}`,
      google_search: `https://www.google.com/search?q=${query}`,
      calculator_open: "https://www.google.com/search?q=calculator",
      instagram_open: "https://www.instagram.com",
      facebook_open: "https://www.facebook.com",
      weather_show: "https://www.google.com/search?q=weather",
    };

    const url = urls[data.type];
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  /* ---------- Process Speech ---------- */
  const processSpeech = async (text: string): Promise<void> => {
    const assistantName = user?.assistantName?.toLowerCase() || "";

    if (
      isProcessingRef.current ||
      isSpeakingRef.current ||
      !text.toLowerCase().includes(assistantName)
    )
      return;

    try {
      isProcessingRef.current = true;
      recognitionRef.current?.stop();

      const cleanText = text
        .replace(new RegExp(assistantName, "gi"), "")
        .trim();

      setTranscript(cleanText);

      const response = await askToAssistant(cleanText);
      const lang = detectLanguage(response.ans);

      await speak(response.ans, lang);
      handleCommand(response);

      // Add to history
      if (user) {
        const updatedUser = {
          ...user,
          history: [...(user.history || []), response.ans], // only string
        };
        setUser(updatedUser);
      }
    } catch (error) {
      console.error("Processing error:", error);
    } finally {
      isProcessingRef.current = false;
    }
  };

  /* ---------- Speech Init (ONLY ONCE) ---------- */
  useEffect(() => {
    const Rec =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!Rec) return;

    const recognition = new Rec();
    recognition.lang = "en-US";
    recognition.continuous = true; // VERY IMPORTANT
    recognition.interimResults = false; // more stable on mobile
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          processSpeech(event.results[i][0].transcript);
        }
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech error:", event);
    };

    recognition.onend = () => {
      // Mobile auto-stop fix
      if (!isSpeakingRef.current && hasStarted) {
        recognition.start();
      }
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      window.speechSynthesis.cancel();
    };
  }, [hasStarted]);

  const initSpeech = (): void => {
    if (!recognitionRef.current) {
      alert("Speech Recognition not supported");
      return;
    }

    recognitionRef.current.start();
    setHasStarted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-black text-white relative">
      {/* Top Buttons */}
      <div className="flex justify-end gap-3 px-4 pt-4">
        <button
          onClick={() => setShowHistory(true)}
          className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
        >
          History
        </button>
        <button
          onClick={() => navigate("/customize")}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
        >
          Customize
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg border border-red-500/40 text-red-400 hover:bg-red-500/10 transition"
        >
          Logout
        </button>
      </div>

      {/* Main Assistant Area */}
      <div className="flex flex-col items-center mt-10 px-4 text-center">
        {!hasStarted ? (
          <>
            <h2 className="text-2xl mb-6">
              Ready to talk to {user?.assistantName}?
            </h2>
            <button
              onClick={initSpeech}
              className="px-8 py-4 bg-blue-500 rounded-full font-bold shadow-lg hover:scale-105 transition"
            >
              ENABLE VOICE ASSISTANT
            </button>
          </>
        ) : (
          <>
            <div className="w-64 h-96 rounded-2xl overflow-hidden border border-blue-600 shadow-xl mb-6">
              <img
                src={user?.assistantImage}
                className="w-full h-full object-cover"
                alt="assistant"
              />
            </div>

            <h1 className="text-3xl font-bold">
              {user?.assistantName}
            </h1>

            <p className="mt-4 italic text-gray-300">
              {transcript || `Say "${user?.assistantName}..."`}
            </p>
          </>
        )}
      </div>

      {/* ---------- History Modal ---------- */}
      {showHistory && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-96 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">History</h2>

            {user?.history?.length ? (
              <ul className="space-y-2">
                {user.history.map((entry, index) => (
                  <li
                    key={index}
                    className="border-b border-gray-700 pb-2 text-gray-300"
                  >
                    {entry}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No history yet.</p>
            )}

            <button
              onClick={() => setShowHistory(false)}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;
