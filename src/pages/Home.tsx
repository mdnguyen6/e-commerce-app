import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import Product from "../components/Product";
import { fetchProduct } from "../features/product/productSlice";
import ProductType from "../model/Product.type";
import Masonry from "react-masonry-css";
import styled from "styled-components";
import { Box } from "@mui/material";
import FilterSection from "../components/common/FilterSection";


interface StateProps {
  product: {
    product: ProductType | ProductType[];
  };
}

interface DispatchProps {}

type Props = StateProps & DispatchProps;
const Wrapper = styled(Box)`
  
`;

const Home: React.FC<Props> = (props) => {
  const { id, category } = useParams();
  let dispatch = useAppDispatch();
  const breakpointColumnsObj = {
    default: 3,
    700: 2,
    500: 1,
  };

  useEffect(() => {
    id && dispatch(fetchProduct({id:  Number.parseInt(id)})) 
    category && dispatch(fetchProduct({category:  category}))
    if (!id && !category) dispatch(fetchProduct({}));
  }, [id, category]);
  return (
    <Wrapper>
      <FilterSection/>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
        style={{ padding: '2px', paddingTop: '100px'}}
      >
        {props.product?.product && (Array.isArray(props.product?.product) ? props.product?.product.map((product) => (
          <Product key={product.id.valueOf()} product={product} />
        )) : <Product product={props.product?.product} />)}
      </Masonry>
      
    </Wrapper>
  );
};
/*notice: mapStateProps return must match to StateProps and real state from store. if not, it's gonna getting error like missing property */

const mapStateProps = (state: StateProps) => {
  return {
    product: {
      product: state.product.product,
    },
  };
};
const mapDispatchToProps = {};
export default connect(mapStateProps, mapDispatchToProps)(Home);
