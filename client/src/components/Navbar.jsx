import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { mobile } from "../reponsive";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { logout } from "../redux/userRedux";

const Container = styled.div`
  height: 65px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "10px 0" })};
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })};
`;

const SearchContainer = styled.div`
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ marginLeft: "5px" })};
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })};
`;

const Center = styled.div`
  flex: 2;
  ${'' /* text-align: center; */}
  align-item:center;
  justify-content:center;
  display:flex;
  ${'' /* background-color:gray; */}
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })};
`;

const Right = styled.div`
  flex: 2;
  display: flex;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "flex-start" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  margin-left: 25px;
  cursor:pointer;
  ${mobile({ fontSize: "12px", marginLeft: "7px" })};
`;

const MenuTitle = styled.div`
padding:15px 0;
`;

const MenuBox = styled.div`
padding-bottom:5px;
&:hover{
  border-bottom:2px solid;
  }
`;

//-----------------------------------------
//-----------------------------------------

const CateContainer= styled.div`
  background-color:white;
  position:absolute;
  left:0;
  width:100%;
  z-index:2;
  padding:20px;
  box-sizing:border-box;
`;

const ProductTableWrapper = styled.div`
  display:flex;
  justify-content:space-between;
`
const CateItem = styled.div`

`
const CateList = styled.ul`
  list-style-type: none;
  padding:0;
  margin:0;
`
const ListItem = styled.li`
padding-bottom:3px;
font-size:14px;
&:hover{
  color:deepskyblue;
}
`;

function ProductTable(props) {
  const topCats = ["T-Shirt","Shirt","Polo"];
  const botCats = ["Pants","Jeans","Chinos","Joggers"];
  const outCats = ["Jacket","Coat","Hoodie"]
  const accessCats = ["Underwears","Belt","Cap","Sunglasses"];
  
  return (
    <CateContainer>
    <ProductTableWrapper>
      <CateItem>
        <CateList>
          <ListItem><strong><Link style={{all:"unset"}} to="/products/top">Top</Link></strong></ListItem>
          {topCats.map((cat,idx)=>
             <ListItem key={idx}><Link style={{all:"unset"}} to={"/products/"+cat}>{cat}</Link></ListItem>
          )}
        </CateList>
      </CateItem>
      <CateItem>
        <CateList>
        <ListItem><strong><Link style={{all:"unset"}} to="/products/Bottom">Bottom</Link></strong></ListItem>
        {botCats.map((cat,idx)=>(
            <ListItem key={idx}><Link style={{all:"unset"}} to={"/products/"+cat}>{cat}</Link></ListItem>
          ))}
        </CateList>
      </CateItem>
      <CateItem>
        <CateList>
        <ListItem><strong><Link style={{all:"unset"}} to="/products/Outwear">Outwear</Link></strong></ListItem>
        {outCats.map((cat,idx)=>(
            <ListItem key={idx}><Link style={{all:"unset"}} to={"/products/"+cat}>{cat}</Link></ListItem>
          ))}
        </CateList>
      </CateItem>
      <CateItem>
        <CateList>
        <ListItem><strong><Link style={{all:"unset"}} to="/products/Accessories">Accessories</Link></strong></ListItem>
        {accessCats.map((cat,idx)=>(
            <ListItem key={idx}><Link style={{all:"unset"}} to={"/products/"+cat}>{cat}</Link></ListItem>
          ))}
        </CateList>
      </CateItem>

    </ProductTableWrapper>
    </CateContainer>
  );
}

const AccountItem = styled.p`
padding:10px;
&:hover{
  background-color:lightgray;
}`;

const AccountWrapper = styled.div`
background-color:white;
position:absolute;
z-index:2;
right:60px;
box-sizing:border-box;
border:1px solid lightgray;
border-radius:5px;
transition:all 2s ease;
`;

const AccountMenu = ({username,handleLogout})=>{
  return (
    <AccountWrapper>
        <div style={{padding:"10px"}}><strong>{username}</strong></div>
        <AccountItem>My Account</AccountItem>
        <AccountItem>My orders</AccountItem>
        <AccountItem>My wishlist</AccountItem>
        <AccountItem onClick={handleLogout}>Sign out</AccountItem>
    </AccountWrapper>
  )
}

function Navbar() {
  const [showProduct, setShowProduct] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const cartQuantity = useSelector(state => state.root.cart.quantity);
  const [searchText, setSearchText]  = useState("");
  const user = useSelector(state=>state.root.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchText = (e)=>{
    setSearchText(e.target.value);
  }

  const handleSearchBtn = ()=>{
    navigate("/products/search",{state:{keywords:searchText}});
    setSearchText("");
  }

  const handleLogout=()=>{
    console.log("provoke dispatch(logout)");
    dispatch(logout());
  };

  const handleCartBtn=()=>{
    if (cartQuantity==0){
      alert("Your shopping bag is empty!");
    }else
    navigate("/cart");
  }
  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo><Link style={{all:"unset"}} to="/">GEEK</Link></Logo>
        </Left>
        <Center>
          <MenuItem><MenuTitle><MenuBox><Link style={{all:"unset"}} to="/">HOME</Link></MenuBox></MenuTitle></MenuItem>
          <MenuItem onClick={()=>setShowProduct(!showProduct)}
          onMouseOver={()=>setShowProduct(true)} onMouseLeave={()=>setShowProduct(false)} ><MenuTitle><MenuBox><Link style={{all:"unset"}} to={"/products/all-products"}>PRODUCTS</Link></MenuBox></MenuTitle>
          {showProduct&&<ProductTable/>}</MenuItem>
          <MenuItem><MenuTitle><MenuBox>COLLECTIONS</MenuBox></MenuTitle></MenuItem>
          <MenuItem><MenuTitle><MenuBox>SALE</MenuBox></MenuTitle></MenuItem>
        </Center>
        <Right>
          <SearchContainer>
            <Input placeholder="Search" value={searchText} onChange={handleSearchText}/>
            <SearchIcon style={{ color: "gray", fontSize: "16px" }} onClick={handleSearchBtn} />
          </SearchContainer>
          {user?
          <MenuItem 
          onClick={()=>setShowAccount(!showAccount)} 
          onMouseOver={()=>setShowAccount(true)} 
          onMouseLeave={()=>setShowAccount(false)}><MenuBox><AccountCircleIcon/></MenuBox>
          {showAccount&&<AccountMenu username={user.username} handleLogout={handleLogout}/>}</MenuItem>:
          <MenuItem><MenuBox><Link style={{all:"unset"}} to="/login">SIGN IN</Link></MenuBox></MenuItem>
          }
          
            <MenuItem>
              <Badge badgeContent={cartQuantity} color="primary" onClick={handleCartBtn}>
                <ShoppingCartIcon />
              </Badge>
            </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
}

export default Navbar;
