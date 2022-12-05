import React from "react";
import styled from "styled-components";

const Logo = props => (
  <Container>
    <LogosWrapper>
      <Image source={props.image} resizeMode="contain"/>
      <Text>{props.text}</Text>
    </LogosWrapper>
  </Container>
);

export default Logo;

const LogosWrapper = styled.View`
  flex-direction: row;
  padding: 20px 12px;
`;

const Container = styled.View`
  flex-direction: row;
  background: white;
  height: 60px;
  padding: 12px 16px 12px;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25);
  align-items: center;
  margin: 0 8px;
`;

const Image = styled.Image`
  width: 36px;
  height: 36px;
`;

const Text = styled.Text`
  padding-top: 7px;
  font-weight: 600;
  font-size: 17px;
  margin-left: 8px;
`;
