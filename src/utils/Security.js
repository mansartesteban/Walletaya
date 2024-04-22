export const generateRandomChallenge = () => {
  let length = 32;
  let randomValues = new Uint8Array(length);
  window.crypto.getRandomValues(randomValues);
  return randomValues;
};
