import React, { Component } from "react";
import styled, { css } from "styled-components";

function Logout(props) {
  return (
    <Container {...props}>
      <Ellipse2Stack>
        <svg
          viewBox="0 0 119.77 119.77"
          style={{
            top: 0,
            left: 40,
            width: 120,
            height: 120,
            position: "absolute"
          }}
        >
          <ellipse
            stroke="rgba(230, 230, 230,1)"
            strokeWidth={0}
            fill="#30903f"
            cx={60}
            cy={60}
            rx={60}
            ry={60}
          ></ellipse>
        </svg>
        <Rect14></Rect14>
      </Ellipse2Stack>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Rect14 = styled.div`
  top: 51px;
  left: 0px;
  width: 80px;
  height: 19px;
  position: absolute;
  background-color: #30903f;
`;

const Ellipse2Stack = styled.div`
  width: 160px;
  height: 120px;
  position: relative;
`;

export default Logout;
