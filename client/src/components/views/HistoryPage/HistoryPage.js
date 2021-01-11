import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Tag, Space } from 'antd';
import HistoryTable from './Sections/HistoryTable';

function HistoryPage(props) {
  useEffect(() => {
    props.user.userData &&
      console.log('props.user.userData.history: ', props.user.userData.history);
  });

  return (
    <div>
      <HistoryTable
        history={props.user.userData && props.user.userData.history}
      />
    </div>
  );
}

export default HistoryPage;
