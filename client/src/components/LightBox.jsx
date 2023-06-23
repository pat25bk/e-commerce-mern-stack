import { useRef, useState } from "react";
import styled from "styled-components";

const Modal = styled.div`
  height: 100vh;
  width: 100vw;
  background: rgba(0,0,0,0.9);
  position:fixed;
  z-index:10;
`;

const Wrapper = styled.div`
  height: 100%;
  width: 30%;
  margin-left: auto;
  margin-right: auto;
`;

const ImageCount = styled.span`
  position: absolute;
  padding: 5px;
  top: 0;
  left: 0;
  color: white;
`;

const MainSlide = styled.div`
  height: 80%;
  width: 100%;
  position: relative;
  padding-top:10px;
  padding-bottom:10px;
  box-sizing:border-box;
`;

const SlideBarContainer = styled.div`
  position: relative;
  height: 20%;
  width: 100%;
  box-sizing:border-box;
`;

const SlideBar = styled.div`
  height: 100%;
  width: 100%;
  overflow:auto;
  display: flex;
  align-items: center;
  background: black;
`;

const SlideItem = styled.div`
  height: 85%;
  min-width: 25%;
  opacity: ${(props) => props.$opacity};
  margin-right: 2%;
  &:hover {
    opacity: 1;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
  border-radius:5px;
  border:1px solid white;
`;

const ControlButton = styled.button`
  height: 70px;
  width: 50px;
  background-color: transparent;
  color: white;
  font-weight: bold;
  font-size: 20px;
  border: none;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  color: white;
  font-size: 50px;
  ${'' /* font-weight: bold; */}
  margin:0 35px;
  cursor: pointer;
  &:hover {
    color: gray;
  }
`;

const ScrollBtn = styled.button`
  height: 20%;
  border: none;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  background: transparent;
  color: white;
  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const LightBox = ({ imageList, closeModal }) => {
    const imgNum = imageList.length;
    const [OpacityList, SetOpacityList] = useState(new Array(imgNum).fill(0.5));
    const [mainIdx, setMainIdx] = useState(0);
    const scrollRef = useRef(null);
    const scrollMin = 0;
    const [scrollAmount, setScrollAmount] = useState(0);

    const handleClick = (color, idx) => {
        setMainIdx(idx);
        let newOpacity = new Array(imgNum).fill(0.5);
        newOpacity[idx] = 1;
        SetOpacityList(newOpacity);
    };

    const handleControlButton = (e) => {
        const direction = e.target.name;
        let newMainIdx = mainIdx;

        if (direction === "next") {
            if (mainIdx < imgNum - 1) newMainIdx = mainIdx + 1;
        } else {
            if (mainIdx > 0) newMainIdx = mainIdx - 1;
        }

        setMainIdx(newMainIdx);

        let newOpacity = new Array(imgNum).fill(0.5);
        newOpacity[newMainIdx] = 1;
        SetOpacityList(newOpacity);
    };

    //ScrollBar Control
    const handleScrollBtn = (e) => {
        const direction = e.target.name;
        const scrollMax = scrollRef.current.scrollWidth;
        let newScrollAmount;

        if (direction === "scroll-next") {
            newScrollAmount = Math.min(scrollAmount + 200, scrollMax);
        } else {
            newScrollAmount = Math.max(scrollAmount - 200, scrollMin);
        }

        scrollRef.current.scrollTo({
            top: 0,
            left: newScrollAmount,
            behavior: "smooth"
        });

        setScrollAmount(newScrollAmount);
    };

    return (
        <Modal>
            <CloseIcon onClick={closeModal}>&times;</CloseIcon>
            <Wrapper>
                <MainSlide>
                    <ImageCount>
                        {mainIdx + 1}/{imgNum}
                    </ImageCount>
                    <ControlButton
                        name="prev"
                        onClick={handleControlButton}
                        style={{ left: 0 }}
                    >
                        &#10094;
                    </ControlButton>
                    <ControlButton
                        name="next"
                        onClick={handleControlButton}
                        style={{ right: 0 }}
                    >
                        &#10095;
                    </ControlButton>
                    <Image src={imageList[mainIdx]} style={{objectFit:"cover"}} />
                </MainSlide>

                <SlideBarContainer>
                    <SlideBar className="slide-bar" ref={scrollRef}>
                        {imageList.map((url, idx) => (
                            <SlideItem
                                onClick={(e) => handleClick(url, idx)}
                                key={idx}
                                $opacity={OpacityList[idx]}
                                src={url}
                            >
                                <Image src={url} />
                            </SlideItem>
                        ))}
                    </SlideBar>
                    <ScrollBtn
                        name="scroll-prev"
                        onClick={handleScrollBtn}
                        style={{ left: "0" }}
                    >
                        &#10094;
                    </ScrollBtn>
                    <ScrollBtn
                        name="scroll-next"
                        onClick={handleScrollBtn}
                        style={{ right: "0" }}
                    >
                        &#10095;
                    </ScrollBtn>
                </SlideBarContainer>
            </Wrapper>
        </Modal>
    );
};

export default LightBox;
