import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Nav from "../../navigation/Nav";

const Root: React.FC = () => {
  return (
    <main
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Nav />
      <div style={{ flexGrow: 1 }}>
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default Root;
