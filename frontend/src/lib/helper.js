export const countWords = (text) => {
  // Trim the text to remove leading/trailing whitespace
  const trimmedText = text.trim();

  // If the text is empty, return 0
  if (trimmedText === "") return 0;

  // Split the text into words using a regular expression
  const wordsArray = trimmedText.split(/\s+/);

  // Return the word count
  return wordsArray.length;
};
