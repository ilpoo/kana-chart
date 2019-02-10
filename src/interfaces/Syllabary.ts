export interface Syllable {
  romanji?: string;
  hiragana?: string;
  katakana?: string;
  pronunciation?: string;
  similarHiragana?: string[];
  similarKatakana?: string[];
  frequency?: number;
  strokes?: number[];
  base?: string[];
  title?: boolean;
  digraph?: boolean;
  diacritic?: boolean;
  transcription?: boolean;
  foreign?: boolean;
  noTranscription?: boolean;
  exception?: boolean;
  hideIfRomanji?: boolean;
  hideIfDigraph?: boolean;
}

export interface ExtendedSyllable extends Syllable {
  highlightRomanji?: boolean;
  highlightHiragana?: boolean;
  highlightKatakana?: boolean;
  highlightCurrent?: boolean;
}

export default interface Syllabary extends Array<Syllable[]> {}

export interface ExtendedSyllabary extends Array<ExtendedSyllable[]> {}
