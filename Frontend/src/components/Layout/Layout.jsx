import React from 'react';
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from './Footer';
import { Container } from '@mui/material';

const Layout = ({ panel }) => {
  return (
    <Container disableGutters maxWidth={false} sx={{ paddingTop: '56px' }}>
      <Header panel={panel} />
      <div>
        <Outlet />
      </div>
      <Footer />
    </Container>
  );
};

export default Layout;
