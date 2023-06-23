import styled from "styled-components";
import Product from "./Product";
import { popularProducts } from "../data";
import { mobile } from "../reponsive";
import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import axios from "axios";
import _ from "lodash"
import { publicRequest } from "../axiosRequest";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  ${mobile({ padding: "10px", justifyContent: "center" })};
`;

const PagContainer = styled.div`
  display:flex;
  justify-content:center;
  padding-bottom:20px;
`;



function Products({ cat, filters, sort, home, keywords}) {
  const [products, setProducts] = useState([]);
  const [filProds, setfilProds] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [maxPageNum, setMaxPageNum] = useState(0);

  const urlGen = () => {
    let url = "/product";
    const queryParameters = new URLSearchParams();
    pageNum && queryParameters.append("p", pageNum);
    cat && queryParameters.append("category", cat);
    sort && queryParameters.append("product_order", sort);
    keywords && queryParameters.append("keywords", keywords);
    const queryString = queryParameters.toString();
    url = `${url}?${queryString}`;
    console.log(url);
    return url;
  }

  useEffect(
    ()=>{
      setPageNum(null);
    }
  ,[cat]);
  
  useEffect(() => {
    const getProducts = async () => {
      try {
        const url = urlGen();
        console.log(url);
        const res = await publicRequest.get(url);
        setProducts(res.data.products);
        setMaxPageNum(res.data.maxPageNum);
      }
      catch (err) {
        console.log(err);
      }
    }
    getProducts();
  }, [cat, keywords, sort, pageNum]);

  useEffect(() => {
    setfilProds(
      products.filter((item) => Object.entries(filters).every(([key, value]) => item[key].includes(_.lowerCase(value))))
    );
  }, [products, filters])

  // useEffect(()=>{
  //   setfilProds((prev)=>{
  //     if(sort==="newest") return [...prev].sort((a,b)=>a.createdAt-b.createdAt);
  //     else if(sort=="asc") return [...prev].sort((a,b)=>a.price-b.price);
  //     else return [...prev].sort((a,b)=>b.price-a.price);
  //   })
  // },[sort])

  console.log(cat, filters, products, filProds);

  const handlePagination = (e, p) => {
    setPageNum(p);
  }

  return (
    <div>
      <Container>
        {home
          ? products.slice(0, 8).map((item) => (
            <Product key={item._id} item={item} />
          ))
          : filProds.map((item) => (
            <Product key={item._id} item={item} />
          ))}
      </Container>
      {
        (!home) &&
        <PagContainer>
          <Pagination count={maxPageNum || 0} page={pageNum} variant="outlined" color="primary" onChange={handlePagination} />
        </PagContainer>
      }
    </div>
  );
}

export default Products;
