import { useRef, useState } from 'react';

export const useVoiceRecorder = () => {
  const recognitionRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');

  const startRecording = () => {
    console.log('Starting voice recording...');
    return new Promise((resolve, reject) => {
        console.log('Requesting microphone access...');
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        reject(new Error('Speech recognition not supported in this browser. Use Chrome or Edge.'));
        return;
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const spokenText = event.results[0][0].transcript;
        setTranscript(spokenText);
        console.log('Recognized text:', spokenText);
        setIsRecording(false);
        resolve(spokenText);
      };

      recognition.onerror = (event) => {
        setIsRecording(false);
        reject(new Error(`Speech error: ${event.error}`));
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
      setIsRecording(true);
    });
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  return { startRecording, stopRecording, isRecording, transcript };
};