import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Collapse, Checkbox } from 'antd';
const { Panel } = Collapse;

function CheckBox({ continents, handleFilters }) {
  const [checked, setChecked] = useState([]);

  // 체크가 되면 checked state의 리스트에 올림
  const checkboxHandler = id => {
    // 클릭이 되면 checked state에서 이 _id의 인덱스를 찾고
    // 인덱스가 없으면 (-1 이면) 체크가 안되있다는 뜻이므로 checked state의 리스트로 _id를 push하고
    // 인덱스가 있으면 그 인덱스로 부터 1개 제거 (splice)
    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    console.log('자.컴', checked);
    handleFilters(newChecked);
    console.log('자.컴', checked);
  };

  const renderCheckbox = items =>
    items.map(item => (
      <React.Fragment key={item._id}>
        <Checkbox
          key={item._id}
          onChange={() => checkboxHandler(item._id)}
          check={checked.indexOf(item._id === -1 ? false : true)}
        >
          <span>{item.name}</span>
        </Checkbox>
      </React.Fragment>
    ));

  return (
    <div>
      <Collapse defaultActiveKey={['0']}>
        <Panel header='Continents' key='1'>
          {renderCheckbox(continents)}
        </Panel>
        {/* <Panel header='This is panel header 1' key='2'>
          {renderCheckbox(priceFilter)}
        </Panel> */}
      </Collapse>
    </div>
  );
}

export default CheckBox;
