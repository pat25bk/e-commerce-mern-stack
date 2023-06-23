import { categories } from "../data";
import styled from "styled-components";
import CategoryItem from "./CategoryItem";
import { mobile } from "../reponsive";

const Container = styled.div`
  display: flex;
  padding: 20px;
  ${mobile({ padding: 0, flexDirection: "column" })}
`;

function Categories() {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem key={item.id} item={item} />
      ))}
    </Container>
  );
}

export default Categories;
