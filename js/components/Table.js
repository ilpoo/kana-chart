'use strict';
import React from "react";
import alphabet from '../alphabet.json';
import classNames from "classnames/dedupe.js";

export default class Table extends React.Component{
	static propTypes={
		options: React.PropTypes.object,
	};

	state=alphabet;

	constructor(){
		super();
		for(let prop in this.state.consonants){
			for (let i = 0; i < this.state.consonants[prop].length; i++) {
				this.state.consonants[prop][i].highlightRomanji=false;
				this.state.consonants[prop][i].highlightHiragana=false;
				this.state.consonants[prop][i].highlightKatakana=false;
				this.state.consonants[prop][i].highlightCurrent=false;
			}
		}
		this.state.originalFontSize=22;
		this.state.fontSize=this.state.originalFontSize;
		this.state.options="";
	}

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
				lastOptions:newOptions,
			});
			console.log("recalculation");
			setTimeout(()=>requestAnimationFrame(()=>{
				const elementSize=table.getBoundingClientRect(),
					containerSize=table.parentElement.getBoundingClientRect(),
					proportion=((containerSize.height-10)/elementSize.height)/1.02;
				let fontSize=this.state.fontSize*proportion;
				if(fontSize/this.state.originalFontSize<.7) fontSize=this.state.originalFontSize*.7;
				this.setState({
					fontSize:fontSize
				});
			}),0);
		}
	}

	handleResize(){
		this.calculateFontSize(document.getElementById("table"),true);
	}

	hoverOn(syllable,consonant,k){
		const consonants=JSON.parse(JSON.stringify(this.state.consonants));

		for(let prop in consonants){
			for(let i=0; i<consonants[prop].length; i++) {
				consonants[prop][i].highlightRomanji = Boolean(
					consonants[prop][i].hasOwnProperty("romanji") && 
					syllable.hasOwnProperty("base") && 
					~syllable.base.indexOf(consonants[prop][i].romanji)
				);
				consonants[prop][i].highlightHiragana = Boolean(
					consonants[prop][i].hasOwnProperty("romanji") && 
					syllable.hasOwnProperty("similarHiragana") && 
					~syllable.similarHiragana.indexOf(consonants[prop][i].romanji)
				);
				consonants[prop][i].highlightKatakana = Boolean(
					consonants[prop][i].hasOwnProperty("romanji") && 
					syllable.hasOwnProperty("similarKatakana") &&
					~syllable.similarKatakana.indexOf(consonants[prop][i].romanji)
				);
				consonants[prop][i].highlightCurrent = false;
			}
		}

		consonants[consonant][k].highlightCurrent=syllable.hasOwnProperty("hiragana");

		this.setState({consonants:consonants});
	}

	renderTd(syllable,consonant,i){
		const { options } = this.props;
		return (
			<td 
				key={"key_"+Math.random()} 
				id={syllable.romanji} 
				onMouseEnter={this.hoverOn.bind(this,syllable,consonant,i)}
				className={classNames({
					highlightRomanji:syllable.highlightRomanji,
					highlightHiragana:options.similar?syllable.highlightHiragana:false,
					highlightKatakana:options.similar?syllable.highlightKatakana:false,
					highlightCurrent:syllable.highlightCurrent,
					highlightExceptions:options.exceptions?syllable.exception:false,
					hide:(
               (options.digraphs?syllable.hideIfDigraph:syllable.digraph) 
            || (options.diacritics?false:syllable.diacritic) 
            || (options.romanji && syllable.hideIfRomanji)
          ),
				})}
				style={{
					backgroundColor: "hsl(195,53%,"+(options.frequency?((1-(syllable.frequency||0))*100):100)+"%)",
					fontSize: options.digraphs?Math.min(22,this.state.fontSize):this.state.fontSize
				}}
			>
				{ options.hiragana && <div className="hiragana" style={
					(syllable.highlightCurrent && options.strokes && !syllable.diacritic && !syllable.digraph && syllable.hiragana)?{
						backgroundImage:"url(./media/Hiragana_"+syllable.hiragana+"_stroke_order_animation.gif)",
						backgroundSize: "contain",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
						height: "2em",
						color: "transparent",
						margin: "0em auto",
					}:(options.strokes && syllable.strokes)?{
						backgroundImage:"url(./media/Table_hiragana.svg)",
						backgroundPosition: syllable.strokes[0]*2+"em "+syllable.strokes[1]*2+"em",
						backgroundSize: "26.2em",
						height:"2em",
						width:"2em",
						color: "transparent",
						margin: "0 auto",
					}:{}
				}>{syllable.hiragana}</div> }
				{ options.katakana && <div className="katakana" style={
					(options.strokes && syllable.strokes)?{
						backgroundImage:"url(./media/Table_katakana.svg)",
						backgroundPosition: syllable.strokes[0]*2+"em "+syllable.strokes[1]*2+"em",
						backgroundSize: "26.2em",
						height:"2em",
						width:"2em",
						color: "transparent",
						margin: "0 auto",
					}:{}
				}>{syllable.katakana}</div> }
				{ (options.romanji || syllable.title) && <div className="romanji">{syllable.romanji}</div> }
				{ (options.pronunciation) && <div className="pronunciation">{syllable.pronunciation}</div> }
			</td>
		);
	}

	render(){
    const { options } = this.props;
		const consonants=this.state.consonants;
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
					{Object.keys(consonants).filter(consonant=>(
              (!options.transcription && !consonants[consonant][0].transcription)
            || (options.transcription && !consonants[consonant][0].noTranscription)
          )).map(consonant=>{
            return (
              <tr key={consonant}>
                {consonants[consonant].map((syllable,i)=>this.renderTd(syllable,consonant,i))}
              </tr>
            );
					})}
				</tbody>
			</table>
		);
	}
}
