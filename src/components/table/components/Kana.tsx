import styled from "@emotion/styled";

export const Kana = styled("div")<{
  highlight?: boolean,
  svgStrokes?: boolean,
  backgroundPosition?: string,
  handwritten?: boolean,
  type: "hiragana" | "katakana",
}>`
  display: block;
  ${props => props.highlight && `
    font-weight: bold;
    color: red;
  `}
  ${(props) => props.svgStrokes && `
    background-size: 26.2em;
    height: 2em;
    width: 2em;
    color: transparent !important;
    margin: 0 auto;
    background-position: ${props.backgroundPosition};
    background-image: url(./media/${props.type}.min.svg);
  `}
  ${(props) => props.handwritten && `
    font-family: Kyoukasho, Arial;
    font-weight: bold;
    letter-spacing: -.4em;
    transform: translateX(-.2em);
  `}
`;
