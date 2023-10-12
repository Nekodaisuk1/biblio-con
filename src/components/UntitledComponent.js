import React, { Component } from "react";
import styled, { css } from "styled-components";

function UntitledComponent(props) {
  return (
    <Container {...props}>
      <EllipseStack>
        <svg
          viewBox="0 0 441.09 441.09"
          style={{
            left: 0,
            width: 441,
            height: 441,
            position: "absolute",
            top: 0
          }}
        >
          <ellipse
            stroke="rgba(230, 230, 230,1)"
            strokeWidth={0}
            fill="#30903f"
            cx={221}
            cy={221}
            rx={221}
            ry={221}
          ></ellipse>
        </svg>
        <Session>Session!</Session>
      </EllipseStack>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Session = styled.span`
  font-family: Roboto;
  top: 173px;
  left: 66px;
  position: absolute;
  font-style: normal;
  font-weight: 400;
  color: rgba(255,255,255,1);
  font-size: 82px;
  width: 310px;
  height: 96px;
`;

const EllipseStack = styled.div`
  width: 441px;
  height: 441px;
  position: relative;
`;

export default UntitledComponent;
