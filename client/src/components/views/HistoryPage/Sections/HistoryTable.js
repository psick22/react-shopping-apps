import React from 'react';
import { Table, Tag, Space } from 'antd';

function HistoryTable({ history }) {
  const columns = [
    {
      title: 'Payment ID',
      dataIndex: 'paymentId',
      key: 'paymentId',
    },
    {
      title: '상품 이름',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Date of Purchase',
      dataIndex: 'purchaseDate',
      key: 'purchaseDate',
    },
  ];

  const data =
    history &&
    history.map((item, index) => {
      return {
        key: index,
        paymentId: item.paymentId,
        productName: item.name,
        price: item.price,
        quantity: item.quantity,
        purchaseDate: item.dateOfPurchase,
      };
    });

  return (
    <div>
      <h1
        style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}
      >
        Payment History
      </h1>
      <div
        style={{
          margin: 'auto',
          display: 'flex',
          justifyContent: 'center',
          width: '90%',
        }}
      >
        <Table style={{ width: '100%' }} columns={columns} dataSource={data} />
      </div>
    </div>
  );
}

export default HistoryTable;
