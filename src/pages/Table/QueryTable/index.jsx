import React from 'react';

import Sotre from './store';
import Header from './page/Header';
import Query from './page/Query';
import Table from './page/Table';

export default () => {
  return (
    <Sotre>
      <Header />
      <Query />
      <Table />
    </Sotre>
  );
};
