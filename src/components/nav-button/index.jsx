import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import navImageA from '../../assets/images/navImageA.png';
import navImageB from '../../assets/images/navImageB.png';
import navImageC from '../../assets/images/navImageC.png';

import './index.less';

const data = [{
  title: '子应用A',
  imgSrc: navImageA,
}, {
  title: '子应用B',
  imgSrc: navImageB,
}, {
  title: '子应用C',
  imgSrc: navImageC,
}, {
  title: '子应用D',
  imgSrc: navImageA,
}, {
  title: '子应用E',
  imgSrc: navImageA,
}, {
  title: '子应用F',
  imgSrc: navImageB,
}, {
  title: '子应用G',
  imgSrc: navImageC,
}, {
  title: '子应用H',
  imgSrc: navImageC,
}, {
  title: '子应用I',
  imgSrc: navImageA,
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

// 子系统导航悬浮款 - 遮罩层块
const NavShade = (props) => {
  return (
    <div className="nav-shade-layout">
      <div className="nav-shade-content">
        <div className="nav-shade-close"
          onClick={ () => {
            props.hideHandle(false);
          } }>
          <span className="iconfont iconyingyongguanbi"></span>
        </div>
        <div className="nav-shade">
          {SystemItems()}
        </div>
      </div>
    </div>
  );
};

// 子系统 - 主体
const NavButton = () => {
  const [showNavShade, setShowNavShade] = useState(false);
  let buttonClassName = classNames(
    'nav-button',
    showNavShade
      ? 'nav-button-hide'
      : 'nav-button-show'
  );

  return (
    <div className="nav-button-outer-layer">
      <div className={buttonClassName}>
        <div
          onClick={() => setShowNavShade(true) }
          className="nav-button-inner-layer">
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
        <NavShade
          hideHandle={setShowNavShade} />
      </div>
    </div>
  );
};

export default NavButton;
