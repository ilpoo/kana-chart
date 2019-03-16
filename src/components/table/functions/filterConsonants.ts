import { ExtendedSyllabary } from "../../../interfaces/Syllabary";
import Options from "../../../interfaces/Options";

export function filterConsonants (
  consonants: ExtendedSyllabary,
  options: Options,

) {
  return consonants.filter(consonant => !(
    (options.transcription && consonant[0].noTranscription) ||
    (!options.transcription && consonant[0].transcription) ||
    (!options.diacritics && consonant[0].diacritic) ||
    (options.digraphs && consonant[0].hideIfDigraph) ||
    (options.romanji && consonant[0].hideIfRomanji)
  )) as ExtendedSyllabary;
}
