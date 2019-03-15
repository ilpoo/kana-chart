import Options from "./interfaces/Options";

const defaultOptions: Options = Object.freeze({
  "hiragana": true,
  "romanji": true,
  "katakana": false,
  "pronunciation": false,
  "diacritics": false,
  "digraphs": false,
  "strokes": false,
  "exceptions": true,
  "similar": true,
  "frequency": true,
  "transcription": false,
  "handwritten": true
});

// Object.freeze(defaultOptions);

export default defaultOptions;
