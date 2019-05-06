/**
 * selectSetting: {
 *  hidden: true || false
 *  onSearch
 *  onChange
 *  data
 * }
 * buttonSetting:{
 *  hidden: true || false
 *  onClick
 * }
 */
import React from 'react';
import {Select, Button, Icon} from 'antd';
import { commonBlur } from '../../utils/helper';
const Option = Select.Option;

//
const AddNewApplyBtnGroup = ({ selectSetting, buttonSetting}) => {
  let selectRef = null;
  return (
    <div style={{float: 'right'}}>
      {
        !selectSetting.hidden &&
        <Select
          showSearch
          allowClear
          size="large"
          style={{width: 150, margin: '0 20px'}}
          placeholder="项目名称"
          notFoundContent="无对应项目"
          ref={ref => {selectRef = ref}}
          onSelect={() => {commonBlur(selectRef)}}
          filterOption={(value, option) => option.props.children.indexOf(value) >= 0}
          // onSearch={selectSetting.onSearch || (() => {})}
          onChange={selectSetting.onChange || (() => {})}  >
          {selectSetting.data}
        </Select>
      }
      {
        !buttonSetting.hidden &&
        <Button
          type="primary"
          size="large"
          onClick={buttonSetting.onClick || (() => {})}>
          <Icon type="plus" style={{ marginRight: '2px' }} />
          <span>新增申请</span>
        </Button>
      }
    </div>
  );
}
export default AddNewApplyBtnGroup;
