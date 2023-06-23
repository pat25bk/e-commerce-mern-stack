import { useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import {mobile} from "../reponsive"
const Title = styled.h1`
  margin: 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;
const FilterText = styled.span`
  font-size: 20px;
  margin-right: 20px;
  font-weight: 600;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 10px;
  ${mobile({ margin: "10px 0px" })}
`;

const Option = styled.option``;

function ProductList() {
  const location = useLocation();
  const {state} = useLocation();
  let category = location.pathname.split("/")[2];
  let productListTitle = "";
  let keywords = "";
  console.log(category,state);
  
  //Search Page
  if(category==="search"){
    keywords = state.keywords;
    category="";
    productListTitle = `Searching results for "${keywords}"`;
  }
  else if(category==="all-products"){
    productListTitle = "All products";
    category="";
  }
  else
    productListTitle = category;


  const [filters,setFilters] = useState({})
  const [sort, setSort] = useState("newest");

  function handleFilters(event){
    const filterName = event.target.name;
    const filterValue = event.target.value;
    setFilters({
      ...filters,
      [filterName]:filterValue
    });
  }

  // console.log(category);
  // console.log(filters);
  // console.log(sort);
  return (
    <div>
      <Announcement />
      <Navbar />
      <Title>{productListTitle}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Product Filter</FilterText>
          <Select defaultValue={"Color"} onChange={handleFilters} name="color">
            <Option disabled>
              Color
            </Option>
            <Option >Red</Option>
            <Option >Blue</Option>
            <Option >Green</Option>
            <Option >White</Option>
            <Option >Black</Option>
          </Select>
          <Select defaultValue={"Size"} onChange={handleFilters} name="size">
            <Option disabled>
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Product</FilterText>
          <Select defaultValue={"newest"} onChange={e=>setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="price_asc">Price (asc)</Option>
            <Option value="price_desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={category} keywords={keywords} filters={filters} sort={sort} home={false}/>
      <Newsletter />
      <Footer />
    </div>
  );
}

export default ProductList;
