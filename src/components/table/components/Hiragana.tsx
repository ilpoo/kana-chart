import React from "react";
import { ExtendedSyllable } from "../../../interfaces/Syllabary";
import Options from "../../../interfaces/Options";
import { Kana } from "./Kana";

export default function Hiragana (
  {
    options,
    syllable,
    svgStrokes,
    svgPosition,
  }: {
    options: Options,
    syllable: ExtendedSyllable,
    svgStrokes: boolean,
    svgPosition: string,
  },
) {
  return (
    <Kana
      highlight = { options.similar && syllable.highlightHiragana }
      svgStrokes = { svgStrokes }
      backgroundPosition = { svgPosition }
      handwritten = { options.handwritten }
      type = "hiragana"
    >
      { syllable.foreign && !syllable.hiragana ? 'ー' : syllable.hiragana }
    </Kana>
  );
}
