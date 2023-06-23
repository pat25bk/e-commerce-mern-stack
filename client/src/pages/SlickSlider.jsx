import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import styled from "styled-components";
import './SlickSlider.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Carousel from '../components/Carousel';

const Image = styled.img`
height:80px;
`;

const SliderContainer = styled.div`
width:50vw;
`;

const SlideContainer = styled.div`
margin:0
padding:0`;

const SlickSlider =()=>{
    const [nav1, setNav1] = useState();
    const [nav2, setNav2] = useState();
  
    return (
      <div>
        <Carousel/>
        <h2>Slider Syncing (AsNavFor)</h2>
        <h4>First Slider</h4>
        <Slider asNavFor={nav2} ref={(slider1) => setNav1(slider1)}>
          <div>
      
            <Image src="https://www.prada.com/content/dam/pradabkg_products/U/UCS/UCS438/1VIUF03LT/UCS438_1VIU_F03LT_S_231_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.800.1000.webp"></Image>
          </div>
          <div>
            
            <Image src="https://www.prada.com/content/dam/pradabkg_products/U/UCS/UCS438/1VIUF03LT/UCS438_1VIU_F03LT_S_231_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.800.1000.webp"></Image>
          </div>
          <div>
            
            <Image src="https://www.prada.com/content/dam/pradabkg_products/U/UCS/UCS438/1VIUF03LT/UCS438_1VIU_F03LT_S_231_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.800.1000.webp"></Image>
          </div>
          <div>
            
            <Image src="https://www.prada.com/content/dam/pradabkg_products/U/UCS/UCS438/1VIUF03LT/UCS438_1VIU_F03LT_S_231_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.800.1000.webp"></Image>
          </div>
          <div>
            
            <Image src="https://www.prada.com/content/dam/pradabkg_products/U/UCS/UCS438/1VIUF03LT/UCS438_1VIU_F03LT_S_231_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.800.1000.webp"></Image>
          </div>
          <div>
            
            <Image src="https://www.prada.com/content/dam/pradabkg_products/U/UCS/UCS438/1VIUF03LT/UCS438_1VIU_F03LT_S_231_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.800.1000.webp"></Image>
          </div>
        </Slider>
        <h4>Second Slider</h4>
        <SliderContainer>
        <Slider
          asNavFor={nav1}
          ref={(slider2) => setNav2(slider2)}
          slidesToShow={5}
          swipeToSlide={true}
          focusOnSelect={true}
          centerMode={true}
        >
            <SlideContainer>
            0
            <Image src="https://www.prada.com/content/dam/pradabkg_products/U/UCS/UCS438/1VIUF03LT/UCS438_1VIU_F03LT_S_231_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.800.1000.webp"></Image>
            </SlideContainer>
            <SlideContainer>
            <Image src="https://www.prada.com/content/dam/pradabkg_products/U/UCS/UCS438/1VIUF03LT/UCS438_1VIU_F03LT_S_231_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.800.1000.webp"></Image>
            </SlideContainer>
            <SlideContainer>
            <Image src="https://www.prada.com/content/dam/pradabkg_products/U/UCS/UCS438/1VIUF03LT/UCS438_1VIU_F03LT_S_231_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.800.1000.webp"></Image>
            </SlideContainer>
            <SlideContainer>
            <Image src="https://www.prada.com/content/dam/pradabkg_products/U/UCS/UCS438/1VIUF03LT/UCS438_1VIU_F03LT_S_231_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.800.1000.webp"></Image>
</SlideContainer>
<SlideContainer>
            
            <Image src="https://www.prada.com/content/dam/pradabkg_products/U/UCS/UCS438/1VIUF03LT/UCS438_1VIU_F03LT_S_231_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.800.1000.webp"></Image>
</SlideContainer>
<SlideContainer>
            
            <Image src="https://www.prada.com/content/dam/pradabkg_products/U/UCS/UCS438/1VIUF03LT/UCS438_1VIU_F03LT_S_231_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.800.1000.webp"></Image>
</SlideContainer>
        </Slider>
        </SliderContainer>
      </div>
    );

    
//     const slider1 = useRef(null)
//     const slider2 = useRef(null)
  
//     return (
//       <div>
//         <h2>Slider Syncing (AsNavFor)</h2>
//         <h4>First Slider</h4>
//         <Slider
//           asNavFor={slider2.current}
//           ref={slider1}
//         >
//  <div>
//             <h3>1</h3>
//           </div>
//           <div>
//             <h3>2</h3>
//           </div>
//           <div>
//             <h3>3</h3>
//           </div>
//         </Slider>
  
//         <h4>Second Slider</h4>
//         <Slider
//           asNavFor={slider1.current}
//           ref={slider2}
//         >
//            <div>
//             <h3>1</h3>
//           </div>
//           <div>
//             <h3>2</h3>
//           </div>
//           <div>
//             <h3>3</h3>
//           </div>
//         </Slider>
//       </div>
//     );
}

export default SlickSlider;