import React, { Component, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Session from "./components/Session";
import Save from "./components/Save";
import UntitledComponent5 from "./components/UntitledComponent5";
import Sj from "./components/Sj";
import Kj from "./components/Kj";
import Nj from "./components/Nj";
import Rect9Input from './components/Rect9Input';
import Rect7Input from './components/Rect7Input';
import Rect6Input from './components/Rect6Input';
import Rect10Input from './components/Rect10Input';
import Rect5Input from './components/Rect5Input';
import Rect11Input from './components/Rect11Input';
import Logout from './components/Logout';


function Home({
  matchingSettings,
  handleInputChange,
  username,
  handleUsernameChange,
  handleSaveSettings,
  startMatching,
  handleLogout

  }) {
  const [interestedGenreLarge, setInterestedGenreLarge] = useState('');
  const [interestedGenreSmall, setInterestedGenreSmall] = useState('');
  const handleInput = (setter) => (e) => {
    setter(e.target.value);
  };
  const handleInputSmall = (e) => {
    console.log("Input changed:", e.target.value); 
    setInterestedGenreSmall(e.target.value);
  };

  useEffect(() => {
    const originalBackgroundColor = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#f0f1e0';
    return () => {
        document.body.style.backgroundColor = originalBackgroundColor;
    };
  }, []);

  return (
    <Container>
      <SessionStackStackStack>
        <SessionStackStack>
          <SessionStack>
            <Session
              style={{
                position: "absolute",
                top: 15,
                left: 0,
                height: 441,
                width: 552
              }}
              startMatching={startMatching}
            />
              <Save
                style={{
                  position: "absolute",
                  top: 300,
                  left: 517,
                  height: 195,
                  width: 183
                }}
                handleSaveSettings={handleSaveSettings}
              />
            <UntitledComponent5
              style={{
                position: "absolute",
                top: 0,
                left: 6,
                height: 120,
                width: 160
              }}
              handleLogout={handleLogout}
            />
          </SessionStack>
          <SjStack>
            <Sj
              style={{
                position: "absolute",
                top: 0,
                left: 151,
                height: 170,
                width: 528
              }}
            ></Sj>
            <Rect9Input
                    value={interestedGenreLarge}
                    onChange={handleInput(setInterestedGenreLarge)}
                    placeholder="ジャンル(大)"
            />
            <Kj
              style={{
                position: "absolute",
                top: 239,
                left: 151,
                height: 170,
                width: 528
              }}
            ></Kj>
            <Rect7Input
                value={interestedGenreSmall}
                onChange={handleInputSmall}
                placeholder="ジャンル(小)"
            />
            <Rect10Input
                value={interestedGenreSmall}
                onChange={handleInputSmall}
                placeholder="ジャンル(小)"
            />
          </SjStack>
          <Rect6Stack>
            <Rect6Input
                value={interestedGenreSmall}
                onChange={handleInputSmall}
                placeholder="ジャンル(大)"
            />
            <Nj
              style={{
                position: "absolute",
                top: 116,
                left: 54,
                height: 170,
                width: 528
              }}
            ></Nj>
            <Rect5Input
                value={interestedGenreSmall}
                onChange={handleInputSmall}
                placeholder="ジャンル"
            />
          </Rect6Stack>
        </SessionStackStack>
        <UserNameStack>
          <UserName>UserName</UserName>
          <Rect11Input
                value={interestedGenreSmall}
                onChange={handleInputSmall}
                placeholder="Username"
          />
        </UserNameStack>
      </SessionStackStackStack>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: #f0f1e0;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const SessionStack = styled.div`
  top: 273px;
  left: 0px;
  width: 700px;
  height: 495px;
  position: absolute;
`;

const Rect9 = styled.div`
  top: 124px;
  left: 93px;
  width: 294px;
  height: 138px;
  position: absolute;
  background-color: rgba(230,230, 230,0);
  border-width: 7px;
  border-color: #30903f;
  border-style: solid;
`;

const Rect7 = styled.div`
  top: 371px;
  left: 480px;
  width: 294px;
  height: 138px;
  position: absolute;
  background-color: rgba(230,230, 230,0);
  border-width: 7px;
  border-color: #30903f;
  border-style: solid;
`;

const Rect10 = styled.div`
  top: 124px;
  left: 480px;
  width: 294px;
  height: 138px;
  position: absolute;
  background-color: rgba(230,230, 230,0);
  border-width: 7px;
  border-color: #30903f;
  border-style: solid;
`;

const SjStack = styled.div`
  top: 0px;
  left: 591px;
  width: 774px;
  height: 509px;
  position: absolute;
`;

const Rect6 = styled.div`
  top: 0px;
  left: 0px;
  width: 294px;
  height: 138px;
  position: absolute;
  background-color: rgba(230,230, 230,0);
  border-width: 7px;
  border-color: #30903f;
  border-style: solid;
`;

const Rect5 = styled.div`
  top: 245px;
  left: 22px;
  width: 625px;
  height: 138px;
  position: absolute;
  background-color: rgba(230,230, 230,0);
  border-width: 7px;
  border-color: #30903f;
  border-style: solid;
`;

const Rect6Stack = styled.div`
  top: 371px;
  left: 688px;
  width: 647px;
  height: 383px;
  position: absolute;
`;

const SessionStackStack = styled.div`
  top: 0px;
  left: 0px;
  width: 1365px;
  height: 768px;
  position: absolute;
`;

const UserName = styled.span`
  font-family: Roboto;
  top: 0px;
  left: 0px;
  position: absolute;
  font-style: normal;
  font-weight: 400;
  color: #30903f;
  font-size: 43px;
`;

const Rect11 = styled.div`
  top: 48px;
  left: 0px;
  width: 501px;
  height: 138px;
  position: absolute;
  background-color: rgba(230,230, 230,0);
  border-width: 7px;
  border-color: #30903f;
  border-style: solid;
`;

const UserNameStack = styled.div`
  top: 73px;
  left: 74px;
  width: 501px;
  height: 186px;
  position: absolute;
`;

const SessionStackStackStack = styled.div`
  width: 1365px;
  height: 768px;
  margin-left: -38px;
  position: relative;
`;

export default Home;
