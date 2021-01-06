import React, { useEffect, useState } from 'react';
import { FaCode } from 'react-icons/fa';
import axios from 'axios';
import { Col, Card, Row } from 'antd';
import { RocketOutlined } from '@ant-design/icons';

const { Meta } = Card;

function LandingPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // let body = {

    // }
    axios.post('/api/product/products').then(response => {
      if (response.data.success) {
        console.log('성공');
        setProducts(response.data.productInfo);
      } else {
        alert('상품을 가져오는 것에 실패하였습니다.');
      }
    });
  }, []);

  const renderCards = products.map((product, index) => {
    console.log(product);
    const path = product.images[0];
    return (
      <Col key={index} lg={6} md={8} xs={24}>
        <Card
          cover={
            <img
              style={{ width: '100%', maxHeight: '75%' }}
              alt={index}
              src={path}
            />
          }
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
          Let's Travel everywhere <RocketOutlined />
        </h2>
      </div>
      {/* Filter */}

      {/* Search */}

      {/* Cards */}
      <Row gutter={(16, 16)}>{renderCards}</Row>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button>더보기</button>
      </div>
    </div>
  );
}

export default LandingPage;
