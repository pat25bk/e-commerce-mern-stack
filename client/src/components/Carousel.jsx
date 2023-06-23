import styled from "styled-components";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
import { sliderItems } from "../data";
import { mobile } from "../reponsive";
const Container = styled.div`
  width: 40vw;
  height: 90vh;
  display: flex;
  /* background-color: ivory; */
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })}
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: ivory;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  right: ${(props) => props.direction === "right" && "10px"};
  left: ${(props) => props.direction === "left" && "10px"};
  margin: auto 0;
  opacity: 50%;
  cursor: pointer;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transform: translateX(${(props) => props.slideIdx * -40}vw);
`;

const Img = styled.img`
width:40vw;
object-fit:cover;
height: 100%;
`;

const Button = styled.button`
  font-size: 20px;
  padding: 10px;
  background-color: transparent;
  border-radius: 5px;
`;

const Index = styled.span`
position:absolute;
z-index:2;
background-color:white;
padding:5px 10px;
border-radius:5px;
opacity:50%;
`;

function Carousel(props) {
  const [slideIdx, setSlideIdx] = useState(0);
  console.log("props",props);
  const imageUrls = props.imageUrls;
  const numImages = imageUrls.length;

  function handleClick(direct) {
    console.log(slideIdx);
    let newSlideIdx = 0;
    if (direct === "left")
      if (slideIdx > 0) newSlideIdx = slideIdx - 1;
      else newSlideIdx = 2;
    else if (slideIdx < numImages) newSlideIdx = slideIdx + 1;
    else newSlideIdx = 0;
    console.log(newSlideIdx);
    setSlideIdx(newSlideIdx);
  }

  return (
    <div>
      <Container>
        <Arrow direction="left" onClick={() => handleClick("left")}>
          <ArrowBackIosIcon />
        </Arrow>
        <Index>
            {slideIdx}/{numImages}
        </Index>
        <Wrapper slideIdx={slideIdx}>
          {imageUrls.map((item,idx) => (
            <Img src={item}/>
          ))}
        </Wrapper>
        <Arrow direction="right" onClick={() => handleClick("right")}>
          <ArrowForwardIosIcon />
        </Arrow>
      </Container>
    </div>
  );
}

export default Carousel;
