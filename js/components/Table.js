'use strict';
import React from "react";
import alphabet from '../alphabet.json';
import classNames from "classnames/dedupe.js";

export default class Table extends React.Component{
  static originalFontSize=22;
  state={
    consonants: alphabet,
    fontSize: Table.originalFontSize,
  };

	componentDidMount(){
		window.addEventListener('resize',this.handleResize.bind(this));
		this.calculateFontSize(this.refs.table);
	}

	componentDidUpdate(){
		this.calculateFontSize(this.refs.table);
	}

	componentWillUnmount(){
		window.removeEventListener('resize',this.handleResize);
	}

	calculateFontSize(table,forceUpdate){
		const newOptions=JSON.stringify(this.props.options);
		if((newOptions!=this.state.lastOptions) || forceUpdate){
			this.setState({
        lastOptions: newOptions,
			});
			setTimeout(()=>requestAnimationFrame(()=>{
				const elementSize=table.getBoundingClientRect(),
					containerSize=table.parentElement.getBoundingClientRect(),
					proportion=((containerSize.height-10)/elementSize.height)/1.02;
				let fontSize=this.state.fontSize*proportion;
				if(fontSize/Table.originalFontSize<.7) fontSize=Table.originalFontSize*.7;
        this.setState({fontSize});
			}),0);
		}
	}

	handleResize(){
		this.calculateFontSize(document.getElementById("table"),true);
	}

	hoverOn(hoveredSyllable,consonantIndex,syllableIndex){
		this.setState({
      consonants: this.state.consonants.map((consonant,i)=>
        consonant.map((syllable,j)=>{
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
          syllable.highlightCurrent = (consonantIndex==i && syllableIndex==j);
          return syllable;
        })
      ),
    });
	}

	renderTd(syllable,consonantIndex,syllableIndex){
		const { options } = this.props;
    const { fontSize } = this.state;
    const showSvgStrokes=(
      options.strokes && 
      syllable.strokes
    );
		return (
			<td 
        key={`key_${consonantIndex}_${syllableIndex}`} 
				id={syllable.romanji} 
        onMouseEnter={this.hoverOn.bind(this, syllable, consonantIndex, syllableIndex)}
				className={classNames({
          highlightRomanji: syllable.highlightRomanji,
          highlightHiragana: (options.similar && syllable.highlightHiragana),
          highlightKatakana: (options.similar && syllable.highlightKatakana),
          highlightCurrent: syllable.highlightCurrent,
          highlightExceptions: (options.exceptions && syllable.exception),
          hide: (!options.digraphs && syllable.digraph),
				})}
				style={{
					backgroundColor: "hsl(195,53%,"+(options.frequency?((1-(syllable.frequency||0))*100):100)+"%)",
          fontSize: options.digraphs?Math.min(22,fontSize):fontSize,
				}}
			>
				{ options.hiragana && 
          <div 
            className={classNames(
              "hiragana",
              {svgStrokes: showSvgStrokes},
            )}
            style={
              showSvgStrokes?{
                backgroundPosition: syllable.strokes[0]*2+"em "+syllable.strokes[1]*2+"em",
              }:{}
            }
          >{syllable.hiragana}</div> 
        }
        { options.katakana && 
          <div 
            className={classNames(
              "katakana",
              {svgStrokes: showSvgStrokes},
            )} 
            style={
              showSvgStrokes?{
                backgroundPosition: syllable.strokes[0]*2+"em "+syllable.strokes[1]*2+"em",
              }:{}
            }
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
			<table id="table" ref="table">
				<colgroup>
					<col span="6" style={{
						width: this.props.options.digraphs?"9.5%":"calc(100% / 6)"
					}}/>
					<col span="3" style={{
						width: this.props.options.digraphs?"calc((100% - 6 * 9.5%) / 3)":0
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
              {
                consonant.map((syllable, syllableIndex)=>
                this.renderTd(syllable, consonantIndex, syllableIndex))
              }
            </tr>
          ))}
				</tbody>
			</table>
		);
	}
}
