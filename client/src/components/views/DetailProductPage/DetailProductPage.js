import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DetailProductPage({ match }) {
  const [product, setProduct] = useState({});

  console.log(match);
  const productID = match.params.productID;

  useEffect(() => {
    axios
      .get(`/api/product/products_by_id?id=${productID}&type=single`)
      .then(response => {
        if (response.data.success) {
          console.log(
            '상세 정보 가져오기 성공 - product :',
            response.data.product[0],
          );
          setProduct(response.data.product[0]);
        } else {
          alert('상세 정보 가져오기를 실패하였습니다.');
        }
      });
  }, []);

  return <div>{product.title}</div>;
}

export default DetailProductPage;
