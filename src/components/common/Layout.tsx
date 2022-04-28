import * as React from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";
import CartProvider from "../../context/cart-context.provider";
import { Box } from "@mui/material";

type Props = {
  children: React.ReactNode | React.ReactNode[];
};
const Content = styled.div`
  padding-top: 80px;
  margin: auto;
`;

const BackgroudWrapper = styled(Box)`
  background: ${p => p.theme.bg.main};
`;

const Layout = ({ children }: Props) => {
  return (
    <BackgroudWrapper>
      <CartProvider>
        <Header />
        <Content>{children}</Content>
      </CartProvider>
      <Footer />
    </BackgroudWrapper>
  );
};

export default Layout;
