import React, { Component } from "react";
import styled, { css } from "styled-components";

function UntitledComponent4(props) {
  return (
    <Container {...props}>
      <Rect4Stack>
        <Rect4></Rect4>
        <svg
          viewBox="0 0 41.37 41.37"
          style={{
            top: 233,
            left: 0,
            width: 41,
            height: 41,
            position: "absolute"
          }}
        >
          <ellipse
            stroke="rgba(230, 230, 230,1)"
            strokeWidth={0}
            fill="#30903f"
            cx={21}
            cy={21}
            rx={21}
            ry={21}
          ></ellipse>
        </svg>
        <Rect5></Rect5>
      </Rect4Stack>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Rect4 = styled.div`
  top: 21px;
  left: 17px;
  width: 8px;
  height: 233px;
  position: absolute;
  background-color: #30903f;
`;

const Rect5 = styled.div`
  top: 0px;
  left: 0px;
  width: 41px;
  height: 41px;
  position: absolute;
  background-color: #30903f;
`;

const Rect4Stack = styled.div`
  width: 41px;
  height: 274px;
  position: relative;
`;

export default UntitledComponent4;
