import React from 'react';

import Sotre from './store';
import Header from './subpage/Header';
import Query from './subpage/Query';
import Table from './subpage/Table';
import CreateUser from './subpage/CreateUser';
import UpdateUser from './subpage/UpdateUser';
export default () => {
  return (
    <Sotre>
      <Header />
      <Query />
      <Table />
      <CreateUser />
      <UpdateUser />
    </Sotre>
  );
};
