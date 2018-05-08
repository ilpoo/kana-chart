import React from "react";
import Table from './Table';
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 50px;
  right: 0;
  width: 100vw;
  height: calc(100% - 50px);
  overflow-x: auto;

  @media (min-width: 800px){
    &{
      padding: 5px;
      position: absolute;
      width: calc(100vw - 300px);
    }
  }

  @media (min-width: 1000px){
    &{
      width: calc(100vw - (50vw - 1000px / 2 + 300px));
    }
  }
`;

export default class Content extends React.Component{
  render(){
    return (
      <Container>
        <Table {...this.props}/>
      </Container>
    );
  }
}
