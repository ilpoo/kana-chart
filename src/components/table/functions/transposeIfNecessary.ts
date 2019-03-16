import { ExtendedSyllabary } from "../../../interfaces/Syllabary";
import { transposeArray } from "../../../helpers/transposeArray";

export function transposeIfNecessary (
  filteredConsonants: ExtendedSyllabary,
  transpose: boolean,
) {
  return transpose
    ? transposeArray(filteredConsonants)
    : filteredConsonants;
}
