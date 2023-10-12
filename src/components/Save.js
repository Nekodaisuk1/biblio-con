import React, { Component } from "react";
import styled, { css } from "styled-components";

function Save(props) {
  const handleClick = () => {
    console.log("Save button clicked!");

    props.handleSaveSettings();
  };
  return (
    <Container {...props} onClick={handleClick}>
      <EllipseStack>
        <svg
          viewBox="0 0 183.02 183.02"
          style={{
            top: 0,
            left: 0,
            width: 183,
            height: 183,
            position: "absolute"
          }}
        >
          <ellipse
            stroke="#30903f"
            strokeWidth={3}
            fill="#30903f"
            cx={92}
            cy={92}
            rx={90}
            ry={90}
          ></ellipse>
        </svg>
        <Text>Save</Text>
        <Rect13></Rect13>
      </EllipseStack>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.span`
  font-family: Roboto;
  top: 60px;
  left: 34px;
  position: absolute;
  font-style: normal;
  font-weight: 400;
  color: rgba(255,255,255,1);
  font-size: 54px;
`;

const Rect13 = styled.div`
  top: 168px;
  left: 72px;
  width: 38px;
  height: 17px;
  position: absolute;
  background-color: #30903f;
  transform: rotate(90.00deg);
`;

const EllipseStack = styled.div`
  width: 183px;
  height: 185px;
  position: relative;
`;

export default Save;
