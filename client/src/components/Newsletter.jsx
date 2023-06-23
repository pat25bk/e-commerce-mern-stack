import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";
import { mobile } from "../reponsive";

const Container = styled.div`
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: floralwhite;
`;

const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
  ${mobile({fontSize:"40px"})}
`;
const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({fontSize:"16px"})}
`;
const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: green;
  display: flex;
  justify-content: space-between;
  border: 1px lightgray solid;
  ${mobile({width:"80%"})}
`;

const Input = styled.input`
  flex: 9;
  border: none;
  padding-left: 20px;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  color: white;
  background-color: teal;
`;

function Newsletter() {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Get update on newest items and promotion</Desc>
      <InputContainer>
        <Input placeholder="Your email" />
        <Button>
          <SendIcon />
        </Button>
      </InputContainer>
    </Container>
  );
}
export default Newsletter;
