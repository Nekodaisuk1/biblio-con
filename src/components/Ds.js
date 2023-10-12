import React, { Component } from "react";
import styled, { css } from "styled-components";

function DS(props) {
  return (
    <Container {...props}>
      <大2Row>
        <大2>大</大2>
        <小2>小</小2>
      </大2Row>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const 大2 = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: #30903f;
  font-size: 93px;
`;

const 小2 = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: #30903f;
  font-size: 93px;
  margin-left: 291px;
`;

const 大2Row = styled.div`
  height: 140px;
  flex-direction: row;
  display: flex;
  flex: 1 1 0%;
  margin-right: -384px;
`;

export default DS;
