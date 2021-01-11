import React, { useEffect, useState } from 'react';
import { Empty, Result, Button } from 'antd';

import { useDispatch } from 'react-redux';
import {
  getCartItems,
  removeCartItem,
  onTransactionSuccess,
} from '../../../_actions/user_actions';
import UserCartBlocks from './Sections/UserCartBlocks';
import Paypal from '../../utils/Paypal';

function CartPage(props) {
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [showTotal, setShowTotal] = useState(false);
  const [showSuccess, setshowSuccess] = useState(false);

  const removeItem = productId => {
    console.log('remove', productId);
    console.log(props.userData);

    dispatch(removeCartItem(productId)).then(response => {
      console.log('response', response);
      if (response.payload.productInfo.length <= 0) {
        setShowTotal(false);
      }
    });
  };

  const calculateTotal = cartDetail => {
    let sum = 0;
    cartDetail.map(product => {
      sum += parseInt(product.price, 10) * product.quantity;
    });
    setTotal(sum);
    setShowTotal(true);

    return total;
  };
  const transactionSuccess = payment => {
    dispatch(
      onTransactionSuccess({
        paymentData: payment,
        cartDetail: props.user.cartDetail,
      }),
    ).then(response => {
      if (response.payload.success) {
        setShowTotal(false);
        setshowSuccess(true);
      }
    });
  };

  useEffect(() => {
    let cartItems = [];

    // NOTE 1. 리덕스 user state안에 cart 안에 상품이 들어있는지 확인
    if (props.user.userData && props.user.userData.cart) {
      if (props.user.userData.cart.length > 0) {
        props.user.userData.cart.forEach(item => {
          cartItems.push(item.id);
        });
        console.log('cartItems', cartItems);
        dispatch(getCartItems(cartItems, props.user.userData.cart)).then(
          response => {
            calculateTotal(response.payload);
          },
        );
      }
    }
  }, [props.user.userData]);

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <h1>장바구니</h1>
      <div>
        <UserCartBlocks
          products={props.user.cartDetail}
          removeItem={removeItem}
        />
      </div>

      {showTotal ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h1>총액 : $ {total}</h1>
        </div>
      ) : showSuccess ? (
        <Result status='success' title='Successfully Purchased Items' />
      ) : (
        <Empty />
      )}
      {showTotal && <Paypal total={total} onSuccess={transactionSuccess} />}
    </div>
  );
}

export default CartPage;
