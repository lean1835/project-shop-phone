import React from "react";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";

const Layout = ({ children }) => {
  return (
    <>
      <HeaderComponent />
      <div>{children}</div>
      <FooterComponent />
    </>
  );
};

export default Layout;
