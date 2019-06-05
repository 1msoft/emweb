import React from 'react';
import TableList from './subpage/TableList';
import EditBlocks from './subpage/EditBlock';
import SearchBlock from './subpage/SearchBlock';
import HeaderBlock from './subpage/HeaderBlock';
import OperationBlock from './subpage/OperationBlock';
import ExampleStore from './store';

let Example = (props) => {
  return (
    <ExampleStore>
      <div className="container-block">
        <HeaderBlock />
        <SearchBlock />
        <OperationBlock />
        <TableList />
        <EditBlocks />
      </div>
    </ExampleStore>
  );
};

export default Example;
