import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from '../hoc/auth';
// pages for this product
import LandingPage from './views/LandingPage/LandingPage.js';
import LoginPage from './views/LoginPage/LoginPage.js';
import RegisterPage from './views/RegisterPage/RegisterPage.js';
import NavBar from './views/NavBar/NavBar';
import UploadProductPage from './views/UploadProductPage/UploadProductPage.js';
import Footer from './views/Footer/Footer';
import DetailProductPage from './views/DetailProductPage/DetailProductPage';
import CartPage from './views/CartPage/CartPage';

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path='/' component={Auth(LandingPage, null)} />
          <Route exact path='/login' component={Auth(LoginPage, false)} />
          <Route exact path='/register' component={Auth(RegisterPage, false)} />
          <Route
            exact
            path='/product/upload'
            component={Auth(UploadProductPage, true)}
          />
          <Route
            exact
            path='/product/:productID'
            component={Auth(DetailProductPage, null)}
          />
          <Route exact path='/user/cart' component={Auth(CartPage, true)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

// Routing 한 컴포넌트들은 props로 history, location, match 라는 3가지 데이터를 전달 받음
// React Route를 이용할때 Route path에 '/:parameter이름' 을 추가하면
// 이 정보는 해당 컴포넌트의 props.match.params 에 접근하여 불러올수 있음

// 이것은 LandingPage 에서 링크를 걸때 입력했던 <a href={`/product/${product._id}`}>
// product._id 변수값을 props.match.params.productID 에 담아서 전달함

export default App;
