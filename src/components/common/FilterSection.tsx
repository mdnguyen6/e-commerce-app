import React, { useEffect } from "react";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import styled from "styled-components";
import { Slide } from "@mui/material";
import {
  fetchCategory,
  fetchProduct,
} from "../../features/product/productSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";

type ScrollProps = {
  children: React.ReactElement;
};
function HideOnScroll({ children }: ScrollProps) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction={"down"} in={!trigger}>
      {children}
    </Slide>
  );
}

type Props = {};

const ScrollItem = styled.div`
  position: fixed;
  width: 100%;
  height: 100px;
  margin-top: -10px;
  white-space: nowrap;
  overflow: auto;
  overflow-y: hidden;
  z-index: 1;
  &::-webkit-scrollbar {
    height: 1px;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0,0,0,0.00);
    webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.00);
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,.1);
    
  }
  & > div {
    display: inline-block;
    padding: 10px;
    background: ${(p) => p.theme.bg.light};
    border-radius: 5px;
    height: 60px;
    margin-top: 5px;
    margin-left: 2px;
    margin-right: 2px;
    transition: transform 0.2s;
  }
  & > div:hover {
    transform: scale(1.5);
    z-index: 1;
  }
  ${(p) => p.theme.breakpoints.up("sm")} {
    width: 40%;
    left: 30%;
  }
`;

const FilterSection = (props: Props) => {
  let dispatch = useAppDispatch();
  let navigate = useNavigate();
  let categories = useAppSelector((state) => state.product.categories);
  useEffect(() => {
    categories === null && dispatch(fetchCategory());
  }, []);
  return (
    <HideOnScroll>
      <ScrollItem>
        <div onClick={() => navigate('/home')}>All Product</div>
        {categories &&
          categories.map((item) => (
            <div
              key={item}
              onClick={() => navigate(`/product/category/${item}`)}
            >
              {item}
            </div>
          ))}
      </ScrollItem>
    </HideOnScroll>
  );
};

export default FilterSection;
