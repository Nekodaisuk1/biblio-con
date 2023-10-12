import React, { Component } from "react";
import styled, { css } from "styled-components";
import UntitledComponent from "./UntitledComponent";

function Session(props) {
  const handleClick = () => {
    console.log("Session buttun Clicked");

    props.startMatching();
  };
  return (
    <Container {...props} onClick={handleClick}>
      <UntitledComponentStack>
        <UntitledComponent
          style={{
            position: "absolute",
            top: 0,
            left: 71,
            height: 441,
            width: 441
          }}
        ></UntitledComponent>
        <Rect12></Rect12>
      </UntitledComponentStack>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Rect12 = styled.div`
  top: 221px;
  left: 0px;
  width: 122px;
  height: 17px;
  position: absolute;
  background-color: #30903f;
`;

const UntitledComponentStack = styled.div`
  width: 512px;
  height: 441px;
  margin-left: 40px;
  position: relative;
`;

export default Session;
