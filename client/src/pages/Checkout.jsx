import React from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar';
import { Leaderboard } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import "./Checkout.css";
import { useState } from 'react';
import { mobile } from "../reponsive";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Navigate, useNavigate } from 'react-router';
import { publicRequest } from '../axiosRequest';
import { removeAllProduct } from '../redux/cartRedux';

const Container = styled.div``;
const Wrapper = styled.div`
display:flex;
`;
const InfoWrapper = styled.div`
flex:2;
`;
const InfoContainer = styled.div`
padding:20px`;

const DeliveryWrapper = styled.div`
`;

const CartContainer = styled.div`
flex:1;
font-size:14px;
border-left:1px solid lightgray;
padding:10px 20px;
`;

const Title = styled.h2`
    text-align:left;
    margin-bottom:20px;
`;

const Input = styled.input`
    padding:10px;
    margin-bottom:20px;
    border-radius:10px;
    border:1px lightgray solid;
    font-size:16px;
    width:100%;
    box-sizing:border-box;
`;

const InputError = styled.div`
color:red;
font-style:italic;
font-size:13px;
`;

const PaymentItem = styled.label`
border:1px lightgray solid;
border-radius:10px;
display:flex;
align-item:center;
justify-content:flex-start;
padding:20px;
margin:10px 0;
cursor:pointer;
&:hover{
    border-color:#2f5acf;
}
`;

const PaymentBtn = styled.input`
${'' /* cursor: pointer;
opacity:0;
position:absolute; */}
display:none;
`;


const PaymentName = styled.label`
margin-left:20px;
`;

// Cart Summary
const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
padding:5px;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  ${mobile({ flexDirection: "column" })}
`;

const Image = styled.img`
  width: 80px;
  object-fit: contain;
  ${mobile({ width: "120px" })}
`;

const Details = styled.div`
  padding:0 20px;
  display: flex;
  flex:2;
  flex-direction: column;
  ${'' /* align-item:flex-start;
  justify-content:flex-start; */}
  ${mobile({ fontSize: "0.8em" })}
`;
const ProductName = styled.p`
font-weight:bold;
margin-bottom:5px`;

const ProductInfo = styled.p`
margin-bottom:5px;
`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.p``;
// Price Detail elements
const PriceDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  ${mobile({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "1em"
})}
`;

const ProductAmountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgray;
  border-radius:5px;
  margin-bottom: 20px;
  ${mobile({ marginBottom: "0" })}
`;

const ProductAmount = styled.span`
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.p`
  font-weight: bold;
`;

const Hr = styled.hr`
  margin: 10px;
  border: 1px solid #eee;
`;

const Summary = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  ${'' /* border-radius: 10px; */}
  ${'' /* border: 0.5px solid lightgray; */}
`;

const SummaryItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  font-size: ${(props) => props.type === "total" && "24px"};
  font-weight: ${(props) => props.type === "total" && "500"};
`;

const SummaryItemText = styled.span`
  margin-right: 20px;
`;
const SummaryItemPrice = styled.span``;

const Button = styled.button`
width:100%;
padding:10px;
font-size:20px;
background-color:teal;
border:none;
border-radius:10px;
font-weight:bold;
color:white;
`;

const VoucherWrapper = styled.div`
display:flex;
padding:10px 0;
`;
const VoucherCode = styled.input`
flex:3;
border-radius:20px;
padding:10px;
border:1px solid lightgray;
`;
const ApplyButton = styled.button`
flex:1;
border-radius:20px;
background-color:teal;
padding:10px;
border:none;
margin-left:10px;
color:white;
`;

