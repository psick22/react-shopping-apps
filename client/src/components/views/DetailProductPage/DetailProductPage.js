import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import { Row, Col, Descriptions, Badge, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../_actions/user_actions';

function DetailProductPage({ match }) {
  const dispatch = useDispatch();

  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);

  const productID = match.params.productID;

  const onClickHandler = e => {
    // Add to Cart 버튼을 클릭하면 필요한 정보를 user 데이터스키마에 전달 (cart와 histroy 필드)
    // 상품 아이디, 갯수, 넣은 날짜
    // user 스키마에 관련 된 것은 redux를 이용했기 때문에 이 부분도 redux로 처리
    console.log(e);
    console.log('product._id:', product._id);

    // useDispatch로 액션을 실행하며 상품 아이디를 전달
    dispatch(addToCart(product._id));
  };

  useEffect(() => {
    axios
      .get(`/api/product/products_by_id?id=${productID}&type=single`)
      .then(response => {
        setProduct(response.data[0]);
        const newImage = response.data[0].images;
        const imageList = newImage.map(image => {
          const obj = {
            original: image,
            thumbnail: image,
          };
          return obj;
        });
        setImages(imageList);
      })
      .catch(err => alert(err));
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
