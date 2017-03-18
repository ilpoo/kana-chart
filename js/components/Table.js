'use strict';
import React from "react";
import alphabet from "../alphabet.json";
import classNames from "classnames/dedupe.js";

export default class Table extends React.Component{
  static originalFontSize = 22;
  state = {
    consonants: alphabet,
    transpose: this.isLandscape(),
  };
  lastOptions = '';
  lastkyoukashoLoaded = '';
  lastTranspose = '';

  componentDidMount(){
    window.addEventListener('resize', this.handleResize.bind(this));
    this.calculateFontSize();
  }

  componentDidUpdate(){
    this.calculateFontSize();
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.handleResize);
  }

  calculateFontSize(forceUpdate){
    const { kyoukashoLoaded, options } = this.props;
    const { transpose } = this.state;
    const newOptions = JSON.stringify(options);

    if(
      (newOptions !== this.lastOptions) || 
      (kyoukashoLoaded !== this.lastkyoukashoLoaded) || 
      (transpose !== this.lastTranspose) ||
      forceUpdate
    ){

      this.lastOptions = newOptions;
      this.lastkyoukashoLoaded = kyoukashoLoaded;
      this.lastTranspose = transpose;

      const table = this.refs.table;
      table.style.fontSize = `${Table.originalFontSize}px`;
      const rows = table.getElementsByTagName('tr');
      const cell = transpose ? 
        (!options.transcription && options.digraphs) ?
          rows[rows.length-1].getElementsByTagName('td')[2]:
          (!options.transcription && !options.digraphs && !options.transcription) ?
            rows[1].getElementsByTagName('td')[1]:
            rows[2].getElementsByTagName('td')[0]:
        (options.digraphs) ?
          rows[2].getElementsByTagName('td')[6]:
          rows[1].getElementsByTagName('td')[1];

      requestAnimationFrame(()=>{
        const cellSize = cell.getBoundingClientRect();
        const contentSize = cell.firstChild.getBoundingClientRect();
        const proportion = Math.min(
          (cellSize.height / contentSize.height), 
          (cellSize.width / (contentSize.width*1.3))
        );
        const fontSize = ~~Math.max(
          Table.originalFontSize, 
          Table.originalFontSize * proportion * .9
        );

        table.style.fontSize = `${fontSize}px`;
      });
    }
  }

  handleResize(){
    const transpose = this.isLandscape();
    if(transpose !== this.state.transpose){
      this.setState({
        transpose,
      });
    }else{
      this.calculateFontSize(true);
    }
  }

  transposeArray(array){
    const newArray = [...Array(array[0].length)].map(i=>[...Array(array.length)]);
    for(let i=0; i < array.length; i++) {
      for (let j = 0; j < array[0].length; j++) {
        newArray[j][array.length-1-i] = array[i][j];
      }
    }
    return newArray;
  }

  isLandscape(){
    return window.innerWidth < 800 && window.innerWidth > window.innerHeight;
  }

  hoverOn(hoveredSyllable){
    this.setState({
      consonants: this.state.consonants.map(consonant=>
        consonant.map(syllable=>{
          syllable.highlightRomanji=(
            syllable.hasOwnProperty("romanji") && 
            hoveredSyllable.hasOwnProperty("base") && 
            ~hoveredSyllable.base.indexOf(syllable.romanji)
          );
          syllable.highlightHiragana=(
            syllable.hasOwnProperty("romanji") && 
            hoveredSyllable.hasOwnProperty("similarHiragana") && 
            ~hoveredSyllable.similarHiragana.indexOf(syllable.romanji)
          );
          syllable.highlightKatakana=(
            syllable.hasOwnProperty("romanji") && 
            hoveredSyllable.hasOwnProperty("similarKatakana") &&
            ~hoveredSyllable.similarKatakana.indexOf(syllable.romanji)
          );
          syllable.highlightCurrent = (
            syllable.romanji 
            && !syllable.title
            && syllable.romanji === hoveredSyllable.romanji
          );
          return syllable;
        })
      ),
    });
  }

  renderTd(syllable, consonantIndex, syllableIndex){
    const { options } = this.props;
    const svgStrokes = (
      options.strokes && 
      syllable.strokes
    );
    const kanaStyles = svgStrokes?{
      backgroundPosition: `${syllable.strokes[0]*2}em ${syllable.strokes[1]*2}em`,
    }:{};
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
          backgroundColor: `hsl(195,53%,${(options.frequency?((1-(syllable.frequency||0))*100):100)}%)`,
        }}
      >
        <span>
        { options.hiragana && 
          <div 
            className = { classNames("hiragana", {svgStrokes}) }
            style = { kanaStyles }
          >{syllable.foreign&&!syllable.hiragana?'ー':syllable.hiragana}</div> 
        }
        { options.katakana && 
          <div 
            className = { classNames("katakana", {svgStrokes}) } 
            style = { kanaStyles }
          >{syllable.katakana}</div> 
        }
        { (options.romanji || syllable.title) && <div className="romanji">{syllable.romanji}</div> }
        { (options.pronunciation) && <div className="pronunciation">{syllable.pronunciation}</div> }
        </span>
      </td>
    );
  }

  render(){
    const { options } = this.props;
    const { consonants, transpose } = this.state;

    const filteredConsonants = consonants.filter(consonant=>!(
      ( options.transcription && consonant[0].noTranscription) ||
      (!options.transcription && consonant[0].transcription) ||
      (!options.diacritics && consonant[0].diacritic) ||
      ( options.digraphs && consonant[0].hideIfDigraph) ||
      ( options.romanji && consonant[0].hideIfRomanji)
    ));
    filteredConsonants.forEach((consonant, i)=>{
      filteredConsonants[i] = consonant.filter(syllable=>
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
          <col span={width-1} style={{
            width: `${100/width}%`
          }}/>
        </colgroup>
      ) : (
        <colgroup>
          <col span={width-1} style={{
            width: `${200/(width*2-1)}%`
          }}/>
          <col span="1" style={{
            width: `${100/(width*2-1)}%`
          }}/>
        </colgroup>
      )
    ) : (
      <colgroup>
        <col span="6" style={{
          width: options.digraphs ?
              options.transcription ? 
                "calc(100% / 9)"
                : "9.5%"
            :""
        }}/>
        {options.digraphs && <col span="3" style={{
          width: options.transcription ? 
            "calc(100% / 9)"
            : "calc((100% - 6 * 9.5%) / 3)"
        }}/>}
      </colgroup>
    );

    return (
      <table 
        ref="table"
        className={classNames({
          handwritten: options.handwritten,
        })}
      >
        { colgroup }
        <tbody>
          { transposedConsonants.map((consonant,consonantIndex)=>(
            <tr key={consonantIndex}>
              {consonant.map((syllable, syllableIndex)=>
                this.renderTd(syllable, consonantIndex, syllableIndex)
              )}
            </tr>
          )) }
        </tbody>
      </table>
    );
  }
}