function Checkout() {
    const [checkoutInfo, setCheckoutInfo] = useState({
        name: "",
        phone: "",
        address: "",
        email: "",
        note: "",
        paymentMethod: ""
    });

    const [infoError, setInfoError] = useState({
        name: "",
        phone: "",
        address: "",
        email: "",
        note: "",
        paymentMethod: ""
    });

    const [voucherCode,setVoucherCode] = useState("");
    const [discount,setDiscount] = useState(0);
    // cosnt [checkoutAmount,setCheckoutAmount] = useState(0);

    const cart = useSelector(state=>state.root.cart);
    const shippingFee = 5;
    const checkoutAmount = cart.total + shippingFee - discount;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handlePaymentInfo = (e) => {
        setCheckoutInfo((p) => ({ ...p, [e.target.name]: e.target.value }));
    }

    const handleVoucherApply = async() =>{
        //Check voucher on database
        try{
        const res = await publicRequest.get("/voucher/find/"+voucherCode);
        const voucher = res.data;
        if (voucher.length>0){
            if(voucher[0].type==="fixed")
                setDiscount(voucher[0].value);
            else
                setDiscount((voucher[0].value/100)*cart.total);
            setVoucherCode("");
        }else{
            alert("Unexistent voucher!");
            setVoucherCode("");
        }}
        catch(err){
            console.log(err);
        }
    }

    const handleCheckout=async()=>{
        let validFlag = true;
        const vnphone_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
        //Data Validation
        if (checkoutInfo.name.length==0){
            validFlag = false;
            setInfoError((error)=>({...error,name:"*Please enter your name !"}));
        }else{
            setInfoError((error)=>({...error,name:""}));
        }

        if(checkoutInfo.phone.length==0){
            validFlag = false;
            setInfoError((error)=>({...error,phone:"*Please enter your phone number !"}));
        }else if(!vnphone_regex.test(checkoutInfo.phone)){
            validFlag = false;
            setInfoError((error)=>({...error,phone:"*Invalid phone number !"}));
        }else{
            setInfoError((error)=>({...error,phone:""}));
        }

        if(checkoutInfo.email.length==0){
            validFlag = false;
            setInfoError((error)=>({...error,email:"*Please enter your email address !"}));
        }else if(!email_regex.test(checkoutInfo.email)){
            validFlag = false;
            setInfoError((error)=>({...error,email:"*Invalid email address !"}));
        }else{
            setInfoError((error)=>({...error,email:""}));
        }

        if(checkoutInfo.address.length==0){
            validFlag = false;
            setInfoError((error)=>({...error,address:"*Please enter your delivery address !"}));
        }else{
            setInfoError((error)=>({...error,address:""}));
        }

        if(checkoutInfo.paymentMethod.length==0){
            validFlag = false;
            setInfoError((error)=>({...error,paymentMethod:"*Please select your paymen method !"}));
        }else{
            setInfoError((error)=>({...error,paymentMethod:""}));
        }

        if(validFlag){
            const products = cart.products.map((e,i)=>({productId:e._id,
                title:e.title,
                color:e.color,
                size:e.size,
                price:e.price,
                quantity:e.quantity
                }));
        
            const order = {
                    products,
                    ...checkoutInfo,
                    discount,
                    shippingFee,
                    total:cart.total,
                    amount:checkoutAmount
                };
            console.log(order);

            // Making request to create a new order to database
            try{
                const res = await publicRequest.post("/order/",order);
                console.log(res);
                //Clear shopping cart in redux
                dispatch(removeAllProduct());
                //Navigate to Order Summary page
                navigate("/order",{state:{orderInfo:{...res.data}}});
            }catch(err){
                console.log(err);
            }
        }
    }

    // console.log(checkoutInfo);
    return (
        <Container>
            <Navbar />
            <Wrapper>
                <InfoWrapper>
                    <InfoContainer>
                        <Title>Delivery Information</Title>
                        <DeliveryWrapper>
                        <form>
                            <InputError>{infoError.name}</InputError>
                            <Input required type="text" name="name" placeholder="Full Name" onChange={handlePaymentInfo} />
                            <InputError>{infoError.phone}</InputError>
                            <Input required type="text" name="phone" placeholder="Phone Number" onChange={handlePaymentInfo} />
                            <InputError>{infoError.address}</InputError>
                            <Input required type="text" name="address" placeholder="Address" onChange={handlePaymentInfo} />
                            <InputError>{infoError.email}</InputError>
                            <Input required type="email" name="email" placeholder="Email" onChange={handlePaymentInfo} />
                            <Input type="text" name="note" placeholder="Addtional Note" onChange={handlePaymentInfo} />
                        </form>
                        </DeliveryWrapper>
                        <Title>Payment Methods</Title>
                        <InputError>{infoError.paymentMethod}</InputError>
                        <PaymentItem>
                            <PaymentBtn className="radioBtn" type="radio" name="paymentMethod" value="cod" onClick={handlePaymentInfo} />
                            <span className="checkmark"></span>
                            <PaymentName className="paymentMethod">Cash On Delivery</PaymentName>
                        </PaymentItem>
                        <PaymentItem>
                            <PaymentBtn className="radioBtn" type="radio" name="paymentMethod" value="momo" onClick={handlePaymentInfo} />
                            <span className="checkmark"></span>
                            <PaymentName className="paymentMethod">Momo</PaymentName>
                        </PaymentItem>
                        <PaymentItem>
                            <PaymentBtn className="radioBtn" type="radio" name="paymentMethod" value="vnpay" onClick={handlePaymentInfo} />
                            <span className="checkmark"></span>
                            <PaymentName>VNPay</PaymentName>
                        </PaymentItem>
                        <PaymentItem>
                            <PaymentBtn className="radioBtn" type="radio" name="paymentMethod" value="banktransfer" onClick={handlePaymentInfo} />
                            <span className="checkmark"></span>
                            <PaymentName>Bank Transfer</PaymentName>
                        </PaymentItem>
                        <PaymentItem>
                            <PaymentBtn className="radioBtn" type="radio" name="paymentMethod" value="card" onClick={handlePaymentInfo} />
                            <span className="checkmark"></span>
                            <PaymentName>Credit/Debit Card</PaymentName>
                        </PaymentItem>
                    </InfoContainer>
                </InfoWrapper>
                <CartContainer>
                    <Title>Giỏ hàng</Title>
                    <Info>
                        {(cart.products) && cart.products.map((e, idx) => (
                            <div>
                                <Product>
                                        <Image src={e.img} />
                                        <Details>
                                            <ProductName>
                                                {e.title}
                                            </ProductName>
                                            <ProductInfo>
                                                Color: {e.color}, Size: {e.size}
                                            </ProductInfo>
                                            {/* <ProductColor color={e.color} /> */}
                                            <PriceDetail>
                                                <ProductAmount>Quantity: {e.quantity}</ProductAmount>
                                                <ProductPrice>$ {e.price * e.quantity}</ProductPrice>
                                            </PriceDetail>
                                        </Details>               
                                </Product>
                                {/* <Hr /> */}
                            </div>
                        ))}
                        {(!(cart.products)) && "Your cart is empty! Let's fill it up"}
                    </Info>
                    <Hr/>
                    <VoucherWrapper>
                        <VoucherCode type="text" name="voucher-code" placeholder="Voucher" value={voucherCode} onChange={(e)=>setVoucherCode(e.target.value)}/>
                        <ApplyButton onClick={handleVoucherApply}>Apply</ApplyButton>
                    </VoucherWrapper>
                    <Summary>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping</SummaryItemText>
                            <SummaryItemPrice>$ {shippingFee}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Discount</SummaryItemText>
                            <SummaryItemPrice>$ {discount}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>$ {checkoutAmount}</SummaryItemPrice>
                        </SummaryItem>
                    </Summary>
                    <Button onClick={handleCheckout}>Checkout</Button>
                </CartContainer>
            </Wrapper>
        </Container>
    )
}

export default Checkout