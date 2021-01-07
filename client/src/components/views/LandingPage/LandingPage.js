import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Card, Row, Collapse } from 'antd';
import { RocketOutlined } from '@ant-design/icons';
import ImageSlider from '../../utils/ImageSlider';
import Checkbox from './Sections/Checkbox.js';
import { continents, priceFilter } from './Sections/Datas';

const { Meta } = Card;

function LandingPage() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [postSize, setPostSize] = useState(0);
  const [filters, setFilters] = useState({
    continents: [],
    price: [],
  });

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
        console.log('데이터 로딩 성공');
        if (body.loadMore) {
          setProducts([...products, ...response.data.productInfo]);
        } else {
          setProducts(response.data.productInfo);
        }
        setPostSize(response.data.postSize);
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
    // console.log(product);

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
  const showFilteredResults = filter => {
    // filter 는 {category : [id, id,,,]} 의 오브젝트로 들어옴
    // 불러온 데이터에서 category 가 해당 id와 일치하는 데이터만 불러옴 (getProducts)

    let body = {
      skip: 0,
      limit: limit,
      loadMore: false,
      filters: filter,
    };
    setSkip(0);
    getProducts(body);
  };

  const handleFilters = (filter, category) => {
    const newFilters = { ...filters };
    newFilters[category] = [...filter];
    console.log('필터', filter);
    console.log('뉴필터', newFilters);

    showFilteredResults(newFilters);

    setFilters(newFilters);
  };

  return (
    <div style={{ width: '75%', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>
          DAPANDA <RocketOutlined />
        </h2>
      </div>
      {/* Filter */}
      <div>
        <Checkbox
          continents={continents}
          priceFilter={priceFilter}
          handleFilters={filter => handleFilters(filter, 'continents')}
        ></Checkbox>
      </div>

      {/* Search */}
      {/* Cards */}
      <Row gutter={(16, 16)}>{renderCards}</Row>

      {postSize >= limit && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={loadMoreHandler}>더보기</button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
