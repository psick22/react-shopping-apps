import React from 'react';
import { Carousel } from 'antd';

function ImageSlider({ images }) {
  console.log(images);
  return (
    <div>
      <Carousel autoplay>
        {images.map((image, index) => {
          return (
            <div key={index}>
              {console.log(image)}
              <img
                style={{ width: '100%', maxHeight: '75%' }}
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
