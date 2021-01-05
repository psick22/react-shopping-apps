# 쇼핑몰 사이트 만들기

- template : [react-boilerplate-v2](https://github.com/psick22/react-boilerplate-v2) 이용

## 설치 방법

#### (1) root directory에서 Backend dependencies 설치

`$ yarn install`

#### (2) client directory에서 Frontend dependencies 설치

`$ yarn install`

(3) server/config/dev.js 를 생성하고 MongoDB Cluster 정보를 입력

#### <dev.js>

```JavaScript
module.exports = {
  mongoURI:
    "mongodb+srv://<user>:<password>@<clustername>.vbjgi.mongodb.net/<dbname>?retryWrites=true&w=majority",
};
```

#### (4) 서버 실행 스크립트 : root directory에서

`$ yarn backend` : server
`$ yarn frontend` : client
`$ yarn dev` : server + client

## Source

[John Ahn (인프런)](https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%85%B8%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%87%BC%ED%95%91%EB%AA%B0/dashboard)
