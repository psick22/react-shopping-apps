import React, { useEffect, useState } from 'react';
import { FaCode } from 'react-icons/fa';
import axios from 'axios';
import { Col, Card, Row, Carousel } from 'antd';
import { RocketOutlined } from '@ant-design/icons';
import ImageSlider from '../../utils/ImageSlider';
const { Meta } = Card;

function LandingPage() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);

  useEffect(() => {
    let body = {
      skip: skip,
      limit: limit,
    };
    getProducts(body);
  }, []);

  const getProducts = body => {
    axios.post('/api/product/products', body).then(response => {
      if (response.data.success) {
        console.log('성공');
        if (body.loadMore) {
          setProducts([...products, ...response.data.productInfo]);
        } else {
          setProducts(response.data.productInfo);
        }
      } else {
        alert('상품을 가져오는 것에 실패하였습니다.');
      }
    });
  };

  const loadMoreHandler = e => {
    let moreSkip = skip + limit;

    let body = {
      skip: moreSkip,
      limit: limit,
      loadMore: true,
    };
    getProducts(body);
    setSkip(moreSkip);
  };
  const renderCards = products.map((product, index) => {
    console.log(product);

    return (
      <Col key={index} lg={6} md={8} xs={24} style={{ padding: '5px' }}>
        <Card
          style={{ height: '100%' }}
          cover={<ImageSlider images={product.images} />}
        >
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  return (
    <div style={{ width: '75%', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>
          DAPANDA <RocketOutlined />
        </h2>
      </div>
      {/* Filter */}
      {/* Search */}
      {/* Cards */}
      <Row gutter={(16, 16)}>{renderCards}</Row>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={loadMoreHandler}>더보기</button>
      </div>
    </div>
  );
}

export default LandingPage;
