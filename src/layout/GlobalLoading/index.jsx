import React from 'react';
import less from './index.module.less';


const LoadingBlock = (props) => {
  const loading = props.isLocal ? require('@assets/images/localloading.gif')
    : require('@assets/images/loading.gif');
  return (
    <div className={props.isLocal ? less['local-content']
      : less['content']}>
      <img src={loading} alt="" className={props.isLocal ? less['local-spin']
        : less['spin']}/>
    </div>
  );
};

export default LoadingBlock;
