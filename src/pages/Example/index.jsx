import React from 'react';

import PageTitle from '@components/page-title';
import SreachBlock from './subPage/SreachBlock';
import TableList from './subPage/TableList';
import ExampleStore from './store';

const Example = (props) => {
  return (
    <ExampleStore>
      <div className="container-block">
        <PageTitle title="查询表单" />
        <SreachBlock />
        <TableList />
      </div>
    </ExampleStore>
  );
};

export default Example;