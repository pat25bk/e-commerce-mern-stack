import styled from "styled-components";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, useNavigate } from "react-router-dom";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  transition: all 0.5s ease;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  flex-basis: 282.5px;
  flex-shrink:0;
  flex-grow:0;
  height: 350px;
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  background-color: #f6ddd5;
  position: relative;
  &:hover ${Info} {
    opacity: 1;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 80%;
  object-fit: cover;
  z-index: 2;
`;
const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: ivory;
  position: absolute;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 10px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease;
  &:hover {
    background-color: white;
    transform: scale(1.1);
  }
`;

const ProductInfo = styled.div`
  width: 100%;
  height: 20%;
  display:flex;
  flex-direction:column;
  ${'' /* align-items:center; */}
  justify-content:center`;
const InfoItem = styled.p`
padding:5px;
font-size:16px;
margin-left:10px;
`;

function Product({ item }) {
  const navigate = useNavigate();
  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <ProductInfo>
        <InfoItem>{item.title}</InfoItem>
        <InfoItem>$ {item.price}</InfoItem>
      </ProductInfo>
      <Info onClick={()=>navigate(`/product/${item._id}`)}>
        <Icon>
          <ShoppingCartIcon />
        </Icon>
        <Link to={`/product/${item._id}`}>
          <Icon>
            <SearchIcon />
          </Icon>
        </Link>
        <Icon>
          <FavoriteBorderIcon />
        </Icon>
      </Info>
    </Container>
  );
}

export default Product;
