import styled from "styled-components";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
import { sliderItems } from "../data";
import { mobile } from "../reponsive";
const Container = styled.div`
  width: 100%;
  height: 100vh;
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
  transform: translateX(${(props) => props.slideIdx * -100}vw);
`;

const Slide = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  background-color: ${(props) => props.bg};
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
`;
const Img = styled.img`
  height: 100%;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 70px;
`;
const Discipt = styled.p`
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 2px;
  margin: 50px 0;
`;
const Button = styled.button`
  font-size: 20px;
  padding: 10px;
  background-color: transparent;
  border-radius: 5px;
`;

function SlideTemplate(props) {
  return (
    <Slide bg={props.bg}>
      <ImgContainer>
        <Img src={props.img} />
      </ImgContainer>
      <InfoContainer>
        <Title>{props.title}</Title>
        <Discipt>{props.desc}</Discipt>
        <Button>Discover</Button>
      </InfoContainer>
    </Slide>
  );
}

function Slider() {
  const [slideIdx, setSlideIdx] = useState(0);

  function handleClick(direct) {
    console.log(slideIdx);
    let newSlideIdx = 0;
    if (direct === "left")
      if (slideIdx > 0) newSlideIdx = slideIdx - 1;
      else newSlideIdx = 2;
    else if (slideIdx < 2) newSlideIdx = slideIdx + 1;
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
        <Wrapper slideIdx={slideIdx}>
          {sliderItems.map((item) => (
            <SlideTemplate
              key={item.id}
              bg={item.bg}
              img={item.img}
              title={item.title}
              desc={item.desc}
            />
          ))}
        </Wrapper>
        <Arrow direction="right" onClick={() => handleClick("right")}>
          <ArrowForwardIosIcon />
        </Arrow>
      </Container>
    </div>
  );
}

export default Slider;
