import * as React from "react";
import styled from "styled-components";
import AppBar from "@mui/material/AppBar";
import {
  Avatar,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { connect } from "react-redux";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useCartContext } from "../../context/cart-context.provider";

interface StateProps {
  auth: {
    accessToken: string | null;
    email: string;
  };
}
interface DispatchProps {
  logout: () => void;
}
interface OwnProps {}
type Props = StateProps & DispatchProps & OwnProps;

const ToolbarFlex = styled(Toolbar)`
  display: Flex;
  justify-content: space-between;
  background: ${p => p.theme.bg.dark};
`;

const Header = (props: Props) => {
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  let navigate = useNavigate();
  const {getItemCount} = useCartContext();

  function handleClick(event: any) {
    setMenuAnchor(event.currentTarget);
  }
  function handleMenuClose() {
    setMenuAnchor(null);
  }

  return (
    <>
      <AppBar position="fixed" elevation={0}>
        <ToolbarFlex>
          <Typography
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/home")}
          >
            Ecommerce-App
          </Typography>

          <IconButton onClick={() => navigate('/cart')}>
          <Badge badgeContent={getItemCount()} color="error">
          <ShoppingBasketIcon />
        </Badge>
            
          </IconButton>

          <Tooltip title={props.auth.email}>
            <IconButton onClick={handleClick}>
              <Avatar />
            </IconButton>
          </Tooltip>
        </ToolbarFlex>
      </AppBar>
      {props.auth.email ? (
        <Menu
          open={Boolean(menuAnchor)}
          anchorEl={menuAnchor}
          keepMounted
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={() => {
              handleMenuClose();
              props.logout();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      ) : (
        <Menu
          open={Boolean(menuAnchor)}
          anchorEl={menuAnchor}
          keepMounted
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={() => {
              handleMenuClose();
              navigate("/login");
            }}
          >
            Login
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              navigate("/register");
            }}
          >
            Register
          </MenuItem>
        </Menu>
      )}
    </>
  );
};
const mapStateProps = (state: StateProps) => {
  return {
    auth: {
      accessToken: state.auth.accessToken,
      email: state.auth.email,
    },
  };
};
const mapDispatchToProps = {
  logout: () => logout(),
};

export default connect(mapStateProps, mapDispatchToProps)(Header);
