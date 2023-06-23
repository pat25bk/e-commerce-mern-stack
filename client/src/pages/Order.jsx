import React from 'react'
import { useLocation } from 'react-router'
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';
const Container = styled.div`
width:100vw;
height:100vh;
display:flex;
align-items:center;
justify-content:center;
${'' /* background-color:lightgray; */}
`;

const Wrapper = styled.div`
padding:30px;
text-align:center;
border:1px solid lightgray;
`;

const Item = styled.p`
margin-bottom:10px`;

const Btn = styled.button`
border:1px solid teal;
background-color:teal;
padding:10px 20px;
font-size:16px;
margin-top:10px;
border-radius:10px;
&:hover{
  background-color:white;
}
`
function Order() {
    const {state} = useLocation();
    const orderInfo = state.orderInfo;
  return (
    <Container>
    <Wrapper>
    <h1 style={{marginBottom:"15px"}}>Your order is complete !</h1>
    <CheckCircleIcon color="success" sx={{ fontSize: 100 }}/>
    <Item><strong>Thank you for your purchase ❤️</strong></Item>
    <Item>Your Order ID is {orderInfo._id}</Item>
    <Item>You will receive a confirmation email with details of your order</Item>
    <Btn><strong><Link to="/" style={{all:"unset"}}>CONTINUE SHOPPING</Link></strong></Btn>
    </Wrapper>
    </Container>
  )
}

export default Order