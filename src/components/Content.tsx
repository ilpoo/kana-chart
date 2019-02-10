import React from "react";
import styled from "@emotion/styled";
import Table from "./Table";
import Options from "../interfaces/Options";

const Container = styled("div")`
  position: fixed;
  top: 50px;
  right: 0;
  width: 100vw;
  height: calc(100% - 50px);
  overflow-x: auto;

  @media (min-width: 800px) {
    padding: 5px;
    position: absolute;
    width: calc(100vw - 300px);
  }

  @media (min-width: 1000px) {
    width: calc(100vw - (50vw - 1000px / 2 + 300px));
  }
`;

export interface ContentProps {
  options: Options;
  kyoukashoLoaded: boolean;
}

export default class Content extends React.Component<
  ContentProps,
  {}
> {
  render() {
    return (
      <Container>
        <Table {...this.props}/>
      </Container>
    );
  }
}
