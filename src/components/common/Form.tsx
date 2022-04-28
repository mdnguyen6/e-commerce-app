import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "./Button";
import styled from "styled-components";

import backgroundImage from "../../assets/IMG_1140.jpg";
import FilterSection from "./FilterSection";

type formProps = {
  title: string;
  setPassword: React.Dispatch<string>;
  setEmail: React.Dispatch<string>;
  handleAction: (e: any) => void;
};
const FormBox = styled(Box)`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  margin: auto;
  height: 400px;
  border: 2px solid ${(p) => p.theme.bg.main};
  background: ${(p) => p.theme.bg.light};
  opacity: 0.6;
  border-radius: 5px;
  width: 90%;
  ${(p) => p.theme.breakpoints.up("sm")} {
    width: 300px;
  }
`;
const TextAnimation = styled.div`
  text-align: center;
  color: ${p => p.theme.text.dark};
  font-weight: 300;
  font-size: 32px;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  -webkit-perspective: 1000;
  -webkit-transform: translate3d(0, 0, 0);
  div:first-of-type {
    animation: showup 7s infinite;
  }

  div:last-of-type {
    animation: reveal 7s infinite;
  }

  div:last-of-type span {
    animation: slidein 7s infinite;
  }

  @keyframes showup {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes slidein {
    0% {
      margin-left: -800px;
    }
    20% {
      margin-left: -800px;
    }
    35% {
      margin-left: 0px;
    }
    100% {
      margin-left: 0px;
    }
  }

  @keyframes reveal {
    0% {
      opacity: 0;
      width: 0px;
    }
    20% {
      opacity: 1;
      width: 0px;
    }
    30% {
      width: 100%;
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      width: 100%;
    }
  }
  ${(p) => p.theme.breakpoints.up("md")} {
    width: 50%;
    padding-top: 28vh;
    font-size: 40px;
  }
`;
const Wrapper = styled(Box)`
  display: flex;
  background: url('https://housedesign.vn/wp-content/uploads/2020/03/thiet-ke-noi-that-shop-thoi-trang.jpg') center no-repeat;
  background-size: cover;
  background-attachment: fixed;
  flex-direction: column;
  justify-content: space-between;
  align-item: center;
  height: 100vh;
  width: 90vw;
  padding-top: 5vh;
  margin: auto;
  ${(p) => p.theme.breakpoints.up("md")} {
    flex-direction: row;
    height: 100vh;
    margin-bottom: -10vh;
    margin-top: -2vh;
  }
`;

export default function BasicTextFields({
  title,
  setPassword,
  setEmail,
  handleAction,
}: formProps) {
  return (
    <>
      <Wrapper>
        <TextAnimation>
          <div>Welcome to</div>
          <div>
            <span>E-commerce App</span>
          </div>
        </TextAnimation>
        <FormBox>

          <TextField
            style={{opacity: 1}}
            id="email"
            label="Enter the Email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="password"
            label="Enter the Password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button title={title} handleAction={handleAction} />
        </FormBox>
      </Wrapper>
      
    </>
  );
}
