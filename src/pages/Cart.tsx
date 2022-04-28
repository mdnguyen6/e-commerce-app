import { Box, Button, Paper, Typography } from "@mui/material";
import styled from "styled-components";
import { useCartContext } from "../context/cart-context.provider";
import CartType from "../model/Cart.type";
import { useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  padding: 0 2px 20px;
  
  .paper-container {
    width: 100%;
    background: ${(p) => p.theme.bg.light};
  }
  .information {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
  }
  .buttons {
    display: flex;
    justify-content: space-around;
    z-index: 1;
  }
  img {
    max-width: 80px;
    object-fit: cover;
  }
  ${(p) => p.theme.breakpoints.up("sm")} {
    .paper-container {
      display: flex;
      justify-content: space-between;
    }
    .buttons {
      flex-direction: column-reverse;
      justify-content: center;
      align-items: center;
    }
    .information {
      width: 500px;
      justify-content: space-between;
    }
    p {
      text-align: center;
    }
  }
  ${(p) => p.theme.breakpoints.up("md")} {
    .paper-container {
      width: 90%;
      margin-left: 40px;
    }
  }
`;
const CheckoutBox = styled(Box)`
  
`;

type Props = {};

const Cart = (props: Props) => {
  const { cart, setCart, getItemCount, getCartTotal } = useCartContext();
  let accessToken = useAppSelector((state) => state.auth.accessToken);
  let navigate = useNavigate();
  const handleAddToCart = (clickedProduct: CartType) => {
    setCart((prev) => {
      const isItemInCart = prev.find(
        (item) => item.product.id === clickedProduct.product.id
      );

      if (isItemInCart) {
        return prev.map((item) =>
          item.product.id === clickedProduct.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...clickedProduct, quantity: 1 }];
    });
  };
  const handleRemoveFromCart = (id: Number) => {
    setCart((prev) =>
      prev.reduce((prevVal, currentVal) => {
        if (currentVal.product.id === id) {
          if (currentVal.quantity === 1) return prevVal;
          return [
            ...prevVal,
            { ...currentVal, quantity: currentVal.quantity - 1 },
          ];
        } else {
          return [...prevVal, currentVal];
        }
      }, [] as CartType[])
    );
  };
  if (getItemCount() === 0)
    return <Typography align="center">you have no item.</Typography>;
  return (
    <>
      <Typography>Your Cart: {getItemCount()} items</Typography>
      {cart &&
        cart.map((item) => (
          <Wrapper key={item.product.id.valueOf()}>
            <Paper className="paper-container">
              <div className="information" onClick={() => navigate(`/product/${item.product.id.valueOf()}`)}>
                <h3>{item.product.title}</h3>
                <img
                  src={item.product.image.toString()}
                  alt={item.product.title.toString()}
                />
              </div>
              <p>Price: ${item.product.price}</p>
              <div className="buttons">
                <Button
                  size="small"
                  disableElevation
                  variant="contained"
                  onClick={() => handleRemoveFromCart(item.product.id)}
                >
                  -
                </Button>
                <p>{item.quantity}</p>
                <Button
                  size="small"
                  disableElevation
                  variant="contained"
                  onClick={() => handleAddToCart(item)}
                >
                  +
                </Button>
              </div>
            </Paper>
          </Wrapper>
        ))}
      <CheckoutBox>
        <Typography>
          Total: {getCartTotal().toFixed(2)}
        </Typography>
        <Button
          size="large"
          disableElevation
          variant="outlined"
          onClick={() => {
            accessToken ? alert("transaction success!") : navigate("/login");
          }}
        >
          Check Out
        </Button>
      </CheckoutBox>
    </>
  );
};

export default Cart;
