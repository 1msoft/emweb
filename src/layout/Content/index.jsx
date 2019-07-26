import React from 'react';
import { Link } from 'react-router-dom';
import Route from '../subpage/Route';

import { Layout } from 'antd';
import { Breadcrumb } from '@1msoft/kant-ui';
import './index.less';

const { Content, Footer } = Layout;
import LoadingBlock from '../GlobalLoading';

export default (props) => {
  return (
    <Layout className="main-content">
      {/* 面包屑 */}
      <div className="emweb-breadcrumb">
        <Breadcrumb
          breadcrumbProps={{ separator: "/" }}
          targetItemClass ="kant-link"
          jumpWay={ url => props.history.push(url)}
          breadcrumbs={props.breadcrumbs} />
      </div>
      {/* 内容主题 */}
      <Content className="content">
        <Route routerList={props.routerList} />
      </Content>

      {/* 尾部 */}
      <Footer className="footer">Copyright  2019 英迈软件技术部出品</Footer>

      <LoadingBlock isLocal={true}/>
    </Layout>
  );
};
