import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../reponsive";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
  /* ${mobile({ height: "30vh" })}; */
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "30vh" })};
`;

const Info = styled.div`
  position: absolute;
  height: 100%;
  top: 0;
  z-index: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`;
const Button = styled.button`
  border: gray 0.5px;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
`;

function CategoryItem(props) {
  return (
    <Container>
      <Link to={'products/'+props.item.cat}>
      <Image src={props.item.img} />
      <Info>
        <Title>{props.item.title}</Title>
        <Button>SHOP NOW</Button>
      </Info>
      </Link>
    </Container>
  );
}

export default CategoryItem;
