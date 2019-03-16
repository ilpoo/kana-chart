import {
  ExtendedSyllabary,
  ExtendedSyllable,
} from "../../../interfaces/Syllabary";

export function updateHoverStateOfCells (
  hoveredSyllable: ExtendedSyllable,
  consonants: ExtendedSyllabary,
) {
  return consonants.map(consonant =>
    consonant.map(syllable => {
      syllable.highlightRomanji = (
        !!syllable.romanji &&
        hoveredSyllable.base &&
        hoveredSyllable.base.includes(syllable.romanji)
      );
      syllable.highlightHiragana = (
        !!syllable.romanji &&
        hoveredSyllable.similarHiragana &&
        hoveredSyllable.similarHiragana.includes(syllable.romanji)
      );
      syllable.highlightKatakana = (
        !!syllable.romanji &&
        hoveredSyllable.similarKatakana &&
        hoveredSyllable.similarKatakana.includes(syllable.romanji)
      );
      syllable.highlightCurrent = (
        !!syllable.romanji
        && !syllable.title
        && syllable.romanji === hoveredSyllable.romanji
      );

      return syllable;
    })
  );
}
