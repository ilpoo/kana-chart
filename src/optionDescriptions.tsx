import React from "react";
import OptionDescriptions from "./interfaces/OptionDescriptions";

const optionDescriptions: OptionDescriptions = [
  {
    name: "hiragana",
    label: "Hiragana ひらがな",
    title: "Shows the hiragana"
  }, {
    name: "katakana",
    label: "Katakana カタカナ",
    title: "Shows the katakana"
  }, {
    name: "romanji",
    label: <>
      Romanji ローマ<ruby>字<rt>じ</rt></ruby>
    </>,
    title: "Shows how the symbol can be written on a QWERTY keyboard"
  }, {
    name: "pronunciation",
    label: <>
      IPA Pronunciation <ruby>国際音声記号<rt>こくさいおんせいきごう</rt></ruby>
    </>,
    title: "Displays an international phonetic pronunciation guide",
    separate: true
  }, {
    name: "diacritics",
    label: <>
      Diacritics <ruby>濁点<rt>だくてん</rt></ruby>
    </>,
    title: "Show syllables that have diacritics"
  }, {
    name: "digraphs",
    label: <>
      Digraphs <ruby>拗音<rt>ようおん</rt></ruby>
    </>,
    title: "Show syllables that are composed of two symbols"
  }, {
    name: "transcription",
    label: <>
      Transcription <ruby>外国語<rt>がいこくご</rt></ruby>の<ruby>日本語<rt>にほんご</rt></ruby><ruby>表記<rt>ひょうき</rt></ruby>
    </>,
    title: "Show foreign transcription kanas",
    separate: true
  }, {
    name: "strokes",
    label: <>
      <ruby>筆順<rt>ひつじゅん</rt></ruby>を<ruby>表示<rt>ひょうじ</rt></ruby><br />
      Show stroke order
    </>,
    title: "Not available for diacritics or digraphs."
  }, {
    name: "exceptions",
    label: <>
      ローマ<ruby>字<rt>じ</rt></ruby>の<ruby>例外<rt>れいがい</rt></ruby>をハイライト<br />
      Highlight romanji exceptions
    </>,
    title: "Bolds the syllables that don't follow the regular romanjination pattern"
  }, {
    name: "similar",
    label: <>
      <ruby>視覚的<rt>しかくてき</rt></ruby>に<ruby>似<rt>に</rt></ruby>ているをハイライト<br />
      Highlight visually similar
    </>,
    title: "When hovering on a syllable, other similar ones will be highlighted in red to avoid mixing them up"
  }, {
    name: "frequency",
    label: <>
      <ruby>各音節<rt>かくおんせつ</rt></ruby>がどれほど<ruby>一般的<rt>いっぱんてき</rt></ruby>かを<ruby>示<rt></rt></ruby>す<br />
      Visualize syllable commonness
    </>,
    title: "The more common a sound in Japanese is, the darker it'll appear on the chart"
  }, {
    name: "handwritten",
    label: <>
      <ruby>手書<rt>てが</rt></ruby>きの<ruby>書体<rt>しょたい</rt></ruby><br />
      Handwritten typeface
    </>,
    title: "Use a font that mimics handwriting"
  }
];

Object.freeze(optionDescriptions);

export default optionDescriptions;
