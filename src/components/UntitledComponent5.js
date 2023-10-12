import React, { Component } from "react";
import styled, { css } from "styled-components";
import LogoutComponent from "./Logout";

function UntitledComponent5(props) {
  const handleClick = () => {
    console.log("Logout button clicked!");

    props.handleLogout();
  };
  return (
    <Container {...props} onClick={handleClick}>
      <LogoutStack>
        <LogoutComponent
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: 120,
            width: 160
          }}
        ></LogoutComponent>
        <Logout>Logout</Logout>
      </LogoutStack>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Logout = styled.span`
  font-family: Roboto;
  top: 43px;
  left: 55px;
  position: absolute;
  font-style: normal;
  font-weight: 400;
  color: rgba(255,255,255,1);
  font-size: 29px;
`;

const LogoutStack = styled.div`
  width: 160px;
  height: 120px;
  position: relative;
`;

export default UntitledComponent5;
