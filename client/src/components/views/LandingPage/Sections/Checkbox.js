import React from 'react';
import 'antd/dist/antd.css';
import { Collapse, Checkbox } from 'antd';
const { Panel } = Collapse;

function CheckBox({ continents, priceFilter }) {
  const renderCheckbox = items =>
    items.map(item => (
      <React.Fragment key={item._id}>
        <Checkbox>
          <span>{item.name}</span>
        </Checkbox>
      </React.Fragment>
    ));

  return (
    <div>
      <Collapse defaultActiveKey={['1']}>
        <Panel header='This is panel header 1' key='1'>
          {renderCheckbox(continents)}
        </Panel>
        <Panel header='This is panel header 1' key='1'>
          {renderCheckbox(priceFilter)}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBox;
