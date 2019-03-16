import React, { memo, useCallback } from "react";
import { ExtendedSyllable } from "../../../interfaces/Syllabary";
import Options from "../../../interfaces/Options";
import { CellWrapper } from "./CellWrapper";
import { StyledTd } from "./StyledTd";
import Hiragana from "./Hiragana";
import Romanji from "./Romanji";
import Katakana from "./Katakana";
import Pronunciation from "./Pronunciation";

export default function Td (
  {
    syllable,
    options,
    hoverOn,
  }: {
    syllable: ExtendedSyllable,
    options: Options,
    hoverOn: (hoveredSyllable: ExtendedSyllable) => void,
  }
) {
  const svgStrokes = (
    options.strokes
    && !!syllable.strokes
  );
  const svgPosition = svgStrokes
    ? `${syllable.strokes![0] * 2}em ${syllable.strokes![1] * 2}em`
    : `0 0`;

  const onMouseEnter = useCallback(
    () => hoverOn(syllable),
    [
      hoverOn,
      syllable,
    ],
  );

  return (
    <StyledTd
      onMouseEnter = { onMouseEnter }
      foreign = { !!syllable.foreign }
      highlight = { !!syllable.highlightCurrent }
      highlightDim = { !!syllable.highlightRomanji }
      style = {{
        backgroundColor: `hsl(195,53%,${(options.frequency ? ((1 - (syllable.frequency || 0)) * 100) : 100)}%)`
      }}
    >
      <CellWrapper>
        { options.hiragana &&
          <Hiragana
            options = { options }
            syllable = { syllable }
            svgStrokes = { svgStrokes }
            svgPosition = { svgPosition }
          />
        }
        { options.katakana &&
          <Katakana
            options = { options }
            syllable = { syllable }
            svgStrokes = { svgStrokes }
            svgPosition = { svgPosition }
          />
        }
        { (options.romanji || syllable.title) &&
          <Romanji
            options = { options }
            syllable = { syllable }
          />
        }
        { options.pronunciation &&
          <Pronunciation
            options = { options }
            syllable = { syllable }
          />
        }
      </CellWrapper>
    </StyledTd>
  );
};
