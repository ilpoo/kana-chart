'use strict';
import React from "react";
import alphabet from "../alphabet.json";
import classNames from "classnames/dedupe.js";

export default class Table extends React.Component{
  static originalFontSize = 22;
  state = {
    consonants: alphabet,
    fontSize: Table.originalFontSize,
  };
  lastOptions = '';
  lastKyoukaSupport = '';

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
    const { kyoukaSupport, options } = this.props;
    const newOptions = JSON.stringify(options);
    if((newOptions !== this.lastOptions) || (kyoukaSupport !== this.lastKyoukaSupport) || forceUpdate){
      this.lastOptions = newOptions;
      this.lastKyoukaSupport = kyoukaSupport;
      setTimeout(()=>requestAnimationFrame(()=>{
        const elementSize = this.refs.table.getBoundingClientRect(),
          containerSize = this.refs.table.parentElement.getBoundingClientRect(),
          containerPadding = parseFloat(getComputedStyle(this.refs.table.parentElement).getPropertyValue('padding-top')) || 0,
          rows = this.refs.table.getElementsByTagName('tr').length-1,
          proportion = (containerSize.height-containerPadding*2-rows)/(elementSize.height-rows);
        let fontSize = this.state.fontSize*proportion;
        fontSize = Math.max(Table.originalFontSize*.9, fontSize);
        let verticalSpace;
        if(options.handwritten){
          if(options.digraphs) verticalSpace = 15;
          else if(options.transcription) verticalSpace = 9;
          else verticalSpace = 6;
        }else{
          if(options.digraphs) verticalSpace = 18;
          else if(options.transcription) verticalSpace = 12;
          else verticalSpace = 7.5;
        }
        fontSize = Math.min(elementSize.width/verticalSpace, fontSize);
        this.setState({fontSize});
      }),0);
    }
  }

  handleResize(){
    this.calculateFontSize(true);
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

  renderTd(syllable,consonantIndex,syllableIndex){
    const { options } = this.props;
    const { fontSize } = this.state;
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
          fontSize,
        }}
      >
        { options.hiragana && 
          <div 
            className = { classNames("hiragana", {svgStrokes}) }
            style = { kanaStyles }
          >{syllable.foreign?'ー':syllable.hiragana}</div> 
        }
        { options.katakana && 
          <div 
            className = { classNames("katakana", {svgStrokes}) } 
            style = { kanaStyles }
          >{syllable.katakana}</div> 
        }
        { (options.romanji || syllable.title) && <div className="romanji">{syllable.romanji}</div> }
        { (options.pronunciation) && <div className="pronunciation">{syllable.pronunciation}</div> }
      </td>
    );
  }

  render(){
    const { options } = this.props;
    const { consonants } = this.state;
    return (
      <table 
        ref="table"
        className={classNames({
          handwritten: options.handwritten,
        })}
      >
        <colgroup>
          <col span="6" style={{
            width: options.digraphs ?
                options.transcription ? 
                  "calc(100% / 9)"
                  : "9.5%"
              :"calc(100% / 6)"
          }}/>
          <col span="3" style={{
            width: options.digraphs?
                options.transcription ? 
                "calc(100% / 9)"
                : "calc((100% - 6 * 9.5%) / 3)"
              :0
          }}/>
        </colgroup>
        <tbody>
          {consonants.filter(consonant=>!(
            ( options.transcription && consonant[0].noTranscription) ||
            (!options.transcription && consonant[0].transcription) ||
            (!options.diacritics && consonant[0].diacritic) ||
            ( options.digraphs && consonant[0].hideIfDigraph) ||
            ( options.romanji && consonant[0].hideIfRomanji)
          )).map((consonant,consonantIndex)=>(
            <tr key={consonantIndex}>
              {consonant.filter(syllable=>
                !(!options.digraphs && syllable.digraph)
              ).map((syllable, syllableIndex)=>
                this.renderTd(syllable, consonantIndex, syllableIndex)
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
