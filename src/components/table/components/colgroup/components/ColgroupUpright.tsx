import React, { memo } from "react";
import Options from "../../../../../interfaces/Options";

export default memo(function ColgroupUpright (
  {
    options,
  }: {
    options: Options,
  }
) {

  return (
    <colgroup>
      <col
        span = {6}
        style = {{
          width: options.digraphs
            ? options.transcription
              ? "calc(100% / 9)"
              : "9.5%"
            : ""
        }}
      />
      {options.digraphs &&
        <col
          span = {3}
          style = {{
            width: options.transcription ?
              "calc(100% / 9)"
              : "calc((100% - 6 * 9.5%) / 3)"
          }}
        />
      }
    </colgroup>
  );
});
