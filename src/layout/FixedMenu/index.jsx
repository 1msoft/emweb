import React, { useState, useEffect } from 'react';
import { FixedMenu } from '@1msoft/kant-ui';
import './index.less';
import { useStore } from '../../stores';

const FinalyFixedMenu = () => {

  const store = useStore();

  const onCloseRetract = (store) => {
    console.log('关闭');
    store.menuStatus.setCollapsed();
  };

  const onPenRetract = (store) => {
    console.log('打开');
    store.menuStatus.clearCollapsed();
  };

  const [isShow, setIsShow] = useState(false);
  const [isChange, setIsChange] = useState([
    { icon: 'iconicon-zhuti1',
      useIcon: 'iconicon-zhuti',
      onClick: () => {
        console.log('change');
      }
    },
    { icon: 'iconanniu-quanping',
      onClick: () => {
        onCloseRetract(store);
      }
    },
    { icon: 'iconxiangshang',
      onClick: (props) => {
        props.scrollToTop();
      }
    }
  ]);

  const dealIcon = (arr) => {
    let newArr = {};
    if(arr.icon === 'iconanniu-zhanshi') {
      newArr = { icon: 'iconanniu-quanping',
        onClick: () => {
          onCloseRetract(store);
        }
      };
    } else if (arr.icon === 'iconanniu-quanping') {
      newArr = { icon: 'iconanniu-zhanshi',
        onClick: () => {
          onPenRetract(store);
        }
      };
    }
    else {
      newArr = arr;
    }
    return newArr;
  };

  const colorIcon = (icon) => {
    if (icon === 'iconicon-zhuti1' || icon === 'iconicon-zhuti') {
      return (
        <svg className={`icon hover-icon`} aria-hidden="true">
          <use xlinkHref={`#${icon}`}></use>
        </svg>
      );
    } else {
      return (
        <span
          className={` kant-top-icon iconfont ${icon}`}>
        </span>
      );
    }
  };

  const FixedMenuDom = (props) => {
    return (
      <div className="em-content">
        <div className="em-bottm"
        >
          <div className="em-bottm-content"
            onClick={
              () => {
                let arr = isChange[2];
                let newArr = dealIcon(arr);
                let changeArr = [...isChange];
                changeArr.splice(2, 1, newArr);
                arr.onClick(props);
                setIsChange(changeArr);
              }
            }
          >
            <span className={` kant-bottom-icon iconfont ${isChange[2].icon}`}>
            </span>
          </div>
          <div className="em-overhide-ul">
            <ul className="em-content-ul">
              <li className="em-middle"
                onClick={
                  () => {
                    let arr = isChange[0];
                    arr.onClick(props);
                  }
                }
              >
                {colorIcon(isChange[0].icon)}
                <svg className={`icon hover-useIcon`} aria-hidden="true">
                  <use xlinkHref={`#${isChange[0].useIcon}`}></use>
                </svg>
              </li>
              <i className="em-green"></i>
              <li className="em-top"
                onClick={
                  () => {
                    let arr = isChange[1];
                    let newArr = dealIcon(arr);
                    let changeArr = [...isChange];
                    changeArr.splice(1, 1);
                    changeArr.push(newArr);
                    arr.onClick(props);
                    setIsChange(changeArr);
                  }
                }
              >
                <span
                  className={` kant-top-icon iconfont ${isChange[1].icon}`}>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    FixedMenuDom;
  }, [isChange]);

  return (
    <FixedMenu
      className="em-fixed-menu"
      visibilityHeight={0}
      display="always"
      speed={20}
    >
      {FixedMenuDom}
    </FixedMenu>
  );
};

export default () => (
  <FinalyFixedMenu></FinalyFixedMenu>
);
