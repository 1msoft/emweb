import React from 'react';

import Sotre from './store';
import Header from './subpage/Header';
import Query from './subpage/Query';
import Table from './subpage/Table';
import CreateApplication from './subpage/CreateApplication';
import UpdateApplication from './subpage/UpdateApplication';
export default () => {
  return (
    <Sotre>
      <Header />
      <Query />
      <Table />
      <CreateApplication />
      <UpdateApplication />
    </Sotre>
  );
};
