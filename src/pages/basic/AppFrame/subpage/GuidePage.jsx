import { Spin } from 'antd';
import React, { Component } from 'react';
import loadingBg from '../../../../assets/images/loadingBg.png';

class GuidePage extends Component {
  render() {
    if (true){ return null ;}
    return (
      <div className="root-mask">
        <div className="tool-tip">
          <div className="tool-tip-head">
            <img src={loadingBg} alt="loadingBg"/>
            <div>商品房预售资金监管系统</div>
          </div>         
          <div className="tool-tip-body">
            <Spin />
            <span className="tool-tip-loding-text">正在加载数据...</span>
          </div>
        </div>
      </div>
    );
  }
}

export default GuidePage;
