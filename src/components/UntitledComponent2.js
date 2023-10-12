import React, { Component } from "react";
import styled, { css } from "styled-components";

function UntitledComponent2(props) {
  return (
    <Container {...props}>
      <Rect2Stack>
        <Rect2></Rect2>
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
        <svg
          viewBox="0 0 41.37 41.37"
          style={{
            top: 0,
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
      </Rect2Stack>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Rect2 = styled.div`
  top: 21px;
  left: 17px;
  width: 8px;
  height: 233px;
  position: absolute;
  background-color: #30903f;
`;

const Rect2Stack = styled.div`
  width: 41px;
  height: 274px;
  position: relative;
`;

export default UntitledComponent2;
