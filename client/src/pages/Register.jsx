import styled from "styled-components";
import { mobile } from "../reponsive";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://www.dior.com/couture/var/dior/storage/images/folder-media/folder-videos/folder-defiles/folder-defile-homme-hiver-2023-2024/video-defile-men-summer-23/39407601-1-fre-FR/video-defile-men-summer-23.jpg")
      center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({width:"75%"})}
`;

const Title = styled.h1`
  font-weight: 300;
  font-size: 24px;
  text-align: center;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0 0;
  padding: 10px;
  border: 1px solid gray;
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const Button = styled.button`
  width: 40%;
  padding: 15px 20px;
  border: none;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

function Register() {
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input placeholder="First Name"></Input>
          <Input placeholder="Last Name"></Input>
          <Input placeholder="Username"></Input>
          <Input placeholder="Email Address"></Input>
          <Input placeholder="Password"></Input>
          <Input placeholder="Confirm Password"></Input>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button>REGISTER</Button>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default Register;
