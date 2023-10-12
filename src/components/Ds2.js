import React, { Component } from "react";
import styled, { css } from "styled-components";

function Ds2(props) {
  return (
    <Container {...props}>
      <大row>
        <大>大</大>
        <小>小</小>
      </大row>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const 大 = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: #30903f;
  font-size: 93px;
`;

const 小 = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: #30903f;
  font-size: 93px;
  margin-left: 296px;
`;

const 大row = styled.div`
  height: 140px;
  flex-direction: row;
  display: flex;
  flex: 1 1 0%;
  margin-right: 291px;
`;

export default Ds2;
