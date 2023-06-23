import styled from "styled-components";
import { mobile } from "../reponsive";
import { useState } from "react";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({width:"75%"})}
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 24px;
  text-align: center;
`;

const Input = styled.input`
  flex: 1;
  width: 100%;
  margin: 10px 0;
  padding: 10px 0;
  padding-left: 5px;
  box-sizing: border-box;
  border: 1px solid gray;
  border-radius: 5px;
`;

const LinkItem = styled.a`
  font-size: 12px;
  margin: 5px 0;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.p`
  color:red;
  font-size: 12px;
  margin: 5px 0;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px 0;
  margin: 10px 0;
  border-radius: 5px;
  border: none;
  background-color: teal;
  color: white;
  cursor: pointer;
  &:disabled{
    background-color:gray;
  }
`;

function Login() {
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const {isFetching,error}     = useSelector(state=>state.root.user);
  const dispatch = useDispatch();

  const onClick=(e)=>{
    e.preventDefault();
    login(dispatch,{username,password});
  }

  return (
    <Container>
      <Wrapper>
        <Title>AMZ</Title>
        <Form>
          <Input placeholder="Username" onChange={(e)=>setUsername(e.target.value)} value={username}></Input>
          <Input placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password}></Input>
          <Button onClick={onClick} disabled={isFetching}>SIGN IN</Button>
          {error&&<Error>Wrong username or password!</Error>}
          <LinkItem>Do not remember password?</LinkItem>
          <LinkItem><Link to="/register">Create an account</Link></LinkItem>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default Login;
