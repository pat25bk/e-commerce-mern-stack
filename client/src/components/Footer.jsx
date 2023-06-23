import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PlaceIcon from "@mui/icons-material/Place";
import EmailIcon from "@mui/icons-material/Email";
import { Phone } from "@mui/icons-material";
import { mobile } from "../reponsive";

const Container = styled.div`
  display: flex;
  ${mobile({flexDirection:"column"})};
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;
const Desc = styled.p`
  margin: 20px 0;
`;

const SocialCotainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.bgColor};
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`;

const Center = styled.div`
  padding: 20px;
  flex: 1;
  ${mobile({display:"none"})}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  padding: 20px;
  flex: 1;
  ${mobile({ backgroundColor: "floralwhite" })}
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Payment = styled.img`
  width: 50%;
`;
function Footer() {
  return (
    <Container>
      <Left>
        <Logo>AMZ</Logo>
        <Desc>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Desc>
        <SocialCotainer>
          <SocialIcon bgColor="#1877f2">
            <FacebookIcon />
          </SocialIcon>
          <SocialIcon bgColor="#1da1f2">
            <TwitterIcon />
          </SocialIcon>
          <SocialIcon bgColor="#c32aa3">
            <InstagramIcon />
          </SocialIcon>
        </SocialCotainer>
      </Left>

      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>

      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <PlaceIcon style={{ marginRight: "10px" }} />1 Nguyen Hue, District 1,
          HCMC, Vietnam
        </ContactItem>
        <ContactItem>
          <LocalPhoneIcon style={{ marginRight: "10px" }} />
          +84 9088888888
        </ContactItem>
        <ContactItem>
          <EmailIcon style={{ marginRight: "10px" }} />
          customerservice@amz.com.vn
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
}

export default Footer;
