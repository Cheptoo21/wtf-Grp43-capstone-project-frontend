import { useRef, useState } from 'react';

export const useVoiceRecorder = () => {
  const recognitionRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');

  const startRecording = () => {
    console.log('startRecording called');

    return new Promise((resolve, reject) => {
      console.log('Promise created');

      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      console.log('SpeechRecognition available:', !!SpeechRecognition);

      if (!SpeechRecognition) {
        const err = new Error(
          'Speech recognition not supported. Please use Chrome or Edge.'
        );
        console.error(err.message);
        reject(err);
        return;
      }

      // Stop any existing recognition before starting a new one
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (err) {
          console.error('Error stopping recognition:', err);
        }
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.continuous = false;

      recognition.onstart = () => {
        console.log('Recognition started successfully');
        setIsRecording(true);
      };

      recognition.onresult = (event) => {
        const spokenText = event.results[0][0].transcript;
        console.log('Recognized text:', spokenText);
        setTranscript(spokenText);
        setIsRecording(false);
        resolve(spokenText);
      };

      recognition.onerror = (event) => {
        console.error('Recognition error:', event.error);
        setIsRecording(false);
        reject(new Error(`Speech error: ${event.error}`));
      };

      recognition.onend = () => {
        console.log('Recognition ended');
        setIsRecording(false);
      };

      // Delay prevents "aborted" race condition on button click
      setTimeout(() => {
        try {
          recognition.start();
          console.log('recognition.start() called');
        } catch (err) {
          console.error('Failed to call recognition.start():', err);
          reject(err);
        }
      }, 300);
    });
  };

  const stopRecording = () => {
    console.log('stopRecording called');
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  return { startRecording, stopRecording, isRecording, transcript };
};