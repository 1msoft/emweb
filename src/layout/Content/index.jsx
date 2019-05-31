import React from 'react';
import { Link } from 'react-router-dom';
import Route from '../subpage/Route';

import { Layout } from 'antd';
import { Breadcrumb } from '@1msoft/kant-ui';
import './index.less';

const { Content, Footer } = Layout;

export default () => {
  return (
    <Layout className="main-content">

      {/* 内容主题 */}
      <Content className="content">
        {/* 面包屑 */}
        <Breadcrumb
          breadcrumbProps={{ separator: "|" }}
          targetItemClass ="kant-link"
          itemRender={({ path, text }) => <Link to={path}>{text}</Link>}
          breadcrumbs={
            [
              { path: '/home', text: 'Home', icon: 'home' },
              { path: '/404', text: '404', icon: 'delete' }
            ]
          }
        />

        <Route />
      </Content>

      {/* 尾部 */}
      <Footer className="footer">Copyright  2019 英迈软件技术部出品</Footer>
    </Layout>
  );
};
