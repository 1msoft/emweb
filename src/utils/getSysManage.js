import {inject, observer} from 'mobx-react';
import {
  FORUSE_NEED_PLAN
} from '../../../presale-common/consts/consts.business';

export default (Component)=>{

  @inject('appFrame')
  @observer
  class GetSysManage extends  Component{
    // 获取当前地区地区是否需要根据用款计划进行支用
    getFundUseIsBasisOfPlan(){
      const {appFrame} = this.props;
      const {configInfo} = appFrame.user.zone;
      let resultValue = FORUSE_NEED_PLAN.DEFAULT;
      // 是否设置
      if(configInfo.fundUseIsBasisOfPlan !== undefined){
        resultValue = configInfo.fundUseIsBasisOfPlan;
      }
      if( resultValue === FORUSE_NEED_PLAN.YES ){
        return true;
      } else {
        return false;
      }
    }
  }
  return GetSysManage;
}
