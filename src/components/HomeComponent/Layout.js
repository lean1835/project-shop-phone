import React, { Children } from "react";
import HeaderComponent from "./HeaderComponent";
import BannerComponent from "./BannerComponent";
import FooterComponent from "./FooterComponent";
import BodyComponent from "./BodyComponent";


const Layout = ({Children}) => {
    return (
        <>
            <HeaderComponent></HeaderComponent>
            <BannerComponent></BannerComponent>
            <BodyComponent></BodyComponent>
            <main className="mt-2">{Children}</main>
            <FooterComponent></FooterComponent>
        </>
    )
}

export default Layout;