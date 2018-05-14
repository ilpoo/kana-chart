import * as React from "react";
import * as ReactDOM from 'react-dom';
import syllabary from "../syllabary";
// import classNames from "classNames/dedupe.js";
import classNames from "../classNames";
import styled from "styled-components";

import { ExtendedSyllabary, Syllable, ExtendedSyllable } from "../interfaces/Syllabary";
import Options from "../interfaces/Options";

const Container = styled.table`
  border-collapse: collapse;
  margin: 0 auto;
  min-height: 100%;
  width: 100%;
  table-layout: fixed;
  transform-origin: top;
  font-size: 22px;

  & td{
    padding: .05em;
    text-align: center;
    position: static;
    overflow: hidden;
    background-clip: padding-box;
    border: 1px solid black;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    position: relative;

    & > span {
      display: table;
      margin: 0 auto;

      & > div {
        display: block;
      }
    }

    &.bold{
      font-weight: bold;
    }

    &.highlightRomanji{
      background-color: hsl(120,73%,90%) !important;
    }

    &.highlightCurrent{
      background-color: hsl(120,73%,80%) !important;
      -webkit-user-select: auto;
      -moz-user-select: auto;
      -ms-user-select: auto;
      user-select: auto;
    }

    &.highlightHiragana .hiragana, &.highlightKatakana .katakana{
      font-weight: bold;
      color: red;
    }

    &.highlightExceptions .romanji{
      font-weight: bold;
    }

    & .romanji, & .pronunciation{
      font-size: 75%;
    }

    &.hide{
      display: none;
    }

    & .svgStrokes{
      background-size: 26.2em;
      height: 2em;
      width: 2em;
      color: transparent !important;
      margin: 0 auto;
    }

    & .svgStrokes.hiragana{
      background-image: url(./media/hiragana.min.svg);
    }

    & .svgStrokes.katakana{
      background-image: url(./media/katakana.min.svg);
    }

    &.foreign{
      color: #888;
    }
  }

  &.handwritten{
    & .hiragana, & .katakana{
      font-family: Kyoukasho, Arial;
      font-weight: bold;
      letter-spacing: -.4em;
      transform: translateX(-.2em);
    }
    & .romanji, & .pronunciation{
      font-size: 50%;
    }
  }

  @media (max-width: 799px){
    & tr:first-of-type td{
      border-top: none;
    }

    & tr:last-of-type td{
      border-bottom: none;
    }

    & tr td:first-of-type{
      border-left: none;
    }

    & tr td:last-of-type{
      border-right: none;
    }
  }

  @media (min-width: 800px){
    &{
      margin: 0 10px;
      width: calc(100% - 10px);
      min-height: calc(100% - 4px);
      max-width: 700px;
    }
  }
`;

export interface TableProps {
  kyoukashoLoaded: boolean;
  options: Options;
}

