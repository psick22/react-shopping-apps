import React, { useState } from 'react';
import { Typography, Button, Form, Input, Select } from 'antd';
import FileUpload from '../../utils/FileUpload';

const { Option } = Select;
const { TextArea } = Input;

const Continents = [
  { key: 1, value: 'Africa' },
  { key: 2, value: 'Europe' },
  { key: 3, value: 'Asia' },
  { key: 4, value: 'North America' },
  { key: 5, value: 'South America' },
  { key: 6, value: 'Austrailia' },
  { key: 7, value: 'Antarctica' },
];

function UploadProductPage() {
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Price, setPrice] = useState(0);
  const [Continent, setContinent] = useState(1);
  const [Image, setImage] = useState([]);

  const titleChangeHandler = e => {
    setTitle(e.currentTarget.value);
  };
  const descriptionChangeHandler = e => {
    setDescription(e.currentTarget.value);
  };
  const priceChangeHandler = e => {
    setPrice(e.currentTarget.value);
  };
  const continentChangeHandler = value => {
    setContinent(value);
  };
  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2> 여행 상품 업로드 </h2>
      </div>

      <Form>
        {/* {Drop Zone/} */}
        <FileUpload />
        <br />
        <br />
        <label>이름</label>
        <Input onChange={titleChangeHandler} value={Title} />
        <br />
        <br />
        <label>설명</label>
        <TextArea onChange={descriptionChangeHandler} value={Description} />
        <br />
        <br />
        <label>가격(&)</label>
        <Input type='number' onChange={priceChangeHandler} value={Price} />
        <br />
        <br />
        <Select
          style={{ width: 120 }}
          onChange={continentChangeHandler}
          value={Continent}
        >
          {Continents.map(item => (
            <Option key={item.key} value={item.key}>
              {item.value}
            </Option>
          ))}
        </Select>
        <br />
        <br />
        <Button type='submit'>확인</Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
