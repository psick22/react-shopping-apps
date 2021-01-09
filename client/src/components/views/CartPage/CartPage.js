import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCartItems } from '../../../_actions/user_actions';

function CartPage(props) {
  const dispatch = useDispatch();

  // TODO 스토어 안쓰는 방법 해보기

  useEffect(() => {
    let cartItems = [];

    // NOTE 1. 리덕스 user state안에 cart 안에 상품이 들어있는지 확인
    if (props.user.userData && props.user.userData.cart) {
      if (props.user.userData.cart.length > 0) {
        props.user.userData.cart.forEach(item => {
          cartItems.push(item.id);
        });
        console.log('cartItems', cartItems);
        dispatch(getCartItems(cartItems, props.user.userData.cart));
      }
    }
  }, [props.user.userData]);

  return <div>CartPage</div>;
}

export default CartPage;
