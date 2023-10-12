import React, { Component } from "react";
import styled, { css } from "styled-components";

function Kj(props) {
  return (
    <Container {...props}>
      <Rect2>
        <興味ジャンル>興味ジャンル</興味ジャンル>
      </Rect2>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Rect2 = styled.div`
  width: 528px;
  height: 90px;
  background-color: #30903f;
  border-radius: 47px;
  flex-direction: column;
  display: flex;
  margin-top: 32px;
`;

const 興味ジャンル = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(255,255,255,1);
  font-size: 60px;
  margin-left: 88px;
`;

export default Kj;
