# Kana Chart

A single page web app built using React. It's an interactive syllabary chart to help you start to learn writing and reading Japanese. The app can visualize how common each sound is and helps you distinguish between similar kanas. You may also choose which things you want the app to display so you don't get overwhelmed by information you don't need.

The app is live at [okku.site/japanese/](https://okku.site/japanese/).

```diff
- The current implementation of the Service Worker is buggy and should not be taken inspiration from. I'll work on it some time in the future.
```

## Features

* hiragana
* katakana
* romanji
* IPA pronunciation
* katakana transcription from other languages
* stroke order
* help distinguishing between similar kana
* scale the chart to fit screen
* can be installed as a web app

## Settings

### Hiragana

* Show or hide hiragana (ひらがな)

### Katakana

* Show or hide katakana (カタカナ)

### Romanji

* Show or hide the spelling of the syllable using the Roman (Latin) alphabet (ローマ字). This is how the kana is written on Microsoft IME(except in the case of some foreign transcription).

### IPA Pronunciation

* Show or hide the International Pronunciation Alphabet guide for each syllable to help you read them out.

### Diacritics

* Show or hide kana that use diacritics (Jap. dakuten 濁点 and handakuten 半濁点). These are voiced syllables.

### Digraphs

* Show or hide kana where two scripts form a mora. These are called yōon (拗音), meaning diphtong.

### Transcription

* Show or hide katakana that are use used to transcribe foreign words into Japanese. These are used for loan words and foreign names.

### Show stroke order

* Shows how to draw each kana. Only available for syllables that aren't digraphs and don't use diacritics: those are drawn in the same order as the scripts they're derived from.

### Highlight romanji exceptions

* Bolds kana where the romanization doesn't follow the pattern.

### Highlight visually similar

* When hovering (or tapping on mobile) on a syllable, the app will highlight other kana that it's easily confused with.

### Visualize syllable frequency

* The more common the kana is in Japanese, the darker it'll appear on the chart. Data from [San Diego University's article](http://gawron.sdsu.edu/crypto/lectures/hiragana.html).
