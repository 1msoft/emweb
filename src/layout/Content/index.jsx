import React from 'react';
import { Link } from 'react-router-dom';
import Route from '../subpage/Route';

import { Layout, Icon } from 'antd';
import { Breadcrumb } from '@1msoft/kant-ui';
import './index.less';

const { Content, Footer } = Layout;

export default (props) => {
  return (
    <Layout className="main-content">
      {/* 面包屑 */}
      <div className="emweb-breadcrumb">
        {
          props.isMobile && (
            <Icon
              type="swap"
              className="toggle-menu-button"
              onClick={() => props.useCollapse(bool => !bool)}
            />
          )
        }
        <Breadcrumb
          breadcrumbProps={{ separator: "/" }}
          targetItemClass ="kant-link"
          itemRender={({ path, text }) => <Link to={path}>{text}</Link>}
          breadcrumbs={props.breadcrumbs} />
      </div>
      {/* 内容主题 */}
      <Content className="content">
        <Route routerList={props.routerList} />
      </Content>

      {/* 尾部 */}
      <Footer className="footer">Copyright  2019 英迈软件技术部出品</Footer>
    </Layout>
  );
};