export default class Table extends React.Component<TableProps, {}> {
  static originalFontSize = 22;
  state: {
    consonants: ExtendedSyllabary,
    transpose: boolean,
  } = {
      consonants: syllabary,
      transpose: this.isLandscape(),
    };
  lastOptions = '';
  lastkyoukashoLoaded = false;
  lastTranspose = this.state.transpose;
  table = React.createRef<HTMLElement>();

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    this.calculateFontSize();
  }

  componentDidUpdate() {
    this.calculateFontSize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  calculateFontSize(forceUpdate = false) {
    const { kyoukashoLoaded, options } = this.props;
    const { transpose } = this.state;
    const newOptions = JSON.stringify(options);

    if (
      (newOptions !== this.lastOptions) ||
      (kyoukashoLoaded !== this.lastkyoukashoLoaded) ||
      (transpose !== this.lastTranspose) ||
      forceUpdate
    ) {

      this.lastOptions = newOptions;
      this.lastkyoukashoLoaded = kyoukashoLoaded;
      this.lastTranspose = transpose;

      const table: HTMLElement = this.table.current!;
      table.style.fontSize = `${Table.originalFontSize}px`;
      const rows = table.getElementsByTagName('tr');
      const cell = transpose
        ? (!options.transcription && options.digraphs)
          ? rows[rows.length - 1].getElementsByTagName('td')[2]
          : (!options.transcription && !options.digraphs && !options.transcription)
            ? rows[1].getElementsByTagName('td')[1]
            : rows[2].getElementsByTagName('td')[0]
        : (options.digraphs)
          ? rows[2].getElementsByTagName('td')[6]
          : rows[1].getElementsByTagName('td')[1];

      requestAnimationFrame(() => {
        const cellSize = cell.getBoundingClientRect();
        const contentSize = cell.firstElementChild!.getBoundingClientRect();
        // console.log(cellSize, contentSize);
        const proportion = Math.min(
          (cellSize.height / contentSize.height),
          (cellSize.width / (contentSize.width * 1.3))
        );
        const fontSize = ~~Math.max(
          Table.originalFontSize,
          Table.originalFontSize * proportion * .9
        );

        table.style.fontSize = `${fontSize}px`;
      });
    }
  }

  handleResize() {
    const transpose = this.isLandscape();
    if (transpose !== this.state.transpose) {
      this.setState({
        transpose,
      });
    } else {
      this.calculateFontSize(true);
    }
  }

  transposeArray(array: any[]) {
    const newArray = [...Array(array[0].length)].map(() => [...Array(array.length)]);
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[0].length; j++) {
        newArray[j][array.length - 1 - i] = array[i][j];
      }
    }
    return newArray;
  }

  isLandscape() {
    return window.innerWidth < 800 && window.innerWidth > window.innerHeight;
  }

  hoverOn(hoveredSyllable: ExtendedSyllable) {
    this.setState({
      consonants: this.state.consonants.map(consonant =>
        consonant.map(syllable => {
          syllable.highlightRomanji = (
            syllable.hasOwnProperty("romanji") &&
            hoveredSyllable.hasOwnProperty("base") &&
            !!~hoveredSyllable.base!.indexOf(syllable.romanji!)
          );
          syllable.highlightHiragana = (
            syllable.hasOwnProperty("romanji") &&
            hoveredSyllable.hasOwnProperty("similarHiragana") &&
            !!~hoveredSyllable.similarHiragana!.indexOf(syllable.romanji!)
          );
          syllable.highlightKatakana = (
            syllable.hasOwnProperty("romanji") &&
            hoveredSyllable.hasOwnProperty("similarKatakana") &&
            !!~hoveredSyllable.similarKatakana!.indexOf(syllable.romanji!)
          );
          syllable.highlightCurrent = (
            !!syllable.romanji
            && !syllable.title
            && syllable.romanji === hoveredSyllable.romanji
          );
          return syllable;
        })
      ),
    });
  }

  renderTd(syllable: ExtendedSyllable, consonantIndex: number, syllableIndex: number) {
    const { options } = this.props;
    const svgStrokes = (
      options.strokes &&
      !!syllable.strokes
    );
    const kanaStyles = svgStrokes ? {
      backgroundPosition: `${syllable.strokes![0] * 2}em ${syllable.strokes![1] * 2}em`,
    } : {};
    return (
      <td
        key={`key_${consonantIndex}_${syllableIndex}`}
        onMouseEnter={this.hoverOn.bind(this, syllable)}
        className={classNames({
          highlightRomanji: syllable.highlightRomanji,
          highlightHiragana: (options.similar && syllable.highlightHiragana),
          highlightKatakana: (options.similar && syllable.highlightKatakana),
          highlightCurrent: syllable.highlightCurrent,
          highlightExceptions: (options.exceptions && syllable.exception),
          foreign: syllable.foreign
        })}
        style={{
          backgroundColor: `hsl(195,53%,${(options.frequency ? ((1 - (syllable.frequency || 0)) * 100) : 100)}%)`,
        }}
      >
        <span>
          {options.hiragana &&
            <div
              className={classNames("hiragana", { svgStrokes })}
              style={kanaStyles}
            >
              {syllable.foreign && !syllable.hiragana ? 'ー' : syllable.hiragana}
            </div>
          }
          {options.katakana &&
            <div
              className={classNames("katakana", { svgStrokes })}
              style={kanaStyles}
            >
              {syllable.katakana}
            </div>
          }
          { (options.romanji || syllable.title) &&
            <div className="romanji">
              {syllable.romanji}
            </div>
          }
          {(options.pronunciation) &&
            <div className="pronunciation">
              {syllable.pronunciation}
            </div>
          }
        </span>
      </td>
    );
  }

  render() {
    const { options } = this.props;
    const { consonants, transpose } = this.state;

    const filteredConsonants = consonants.filter(consonant => !(
      (options.transcription && consonant[0].noTranscription) ||
      (!options.transcription && consonant[0].transcription) ||
      (!options.diacritics && consonant[0].diacritic) ||
      (options.digraphs && consonant[0].hideIfDigraph) ||
      (options.romanji && consonant[0].hideIfRomanji)
    ));
    filteredConsonants.forEach((consonant, i) => {
      filteredConsonants[i] = consonant.filter(syllable =>
        !(!options.digraphs && syllable.digraph)
      );
    });
    const transposedConsonants = transpose ?
      this.transposeArray(filteredConsonants) :
      filteredConsonants;
    const width = transposedConsonants[0].length;

    const colgroup = transpose ? (
      options.romanji ? (
        <colgroup>
          <col
            span={width - 1}
            style={{
              width: `${100 / width}%`
            }}
          />
        </colgroup>
      ) : (
          <colgroup>
            <col
              span={width - 1}
              style={{
                width: `${200 / (width * 2 - 1)}%`
              }}
            />
            <col
              span={1}
              style={{
                width: `${100 / (width * 2 - 1)}%`
              }}
            />
          </colgroup>
        )
    ) : (
        <colgroup>
          <col
            span={6}
            style={{
              width: options.digraphs
                ? options.transcription
                  ? "calc(100% / 9)"
                  : "9.5%"
                : ""
            }}
          />
          {options.digraphs &&
            <col
              span={3}
              style={{
                width: options.transcription ?
                  "calc(100% / 9)"
                  : "calc((100% - 6 * 9.5%) / 3)"
              }}
            />
          }
        </colgroup>
      );

    return (
      <Container
        innerRef={this.table}
        className={classNames({
          handwritten: options.handwritten,
        })}
      >
        {colgroup}
        <tbody>
          {transposedConsonants.map((consonant, consonantIndex) => (
            <tr key={consonantIndex}>
              {consonant.map((syllable: Syllable, syllableIndex) =>
                this.renderTd(syllable, consonantIndex, syllableIndex)
              )}
            </tr>
          ))}
        </tbody>
      </Container>
    );
  }
}
