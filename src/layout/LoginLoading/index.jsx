import React, { useState, useEffect, Fragment } from 'react';
import './index.less';
import { Progress } from 'antd';
import { useStore } from '../../stores/index';

const LoginLoading = () => {
  const store = useStore();
  const loginLoading = require('@assets/images/loginloading.gif');
  const loginImg = require('@assets/images/lodingImg.png');
  const [progressMark, setProgress] = useState(0);

  useEffect(() => {
    if (progressMark < 100) {
      setTimeout(() => {
        let timead = progressMark + 1;
        setProgress(timead);
      }, 20);
    }
  }, [progressMark]);
  return (
    <Fragment>
      {
        store.inTransitRequests ?
          <div className={'login-content'} >
            <img src={loginImg} className={'LoginImg'} alt=""/>
            <img src={loginLoading} className={'spin'} alt="" />
            <div className={'progress-num'}>{`${progressMark}%`}</div>
            <div className={'progress'}>
              <Progress strokeColor={"#3C70FF"}
                percent={progressMark} size="small" showInfo={false}/>
            </div>
          </div> : ''
      }
    </Fragment>
  );
};

export default LoginLoading;
