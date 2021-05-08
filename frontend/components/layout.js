import Nav from "./nav";
import ForceDirectedNav from "../components/ForceDirectedNav";
import React, { useState, useEffect, useRef } from 'react'




const Layout = ({ children, categories, seo }) => (

  <div>
    {/* <Nav categories={categories} /> */}
    {/* <div className="top-offset-block"></div> */}
    {children}
  </div>
);

export default Layout;
