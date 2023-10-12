import React, { Component } from "react";
import styled, { css } from "styled-components";

function SJ(props) {
  return (
    <Container {...props}>
      <Rect>
        <紹介作品ジャンル>紹介作品ジャンル</紹介作品ジャンル>
      </Rect>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Rect = styled.div`
  width: 528px;
  height: 90px;
  background-color: #30903f;
  border-radius: 47px;
  flex-direction: column;
  display: flex;
  margin-top: 32px;
`;

const 紹介作品ジャンル = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(255,255,255,1);
  font-size: 60px;
  margin-left: 28px;
`;

export default SJ;
