import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Nav from "../navigation/Nav";

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
`;

const Root: React.FC = () => {
  return (
    <MainContainer data-testid="main">
      <Nav />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
      <Footer />
    </MainContainer>
  );
};

export default Root;
