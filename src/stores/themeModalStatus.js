import { observable, action, autorun } from 'mobx';
import { getCookie, setCookie } from '@utils/helper.js';

/**
 * modal 扩展 store
 */
class themeModalStatus {
  constructor(){
    autorun(this.print);
  }

  @observable showThemeModal = false;
  @observable currentTheme = getCookie('current_theme') || "";

  @action
  setTheme = (themeName) => {
    setCookie('current_theme', themeName);
    this.currentTheme = themeName;
  }

  @action
  open = () => {
    this.showThemeModal = true;
  }

  @action
  close = () => {
    this.showThemeModal = false;
  }

  // 打印状态
  print = () => {
    console.group('%c[store][themeModalStatus]: 主题对话框', 'color: green');
    console.log('主题对话框是否打开:', this.showThemeModal);
    console.log('当前主题:', this.current_theme || "当前未设置主题");
    console.groupEnd();
  }
}

export default themeModalStatus;
