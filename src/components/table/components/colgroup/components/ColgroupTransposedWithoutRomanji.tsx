import React, { memo } from "react";

export default memo(function ColgroupTransposedWithoutRomanji(
  {
    columnCount,
  }: {
    columnCount: number,
  }
) {
  return (
    <colgroup>
      <col
        span = {columnCount - 1}
        style = {{
          width: `${200 / (columnCount * 2 - 1)}%`,
        }}
      />
      <col
        span = {1}
        style = {{
          width: `${100 / (columnCount * 2 - 1)}%`,
        }}
      />
    </colgroup>
  );
})
