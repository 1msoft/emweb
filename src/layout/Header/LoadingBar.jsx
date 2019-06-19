import React, {
  useState,
  useEffect,
} from 'react';
import { withRouter } from 'react-router-dom';
import { ProgressBar } from '@1msoft/kant-ui';

const INIT_PERCENT = 80;
const FINAL_PERCENT = 100;
const LOAD_TIME = 2500;

const useStateHook = (props) => {
  const [percent, setPercent] = useState(INIT_PERCENT);

  // 加载中
  const onLoading = () => setPercent(INIT_PERCENT);

  // 加载完成
  const onSuccess = () => setTimeout(() => setPercent(FINAL_PERCENT), LOAD_TIME);

  useEffect(() => {
    onLoading();
    onSuccess();
  }, [props.match]);

  return { percent };
};

let LoadingBar = (props) => {
  const state = useStateHook(props);
  return (
    <ProgressBar
      animation={true}
      autoClearPercent={true}
      percent={state.percent}
    />
  );
};

LoadingBar = withRouter(LoadingBar);

export default LoadingBar;
