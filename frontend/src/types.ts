import type { ReactNode } from "react";

export interface User {
  _id: string;
  name: string;
  email: string;
  assistantName: string,
  assistantImage: string,
  history: string[]
}
export interface UserProviderProps {
  children: ReactNode;
}
export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  loading: boolean
  selectedImage: string | null,
  setSelectedImage: (selectedImage: string | null) => void
  assistantName: string | null;
  setAssistantName: (assistantName: string | null) => void
  uploadedFile: File | null;
  setUploadedFile: (uploadedFile: File | null) => void
  askToAssistant: (command: string) => GeminiResponse;
}

export interface GeminiResponse {
  success: boolean
  type: string
  userInput: string
  ans: string
}

export interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

export interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onstart: (() => void) | null;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: Event) => void;
  onend: () => void;
}

export interface SpeechRecognitionConstructor {
  new(): SpeechRecognition;
}
export interface SpeechSynthesisConstructor {
  new(): SpeechSynthesis;
}
declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
    SpeechSynthesis?: SpeechSynthesisConstructor
  }
}