import React, { Fragment } from 'react';
import less from './index.module.less';
import { useStore } from '../../stores/index';

const LoadingBlock = (props) => {
  const store = useStore();
  const loading = props.isLocal ? require('@assets/images/localloading.gif')
    : require('@assets/images/loginloading.gif');
  return (
    <Fragment>
      {
        store.inTransitRequests ?
          <div className={props.isLocal ? less['local-content']
            : less['content']}>
            <img src={loading} alt="" className={props.isLocal ? less['local-spin']
              : less['spin']}/>
          </div> : ''
      }
    </Fragment>
  );
};

export default LoadingBlock;
