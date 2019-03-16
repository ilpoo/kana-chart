import React, { memo } from "react";

export default memo(function ColgroupTransposedWithRomanji (
  props: {
    columnCount: number,
  },
) {
  return (
    <colgroup>
      <col
        span = {props.columnCount - 1}
        style = {{
          width: `${100 / props.columnCount}%`,
        }}
      />
    </colgroup>
  );
});
