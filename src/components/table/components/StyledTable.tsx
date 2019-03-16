import styled from "@emotion/styled";
import { mobileMaxWidth } from "../../../breakpoints";

export const StyledTable = styled("table")`
  border-collapse: collapse;
  margin: 0 auto;
  height: 100%;
  width: 100%;
  table-layout: fixed;
  transform-origin: top;
  font-size: 22px;

  @media (min-width: ${mobileMaxWidth}px) {
    margin: 0 10px;
    width: calc(100% - 10px);
    height: calc(100% - 2px);
    max-width: 700px;
  }
`;
