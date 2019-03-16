import React, { memo } from "react";
import styled from "@emotion/styled";
import Table from "./table/Table";
import Options from "../interfaces/Options";
import { mobileMaxWidth, tabletMaxWidth } from "../breakpoints";

const Container = styled("div")`
  position: fixed;
  top: 50px;
  right: 0;
  width: 100vw;
  height: calc(100% - 50px);
  overflow-x: auto;

  @media (min-width: ${mobileMaxWidth}px) {
    padding: 5px;
    position: absolute;
    width: calc(100vw - 300px);
  }

  @media (min-width: ${tabletMaxWidth}px) {
    width: calc(100vw - (50vw - ${tabletMaxWidth}px / 2 + 300px));
  }
`;

export default memo(function Content (
  props: {
    options: Options;
    kyoukashoLoaded: boolean;
  },
) {
  return (
    <Container>
      <Table {...props}/>
    </Container>
  );
});
