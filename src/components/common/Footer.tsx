import styled from "styled-components";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

type Props = {};
const FooterContent = styled.div`
  background-color: ${(props) => props.theme.bg.main};
  min-height: 80px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
const MoreInfo = styled.div`
  display: flex;
  width: 30%;
  justify-content: center;
`;

const Footer = (props: Props) => {
  return (
    <FooterContent>
      <MoreInfo>
        <a href="">
          <GitHubIcon />
        </a>
        <a href="">
          <FacebookIcon />
        </a>
        <a href="">
          <LinkedInIcon />
        </a>
      </MoreInfo>
      <span>All are reserved | Made by Manh Dinh Nguyen</span>
    </FooterContent>
  );
};

export default Footer;
