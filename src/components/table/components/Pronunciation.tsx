import React, { memo } from "react";
import { ExtendedSyllable } from "../../../interfaces/Syllabary";
import Options from "../../../interfaces/Options";
import { Text } from "./Text";

export default memo(function Pronunciation (
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
      handwritten = {options.handwritten}
    >
      {syllable.pronunciation}
    </Text>
  );
});
