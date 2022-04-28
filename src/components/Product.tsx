import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  IconButtonProps,
  Typography,
} from "@mui/material";
import { blue, green, pink, yellow } from "@mui/material/colors";
import ProductType from "../model/Product.type";
import { makeStyles } from "@mui/styles";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import styled from "styled-components";
import { useCartContext } from "../context/cart-context.provider";

type Props = {
  product: ProductType;
};
/*const ExpandMore = styled(IconButton)<{expand: boolean}>(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
}));*/
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
}));

const useStyles: any = makeStyles({
  avatar: {
    backgroundColor: (product: ProductType) => {
      if (product.category == "men's clothing") {
        return yellow[700];
      }
      if (product.category == "jewelery") {
        return green[500];
      }
      if (product.category == "electronics") {
        return pink[500];
      }
      return blue[500];
    },
  },
});

const Product = ({ product }: Props) => {
  const { setCart } = useCartContext();
  const classes = useStyles(product);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleAddToCart = (clickedProduct: ProductType) => {
    setCart((prev) => {
      const isItemInCart = prev.find(
        (item) => item.product.id === clickedProduct.id
      );

      if (isItemInCart) {
        return prev.map((item) =>
          item.product.id === clickedProduct.id
            ? { product: item.product, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product: clickedProduct, quantity: 1 }];
    });
  };
  return (
    <Card elevation={1}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            {product.category[0].toUpperCase()}
          </Avatar>
        }
        title={product.title}
        subheader={product.category}
      />
      <CardMedia
        component="img"
        height="194"
        image={product.image.toString()}
        alt="Paella dish"
      />
      <CardActions disableSpacing style={{display: "flex", justifyContent: "space-between"}}>
        <IconButton
          aria-label="add to cart"
          onClick={() => handleAddToCart(product)}
        >
          <AddShoppingCartIcon />
        </IconButton>

        {`${product.price}$`}

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {product.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
export default Product;
