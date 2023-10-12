import React, { Component } from "react";
import styled, { css } from "styled-components";
import UntitledComponent2 from "./components/UntitledComponent2";
import UntitledComponent1 from "./components/UntitledComponent1";
import Logo from "./components/Logo";
import UntitledComponent4 from "./components/UntitledComponent4";
import UntitledComponent3 from "./components/UntitledComponent3";

function Sinin(props) {
  return (
    <Container>
      <CtoCRow>
        <UntitledComponent2
          style={{
            height: 274,
            width: 41,
            marginTop: 582
          }}
        ></UntitledComponent2>
      <ConnectStack>
        <UntitledComponent1
          onConnectClick={props.onGoogleLogin}
          style={{
            position: "absolute",
            top: 562,
            left: 92,
            height: 152,
            width: 496
          }}
        ></UntitledComponent1>
          <Logo
            style={{
              position: "absolute",
              top: 0,
              height: 631,
              width: 680,
              left: 0
            }}
          ></Logo>
        </ConnectStack>
        <UntitledComponent4
          style={{
            height: 274,
            width: 41,
            transform: "rotate(undefined)",
            marginLeft: 152
          }}
        ></UntitledComponent4>
        <UntitledComponent3
          style={{
            height: 274,
            width: 41,
            marginLeft: 76,
            marginTop: 122
          }}
        ></UntitledComponent3>
      </CtoCRow>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  border-width: 1px;
  border-color: #000000;
  background-color: #f0f1e0;
  flex-direction: row;
  border-style: solid;
  height: 100vh;
  width: 100vw;
`;

const ConnectStack = styled.div`
  width: 680px;
  height: 714px;
  margin-left: 282px;
  margin-top: 81px;
  position: relative;
`;

const CtoCRow = styled.div`
  height: 857px;
  flex-direction: row;
  display: flex;
  flex: 1 1 0%;
  margin-right: 34px;
  margin-left: 19px;
  margin-top: -105px;
`;

export default Sinin;
