import React, { Component } from 'react';
import { Spin } from 'antd';

const LoadingSpin = ({tip = '', size = 'middle', spinning = false}) => {
  const style = {
    container: {
      position: 'fixed',
      width: '100%',
      height: '100%',
      display: spinning ? 'block' : 'none',
      top: 0,
      left: 0,
      zIndex: 2000
    },
    spin: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      // display: this.props.show ? 'block' : 'none',
      zIndex: 2001,
    }
  };
  return (
      <div style ={style.container}>
        <div style={style.spin}>
          <Spin tip={tip} size={size}/>
        </div>
      </div>
    );
};

export default LoadingSpin;