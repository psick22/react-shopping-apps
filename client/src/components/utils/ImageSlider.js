import React from 'react';
import { Carousel } from 'antd';
import './style/ImageSlider.css';

function ImageSlider({ images }) {
  // console.log(images);
  return (
    <div>
      <Carousel autoplay>
        {images.map((image, index) => {
          return (
            <div key={index}>
              {/* {console.log(image)} */}
              <img
                style={{ width: '100%', height: '200px' }}
                src={image}
                alt={index}
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default ImageSlider;
