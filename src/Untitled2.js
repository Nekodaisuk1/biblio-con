import React from "react";
import styled from "styled-components";

function Grid(props) {
  return (
    <Container {...props}>
      <Rect>
        <HorizontalLine></HorizontalLine>
        <VerticalLine></VerticalLine>
      </Rect>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  position: fixed;  
  top: 0;
  left: 0;
  pointer-events: none; 
  z-index 10;
`;

const Rect = styled.div`
  width: 90%;  // Adjust the width and height of the rectangle
  height: 90%;  // relative to the viewport
  border-width: 5px;
  border-color: #30903f;
  background-color: rgba(15, 15, 15, 0);
  position: relative;
  border-style: solid;
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 5px;
  position: absolute;
  top: 50%;
  left: 0;
  background-color: #30903f;
  transform: translateY(-50%);
`;

const VerticalLine = styled.div`
  width: 5px;
  height: 100%;
  position: absolute;
  left: 50%;
  top: 0;
  background-color: #30903f;
  transform: translateX(-50%);
`;

export default Grid;
