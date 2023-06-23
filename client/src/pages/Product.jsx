import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {mobile} from "../reponsive"
import { useLocation } from "react-router";
import { publicRequest } from "../axiosRequest";
import { useEffect, useState } from "react";
import _ from "lodash";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import Carousel from "../components/Carousel";
import "./Product.css"
import LightBox from "../components/LightBox";

const Wrapper = styled.div`
  display: flex;
  padding: 50px;
  ${mobile({flexDirection:"column",padding:"10px"})}
`;
const ImageContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({height:"70vh"})}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
  ${mobile({padding:"10px"})}
`;

const Desc = styled.p`
  margin-bottom: 20px;
`;

const Price = styled.p`
  margin-bottom: 20px;
  font-size: 40px;
  font-weight: 100;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-weight: 200;
`;

const FilterContainer = styled.div`
  display: flex;
`;

const Filter = styled.div`
  margin: 20px;
  margin-left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FilterColor = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  margin: 0 5px;
  background-color: ${(props) => props.color};
  cursor: pointer;
`;

const FilterText = styled.span`
  font-size: 20px;
  margin-right: 10px;
  font-weight: 200;
`;

const Select = styled.select`
  padding: 5px;
  margin-right: 10px;
`;

const Option = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  ${mobile({width:"100%"})}
`;

const Button = styled.button`
  padding: 15px;
  border-radius: 10px;
  border: solid 2px teal;
  font-weight: 500;
  font-size: 15px;
  background-color: white;

  &:hover {
    background-color: teal;
  }
`;

const AmountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Amount = styled.span`
  font-weight: 700;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: solid 2px teal;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
`;

const AddPopup = styled.div`
position:absolute;
right:0;
z-index:1;
padding:20px;
background-color:black;
color:white;
`;

const BtnContainer = styled.label`
margin:5px;`;

const RadioBtn = styled.input`
display:none;
`;

const Checkmark = styled.span``;

function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [product,setProduct] = useState({});
  const [quantity,setQuantity] = useState(1);
  const [color,setColor] = useState(null);
  const [size,setSize] = useState(null);
  const [visible,setVisible] = useState(false);
  const dispatch = useDispatch();
  const [modalDisplay,setModalDisplay] = useState(false);

  useEffect(()=>{
    const getProduct = async()=>{
      try{ 
        const res = await publicRequest.get(`/product/find/${productId}`);
        setProduct(res.data);
        setColor(res.data.color[0]);
        setSize(res.data.size[0]);
      }
      catch(err){
        console.log(err);
      }
    }
    getProduct();
  },[productId]);
  
  function handleQuantity(e){
  if(e==="add")
    setQuantity(quantity+1);
  else
    (quantity>1)&&setQuantity(quantity-1);
  }

  const handleAddProduct =()=>{
    dispatch(addProduct({
      ...product,quantity,color,size}))
    setVisible(true);
    setTimeout(()=>{setVisible(false)},2000);
  }

  // console.log(color,size);
  console.log("Product",_.isEmpty(product));
  console.log(color,size,quantity);
  const closeModal=()=>{
    setModalDisplay(false);
  }

    return (
      <div>
      {modalDisplay&&(<LightBox imageList={product.img}  closeModal={closeModal}/>)}
      <Announcement />
      <Navbar />
      {visible&&<AddPopup>
      Added product into cart !
      </AddPopup>}
      <Wrapper>
        <ImageContainer onClick={()=>setModalDisplay(true)}>
          {/* <Image src={product.img} />
           */}
          <Carousel imageUrls={_.isEmpty(product)?[]:product.img}/>
        </ImageContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>
            {product.desc}
          </Desc>
          <Price>{product.price} $</Price>
          <FilterContainer>
            <Filter>
              <FilterText>Color</FilterText>
              {/* {product.color?.map(c=><FilterColor color={c} onClick={()=>setColor(c)} key={c}></FilterColor>)} */}
              {product.color?.map((c,idx)=>{
              return (
              <BtnContainer key={c}  onClick={()=>setColor(c)}>
                <RadioBtn  className="radioBtn" type="radio" name="colorSelect" checked={color==c}></RadioBtn>
                <div className="selectBorder">
                  <Checkmark className="checkmarkColor" style={{background:c}}></Checkmark>
                </div>
              </BtnContainer>)
              })}
            </Filter>
            <Filter>
              <FilterText>Size</FilterText>
              <Select onChange={(e)=>setSize(e.target.value)}>
                {product.size?.map(size=><Option key={size}>{_.upperCase(size)}</Option>)}
              </Select>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <RemoveIcon onClick={()=>handleQuantity("remove")}/>
              <Amount>{quantity}</Amount>
              <AddIcon onClick={()=>handleQuantity("add")}/>
            </AmountContainer>
            <Button onClick={handleAddProduct}>Add to Cart</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Product;
