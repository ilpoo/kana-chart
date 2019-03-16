import React, { memo } from "react";
import Options from "../../../../interfaces/Options";
import ColgroupTransposedWithRomanji from "./components/ColgroupTransposedWithRomanji";
import ColgroupTransposedWithoutRomanji from "./components/ColgroupTransposedWithoutRomanji";
import ColgroupUpright from "./components/ColgroupUpright";

export default memo(function Colgroup (
  {
    columnCount,
    transpose,
    options,
  }: {
    columnCount: number,
    transpose: boolean,
    options: Options,
  },
) {
  return transpose
    ? options.romanji
      ? <ColgroupTransposedWithRomanji columnCount = { columnCount } />
      : <ColgroupTransposedWithoutRomanji columnCount = { columnCount } />
    : <ColgroupUpright options = { options } />;
});
