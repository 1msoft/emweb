import React, { useState, useEffect } from 'react';
import './index.less';
import { Progress } from 'antd';

const LoginLoading = () => {
  const loginLoading = require('@assets/images/loading.gif');
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
    <div className={'content'} >
      <img src={loginImg} className={'LoginImg'} alt=""/>
      <img src={loginLoading} className={'spin'} alt="" />
      <div className={'progress-num'}>{`${progressMark}%`}</div>
      <div className={'progress'}>
        <Progress strokeColor={"#3C70FF"} percent={progressMark} size="small" showInfo={false}/>
      </div>
    </div>
  );
};

export default LoginLoading;
