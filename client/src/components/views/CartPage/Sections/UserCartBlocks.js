import React from 'react';
import './UserCartBlocks.css';

function UserCartBlocks(props) {
  const renderCartImage = images => {
    if (images.length > 0) {
      let image = images[0];
      console.log(image);
      return image;
    }
  };

  const renderItems = () =>
    props.products &&
    props.products.map((product, index) => (
      <tr key={index}>
        <td>
          <img
            key={index}
            style={{ width: '70px' }}
            src={renderCartImage(product.images)}
            alt='product'
          />
        </td>
        <td>{product.quantity} EA</td>
        <td> $ {product.price}</td>
        <td>
          <button>Remove</button>
        </td>
      </tr>
    ));
  const calculateTotal = () => {
    console.log(props.products);

    const sum = props.products.map(product => product.price * product.quantity);
    console.log('sum:', sum);
    const total = sum.reduce(function (a, b) {
      return a + b;
    }, 0);
    console.log('total:', total);

    return total;
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Quantity</th>
            <th>Product Price</th>
            <th>Remove from Cart</th>
          </tr>
        </thead>

        <tbody>{props.products && renderItems()}</tbody>
      </table>
      <div>총액 : {props.products && calculateTotal()}</div>
    </div>
  );
}

export default UserCartBlocks;
