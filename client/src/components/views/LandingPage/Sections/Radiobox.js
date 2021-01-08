import React, { useState } from 'react';
import { Collapse, Radio } from 'antd';
const { Panel } = Collapse;

function RadioBox({ price, handleFilters }) {
  const [value, setValue] = useState(1);
  //   const [range, setRange] = useState([]);

  const radioboxHandler = e => {
    console.log('radio checked', e, e.target.value);
    const newValue = e.target.value;
    const min = e.target.array[0];
    const max = e.target.array[1];
    const priceFilter = [
      {
        id: newValue,
        minPrice: min,
        maxPrice: max,
      },
    ];
    setValue(newValue);

    // [{value:1, min: 0, max:100}]

    handleFilters(priceFilter);
  };

  const renderRadiobox = items =>
    items.map(item => (
      <React.Fragment key={item._id}>
        <Radio value={item._id} array={item.array}>
          <span>{item.name}</span>
        </Radio>
      </React.Fragment>
    ));

  return (
    <div>
      <Collapse defaultActiveKey={['0']}>
        <Panel header='Price' key='1'>
          <Radio.Group onChange={radioboxHandler} value={value}>
            {renderRadiobox(price)}
          </Radio.Group>
        </Panel>
      </Collapse>
    </div>
  );
}

export default RadioBox;
