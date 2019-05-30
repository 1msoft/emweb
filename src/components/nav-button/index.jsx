import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import subSystemA from '../../assets/images/subSystemA.png';
import subSystemB from '../../assets/images/subSystemB.png';
import subSystemC from '../../assets/images/subSystemC.png';

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

const SystemItems = () => {
  const systemItems = [];
  for (let i = 0; i < data.length; i++) {
    if (i === 4 || i === 7) {
      systemItems.push(<br key={i} />);
    }
    const info = data[i];
    systemItems.push(
      <div className="system-item" key={`${info.title}-${i}`}>
        <img src={info.imgSrc} alt={info.title} />
        <span>{info.title}</span>
      </div>
    );
  }
  return systemItems;
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
          {SystemItems()}
        </div>
      </div>
    </div>
  );
};

// 子系统 - 主体
const NavButton = () => {
  const [showSubSystem, setShowShubSystem] = useState(false);
  let buttonClassName = classNames(
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
          hideHandle={setShowShubSystem} />
      </div>
    </div>
  );
};

export default NavButton;
