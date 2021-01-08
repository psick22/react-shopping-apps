import React, { useState } from 'react';

import { Input } from 'antd';
const { Search } = Input;

function Searchbox({ doSearch }) {
  const [input, setInput] = useState('');

  const onSearch = value => {
    console.log('search :', value);
    const searchString = value;
    setInput('');
    doSearch(searchString);
  };

  const onChangeHandler = e => {
    console.log(e.currentTarget.value);
    const newInput = e.currentTarget.value;
    setInput(newInput);
  };
  return (
    <div>
      <Search
        placeholder='input search text'
        allowClear
        enterButton='Search'
        size='large'
        value={input}
        onChange={e => onChangeHandler(e)}
        onSearch={onSearch}
      />
    </div>
  );
}

export default Searchbox;
