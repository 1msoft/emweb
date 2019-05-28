import React, { useState } from 'react';
import classNames from 'classnames';
import { Row } from 'antd';

import subSystemA from '@assets/images/subSystemA.png';
import subSystemB from '@assets/images/subSystemB.png';
import subSystemC from '@assets/images/subSystemC.png';

import './index.less';

const data = [{
  title: '子应用A',
  imgSrc: subSystemA,
}, {
  title: '子应用B',
  imgSrc: subSystemB,
}, {
  title: '子应用C',
  imgSrc: subSystemC,
}, {
  title: '子应用D',
  imgSrc: subSystemA,
}, {
  title: '子应用E',
  imgSrc: subSystemA,
}, {
  title: '子应用F',
  imgSrc: subSystemB,
}, {
  title: '子应用G',
  imgSrc: subSystemC,
}, {
  title: '子应用H',
  imgSrc: subSystemC,
}, {
  title: '子应用I',
  imgSrc: subSystemA,
}];

const SystemItem = (props) => {
  return (
    <div className="system-item">
      <img src={props.imgSrc} alt={props.title} />
      <span>{props.title}</span>
    </div>
  );
};

// 子系统 - 遮罩层块
const SystemList = (props) => {
  return (
    <div className="system-list-layout">
      <div className="system-list-content">
        <div className="system-list-close"
          onClick={ () => {
            props.hideHandle(false);
          } }>
          <span className="iconfont iconyingyongguanbi"></span>
        </div>
        <div className="system-list">
          <Row>
            {SystemItem({ ...data[0] })}
            {SystemItem({ ...data[1] })}
            {SystemItem({ ...data[2] })}
            {SystemItem({ ...data[3] })}
          </Row>
          <Row>
            {SystemItem({ ...data[4] })}
            {SystemItem({ ...data[5] })}
            {SystemItem({ ...data[6] })}
          </Row>
          <Row>
            {SystemItem({ ...data[7] })}
            {SystemItem({ ...data[8] })}
            {SystemItem({ ...data[9] })}
          </Row>
        </div>
      </div>
    </div>
  );
};

// 子系统 - 主体
const SubSystem = (props) => {
  // TUDO:
  const [showSubSystem, setShowShubSystem] = useState(false);
  const buttonClassName = classNames(
    'sub-system',
    showSubSystem
      ? 'sub-system-hide'
      : 'sub-system-show'
  );

  return (
    <div className="sub-system-outer-layer">
      <div className={buttonClassName}>
        <div
          onClick={() => setShowShubSystem(true) }
          className="sub-system-inner-layer">
          <div>
            <span></span>
            <span className="level-margin"></span>
            <span></span>
            <span className="vertical-margin"></span>
            <span className="level-margin vertical-margin"></span>
            <span className="vertical-margin"></span>
            <span></span>
            <span className="level-margin"></span>
            <span></span>
          </div>
        </div>
        <SystemList
          show={showSubSystem}
          hideHandle={setShowShubSystem} />
      </div>
    </div>
  );
};

export default SubSystem;