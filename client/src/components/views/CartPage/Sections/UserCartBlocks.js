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
          <button onClick={() => props.removeItem(product._id)}>Remove</button>
        </td>
      </tr>
    ));

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
    </div>
  );
}

export default UserCartBlocks;
