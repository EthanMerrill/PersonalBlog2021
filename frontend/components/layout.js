import Nav from "./nav";
import ForceDirectedNav from "../components/ForceDirectedNav";
import React, { useState, useEffect, useRef } from 'react'




const Layout = ({ children, categories, seo }) => (

  <>
    {/* <Nav categories={categories} /> */}
    <ForceDirectedNav />
    <div className="top-offset-block"></div>
    {children}
  </>
);

export default Layout;
