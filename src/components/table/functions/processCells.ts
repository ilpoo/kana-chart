import { ExtendedSyllabary, ExtendedSyllable } from "../../../interfaces/Syllabary";
import Options from "../../../interfaces/Options";
import { filterConsonants } from "./filterConsonants";
import { transposeIfNecessary } from "./transposeIfNecessary";

export function processCells (
  options: Options,
  consonants: ExtendedSyllabary,
  transpose: boolean,
) {
  function filterSyllables (
    consonant: ExtendedSyllable[],
  ) {
    return consonant.filter(syllable =>
      !(!options.digraphs && syllable.digraph)
    );
  }

  const filteredConsonants = filterConsonants(
    consonants,
    options,
  ).map(filterSyllables);

  const correctlyTransposedSyllables = transposeIfNecessary(
    filteredConsonants,
    transpose,
  );

  return correctlyTransposedSyllables;
}
