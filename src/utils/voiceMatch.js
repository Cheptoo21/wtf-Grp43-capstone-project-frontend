export const PASSPHRASE = "my voice is my secure key for voxledger";
export const MATCH_THRESHOLD = 0.85;

export const calculateMatchScore = (spoken, stored) => {
  const spokenWords = spoken.toLowerCase().trim().split(" ");
  const storedWords = stored.toLowerCase().trim().split(" ");

  const matchingWords = spokenWords.filter((word) =>
    storedWords.includes(word)
  ).length;

  return matchingWords / storedWords.length;
};