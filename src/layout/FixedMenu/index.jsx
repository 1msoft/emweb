import React, { useState, useEffect } from 'react';
import { FixedMenu } from '@1msoft/kant-ui';
import './index.less';
import { Icon } from 'antd';
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

  const [isChange, setIsChange] = useState([
    { icon: 'iconanniu-quanping',
      onClick: () => {
        onCloseRetract(store);
      }
    },
    { icon: 'iconicon-zhuti',
      useIcon: 'iconicon-zhuti1',
      onClick: () => {
        console.log('change');
      }
    },
    { icon: 'iconxiangshang',
      onClick: (props) => {
        props.scrollToTop();
      }
    }
  ]);

  const dealIcon = (arr) => {
    let arr3 = {};
    if(arr.icon === 'iconanniu-zhanshi') {
      arr3 = { icon: 'iconanniu-quanping',
        onClick: () => {
          onCloseRetract(store);
        }
      };
    } else if (arr.icon === 'iconanniu-quanping') {
      arr3 = { icon: 'iconanniu-zhanshi',
        onClick: () => {
          onPenRetract(store);
        }
      };
    }
    else {
      arr3 = arr;
    }
    return arr3;
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
                let arr3 = dealIcon(arr);
                let arr2 = [...isChange];
                arr2.splice(2, 1, arr3);
                arr.onClick(props);
                setIsChange(arr2);
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
                    let arr3 = dealIcon(arr);
                    let arr2 = [...isChange];
                    arr2.splice(0, 1);
                    arr2.push(arr3);
                    arr.onClick(props);
                    setIsChange(arr2);
                  }
                }
              >
                <span className={` kant-top-icon iconfont ${isChange[0].icon}`}>
                </span>
              </li>
              <i className="em-green"></i>
              <li className="em-top"
                onClick={
                  () => {
                    let arr = isChange[1];
                    let arr3 = dealIcon(arr);
                    let arr2 = [...isChange];
                    arr2.splice(1, 1);
                    arr2.push(arr3);
                    arr.onClick(props);
                    setIsChange(arr2);
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
