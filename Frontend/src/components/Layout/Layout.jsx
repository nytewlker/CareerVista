import React from 'react';
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from './Footer';

const Layout = ({ panel }) => {
  return (
    <div>
      <Header panel={panel} />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
