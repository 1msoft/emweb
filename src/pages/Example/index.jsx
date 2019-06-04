import React, {} from 'react';
import { observer, inject } from 'mobx-react';

import TableList from './subpage/TableList';
import EditBlocks from './subpage/EditBlock';
import SearchBlock from './subpage/SearchBlock';
import OperationBlock from './subpage/OperationBlock';
import ExampleStore from './store';

let Example = (props) => {
  return (
    <ExampleStore>
      <SearchBlock />
      <OperationBlock />
      <TableList />
      <EditBlocks />
    </ExampleStore>
  );
};

export default Example;
