import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { mobile } from "../reponsive";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { modifyProduct } from "../redux/cartRedux";
const STRIPE_KEY= "pk_test_51MnIMcEDnPfxhLq1SmrlbGopqEuoc4fJQRNef0fukrRCJGuty19ORXMOL5R302gtu3NNTcsGMeCMTw71xP4qBZ6X00aSv1IwIf";
const Container = styled.div``;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const TopButton = styled.button`
  font-weight: 600;
  padding: 10px;
  cursor: pointer;
  border: 2px solid black;
  border-radius: 5px;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 10px gray;
  }
`;

const TopTexts = styled.div`
${mobile({display:"none"})}`;

const TopText = styled.span`
  cursor: pointer;
  text-decoration: underline;
  margin: 0 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({flexDirection:"column"})}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
// Product Detail elements
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
  object-fit: cover;
  ${mobile({width:"120px"})}
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${mobile({fontSize:"0.8em"})}
`;

const ProductName = styled.p``;

const ProductId = styled.p``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
const ProductSize = styled.p``;
// Price Detail elements
const PriceDetail = styled.div`
  font-size:30px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  ${mobile({
  flexDirection:"row",
  justifyContent:"space-between",
  alignItems:"center",
  fontSize:"1em"})}
`;

const ProductAmountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgray;
  border-radius:5px;
  margin-bottom: 20px;
  ${mobile({marginBottom:"0"})}
`;

const ProductAmount = styled.span`
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.p`
  font-weight: 200;
`;

const Hr = styled.hr`
  margin: 10px;
  border: 1px solid #eee;
`;

// Summary elements
const Summary = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: 50vh;
  border-radius: 10px;
  border: 0.5px solid lightgray;
`;

const SummaryTitle = styled.p`
  text-align: center;
  font-size: 30px;
  margin-bottom: 20px;
  font-weight: 200;
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
  width: 100%;
  padding: 10px;
  font-weight: 600;
  background-color: black;
  border-radius: 5px;
  border: none;
  color: white;
  &:hover {
    background-color: teal;
  }
`;

function Cart() {
  const cart = useSelector(state=>state.root.cart);
  console.log(cart);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

    const onToken = (token)=>{
        console.log(token);
        setStripeToken(token);
    };

    useEffect(()=>{
        const makeRequest = async()=>{
            try{
                const res = await axios.post("http://localhost:5000/api/stripe/payment",{
                    tokenId:stripeToken.id,
                    amount:cart.total*100,
                });
                console.log(res.data);
                navigate("/success",{state:res.data});
            }catch(err){
                console.log(err)
            }
        }
        if(stripeToken) makeRequest();
    },[stripeToken])

    console.log((cart.products));
  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>Your Bag</Title>
        <Top>
          <TopButton color="black" bgColor="white">
            Continue Shopping
          </TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist(0)</TopText>
          </TopTexts>
          <TopButton color="white" bgColor="black">
            Checkout Now
          </TopButton>
        </Top>
        <Bottom>
          <Info>
            {(cart.products)&&cart.products.map((e,idx)=>(
              <div>
              <Product>
              <ProductDetail>
                <Image src={e.img}/>
                <Details>
                  <ProductName>
                    <b>Product:</b> {e.title}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> {e._id}
                  </ProductId>
                  <ProductColor color={e.color} />
                  <ProductSize>
                    <b>Size:</b> {e.size}
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <AddIcon onClick={()=>dispatch(modifyProduct({amount:1,productIdx:idx}))}/>
                  <ProductAmount>{e.quantity}</ProductAmount>
                  <RemoveIcon onClick={()=>dispatch(modifyProduct({amount:-1,productIdx:idx}))} />
                </ProductAmountContainer>
                <ProductPrice>$ {e.price*e.quantity}</ProductPrice>
              </PriceDetail>
            </Product>
            <Hr />
            </div>
            ))}
            {(!(cart.products))&&"Your cart is empty! Let's fill it up"}
          </Info>

          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Fee</SummaryItemText>
              <SummaryItemPrice>$ 5</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>

           
            {/* <StripeCheckout
            name="Amazon"
            billingAddress
            shippingAddress
            description={`Your total amount is $ ${cart.total}`}
            amount={cart.total*100}
            token={onToken}
            stripeKey="pk_test_51MnIMcEDnPfxhLq1SmrlbGopqEuoc4fJQRNef0fukrRCJGuty19ORXMOL5R302gtu3NNTcsGMeCMTw71xP4qBZ6X00aSv1IwIf"
            >
            <Button>CHECKOUT</Button>
            </StripeCheckout> */}
            <Button onClick={()=>navigate("/checkout")}>CHECKOUT</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
}

export default Cart;
