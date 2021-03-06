import React, { useState, useEffect, Fragment } from 'react';
import './index.less';
import { ProgressBar } from '@1msoft/kant-ui';
import { useStore } from '../../stores/index';

const LoginLoading = () => {
  const store = useStore();
  const loginLoading = require('@assets/images/loginloading.gif');
  const loginImg = require('@assets/images/lodingImg.png');
  const [progressMark, setProgress] = useState(0);
  const [progressBar, setProgressBar] = useState(80);
  const [isShow, setShow] = useState(true);

  useEffect(() => {
    if (progressMark < 100) {
      setTimeout(() => {
        let timead = progressMark + 2;
        setProgress(timead);
      }, 0);
    } else {
      setProgressBar(100);
      setTimeout(() => {
        setShow(false);
      }, 300);
    }
  }, [progressMark]);
  return (
    <Fragment>
      {
        isShow ?
          <div className={'login-content'} >
            <img src={loginImg} className={'login-img'} alt=""/>
            <img src={loginLoading} className={'spin'} alt="" />
            <div className={'progress-num'}>{`${progressMark}%`}</div>
            <div className={'progress'}>
              <ProgressBar
                animation={progressBar !== 100}
                autoClearPercent={false}
                percent={progressBar}
                style={{ height: '3px' }}
              />
            </div>
          </div> : ''
      }
    </Fragment>
  );
};

export default LoginLoading;
