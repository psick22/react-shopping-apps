import React from 'react';
import 'antd/dist/antd.css';
import { Collapse, Checkbox } from 'antd';
const { Panel } = Collapse;

function CheckBox(props) {
  const renderCheckbox = () =>
    props.list &&
    props.list.map((item, index) => (
      <React.Fragment key={index}>
        <Checkbox key={index}>
          <span>{item.name}</span>
        </Checkbox>
      </React.Fragment>
    ));

  return (
    <div>
      <Collapse defaultActiveKey={['1']}>
        <Panel header='This is panel header 1' key='1'>
          {renderCheckbox()}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBox;
