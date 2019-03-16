import styled from "@emotion/styled";

export const StyledTd = styled("td")<{
  highlight?: boolean,
  highlightDim?: boolean,
  foreign?: boolean,
}>`
  padding: .05em;
  text-align: center;
  position: static;
  overflow: hidden;
  background-clip: padding-box;
  border: 1px solid black;
  user-select: none;
  position: relative;

  ${props => props.highlightDim && `
    background-color: hsl(120, 73%, 80%, .3) !important;
    user-select: auto;
  `}
  ${props => props.highlight && `
    background-color: hsl(120,90%,80%) !important;
    user-select: auto;
  `}

  ${props => props.foreign && `
    color: #888;
  `}

  @media (max-width: 799px) {
    tr:first-of-type &{
      border-top: none;
    }

    tr:last-of-type &{
      border-bottom: none;
    }

    tr &:first-of-type{
      border-left: none;
    }

    tr &:last-of-type{
      border-right: none;
    }
  }
`;
