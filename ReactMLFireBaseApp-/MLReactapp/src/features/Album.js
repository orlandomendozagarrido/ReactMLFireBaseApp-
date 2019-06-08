import React from "react";
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from
"mdbreact";
import GlitchEffect from 'react-glitch-effect';

const CarouselPage = () => {
  return (
    <MDBContainer>
      <MDBCarousel
        activeItem={1}
        length={3}
        showControls={false}
        showIndicators={false}
        className="z-depth-1"
      >
        <MDBCarouselInner>
          <MDBCarouselItem itemId="1">
            <MDBView>
            <GlitchEffect>
              <img
                className="responsive"
                src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2013/11/18/18/rooftopping4-tr.jpg"
                alt="First slide"
              />
              </GlitchEffect>
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="2">
            <MDBView>
            <GlitchEffect>
              <img
                className="responsive"
                src="https://images.unsplash.com/photo-1482550834079-04c50f02cfa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
                alt="Second slide"
              />
            </GlitchEffect>  
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="3">
            <MDBView>
            <GlitchEffect>
              <img
                className="responsive"
                src="https://mdbootstrap.com/img/Photos/Slides/img%20(31).jpg"
                alt="Third slide"
              />
              </GlitchEffect>
            </MDBView>
          </MDBCarouselItem>
        </MDBCarouselInner>
      </MDBCarousel>
    </MDBContainer>
  );
}

export default CarouselPage;