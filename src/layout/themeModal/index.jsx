import React, { useState, useEffect } from 'react';
import { Modal, message } from 'antd';
import { useStore } from '../../stores';
import { useObserver } from "mobx-react-lite";
import { getThemeList,changeColor } from '@1msoft/kantui-theme-webpack-plugin/colorChanger';
import './index.less';


// 主题色列表
const themeColor = {
  "pink": "#FF8EC1",
  "red": "#F22F4A",
  "yellow": "#FFC939",
  "orange": "#FF833F",
  "green": "#05C39D",
  "blue": "#36B6FF",
  "violet": "#877DFF",
};

/**
 * 主题选择按钮
 * @param {Boolean}   props.isSelected
 * @param {Function}  props.themeSelect
 * @param {String}    props.bgColor
 * @param {Boolean}   props.isCurrent
 */
const ThemeItem = (props) => {

  return(
    <div 
      className = {`theme-item-outer-layer${props.isSelected ? "-selected" : ""}`}
      style = {{ boxShadow: `0px 6px 6px 0px ${props.bgColor}` }}
      onClick = {props.themeSelect}>
      <div
        className = 'theme-item-inner-layer'
        style = {props.isCurrent ? 
          { background: "#fff", border: `4px solid ${props.bgColor}`, cursor: "not-allowed" } :
          { background: props.bgColor }}>
      </div>
      <div className = 'theme-item-icon'>
        <span>
          {props.isSelected ? <i className = "iconfont iconMail-dagou"/> : ""}
        </span>
      </div>
    </div>);
};

const themeFileList = getThemeList();
const theme = Object.keys(themeColor);


export default (props) => useObserver(() =>{
  const store = useStore();
  const [selectedTheme, setSelectedTheme] = useState(store.themeModalStatus.currentTheme);

  // 处理主题切换
  const handleThemeChange = () => {
    let themeFile = themeFileList.find((value)=>
      (/(?<=theme-)\S*(?=\.\S{8}\.css)/.exec(value)[0] === selectedTheme)
    );
    if (themeFile !== undefined) {
      changeColor(themeFile);
      store.themeModalStatus.setTheme(selectedTheme);
      return true;
    } else {
      return false;
    }
  };

  // 处理OK
  const handleOk = () =>{
    if(handleThemeChange()){
      message.success('主题切换成功！');
    } else {
      message.error(`主题${themeFile}未配置`);
    };
  };

  // 处理CANCEL
  const handleCancel = () => {
    store.themeModalStatus.close();
  };

  useEffect (()=>{
    handleThemeChange();
  },[]);

  return(
    <Modal
      title = "主题切换"
      onOk = {handleOk}
      onCancel = {handleCancel}
      visible = {store.themeModalStatus.showThemeModal}>
      <div className = 'theme-item-panel'>
        {theme.map((value)=>(
          <ThemeItem
            key = {value}
            bgColor = {themeColor[value]}
            isSelected = {selectedTheme === value}
            isCurrent = {store.themeModalStatus.currentTheme === value}
            themeSelect = {()=>{
              if (store.themeModalStatus.currentTheme !== value) {
                setSelectedTheme(value);
              }
            }}/>)
        )}
      </div>
    </Modal>);
});