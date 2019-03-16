import styled from "@emotion/styled";

export const Text = styled("div")<{
  handwritten: boolean,
  highlight?: boolean,
}>`
  display: block;

  ${props => props.handwritten ? `
    font-size: 50%;
  ` : `
    font-size: 75%;
  `}

  ${props => props.highlight && `
    font-weight: bold;
  `}
`;
