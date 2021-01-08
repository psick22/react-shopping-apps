import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import { Row, Col, Descriptions, Badge, Button } from 'antd';

function DetailProductPage({ match }) {
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);

  const productID = match.params.productID;
  const onClickHandler = e => {
    console.log(e.currentTarget);
  };

  useEffect(() => {
    axios
      .get(`/api/product/products_by_id?id=${productID}&type=single`)
      .then(response => {
        if (response.data.success) {
          console.log(
            '상세 정보 가져오기 성공 - product[0] :',
            response.data.product[0],
          );
          setProduct(response.data.product[0]);
          const newImage = response.data.product[0].images;
          const imageList = newImage.map(image => {
            const obj = {
              original: image,
              thumbnail: image,
            };
            return obj;
          });
          setImages(imageList);
        } else {
          alert('상세 정보 가져오기를 실패하였습니다.');
        }
      });
  }, []);

  console.log('state:', images);

  return (
    <div style={{ width: '100%', padding: '3rem 4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1>{product.title}</h1>
      </div>
      <br />
      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24}>
          <ImageGallery items={images} />
        </Col>
        <Col lg={12} sm={24}>
          <div>
            <Descriptions title='상품 정보' bordered>
              <Descriptions.Item label='Price'>
                {`$ ${product.price}`}
              </Descriptions.Item>
              <Descriptions.Item label='Sold'>{product.sold}</Descriptions.Item>
              <Descriptions.Item label='Views'>
                {product.views}
              </Descriptions.Item>
              <Descriptions.Item label='Description'>
                {product.description}
              </Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div>
              <Button
                type='danger'
                shape='round'
                size='large'
                onClick={onClickHandler}
              >
                장바구니 담기
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default DetailProductPage;
