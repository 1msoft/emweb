import React from 'react';

import PageTitle from '@components/page-title';
import SreachBlock from './subPage/SreachBlock';
import TableList from './subPage/TableList';
import CreateModal from './subPage/CreateModal';
import ExampleStore from './store';

const Example = (props) => {
  return (
    <ExampleStore>
      <div className="container-block">
        <PageTitle title="查询表单" />
        <SreachBlock />
        <TableList />
        <CreateModal />
      </div>
    </ExampleStore>
  );
};

export default Example;