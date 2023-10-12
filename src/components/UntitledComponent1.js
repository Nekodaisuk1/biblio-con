import React, { Component } from "react";
import styled, { css } from "styled-components";

function UntitledComponent1(props) {
  return (
    <Container {...props} onClick={props.onConnectClick}>
      <Rect>
        <Connect>CONNECT</Connect>
      </Rect>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;  // ホバー時にカーソルをポインターに変更
`;

const Rect = styled.div`
  width: 496px;
  height: 152px;
  background-color: rgba(38,175,83,1);
  border-radius: 100px;
  flex-direction: column;
  display: flex;
`;

const Connect = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(247,246,246,1);
  font-size: 58px;
  margin-top: 42px;
  margin-left: 115px;
`;

export default UntitledComponent1;
