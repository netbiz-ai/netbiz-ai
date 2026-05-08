"use client";

import { useEffect, useRef, useState } from "react";
import { Mic } from "lucide-react";

// Minimal types for the Web Speech API (not in lib.dom for all targets).
type SpeechResult = {
  isFinal: boolean;
  0: { transcript: string };
};
type SpeechResultList = {
  length: number;
  [index: number]: SpeechResult;
};
type SpeechEvent = {
  resultIndex: number;
  results: SpeechResultList;
};
type SpeechRecognitionInstance = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((e: SpeechEvent) => void) | null;
  onerror: ((e: unknown) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};
type SpeechRecognitionCtor = new () => SpeechRecognitionInstance;

type Props = {
  onTranscript: (text: string) => void;
};

export function MicButton({ onTranscript }: Props) {
  const [supported, setSupported] = useState<boolean | null>(null);
  const [recording, setRecording] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as unknown as {
      SpeechRecognition?: SpeechRecognitionCtor;
      webkitSpeechRecognition?: SpeechRecognitionCtor;
    };
    const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
    setSupported(!!Ctor);
  }, []);

  function start() {
    if (typeof window === "undefined") return;
    const w = window as unknown as {
      SpeechRecognition?: SpeechRecognitionCtor;
      webkitSpeechRecognition?: SpeechRecognitionCtor;
    };
    const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!Ctor) return;

    const rec = new Ctor();
    rec.continuous = true;
    rec.interimResults = false;
    rec.lang = "en-US";

    rec.onresult = (e: SpeechEvent) => {
      let finalText = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const result = e.results[i];
        if (result.isFinal) {
          finalText += result[0].transcript;
        }
      }
      if (finalText) onTranscript(finalText);
    };
    rec.onerror = () => {
      setRecording(false);
    };
    rec.onend = () => {
      setRecording(false);
    };

    recognitionRef.current = rec;
    rec.start();
    setRecording(true);
  }

  function stop() {
    recognitionRef.current?.stop();
    setRecording(false);
  }

  function toggle() {
    if (recording) stop();
    else start();
  }

  if (supported === false) {
    return (
      <button
        type="button"
        disabled
        title="Voice input not supported in this browser"
        className="admin-pill opacity-40 cursor-not-allowed"
      >
        <Mic className="h-3.5 w-3.5" strokeWidth={1.5} />
        <span>Mic</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="admin-pill"
      data-active={recording}
    >
      <span
        className="admin-mic-dot"
        data-recording={recording}
        aria-hidden="true"
      />
      <span>{recording ? "Recording..." : "Mic"}</span>
    </button>
  );
}
