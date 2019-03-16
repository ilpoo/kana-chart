import React, { memo } from "react";
import { ExtendedSyllable } from "../../../interfaces/Syllabary";
import Options from "../../../interfaces/Options";
import { Text } from "./Text";

export default memo(function Romanji (
  {
    options,
    syllable,
  }: {
    options: Options,
    syllable: ExtendedSyllable,
  },
) {
  return (
    <Text
      highlight = { options.exceptions && syllable.exception }
      handwritten = { options.handwritten }
    >
      {syllable.romanji}
    </Text>
  );
});
