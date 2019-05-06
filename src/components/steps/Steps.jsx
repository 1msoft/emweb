import React, { Component } from 'react';
import { Steps } from 'antd';

const Step = Steps.Step;

/**
 * 左侧节点组件
 * 参数          值类型                       值 || 示例             描述
 * nodes       @param {Array}               [node,...]          勇于获取节点的高度
 * listens     @param {Array}               [node,...]          需要监听高度变化的节点
 * bodyStyle   @param {Object}              {color: ''}         覆盖body的样式
 * nextMargins @param {Array || Number}     [1, 2, 3] 默认30     当前节点到下一个节点的间距值
 * topHeight   @param {Number}              [0]                 第一个节点头顶灰色线条高度
 */
export default class CustomSteps extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isListen: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { nodes } = nextProps;
    if (nodes && nodes.length) {
      this.setState({ stepHeight: nodes, isListen: true });
    }
  }

  render() {
    const { stepHeight = [] } = this.state;
    const { nextMargins = 30, bodyStyle = {}, topHeight } = this.props;
    const customDot = (dot, { index, status, title, description }) => (
      <span>{dot}</span>
    );
    const containerStyle = Object.assign({},
      {
        display: 'inline-block',
        margin: '30px 0',
        width: '10px',
        padding: '0 20px 0 30px',
        verticalAlign: 'top'
      },
      bodyStyle
    );
    return (
      <div style={containerStyle} id="steps">
        <div className="steps-item-first" style={{height: topHeight}}>
        </div>
        <Steps
          direction="vertical"
          current={stepHeight && stepHeight.length}
          progressDot={customDot}>
          
          {
            stepHeight && stepHeight.map((height, index) => {
              const marginBottom = typeof nextMargins === 'number' ?
                nextMargins : nextMargins[index];
              if(index + 1 < stepHeight.length){
                return <Step
                  key={index}
                  style={{ height: height + marginBottom }} />
              } else if(index + 1 === stepHeight.length){
                return <Step
                  key={index}
                  style={{ height:  24}} />
              }
            })
          }
        </Steps>
        <div className="steps-item-first" 
          style={{height: stepHeight[stepHeight.length -1] ? 
          stepHeight[stepHeight.length -1] - 42 : 0}}>
        </div>
      </div>
    );
  }
}