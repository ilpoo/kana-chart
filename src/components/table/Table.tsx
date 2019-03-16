import React, {
  useState,
  useEffect,
  useRef,
  memo,
  useCallback,
  useMemo,
} from "react";
import syllabary from "../../syllabary";
import {
  ExtendedSyllabary,
  Syllable,
  ExtendedSyllable,
} from "../../interfaces/Syllabary";
import Options from "../../interfaces/Options";
import { isLandscape } from "../../helpers/isLandscape";
import Colgroup from "./components/colgroup/Colgroup";
import Td from "./components/Td";
import { StyledTable } from "./components/StyledTable";
import { updateHoverStateOfCells } from "./functions/updateHoverStateOfCells";
import { processCells } from "./functions/processCells";
import { updateFontSize } from "./functions/updateFontSize";

export const originalFontSize = 22;
let lastFrame = -1;

export default memo(function Table (
  {
    options,
    kyoukashoLoaded,
  }: {
    options: Options;
    kyoukashoLoaded: boolean;
  }
) {
  console.log("Table updated");
  const T = performance.now();
  const [consonants, setConsonants] = useState(syllabary as ExtendedSyllabary);
  const [transpose, setTranspose] = useState(isLandscape());

  const table = useRef<HTMLTableElement>(null);

  const t_resize = performance.now();
  useEffect(
    () => {
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      }
    },
    [],
  );
  console.log(`T resize: ${performance.now() - t_resize}`);

  useEffect(
    () => {
      if (table.current) {
        const t_updateFontSize = performance.now();
        updateFontSize(
          options,
          kyoukashoLoaded,
          transpose,
          table.current,
        );
        console.log(`T updateFontSize: ${performance.now() - t_updateFontSize}`);
      }
    },
    [
      options,
      kyoukashoLoaded,
      transpose,
      table,
    ],
  );

  const handleResize = useCallback(
    () => {
      const t_handleResize = performance.now();
      const newTranspose = isLandscape();
      if (newTranspose !== transpose) {
        setTranspose(newTranspose);
      } else if (table.current) {
        updateFontSize(
          options,
          kyoukashoLoaded,
          transpose,
          table.current,
          true,
        );
      }
      console.log(`T handleResize: ${performance.now() - t_handleResize}`);
    },
    [
      options,
      kyoukashoLoaded,
      transpose,
      table,
      setTranspose,
    ],
  );

  const hoverOn = useCallback(
    (
      hoveredSyllable: ExtendedSyllable,
    ) => {
      const t_hoverOn = performance.now();
      cancelAnimationFrame(lastFrame);
      lastFrame = requestAnimationFrame(() => {
        const t_updateHoverStates = performance.now();
        const updatedHoverStateOfCells = updateHoverStateOfCells(
          hoveredSyllable,
          consonants,
        );
        console.log(`T updateHoverStates: ${performance.now() - t_updateHoverStates}`);
        setConsonants(updatedHoverStateOfCells);
      });
      console.log(`T hoverOn: ${performance.now() - t_hoverOn}`);
    },
    [
      consonants,
      setConsonants,
    ],
  );

  const transposedConsonants = useMemo(
    () => {
      const t_transpose = performance.now();
      const result = processCells(
        options,
        consonants,
        transpose,
      );
      console.log(`T transspose: ${performance.now() - t_transpose}`);
      return result;
    },
    [
      options,
      consonants,
      transpose,
    ],
  );
  const columnCount = transposedConsonants[0].length;

  console.log("T total: ", performance.now() - T);

  return (
    <StyledTable
      ref = { table }
    >
      {
        <Colgroup
          columnCount = { columnCount }
          transpose = { transpose }
          options = { options }
        />
      }
      <tbody>
        { transposedConsonants.map((consonant, consonantIndex) => (
          <tr
            key = { consonantIndex }
          >
            { consonant.map((syllable: Syllable, syllableIndex) => (
              <Td
                key = { `key_${consonantIndex}_${syllableIndex}` }
                syllable = { syllable }
                options = { options }
                hoverOn = { hoverOn }
              />
            )) }
          </tr>
        )) }
      </tbody>
    </StyledTable>
  );
});
