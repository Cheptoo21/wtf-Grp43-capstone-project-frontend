export const startSpeechRecognition = (lang = "en-US") => {
  return new Promise((resolve, reject) => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      reject(
        new Error(
          "Voice recognition is not supported in this browser. Please use Chrome or Edge."
        )
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      resolve(transcript);
    };

    recognition.onerror = (e) => {
      reject(new Error(`Speech error: ${e.error}`));
    };

    // Small delay prevents "aborted" error on button click
    setTimeout(() => {
      recognition.start();
    }, 300);
  });
};