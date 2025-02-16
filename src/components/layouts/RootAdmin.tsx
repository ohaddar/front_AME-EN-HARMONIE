import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

import AdminNav from "../navigation/AdminNav";
const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const RootAdmin: React.FC = () => {
  return (
    <MainContainer data-testid="main">
      <AdminNav
        child={<Outlet data-testid="outlet" />}
        data-testid="admin-nav"
      />
    </MainContainer>
  );
};

export default RootAdmin;
