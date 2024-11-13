import React from "react";
import { Outlet } from "react-router-dom";
import MainNav from "../../navigation/MainNav";
import Footer from "../footer/Footer";

const Root: React.FC = () => {
  return (
    <main
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <MainNav />
      <div style={{ flexGrow: 1 }}>
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default Root;
